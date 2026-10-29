# Characters: Sprites für das Hermes Office Plugin

Das Verzeichnis `characters/` enthält alle Sprite-Sets (Figuren), die das Office-Plugin auf den Schreibtischen und beim Herumlaufen anzeigt. Diese Datei beschreibt nur den Mechanismus. Wie eine bestimmte Figur aussieht und erzeugt wird, steht in der Konzeptdatei des jeweiligen Sets.

## 1. Grundprinzip

* Ein **Set** (Character) ist ein Unterordner von `characters/` mit eigener `sprites.json` und den zugehörigen Bilddateien.
* Innerhalb eines Sets gibt es **Farben**. Eine Farbe ist eine Variante derselben Figur mit identischen Moods.
* Sprites sind weder an Agentennamen noch an feste Rollen gebunden. Im Office-Menü **Sprites** wählt man pro Agent ein Set und eine Farbe. Die Wahl wird gespeichert. Wird unter **World** eine Welt gewählt, deren zugehöriges Character-Set geladen ist, verwendet jeder Agent automatisch dieses Set; die Farbwahl bleibt erhalten, sofern die Farbe im Set verfügbar ist.
* Ein neues Set wird einfach als Ordner hineinkopiert und nach **Reload** im Menü angeboten. Am Plugin muss nichts geändert werden.

## 2. Ordnerstruktur

```
characters/
  characters-readme.md          <- diese Datei
  <set-a>/                      <- ein Set, Ordnername = Set-ID
    sprites.json                <- Konfiguration dieses Sets
    <farbe>_<mood>.gif          <- Sprites, eine Datei pro Farbe und Mood
    …
    _unused/                    <- wird ignoriert
  <set-b>/
    sprites.json
    …
```

* Jeder Unterordner mit einer `sprites.json` und mindestens einem Sprite zählt als Set. Sets werden alphabetisch nach Ordnername geladen; das erste ist der Standard für Agenten ohne gespeicherte Wahl.
* Ordner, die mit `_` oder `.` beginnen, werden übersprungen. Dort kann man Entwürfe und alte Dateien ablegen.
* Lässt sich ein Set nicht laden (fehlende oder fehlerhafte `sprites.json`, keine Sprites), wird es übersprungen. Der Grund steht im Statustext des Sprites-Menüs.

## 3. Dateinamen

`<farbe>_<mood>.<endung>` mit der Endung `gif`, `png`, `webp`, `apng`, `jpg` oder `jpeg`.

* **Farbe:** das erste Wort vor dem ersten `_` oder `-`. Jede so gefundene Farbe ist automatisch wählbar, auch ohne Eintrag in `sprites.json`.
* **Mood:** der Mood-Schlüssel (siehe Abschnitt 4) oder einer seiner Aliase aus `aliases`. Gross-/Kleinschreibung und `-` statt `_` spielen keine Rolle.
* Gibt es für einen Mood mehrere passende Dateien, gewinnt der exakte Mood-Name vor dem ersten Alias, dieser vor dem nächsten.

Beispiel: `red_idle.gif`, `red_thinking.gif` (Alias von `think`), `red_move_front.gif` (Alias von `walkfront`).

## 4. Moods

Das Plugin kennt dreizehn Moods. Jeder ist optional.

| Schlüssel | Wann das Plugin ihn zeigt |
|---|---|
| `idle` | Ruhezustand, Grundsprite und Fallback für alles Fehlende |
| `think` | Agent denkt (Reasoning) |
| `peek` | Agent ruft Tools auf |
| `held` | Agent wird mit der Maus gehalten oder gezogen |
| `failed` | Aufgabe ist fehlgeschlagen |
| `sleep` | Agent schläft (Nachtruhe, Standby) |
| `pet` | Agent wird gestreichelt |
| `clap` | Erfolg, Jubel, Prost |
| `stretch` | Strecken oder Gähnen |
| `shy` | Erschrocken oder verlegen |
| `bored` | Langeweile (zeigt das `idle`-Sprite) |
| `walkfront` | Bewegung auf den Betrachter zu (Ziel liegt weiter unten) |
| `walkback` | Bewegung vom Betrachter weg (Ziel liegt weiter oben) |

Fehlt ein Mood, greift diese Reihenfolge: Datei der Farbe, dann `fallback` des Sets, dann das `idle`-Sprite der Farbe, dann `default` des Sets. `failed` nimmt zuerst `failed`, dann `held`.

Bewegungs-Sprites (`walkfront`, `walkback`) werden vorab geladen. Der Agent startet erst los, wenn sie bereit sind. Alle anderen Sprites starten beim Laden der Seite zeitversetzt (0–1000 ms pro Agent).

## 5. sprites.json eines Sets

Alle Schlüssel sind optional. Ohne Datei oder mit ungültigem JSON wird das Set nicht geladen.

```json
{
  "name": "Anzeigename des Sets",
  "colors": {
    "red": { "label": "Rot", "swatch": "#ef4444", "files": { "idle": "special_idle.gif" } }
  },
  "aliases": {
    "think": ["think", "thinking"],
    "walkfront": ["walkfront", "move_front"]
  },
  "fallback": { "shy": "think" },
  "default": { "idle": "default.gif" },
  "suggest": { "agentenname": "red" }
}
```

| Schlüssel | Bedeutung |
|---|---|
| `name` | Name im Dropdown. Ohne Angabe gilt der Ordnername. |
| `colors` | Pro Farbe `label` (Anzeigename), `swatch` (Farbwert, wird auch als Akzentfarbe des Agenten benutzt) und optional `files` (einzelne Moods explizit auf Dateien legen). Farben, die nur als Dateien existieren, brauchen keinen Eintrag. Dann ist das Label der grossgeschriebene Farbname und der Farbwert ein neutrales Violett. |
| `aliases` | Pro Mood die Dateiendungen, die zusätzlich gelten (erster Eintrag hat Vorrang). Ergänzt oder überschreibt die Standard-Aliase des Plugins. |
| `fallback` | `{ "fehlender-mood": "ersatz-mood" }`. Wird genutzt, wenn eine Farbe den Mood nicht hat, aber den Ersatz-Mood. |
| `default` | Sprites pro Mood, die für jede Farbe gelten, der die Datei fehlt. Pfade sind relativ zum Set-Ordner. |
| `suggest` | Nur die **Startfarbe** für Agenten ohne gespeicherte Wahl (Agentenname → Farbe). Die Wahl im Menü hat immer Vorrang. Ohne Eintrag wird die Farbe aus dem Agentennamen abgeleitet. |

Die Standard-Aliase des Plugins gelten für jedes Set, auch ohne `aliases`:

| Mood | Akzeptierte Endungen |
|---|---|
| `think` | `think`, `thinking` |
| `peek` | `peek`, `working` |
| `clap` | `clap`, `success` |
| `pet` | `pet`, `success` |
| `held` | `held`, `alert` |
| `failed` | `failed`, `alert` |
| `walkfront` | `walkfront`, `move_front` |
| `walkback` | `walkback`, `move_back` |

## 6. Technische Anforderungen an Sprites

* Quadratisch, 128–512 px, transparenter Hintergrund (Alpha). Animiertes GIF, APNG oder WebP als nahtlose Schleife; Standbilder (PNG, JPG) funktionieren ebenfalls.
* **Alle Moods und alle Farben eines Sets müssen dasselbe Bildformat, denselben Massstab und dieselbe Grundlinie haben.** Das Plugin skaliert jedes Sprite gleich. Weicht der Massstab ab, wirkt die Figur beim Moodwechsel grösser oder kleiner.
* Ein Sprite enthält nur die Figur: keine Möbel, Schatten oder Hintergründe. Schreibtisch und Szene liefert das Office.
* Die Sprites werden beim Start in den Speicher geladen. Änderungen an Dateien werden nach **Reload** im Sprites-Menü übernommen.

## 7. Welt (optional)

Die „Welt“ ist alles, was im Büro nicht der Agent ist: Wand, Boden, Schreibtisch, Wasserspender und die Möbel und Gegenstände (Kaffeemaschine, Ventilator, Stuhl, Papierkorb, Katze, Urkunde, Aquarium, roter Knopf, Pizzakarton, Tasse, Paket). Sie liegt nicht im Set, sondern in einem eigenen Ordner:

* `world/` im Plugin-Hauptordner (neben `characters/`) ist die **Standard-Welt**. Sie gilt bei "Plugin default icons", bei "Hermes agent avatars" und bei Sprites, wenn für das Set keine eigene Welt gewählt ist.
* Jeder Ordner unter `characters/` kann genau eine eigene Welt im Ordner `characters/<set>/world/` haben (`world.json` und die zugehörigen Bilder). Sie wird unabhängig von `sprites.json` oder Sprite-Dateien eingelesen und erscheint im Sprites-Menü unter **World** (nur bei "Sprite GIFs"), beschriftet als "Set: Weltname". Ist auch das Character-Set dieses Ordners geladen, schaltet die World-Auswahl für alle Agenten automatisch auf dieses Sprite-Set um. Eine Welt muss nur ersetzen, was sie anders haben will. Alles andere kommt aus `world/`.
* Fehlt eine Datei oder ein Slot, benutzt das Plugin seine eingebaute Version.

```
world/
  world.json
  wall.svg  floor.svg  desk.svg
  props/
    coffee.svg  fan.svg  chair.svg  bin.svg  cat.svg  certificate.svg
    aquarium.svg  button.svg  pizza-box.svg  mug.svg  parcel.svg  cooler.svg
```

```json
{
  "name": "Default office",
  "wall": "wall.svg",
  "wallSize": "160px 86px",
  "wallColor": "#ebe2d1",
  "floor": "floor.svg",
  "floorSize": "96px 96px",
  "floorColor": "#587e8f",
  "desk": "desk.svg",
  "props": { "cat": "props/cat.svg", "cooler": "props/cooler.svg" }
}
```

| Schlüssel | Bedeutung |
|---|---|
| `name` | Anzeigename im Menü |
| `wall` | Kachel für das Wandband, wird horizontal wiederholt. Die Wand ist 86 px hoch, die Kachel sollte genauso hoch sein. |
| `floor` | nahtlose Kachel, wird in beide Richtungen wiederholt |
| `wallSize` / `floorSize` | Darstellungsgrösse der Kacheln (CSS) |
| `wallColor` / `floorColor` | Farbe unter den Kacheln |
| `desk` | Schreibtisch (Platte, Beine, Tastatur) als ein Bild. Höhe 68 px, Breite = Zellbreite minus 16 px (rund 152–234 px), die Bildbreite wird gestreckt. Obere 50 % = Tischplatte, untere 50 % = Beine. Masse im Detail in `world/README.md`. |
| `props` | Gegenstände nach ID. Jedes Bild ist quadratisch (42 × 42, `cooler` 22 × 52), transparent und wird mit `object-fit: contain` eingepasst. |

Die Prop-IDs: `coffee`, `fan`, `chair`, `bin`, `cat`, `certificate`, `aquarium`, `button`, `pizza-box`, `mug`, `parcel`, `cooler`.

* Alle Schlüssel sind optional. Eine Welt braucht mindestens ein Bild.
* Format: SVG, PNG, GIF oder WebP. SVG darf animiert sein (zum Beispiel der Ventilator oder der Fisch).
* Flach, ohne Perspektive, weil Schreibtische und Sprites auf derselben Ebene stehen. Nachts legt das Plugin automatisch eine dunkle Tönung auf Wand und Boden.
* Was weiterhin im Code steckt: Monitor (zeigt live Inhalt), Fenster mit Sonne und Mond (folgt der Tageszeit), Lampe, Hüpfspiel, Tafel und Tür. Position, Verhalten und Animation der Gegenstände (Katze, Kaffeemaschine und so weiter) bleiben ebenfalls im Plugin. Die Welt ändert nur ihr Aussehen.

## 8. Neues Set anlegen

1. Ordner unter `characters/` anlegen (der Name ist die Set-ID).
2. Sprites als `<farbe>_<mood>.gif` hineinlegen.
3. `sprites.json` mit mindestens `name` anlegen.
4. Optional: `world/world.json` mit eigenen Bildern für Wand, Boden, Schreibtisch und Gegenstände (Struktur wie `world/`).
5. Im Office **Sprites → Reload** drücken.
6. Im Dropdown **World** optional eine Welt wählen; das zugehörige geladene Character-Set wird dann automatisch für alle Agenten verwendet. Bei **Default** Set und Farbe pro Agent auswählen.
7. Optional eine Konzeptdatei neben die `sprites.json` legen (zum Beispiel `<set>_concept_readme.md`), die beschreibt, wie die Figur gebaut und die Sprites erzeugt werden.