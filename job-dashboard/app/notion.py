"""Minimal Notion API client (stdlib only)."""
import json
import urllib.error
import urllib.request

API = "https://api.notion.com/v1"
VERSION = "2022-06-28"


def fetch_pages(database_id, token, timeout=30):
    pages, cursor = [], None
    while True:
        body = {"page_size": 100}
        if cursor:
            body["start_cursor"] = cursor
        req = urllib.request.Request(
            f"{API}/databases/{database_id}/query",
            data=json.dumps(body).encode(),
            headers={"Authorization": f"Bearer {token}", "Notion-Version": VERSION,
                     "Content-Type": "application/json"},
            method="POST")
        try:
            with urllib.request.urlopen(req, timeout=timeout) as resp:
                data = json.load(resp)
        except urllib.error.HTTPError as e:
            detail = e.read().decode(errors="replace")[:300]
            hint = {401: "token invalid", 404: "database not shared with the integration (Notion: ••• > Connections)"}.get(e.code, "")
            raise RuntimeError(f"Notion API {e.code} {hint}: {detail}") from None
        pages.extend(p for p in data["results"] if not p.get("archived") and not p.get("in_trash"))
        if not data.get("has_more"):
            return pages
        cursor = data["next_cursor"]
