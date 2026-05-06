"""Local dev server with aggressive no-cache headers on port 9090."""
import http.server

class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

if __name__ == "__main__":
    server = http.server.HTTPServer(("", 9090), NoCacheHandler)
    print("Serving on http://localhost:9090 (no-cache)")
    server.serve_forever()
