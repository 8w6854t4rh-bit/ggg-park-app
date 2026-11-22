# GGG Park App

Lehrerparkplatz der **Geschwister-Graf-Gesamtschule** in 3D ansehen und mit dem eigenen Kennzeichen einen Stellplatz reservieren: vormittags (07–13 Uhr), nachmittags (13–18 Uhr) oder ganztags.

![App-Icon](icons/icon-192.png)

**App öffnen:** https://8w6854t4rh-bit.github.io/ggg-park-app/ (sobald GitHub Pages eingeschaltet ist, siehe unten)

## Funktionen

- 3D-Parkplatz mit 20 Stellplätzen (2 barrierefrei, 2 E-Ladeplätze), drehen, zoomen, Draufsicht
- Reservieren mit Kennzeichen (deutsches Format, wird automatisch richtig geschrieben)
- Zeitfenster Vormittag, Nachmittag, Ganztag; die nächsten 10 Schultage
- Keine Doppelbuchungen: ein Platz pro Zeitfenster nur einmal, ein Kennzeichen pro Zeitfenster nur einmal
- „Meine Reservierungen“ und Stornieren der eigenen Buchungen
- Installierbar als App auf Handy, Tablet und PC, startet auch offline

## App installieren

- **Android / Chrome / Edge:** Seite öffnen, unten in der App auf „GGG Park App installieren“ tippen (oder im Browser-Menü „App installieren“).
- **iPhone / iPad (Safari):** Seite öffnen, „Teilen“ antippen, dann „Zum Home-Bildschirm“.
- **PC (Chrome / Edge):** In der Adresszeile auf das Installieren-Symbol klicken.

Wer zusätzlich eine Datei für den Play Store oder Microsoft Store möchte: https://www.pwabuilder.com aufrufen, die App-Adresse eingeben und das Paket erzeugen lassen.

## Einmalig einrichten

### 1. GitHub Pages einschalten

Repository → **Settings** → **Pages** → *Source*: „Deploy from a branch“, *Branch*: `main`, Ordner `/ (root)` → **Save**. Nach ein bis zwei Minuten ist die App unter der Adresse oben erreichbar.

### 2. Gemeinsamen Online-Speicher anlegen (Supabase, kostenlos)

Ohne diesen Schritt läuft die App im **Probemodus**: Reservierungen bleiben auf dem jeweiligen Gerät.

1. Auf https://supabase.com ein kostenloses Konto und ein neues Projekt anlegen (Region z. B. Frankfurt).
2. Im Projekt **SQL Editor** → *New query* → Inhalt von [`supabase.sql`](supabase.sql) einfügen → **Run**.
3. **Project Settings** → **API**: „Project URL“ und den Schlüssel „anon public“ kopieren.
4. In [`config.js`](config.js) eintragen und speichern (direkt auf GitHub über das Stift-Symbol geht auch):
   ```js
   window.GGG_CONFIG = {
     supabaseUrl: "https://xxxx.supabase.co",
     supabaseAnonKey: "eyJ..."
   };
   ```

Danach sehen alle dieselben Reservierungen. Die App fragt einmal nach Name oder Kürzel, damit Kolleginnen und Kollegen sehen, wer auf welchem Platz steht. Stornieren kann jede Person nur ihre eigenen Buchungen (gebunden an das Gerät). Falsche Einträge kann die Schule im Supabase-Projekt unter **Table Editor → reservations** löschen.

Hinweis Datenschutz: Gespeichert werden Kennzeichen, der eingegebene Name bzw. das Kürzel, Platz, Datum und eine zufällige Geräte-Kennung. Vor dem echten Einsatz bitte mit der Schulleitung bzw. dem Datenschutzbeauftragten der Schule abstimmen.

## claude.ai-Fassung

Es gibt dieselbe App auch als Artefakt auf claude.ai. Dort läuft der gemeinsame Speicher über claude.ai, Kolleginnen und Kollegen brauchen dann ein claude.ai-Konto und müssen das Artefakt geteilt bekommen. Die Datei dafür entsteht beim Bauen unter `dist/claude-artefakt.html`.

## Entwicklung

- Quelltext: `src/app.html` (eine Datei, Vanilla-JS, 3D mit Three.js r128 aus `vendor/`)
- Bauen: `python3 build.py` erzeugt `index.html` (GitHub Pages) und `dist/claude-artefakt.html`. `index.html` nicht direkt bearbeiten.
- Bei jeder Veröffentlichung `VERSION` in `build.py` hochzählen, damit installierte Apps das Update holen.
- Icons neu erzeugen: `node tools/make_icons.js` (braucht Playwright). Vorlage: `tools/icon.html`.

Lizenzen: Three.js (MIT, `vendor/three-LICENSE.txt`), Schrift Bricolage Grotesque (SIL OFL, `tools/fonts/`).
