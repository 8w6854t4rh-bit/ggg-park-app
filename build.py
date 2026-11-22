#!/usr/bin/env python3
"""Baut aus src/app.html zwei Fassungen:
- index.html: installierbare Web-App für GitHub Pages (Manifest, Icons, Offline-Speicher)
- dist/claude-artefakt.html: Fassung für das claude.ai-Artefakt (Three.js vom CDN, ohne PWA-Teile)
Aufruf: python3 build.py
"""
from pathlib import Path
import re

ROOT = Path(__file__).parent
VERSION = "ggg-park-v1"  # bei jeder Veröffentlichung hochzählen, sonst holen installierte Apps das Update nicht

src = (ROOT / "src" / "app.html").read_text(encoding="utf-8")

pwa_head = """<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="theme-color" content="#ff5b2e">
<meta name="description" content="Lehrerparkplatz der Geschwister-Graf-Gesamtschule in 3D ansehen und mit Kennzeichen reservieren.">
<link rel="manifest" href="manifest.webmanifest">
<link rel="icon" type="image/png" sizes="32x32" href="icons/favicon-32.png">
<link rel="apple-touch-icon" href="icons/apple-touch-icon.png">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="GGG Park">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<script>window.GGG_PWA=true;</script>
<script src="config.js"></script>
</head>
<body>
"""
pwa_tail = """
<script>
if("serviceWorker" in navigator){window.addEventListener("load",()=>navigator.serviceWorker.register("sw.js").catch(()=>{}))}
</script>
</body>
</html>
"""
pwa = pwa_head + src.replace("<!--THREE-->", '<script src="vendor/three.min.js"></script>') + pwa_tail
(ROOT / "index.html").write_text(pwa, encoding="utf-8")

art = src.replace("<!--THREE-->", '<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>')
(ROOT / "dist").mkdir(exist_ok=True)
(ROOT / "dist" / "claude-artefakt.html").write_text(art, encoding="utf-8")

sw = ROOT / "sw.js"
sw.write_text(re.sub(r'const VERSION="[^"]*"', f'const VERSION="{VERSION}"', sw.read_text(encoding="utf-8")), encoding="utf-8")
print("gebaut:", VERSION)
