#!/usr/bin/env python3
"""
Website ko apne computer par chalane ke liye:

    python3 tools/serve.py

Phir browser me http://localhost:8000 kholo.
Same Wi-Fi par phone se dekhna ho to jo "Phone par" wala link
print hoga woh phone ke browser me kholo.
"""
import http.server
import os
import socket
import socketserver
import sys
from pathlib import Path

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
os.chdir(Path(__file__).resolve().parent.parent)


def lan_ip() -> str:
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except OSError:
        return "localhost"


class Handler(http.server.SimpleHTTPRequestHandler):
    def send_error(self, code, message=None, explain=None):
        if code == 404 and Path("404.html").exists():
            self.send_response(404)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.end_headers()
            self.wfile.write(Path("404.html").read_bytes())
            return
        super().send_error(code, message, explain)


socketserver.TCPServer.allow_reuse_address = True
with socketserver.TCPServer(("0.0.0.0", PORT), Handler) as httpd:
    print(f"Computer par : http://localhost:{PORT}")
    print(f"Phone par    : http://{lan_ip()}:{PORT}  (same Wi-Fi)")
    print("Band karne ke liye Ctrl+C dabao.")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer band.")
