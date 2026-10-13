import json
import os
import sys
import threading
import unittest
import urllib.request
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "app"))
sys.path.insert(0, str(ROOT / "tests"))
import make_fixture  # noqa: E402
import metrics  # noqa: E402

TODAY = date(2026, 10, 13)


def row(**kw):
    base = {"title": "t", "company": "c", "status": "Reviewing", "found": TODAY, "applied": None,
            "interview": None, "fit": 80, "ats": 60, "tailored_ats": None, "tailoring": None,
            "resume": None, "remote": None, "sources": [], "priority": False, "url": "u"}
    base.update(kw)
    return base


class Stages(unittest.TestCase):
    def test_low_fit_not_screened(self):
        self.assertFalse(metrics.stages(row(status="Low Fit"))["screened"])

    def test_archived_with_dates_counts_as_interviewed_and_applied(self):
        s = metrics.stages(row(status="Archived", applied=TODAY, interview=TODAY))
        self.assertTrue(s["applied"] and s["interview"] and s["screened"])

    def test_interview_date_alone_implies_applied(self):
        s = metrics.stages(row(status="Archived", interview=TODAY))
        self.assertTrue(s["applied"])

    def test_archived_without_dates_stays_at_found(self):
        s = metrics.stages(row(status="Archived"))
        self.assertFalse(s["applied"] or s["interview"])

    def test_offer_implies_all(self):
        s = metrics.stages(row(status="Accepted"))
        self.assertTrue(all(s.values()))

    def test_null_status_not_screened(self):
        self.assertFalse(metrics.stages(row(status=None))["screened"])


class GroundTruth(unittest.TestCase):
    """Fixture mirrors counts queried from the live Notion DB."""

    @classmethod
    def setUpClass(cls):
        rows = [metrics.normalize(p) for p in make_fixture.build(TODAY)["results"]]
        cls.d = metrics.compute(rows, today=TODAY)

    def test_funnel_counts(self):
        c = {f["key"]: f["count"] for f in self.d["funnel"]}
        self.assertEqual(c, {"found": 327, "screened": 227, "applied": 56, "interview": 6, "offer": 0})

    def test_funnel_monotonic(self):
        c = [f["count"] for f in self.d["funnel"]]
        self.assertEqual(c, sorted(c, reverse=True))

    def test_conversions(self):
        self.assertEqual(self.d["kpis"]["interview_rate"], round(100 * 6 / 56, 1))
        self.assertEqual(self.d["funnel"][2]["step_conversion"], round(100 * 56 / 227, 1))
        self.assertEqual(self.d["kpis"]["offer_rate"], 0.0)

    def test_status_breakdown_sums_to_total(self):
        self.assertEqual(sum(s["count"] for s in self.d["status"]), 327)

    def test_data_quality(self):
        self.assertEqual(self.d["data_quality"]["missing_found_date"], 11)
        self.assertEqual(self.d["data_quality"]["missing_status"], 6)

    def test_weekly_has_12_buckets(self):
        self.assertEqual(len(self.d["weekly"]), 12)

    def test_speed_medians(self):
        self.assertEqual(self.d["speed"]["applied_to_interview"]["median_days"], 9)


class Edge(unittest.TestCase):
    def test_empty(self):
        d = metrics.compute([], today=TODAY)
        self.assertEqual(d["total"], 0)
        self.assertIsNone(d["kpis"]["apply_rate"])

    def test_multi_source_counted_under_each(self):
        d = metrics.compute([row(sources=["Indeed", "Dice"])], today=TODAY)
        self.assertEqual({s["name"] for s in d["by_source"]}, {"Indeed", "Dice"})

    def test_upcoming_only_future(self):
        rows = [row(interview=date(2026, 10, 20)), row(interview=date(2026, 9, 1), status="Archived")]
        self.assertEqual(len(metrics.compute(rows, today=TODAY)["upcoming_interviews"]), 1)


class HttpServer(unittest.TestCase):
    def test_endpoints(self):
        fx = ROOT / "tests" / "_fx.json"
        fx.write_text(json.dumps(make_fixture.build()))
        os.environ["FIXTURE_FILE"] = str(fx)
        import server
        server.FIXTURE = str(fx)
        srv = server.ThreadingHTTPServer(("127.0.0.1", 0), server.Handler)
        threading.Thread(target=srv.serve_forever, daemon=True).start()
        base = f"http://127.0.0.1:{srv.server_address[1]}"
        try:
            self.assertEqual(json.load(urllib.request.urlopen(base + "/healthz"))["ok"], True)
            m = json.load(urllib.request.urlopen(base + "/api/metrics"))
            self.assertEqual(m["total"], 327)
            html = urllib.request.urlopen(base + "/").read().decode()
            self.assertIn("Job Pipeline", html)
        finally:
            srv.shutdown()
            fx.unlink()


if __name__ == "__main__":
    unittest.main()
