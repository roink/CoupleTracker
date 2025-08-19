# Paar-Zeit • GitHub Pages

Kleine Ein-Seiten-Website, die zeigt:
- wie viele **Tage** ihr bereits zusammen seid (groß dargestellt),
- welcher **Prozentanteil** deines Lebens das ist,
- an welchem Datum du **50 % deines Lebens** in der Partnerschaft erreicht hast (bzw. erreichen wirst),
- und ein **Countdown** bis zu diesem 50%-Datum.

## Daten anpassen

Öffne `script.js` und passe bei Bedarf die Konstanten oben im File an:

```js
const PARTNER_NAME = "NAME";
const BIRTH_YMD  = [1990, 1, 1];     // Jahr, Monat, Tag
const COUPLE_YMD = [2010, 1, 1];
```

> Die Berechnung geschieht über reine *Kalendertage* (UTC-Mitternacht), um Off-by-One-Probleme durch Zeitzonen und Sommerzeit zu vermeiden.

## Lokal testen

Einfach `index.html` im Browser öffnen.

## Veröffentlichung mit GitHub Pages (Benutzerseite)

1. Lege auf GitHub ein neues Repository an, dessen Name **`DEINNAME.github.io`** ist. Beispiel: `benutzername.github.io`.
2. Lade die Dateien `index.html`, `style.css`, `script.js` (und optional `README.md`) ins Repo (über Web-UI oder per Git).
3. Öffne **Settings → Pages** und stelle unter *Build and deployment* „**Deploy from a branch**“, Branch `main`, Ordner `/ (root)` ein. Speichern.
4. Rufe anschließend `https://DEINNAME.github.io` im Browser auf.

## Veröffentlichung als Projektseite (Alternative)

Wenn du kein Benutzerseiten-Repo anlegen willst:

1. Lege ein normales Repo an, z. B. `paar-zeit`.
2. Lade die Dateien hoch.
3. **Settings → Pages** → *Build and deployment* „Deploy from a branch“ → Branch `main`, Ordner `/ (root)` (oder `docs/`, wenn du die Dateien dort ablegst). Speichern.
4. Die Seite ist dann unter `https://DEINNAME.github.io/paar-zeit/` erreichbar.

## Lizenz

MIT
