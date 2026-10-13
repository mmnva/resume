"""Build a Notion-API-shaped fixture matching the live DB's aggregate counts
(queried via Notion MCP on 2026-10-13): 327 rows; status counts below;
56 Applied Dates; 6 Interview Dates (5 Archived + 1 Interviewing)."""
import json
import sys
from datetime import date, timedelta


def page(i, status, found=None, applied=None, interview=None, fit=None, sources=("JobDataLake",),
         resume="Legal Ops / Legal Tech", tailoring=None):
    def d(v): return {"date": {"start": v.isoformat()}} if v else {"date": None}
    return {"id": f"id{i}", "url": f"https://notion.so/id{i}", "archived": False, "properties": {
        "Job Title": {"title": [{"plain_text": f"Role {i}"}]},
        "Company": {"rich_text": [{"plain_text": f"Co {i % 40}"}]},
        "Status": {"select": {"name": status} if status else None},
        "Date Found": d(found), "Applied Date": d(applied), "Interview Date": d(interview),
        "Fit Score": {"number": fit}, "ATS Score": {"number": 60 if fit else None},
        "Tailored ATS Score": {"number": 85 if tailoring == "Tailored" else None},
        "Tailoring Status": {"select": {"name": tailoring} if tailoring else None},
        "Best Fit Resume": {"select": {"name": resume}},
        "Remote Status": {"select": {"name": "Remote"}},
        "Sources": {"multi_select": [{"name": s} for s in sources]},
        "Priority": {"checkbox": i % 9 == 0}}}


def build(today=date(2026, 10, 13)):
    plan = [  # (status, n, n_with_applied, n_with_interview)
        ("Reviewing", 110, 2, 0), ("Low Fit", 94, 0, 0), ("Archived", 72, 15, 5),
        ("Applied", 37, 37, 0), (None, 6, 0, 0), ("Applying", 5, 1, 0),
        ("Withdrawn", 1, 0, 0), ("Interviewing", 1, 1, 1), ("Found", 1, 0, 0)]
    pages, i = [], 0
    for status, n, na, ni in plan:
        for k in range(n):
            i += 1
            found = None if i <= 11 else today - timedelta(days=(i * 7) % 140)
            applied = (found or today - timedelta(days=30)) + timedelta(days=3) if k < na else None
            interview = (applied + timedelta(days=9)) if k < ni else None
            src = ("Indeed", "Dice") if i % 5 == 0 else (("JobDataLake",) if i % 2 else ("Apify(LinkedIn)",))
            pages.append(page(i, status, found, applied, interview, fit=70 + i % 25 if status else None,
                              sources=src, tailoring="Tailored" if status == "Applied" and k < 6 else None))
    return {"results": pages, "has_more": False}


if __name__ == "__main__":
    json.dump(build(), open(sys.argv[1], "w"))
