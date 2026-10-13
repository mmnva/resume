import json
import os
import threading
import time
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

import metrics
import notion

STATIC = Path(__file__).parent / "static"
DB_ID = os.environ.get("NOTION_DATABASE_ID", "4a0d17da9ca74cf7ba78740c8839b4db")
TOKEN = os.environ.get("NOTION_TOKEN", "")
TTL = int(os.environ.get("CACHE_TTL_SECONDS", "300"))
FIXTURE = os.environ.get("FIXTURE_FILE")  # Notion-API-shaped JSON; offline demo/testing

_lock = threading.Lock()
_cache = {"at": 0.0, "data": None, "error": None}


def load_pages():
    if FIXTURE:
        return json.loads(Path(FIXTURE).read_text())["results"]
    if not TOKEN:
        raise RuntimeError("NOTION_TOKEN is not set (see README)")
    return notion.fetch_pages(DB_ID, TOKEN)


def get_metrics(force=False):
    with _lock:
        fresh = _cache["data"] and time.time() - _cache["at"] < TTL
        if force or not fresh:
            try:
                rows = [metrics.normalize(p) for p in load_pages()]
                _cache.update(at=time.time(), data=metrics.compute(rows), error=None)
            except Exception as e:  # keep serving stale data if a refresh fails
                _cache["error"] = str(e)
        return dict(_cache)


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *a, **kw):
        super().__init__(*a, directory=str(STATIC), **kw)

    def _json(self, code, obj):
        body = json.dumps(obj).encode()
        self.send_response(code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Cache-Control", "no-store")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        path, _, query = self.path.partition("?")
        if path == "/healthz":
            return self._json(200, {"ok": True})
        if path == "/api/metrics":
            c = get_metrics(force="refresh=1" in query)
            if c["data"] is None:
                return self._json(503, {"error": c["error"]})
            return self._json(200, {**c["data"], "stale_error": c["error"],
                                    "cache_age_s": int(time.time() - c["at"])})
        return super().do_GET()

    def log_message(self, fmt, *args):
        if "/healthz" not in (args[0] if args else ""):
            super().log_message(fmt, *args)


if __name__ == "__main__":
    port = int(os.environ.get("PORT", "8080"))
    print(f"Job pipeline dashboard on :{port} (fixture={FIXTURE or 'no'}, ttl={TTL}s)", flush=True)
    ThreadingHTTPServer(("0.0.0.0", port), Handler).serve_forever()
