# GGG Park App – Hinweise für Claude

Parkplatz-Reservierung für die Lehrkräfte der Geschwister-Graf-Gesamtschule. Hat nichts mit Exam Buddy zu tun: das Repository `exam-buddy` nie anfassen.

- Quelle ist `src/app.html`; `python3 build.py` erzeugt `index.html` (GitHub Pages, PWA) und `dist/claude-artefakt.html` (claude.ai-Artefakt „GGG Park App“, Speicher über `db`, `user`, `room`).
- Speicher-Reihenfolge in der App: claude.ai-`db` → Supabase aus `config.js` → lokaler Probemodus.
- Bei jeder Veröffentlichung `VERSION` in `build.py` hochzählen.
- Texte auf Deutsch, Sie-Form. Keine echten Kennzeichen oder Personen als Beispiele.
