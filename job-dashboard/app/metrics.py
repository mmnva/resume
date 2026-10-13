"""Pure metrics logic: normalized job rows in, dashboard JSON out."""
from collections import Counter, defaultdict
from datetime import date, datetime, timedelta
from statistics import median

APPLIED_STATUSES = {"Applied", "Interviewing", "Offer", "Accepted"}
INTERVIEW_STATUSES = {"Interviewing", "Offer", "Accepted"}
OFFER_STATUSES = {"Offer", "Accepted"}

FUNNEL = [
    ("found", "Found"),
    ("screened", "Passed fit screen"),
    ("applied", "Applied"),
    ("interview", "Interview"),
    ("offer", "Offer"),
]


def _d(value):
    """Parse the date part of a Notion date string; None when absent/bad."""
    if not value:
        return None
    try:
        return date.fromisoformat(value[:10])
    except ValueError:
        return None


def normalize(page):
    """Flatten one Notion API page object into a plain dict."""
    p = page.get("properties", {})

    def text(name):
        return "".join(t.get("plain_text", "") for t in (p.get(name) or {}).get("rich_text", [])).strip()

    def select(name):
        s = (p.get(name) or {}).get("select")
        return s["name"] if s else None

    def num(name):
        return (p.get(name) or {}).get("number")

    def dt(name):
        d = (p.get(name) or {}).get("date")
        return _d(d["start"]) if d else None

    return {
        "title": "".join(t.get("plain_text", "") for t in (p.get("Job Title") or {}).get("title", [])).strip(),
        "company": text("Company"),
        "status": select("Status"),
        "found": dt("Date Found"),
        "applied": dt("Applied Date"),
        "interview": dt("Interview Date"),
        "fit": num("Fit Score"),
        "ats": num("ATS Score"),
        "tailored_ats": num("Tailored ATS Score"),
        "tailoring": select("Tailoring Status"),
        "resume": select("Best Fit Resume"),
        "remote": select("Remote Status"),
        "sources": [o["name"] for o in (p.get("Sources") or {}).get("multi_select", [])],
        "priority": bool((p.get("Priority") or {}).get("checkbox")),
        "url": page.get("url"),
    }


def stages(row):
    """'Ever reached' flags. Status is a current state (Archived rows may have
    been interviewed), so dates and status are combined, and later stages imply
    earlier ones to keep the funnel monotonic."""
    s = row["status"]
    offer = s in OFFER_STATUSES
    interview = offer or s in INTERVIEW_STATUSES or row["interview"] is not None
    applied = interview or s in APPLIED_STATUSES or row["applied"] is not None
    screened = applied or (s is not None and s != "Low Fit")
    return {"found": True, "screened": screened, "applied": applied,
            "interview": interview, "offer": offer}


def _pct(n, d):
    return round(100 * n / d, 1) if d else None


def _week_start(d):
    return d - timedelta(days=d.weekday())


def _group(rows, key_fn):
    out = defaultdict(lambda: {"found": 0, "applied": 0, "interview": 0})
    for r in rows:
        st = stages(r)
        for k in key_fn(r):
            g = out[k]
            g["found"] += 1
            g["applied"] += st["applied"]
            g["interview"] += st["interview"]
    res = []
    for k, g in out.items():
        res.append({"name": k, **g,
                    "apply_rate": _pct(g["applied"], g["found"]),
                    "interview_rate": _pct(g["interview"], g["applied"])})
    return sorted(res, key=lambda x: (-x["found"], x["name"]))


def compute(rows, today=None, weeks=12):
    today = today or date.today()
    total = len(rows)
    flags = [stages(r) for r in rows]

    counts = {k: sum(f[k] for f in flags) for k, _ in FUNNEL}
    funnel = []
    prev = None
    for k, label in FUNNEL:
        n = counts[k]
        funnel.append({"key": k, "label": label, "count": n,
                       "pct_of_found": _pct(n, total),
                       "step_conversion": None if prev is None else _pct(n, prev)})
        prev = n

    # Weekly activity (found / applied / interview), oldest -> newest.
    this_week = _week_start(today)
    week_starts = [this_week - timedelta(weeks=i) for i in range(weeks - 1, -1, -1)]
    series = {w: {"week": w.isoformat(), "found": 0, "applied": 0, "interview": 0} for w in week_starts}
    for r in rows:
        for key in ("found", "applied", "interview"):
            if r[key] and _week_start(r[key]) in series:
                series[_week_start(r[key])][key] += 1

    def in_last(days, key):
        cutoff = today - timedelta(days=days)
        return sum(1 for r in rows if r[key] and cutoff < r[key] <= today)

    # Speed: median days between stages, only where both dates exist.
    def gaps(a, b):
        g = [(r[b] - r[a]).days for r in rows if r[a] and r[b] and r[b] >= r[a]]
        return {"median_days": median(g) if g else None, "n": len(g)}

    fits = [r["fit"] for r in rows if r["fit"] is not None]
    buckets = Counter()
    for f in fits:
        buckets[min(int(f // 10) * 10, 90)] += 1
    fit_dist = [{"range": f"{b}-{b + 9}" if b < 90 else "90-100", "count": buckets.get(b, 0)}
                for b in range(40, 100, 10)]
    below40 = sum(c for b, c in buckets.items() if b < 40)
    if below40:
        fit_dist.insert(0, {"range": "<40", "count": below40})

    def avg(vals):
        vals = [v for v in vals if v is not None]
        return round(sum(vals) / len(vals), 1) if vals else None

    upcoming = sorted(
        ({"title": r["title"], "company": r["company"], "date": r["interview"].isoformat(), "url": r["url"]}
         for r in rows if r["interview"] and r["interview"] >= today),
        key=lambda x: x["date"])

    status_counts = Counter(r["status"] or "(no status)" for r in rows)
    tailoring = Counter(r["tailoring"] or "(none)" for r in rows)

    return {
        "generated_at": datetime.now().isoformat(timespec="seconds"),
        "today": today.isoformat(),
        "total": total,
        "funnel": funnel,
        "kpis": {
            "found_7d": in_last(7, "found"), "applied_7d": in_last(7, "applied"),
            "interviews_30d": in_last(30, "interview"),
            "apply_rate": _pct(counts["applied"], total),
            "interview_rate": _pct(counts["interview"], counts["applied"]),
            "offer_rate": _pct(counts["offer"], counts["interview"]),
            "in_review": status_counts.get("Reviewing", 0),
            "priority_open": sum(1 for r in rows if r["priority"] and r["status"] in ("Found", "Reviewing", "Applying")),
            "avg_fit": avg(fits), "avg_ats": avg(r["ats"] for r in rows),
            "avg_tailored_ats": avg(r["tailored_ats"] for r in rows),
        },
        "speed": {"found_to_applied": gaps("found", "applied"),
                  "applied_to_interview": gaps("applied", "interview")},
        "weekly": list(series.values()),
        "status": [{"name": k, "count": v} for k, v in status_counts.most_common()],
        "tailoring": [{"name": k, "count": v} for k, v in tailoring.most_common()],
        "fit_distribution": fit_dist,
        "by_source": _group(rows, lambda r: r["sources"] or ["(none)"]),
        "by_resume": _group(rows, lambda r: [r["resume"] or "(unassigned)"]),
        "by_remote": _group(rows, lambda r: [r["remote"] or "Unknown"]),
        "upcoming_interviews": upcoming,
        "data_quality": {
            "missing_found_date": sum(1 for r in rows if not r["found"]),
            "missing_status": status_counts.get("(no status)", 0),
            "interview_without_applied_date": sum(1 for r in rows if r["interview"] and not r["applied"]),
        },
    }
