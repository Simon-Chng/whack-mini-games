#!/usr/bin/env python3

from __future__ import annotations

import http.server
import socketserver
import threading
import time
import webbrowser
from pathlib import Path

HOST = "127.0.0.1"
PORT = 8000


class ReusableTCPServer(socketserver.TCPServer):
    allow_reuse_address = True


def main() -> None:
    root = Path(__file__).resolve().parent

    if not (root / "index.html").exists():
        raise SystemExit("index.html not found.")

    handler = lambda *args, **kwargs: http.server.SimpleHTTPRequestHandler(
        *args,
        directory=str(root),
        **kwargs,
    )

    url = f"http://{HOST}:{PORT}/index.html"

    with ReusableTCPServer((HOST, PORT), handler) as server:
        print(f"Serving: {url}")
        print("Press Ctrl+C to stop.")

        threading.Thread(
            target=lambda: (time.sleep(0.5), webbrowser.open(url)),
            daemon=True,
        ).start()

        try:
            server.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.")


if __name__ == "__main__":
    main()
