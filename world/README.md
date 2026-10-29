# World: Raum, Masse und Elemente

Dieser Ordner ist die Standard-Welt des Hermes Office. Sie gilt bei "Plugin default icons", bei "Hermes agent avatars" und bei Sprites, wenn das Set keine eigene `world.json` mitbringt. Wie ein Set seine eigene Welt einhängt, steht in `../characters-readme.md` (Abschnitt 7). Diese Datei beschreibt die Masse, auf denen alles aufbaut.

Alle Masse sind CSS-Pixel bei 100 % Zoom. Ein Bild darf in höherer Auflösung geliefert werden (SVG ist ideal, bei PNG am besten das Doppelte oder Dreifache). Wichtig sind das Seitenverhältnis und die Lage der Inhalte im Bild.

## 1. Der Raum

```
+--------------------------------------------------------------+ -
|  WAND  (86 px hoch, Kachel wiederholt sich horizontal)       | 86
+--------------------------------------------------------------+ -
|                                                              |
|  BODEN  (Kachel wiederholt sich in beide Richtungen)         |
|    Schreibtische im Raster, Agenten stehen dahinter          |
|                                                              |
|  [ Streifen für Möbel: 150 px hoch, ganz unten ]             |
+--------------------------------------------------------------+
```

| Eigenschaft | Wert |
|---|---|
| Breite | passt sich dem Fenster an: Fensterbreite minus 36 px, höchstens **1242 px**. Der Boden ist mindestens 560 px breit, darunter scrollt der Raum. |
| Höhe | Wunschhöhe 690 px, höchstens 90 % von (Fensterhöhe minus 245 px), mindestens 162 px. Die Bodenfläche selbst ist mindestens **466 px** hoch (86 px Wand + 380 px). |
| Wand | feste Höhe **86 px**. Unter der Wand liegt ein 12 px hoher Schattenverlauf. |
| Boden | beginnt direkt unter der Wand (y = 86 px) und füllt den Rest. Der Boden-Hintergrund beginnt dort mit seiner Kachel. |
| Raumform | abgerundete Ecken (10 px), Rand und Schatten. Das Plugin zeichnet sie, nicht die Welt. |
| Perspektive | keine. Wand und Boden sind flach, damit Schreibtische und Sprites auf derselben Ebene stehen. |
| Nacht | automatisch eine dunkle Tönung (52 %) über Wand und Boden. Die Welt muss kein Nachtbild liefern. |

Wand und Boden sind **Kacheln**, kein Gesamtbild. Eine Kachel muss nahtlos sein, wenn sie sich wiederholt (Wand nur horizontal, Boden in beide Richtungen). Wer ein einziges grosses Wandbild will, setzt `wallSize` auf die Breite des Bildes und beachtet, dass der Raum bis 1242 px breit werden kann.

| Datei | Kachelgrösse (Standard) | Wiederholung |
|---|---|---|
| `wall.svg` | 160 × 86 px (`wallSize`) | horizontal. Höhe immer 86 px. |
| `floor.svg` | 96 × 96 px (`floorSize`) | horizontal und vertikal |

## 2. Der Schreibtisch

Die Schreibtische liegen in einem Raster. Spalten: so viele, wie mit mindestens 168 px pro Zelle passen. Die Zellen wachsen mit dem Fenster bis ungefähr 250 px, der Abstand dazwischen beträgt 18 bis 20 px.

| Teil | Wert |
|---|---|
| Zelle | 168 px bis rund 250 px breit |
| Tischplatte (`desk.svg`) | **Breite = Zellbreite minus 16 px** (also rund 152 bis 234 px), **Höhe 68 px** |
| Bild-Aufteilung | obere 34 px (50 %) = Tischplatte von oben gesehen, untere 34 px = Beine und Front |
| Verzerrung | das Bild wird auf die Breite gestreckt (`preserveAspectRatio="none"`). Ränder und Beine dürfen sich dehnen, runde Details sollten in der Mitte liegen. |
| Lage | Oberkante der Platte liegt 48 px unter dem Zellenanfang, 8 px Abstand links und rechts |
| Agent | steht hinter dem Tisch, die Füsse verschwinden hinter der Platte |

Das Beispiel [desk.svg](./desk.svg) hat `viewBox="0 0 120 68"`. Das Verhältnis ist nur ein Richtwert, weil die Breite variiert.

Auf dem Tisch liegen weitere Dinge, die der Code zeichnet: Monitor (58 × 40 px), Lampe und Namensschild. Der Monitor steht hinter dem Agenten oben auf der Platte.

## 3. Der Agent (zum Abgleich)

Damit eine Welt zu den Figuren passt:

| Teil | Wert |
|---|---|
| Sprite im Bild | wird als 42 × 42 px eingefügt und anschliessend um **2,73** vergrössert, wirkt also etwa **115 × 115 px**. Fusspunkt unten in der Mitte. |
| Wandporträt | Employee of the Month: Rahmen 64 × 64 px, Bild 72 × 72 px |
| Sprechblasen | über dem Kopf, rund 70 px über dem Sprite |

Eine Welt für grosse oder kleine Figuren (zum Beispiel Building Bricks oder Minecraft) sollte Tisch und Gegenstände darauf abstimmen. Der Tisch ist 68 px hoch. Ein 115-px-Sprite überragt ihn deutlich.

## 4. Gegenstände (`props/`)

Alle Gegenstände stecken in einem **quadratischen 42 × 42 px grossen Feld** und werden darin mit `object-fit: contain` zentriert. Sie sollten transparent sein und innerhalb des Bildes unten aufsetzen. Ausnahme ist `cooler.svg`.

| ID | Datei | Feld | Wo es steht | Hinweis |
|---|---|---|---|---|
| `coffee` | `coffee.svg` | 42 × 42 | Möbelstreifen, x 17 %, y 79 | steht auf einem vom Code gezeichneten Tresen (65 × 28 px) und ist 10 px nach oben versetzt |
| `fan` | `fan.svg` | 42 × 42 | Möbelstreifen, x 35 %, y 81 | |
| `chair` | `chair.svg` | 42 × 42 | Möbelstreifen, x 53 %, y 78 | wird auch bei einer Szene (Eis, Boss) verwendet |
| `bin` | `bin.svg` | 42 × 42 | Möbelstreifen, x 69 %, y 83 | |
| `cat` | `cat.svg` | 42 × 42 | Möbelstreifen, x 83 %, y 78 | |
| `certificate` | `certificate.svg` | 42 × 42 | x 12 %, y 63 | wird nach der ersten erledigten Aufgabe freigeschaltet |
| `aquarium` | `aquarium.svg` | 42 × 42 | x 31 %, y 65 | ab 5 Aufgaben |
| `button` | `button.svg` | 42 × 42 | x 66 %, y 67 | ab 10 Aufgaben |
| `pizza-box` | `pizza-box.svg` | 42 × 42 | x 83 %, y 63 | ab 20 Aufgaben |
| `mug` | `mug.svg` | 42 × 42 | auf dem Tisch, 35 % verkleinert | Schreibtisch-Andenken, bis zu drei Stück |
| `parcel` | `parcel.svg` | 42 × 42 | auf dem Tisch | Lieferung für den Agenten |
| `cooler` | `cooler.svg` | **22 × 52** | Wand, 46 px von links, 42 px von oben | hochformatig, nicht quadratisch |

Der Möbelstreifen (`office-life-scene`) ist 150 px hoch und liegt unten im Raum. Die Prozentwerte sind die Standardpositionen. Der Nutzer kann Möbel im Menü "Furnish" verschieben. Jedes Möbelstück belegt einen anklickbaren Bereich von **66 × 60 px**.

Die Gegenstände haben **keine Animation im Code**, wenn ein Bild gesetzt ist. Bewegung (zum Beispiel drehender Ventilator oder schwimmender Fisch) muss im SVG selbst stecken. Das Beispiel enthält das.

## 5. Was die Welt nicht liefert (noch im Code)

Folgendes ist weiterhin fest im Plugin gezeichnet und lässt sich über `world.json` nicht ersetzen:

| Element | Grösse |
|---|---|
| Monitor und Bildschirminhalt | 58 × 40 px |
| Fenster mit Sonne und Mond (folgt der Tageszeit) | 44 × 40 px, 24 % vom rechten Rand |
| Tischlampe (nachts) | 16 × 26 px |
| Tür | 54 × 78 px, bei 48 % von links |
| Pinnwand | 89 × 50 px, bei 20 % von links |
| Sofa und Teppich (Lounge) | 105 × 42 px, Teppich 34 % Breite |
| Bar (Tresen, Regal, Hocker) | Tresen 28 px hoch |
| Hüpfspiel (Hopscotch) | Felder auf dem Boden |
| Wanduhr (analog oder digital) | frei verschiebbar |
| Employee-of-the-Month-Rahmen | 64 × 64 px, goldener Rahmen |

## 6. Reicht das, um andere Welten zu bauen (Minecraft, Building Bricks, Star Wars)?

Für eine erste, einfache Variante reicht es: Wand, Boden, Tisch und die zwölf Gegenstände lassen sich komplett umgestalten. Ein Minecraft-Raum bekommt Blockboden und Blockwand, einen Holztisch, eine Truhe statt dem Papierkorb und so weiter.

Grenzen bei einer vollständig anderen Welt:

* **Fenster, Tür, Pinnwand, Sofa, Teppich, Lampe, Monitor, Hüpfspiel und Bar** bleiben Büro. In einem Weltraum- oder Burgraum würden sie auffallen. Dafür müssten sie als weitere Slots in `world.json` ausgelagert werden. Das ist möglich, aber noch nicht umgesetzt.
* **Die Namen der Gegenstände** (Kaffeemaschine, Katze, Papierkorb) stehen im Plugin. Wer in Minecraft eine Truhe als `bin` zeigt, behält die Beschriftung "Paper bin". Auch das liesse sich über `world.json` überschreiben.
* **Texte und Szenen** (Boss-Rundgang, Drucker, Pizza, Eisfläche) sind Büro-Szenen und bleiben es.
* **Farben der Oberfläche** (Chips, Sprechblasen, Menü) kommen vom Hermes-Theme, nicht von der Welt.

Für Building Bricks oder Star Wars empfehle ich daher: zuerst die vorhandenen Slots belegen (Wand, Boden, Tisch, zwölf Gegenstände) und dann entscheiden, welche der übrigen Büro-Elemente als zusätzliche Slots dazukommen sollen.
