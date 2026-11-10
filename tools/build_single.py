#!/usr/bin/env python3
"""Bundle index.html + css + js into ONE self-contained file: yap-catalog.html.
That single file works on a phone, offline, or after uploading anywhere.

Usage:  python3 tools/build_single.py            -> yap-catalog.html
        python3 tools/build_single.py --fragment OUT.html   (no <html>/<head> wrapper)
"""
import pathlib, re, sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
html = (ROOT / "index.html").read_text(encoding="utf-8")
css = (ROOT / "css/styles.css").read_text(encoding="utf-8")
data = (ROOT / "js/data.js").read_text(encoding="utf-8")
app = (ROOT / "js/app.js").read_text(encoding="utf-8")

html = html.replace('<link rel="stylesheet" href="css/styles.css" />', f"<style>\n{css}\n</style>")
html = html.replace('<script src="js/data.js"></script>', f"<script>\n{data}\n</script>")
html = html.replace('<script src="js/app.js"></script>', f"<script>\n{app}\n</script>")
assert 'src="js/' not in html and 'href="css/' not in html, "an asset was not inlined"

if "--fragment" in sys.argv:
    out = pathlib.Path(sys.argv[sys.argv.index("--fragment") + 1])
    head = re.search(r"<head>(.*?)</head>", html, re.S).group(1)
    body = re.search(r"<body>(.*?)</body>", html, re.S).group(1)
    head = re.sub(r'\s*<meta (charset|name="viewport")[^>]*>', "", head)
    title = re.search(r"<title>.*?</title>", head).group(0)
    head = head.replace(title, "")
    meta = '<meta name="claude:viewport-fit-sides" content="cover">'
    out.write_text(f"{title}\n{meta}\n{head}\n{body}", encoding="utf-8")
else:
    out = ROOT / "yap-catalog.html"
    out.write_text(html, encoding="utf-8")
print("wrote", out)
