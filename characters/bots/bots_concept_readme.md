# **Hermes AI Office Plugin: Bot-Sprite & Animations-Konzept (512px GIFs)**

Spezifikation zur Generierung, Modellierung und Implementierung der animierten Agenten-Avatare im Hermes AI Office Plugin (512x512px transparent GIFs).

# **1\. Übersicht & Technische Spezifikationen**

* **Format:** Animiertes GIF (Seamless Loop) mit transparentem Hintergrund (Alpha-Channel).
* **Auflösung:** 512 × 512 Pixel (quadratisches 1:1 Format).
* **Bildaufbau (fixer Kamera-Rahmen, in allen Renders identisch):** Feste, weite Ganzkörper-Kamera, fixierter Kameraabstand und **identischer Massstab in allen Renders**. Der Roboter füllt vom Fuss bis zur Oberkante des Helms exakt **70 % der Bildhöhe**; die Füsse stehen auf einer fixen Grundlinie **10 % über dem unteren Bildrand**; darüber bleiben **20 % leere Kopffreiheit**. Damit steht der Roboter auf der festen Standlinie, und alle Bots bzw. alle Moods sind deckungsgleich skalierbar. Die 20 % Kopffreiheit bleiben dauerhaft leer und dienen als Puffer, damit kein Mood und kein Symbol die obere Bildkante berührt; die Symbolik sitzt daneben auf Kopfhöhe (Abschnitt 3.1). Der Roboter wird also bewusst kleiner gerendert, nicht formatfüllend. Kopf bis Fuss müssen vollständig sichtbar bleiben.
* **Stil-Referenz (deutsche Fassung der verbindlichen Basisbeschreibung; englischer Wortlaut in Abschnitt 2):** Niedlicher, chibi-proportionierter Zukunftsroboter, zentriert stehend auf reinweissem Hintergrund. Überdimensionaler, abgerundeter, glänzend weisser Helm mit feiner Nahtlinie über den Oberkopf und kreisrunden, dunkelgrauen Ohr-Pods an den Seiten, die in **\[FARBE\]** leuchten. Vertieftes, glänzend schwarzes Visier als Gesichtsfläche mit leuchtendem **\[FARBE\]** Innenrand und zwei grossen, kreisrunden, in **\[FARBE\]** leuchtenden Kamera-Linsen-Augen mit konzentrischen Iris-Ringen — **kein Mund**. Kompakte weisse Brustplatte mit zwei winzigen **\[FARBE\]** LED-Punkten, dunkelgraue metallische Taille mit einem kleinen leuchtenden **\[FARBE\]** Kreis. Freiliegende, komplexe dunkle Metallgelenke an Schultern, Ellbogen, Hüften und Knien mit sichtbaren dunklen Kabeln und feinen **\[FARBE\]** Lichtern. Gegliederte dunkle Roboterhände mit fein ausgearbeiteten mechanischen Fingern und leuchtenden **\[FARBE\]** Akzenten. Robust gepanzerte weisse Beine und breite, runde Stiefel mit leuchtenden **\[FARBE\]** LED-Streifen am Fussansatz. Studio-Beleuchtung, Octane-Render, hohe Detailtiefe, freigestellter Umriss (isolated cutout).
* **Farbregel:** Farbe trägt der Bot ausschliesslich über seine **Leucht-Elemente**: Ohr-Pods, Innenrand des Visiers, Kamera-Linsen-Augen, die zwei Brust-LEDs, der Kreis auf der Taille, die feinen Lichter an Gelenken und Händen sowie die LED-Streifen an den Stiefeln. Diese Elemente leuchten bei jedem Bot in **einer** intensiven, gesättigten Farbe — dem Platzhalter \[FARBE\] aus der Basisbeschreibung (Abschnitt 3.2). Weiss und neutral bleiben bei **allen** Agenten Helm, Brustplatte, Beine und Stiefel — der Helm ist nie Farbträger; dunkelgrau-metallisch bleiben Taille, Gelenke, Hände und Kabel. **Kein Pastell-Anstrich des ganzen Körpers, keine zweite Farbe im Bild.**
* **Hintergrund — strikt verboten:** Der Roboter wird **isoliert auf vollständig transparentem Hintergrund** gerendert. Es darf **kein einziges** weiteres Objekt im Bild sein: keine Räume, Wände, Böden, Decken, keine Möbel, keine Tische oder Schreibtische, keine Stühle, keine Monitore, Bildschirme, PCs oder Tastaturen, keine Lampen, Pflanzen, Kabel, Teppiche, keine Deko, Requisiten oder abgelegten Gegenstände, kein Bodenschatten und keine Standfläche. Grund: Die Agenten werden in einer **bestehenden Office-Szene** animiert umherbewegt, die Schreibtische und Hintergrund bereits mitbringt. Alles, was der Sprite zusätzlich mitbringt, steht doppelt im Bild und macht das Sprite unbrauchbar. Wenn ein Mood „am Schreibtisch arbeitend" zeigt, liefert die Office-Szene den Schreibtisch — der Sprite zeigt nur die passende Körperhaltung und Geste dazu, ohne Möbel und ohne Geräte.
* **Accessoires:** Accessoires sind erlaubt, solange sie **der Roboter selbst am Körper trägt** (Antenne, Werkzeuggürtel, Kopfhörer, Smart-Brille, Headset, Brust-Emblem). Sie gehören zum Charakter, nicht zur Szene. Zusätzliche Requisiten neben oder vor dem Bot sind verboten.
* **Symbolik — erwünscht:** Sterne, Funken, Punkte, Ausrufezeichen, Fragezeichen, Denk-, Seufzer- oder Sprechwolken und Herzen sind zulässig und sollen genutzt werden, wo sie den Mood tragen. Regeln: **intensive, gesättigte Farbe** (nie blass), Grösse **markant und augenfällig** (bei 512 px auch verkleinert noch klar erkennbar), Position **neben dem Kopf auf Schläfen-, Ohren- oder Wangenhöhe** — nie über die Helmoberkante hinaus und den Kopf nie verdeckend; Symbole dürfen die Figur nie höher machen als der Kopf, sonst bricht der Grössen-Lock. Bewegung immer **sanft und langsam** — schwebend, pulsierend oder aufsteigend, im Takt des Seamless Loop. Kein Flackern, kein Springen, kein Zappeln.
* **Audio:** Es soll keine Musik oder Hintergrund-Audio generiert werden (reine visuelle GIFs).

# **2\. Basisbeschreibung des Roboters (Master-Template für alle Bots)**

Dieser englische Prompt definiert Form, Material und Proportionen des Roboters für alle Agenten. Der Platzhalter \[FARBE\] wird pro Farbe ersetzt (zum Beispiel Cyan, siehe Abschnitt 3.2) — alle übrigen Leuchtstellen bleiben Leuchtstellen, nur der Farbton wechselt. Am Wortlaut wird sonst nichts geändert; der Roboter ist bei allen Bots dieselbe Figur. Der mood-spezifische Zusatz aus Abschnitt 3.1 wird angehängt.

**Regel für Änderungen (René, 22.10.2026):** Der englische Prompt unten ist die **einzige** Prompt-Quelle. Jede Generierung nimmt ihn wörtlich und unverändert und ersetzt nur \[FARBE\]. Die deutsche Beschreibung in Abschnitt 1, 3.1 und 3.2 ist die Übersetzung dazu und wird bei **jeder** Änderung am englischen Wortlaut mitgezogen — sie darf nicht hinterherlaufen (das war der Fehler beim neutralen Bot: der englische Prompt war weiter, die deutsche Anleitung beschrieb noch die alte Figur, und es entstand ein fremder, zu breiter Bot). Der englische Wortlaut wird umgekehrt nie aus dem Deutschen abgeleitet.

**Default-Bot:** Es gibt keine zweite Figur und keine Ausnahme. Auch der neutrale Default (`characters/bots/bot-default-base.gif` samt Standbild `characters/bots/bot-default-base.png`) wird aus **dieser** Basisbeschreibung erzeugt — derselbe schlanke Roboter, nur ohne Mood-Zusatz, nur mit ruhigem Atmen. Figuren aus älteren Assets, die dieser Beschreibung nicht entsprechen, werden nicht verwendet, auch nicht als Startbild.

Full body 3D character render of a cute chibi-proportioned futuristic robot standing centered on a pure white background. Fixed wide full-body camera framing, locked camera distance, identical character scale across all renders: the robot's body from feet to top of helmet occupies exactly 70% of the canvas height, feet planted on a fixed bottom baseline at 10% from the bottom edge, leaving 20% empty white headroom above the helmet. Oversized rounded glossy white helmet head with a subtle top seam line and circular dark grey side ear-pods glowing [FARBE]. Recessed glossy black visor screen face with a glowing [FARBE] inner rim, featuring two large circular glowing [FARBE] camera-lens eyes with concentric iris rings, no mouth. Compact white chest plate with two tiny [FARBE] LED dots, dark grey metallic waist with a small glowing [FARBE] circle. Exposed complex dark metallic mechanical joints at shoulders, elbows, hips, and knees with visible dark cables and subtle [FARBE] lights. Articulated dark metallic robotic hands with intricate mechanical fingers and glowing [FARBE] accents. Sturdy white armored legs and wide rounded boots with glowing [FARBE] LED strips at the toe base. Studio lighting, Octane render, high detail, isolated cutout.

# **3\. Moods, Farben & Accessoires**

## **3\.1 Mood-Tabelle (gilt für alle Bots)**

Die dreizehn Moods sind bei allen Agenten identisch: gleiche Bewegung, gleicher englischer Prompt-Zusatz. Der englische Mood-Name ist zugleich der Schlüssel in `sprites.json` (../characters-readme.md, Abschnitt 4) und beschreibt die Stimmung bereits selbst.

**Grössen-Lock (gilt für alle Moods):** Jeder Mood-Zusatz beginnt mit `full body` + Ansicht (`front view` / `back view, seen from behind`) + `identical character scale`. Damit bleibt Kamera-Distanz und Figurgrösse über alle zwölf Moods und alle sieben Farben identisch — der Roboter ist überall gleich gross im Bild.

**Symbolik-Spezifikation (gilt für alle Moods mit Symbolik):** Symbole schweben **neben dem Kopf auf Schläfen-, Ohren- oder Wangenhöhe** — nicht über die Helmoberkante hinaus, nicht im Gesicht, nicht am Bildrand. Sie dürfen die Figur **nie höher** machen als den Kopf selbst, sonst zwingen sie die Kamera zum Herauszoomen und brechen den Grössen-Lock. Farbe: **intensiv und gesättigt** (die Farbe bzw. deren kräftige Variante). Bewegung: sanft — ruhiges Schweben, langsames Pulsieren, träges Treiben. Kein Flackern, kein Springen. Posen, die Arme einsetzen (`clap`, `stretch`), bleiben ebenfalls **auf oberer Kopfhöhe** und nicht darüber. Ohne Symbolik: `idle`, `walkfront`, `walkback`.

| Mood (Key) | Bedeutung | Bewegung (Animation) | Spezifischer englischer Prompt-Zusatz (\[MOOD\_ANIMATION\]) |
| :---- | :---- | :---- | :---- |
| **idle** | Ruhezustand: wartet auf Anweisungen, in das Handy vertieft | Frontansicht: Kopf/Helm leicht nach vorn geneigt, Blick auf ein leuchtendes Handy gerichtet, das die rechte mechanische Hand auf Brusthöhe hält; der Zeigefinger der linken mechanischen Hand wischt ruhig und gleichmässig über den Bildschirm, Körper fast still | full body front view, identical character scale, head bowed forward, visor pointing down at a small black rectangular smartphone with a bright glowing cyan screen held flat in the right mechanical hand at chest height, the left mechanical hand hovering over the screen with its index finger touching the glass and dragging sideways in a swiping motion, slight forward head tilt of about thirty degrees, calm absorbed posture, gaze fixed on the screen, bright glowing camera-lens eyes, no symbols. Calm and slow micro-movement only: the head stays slightly bowed and steady, the index finger of the left mechanical hand swipes sideways across the glowing screen twice during the clip, about one swipe per second, the right mechanical hand holds the phone still, the body stays almost completely still with only a soft subtle sway, no other gestures, no walking, no turning, no jumping, the camera is fixed |
| **think** | Nachdenken, Grübeln vor dem Problem | Rückansicht (glatte weisse Helmrückseite sichtbar), Kopf leicht zur Seite geneigt, eine Hand auf Kinnhöhe erhoben, nachdenkliche Haltung | full body back view, seen from behind showing smooth white back of helmet, identical character scale, head tilted slightly aside, one mechanical hand raised to chin height, pensive posture, a single vibrant saturated glowing thought bubble floating beside the upper head at temple level without exceeding helmet height, drifting slowly |
| **held** | Alarm / Fehler: der Ablauf ist angehalten, etwas hält den Bot auf | Rückansicht, angespannte Haltung, Schultern hochgezogen, beide Hände auf Ohrhöhe gehoben | full body back view, seen from behind, identical character scale, tense startled posture with shoulders raised and both hands lifted to ear level, one large vibrant saturated glowing exclamation mark floating beside the head at ear level without exceeding helmet height, pulsing gently |
| **clap** | Erfolg, Applaus, Jubel über ein Ergebnis | Rückansicht: Jubelpose, beide Arme auf obere Kopfhöhe erhoben — nicht höher als die Helmoberkante | full body back view, seen from behind, identical character scale, joyful victory pose with both mechanical arms raised cheerfully to upper head level (not higher than the top of the helmet), three small vibrant saturated glowing sparkles and stars floating beside the upper head, twinkling softly |
| **peek** | Arbeiten: eifrig beschäftigt, über die Schulter gesehen | Rückansicht, aufrecht stehend, Kopf leicht vorgeneigt, beide Hände auf Hüfthöhe vor dem Körper in einer geschäftigen Tipphaltung in der Luft | full body back view, seen from behind, identical character scale, standing upright with head leaning slightly forward, both mechanical hands held out in front at waist height in a busy mid-air typing gesture, three vibrant saturated glowing activity dots floating beside the head at temple level, bobbing gently |
| **sleep** | Schlaf / Standby: heruntergefahren, aber weiter anwesend | Frontansicht: Augen zu schmalen horizontalen Leucht-Schlitzen gedimmt, Kopf leicht gesenkt, Arme schlaff an den Seiten, langsames Atemschwingen | full body front view, identical character scale, camera-lens eyes dimmed down to thin horizontal glowing [FARBE] slits, head tilted slightly down, arms hanging limp at sides, slow breathing sway, three vibrant saturated glowing ZZZ symbols floating beside the upper head at temple level |
| **pet** | Zuwendung: der Bot wird gestreichelt und geniesst es | Frontansicht: Kopf zuneigend geneigt, Augen zu glücklich nach oben geschwungenen Leuchtbögen, sanftes zufriedenes Schwingen, Arme entspannt | full body front view, identical character scale, head tilted affectionately, camera-lens eyes transformed into happy closed upward-curving [FARBE] glowing arcs, content gentle body sway, arms relaxed, three vibrant saturated glowing heart symbols floating beside the head at temple level, pulsing softly |
| **stretch** | Strecken und Recken nach längerem Stillstand | Frontansicht: beide Arme auf obere Kopfhöhe nach aussen gestreckt (innerhalb der Helmhöhe), Schultern nach hinten rollend, Brust leicht vorgeschoben | full body front view, identical character scale, both mechanical arms raised and stretched outward at upper head level (staying within helmet height), shoulders rolling back, chest pushed slightly forward in a refreshing stretch, small vibrant saturated glowing sparkles beside the head |
| **shy** | Schüchtern / verlegen | Frontansicht: Kopf leicht abgewandt, Schultern eingezogen, Zeigefinger schüchtern vor der Brust aneinandergelegt, zartes rosa Schamglühen auf den Visier-Wangen | full body front view, identical character scale, head turned slightly away, timid posture with shoulders drawn in, index fingers touching shyly in front of chest, soft pink blush glow on the visor cheeks, two small saturated glowing dots floating beside the head at temple level |
| **bored** | Gelangweilt / untätig, wartet auf Arbeit | Frontansicht: schaukelt träge seitlich, ein Auge halb geschlossen mit flachem oberem Lid, Arme schlaff an den Seiten | full body front view, identical character scale, rocking lazily side to side, one camera-lens eye half-closed with a flat top lid, arms hanging loosely at sides, a small vibrant saturated glowing puff cloud floating beside the head at cheek level, drifting lazily |
| **walkfront** | Bewegung auf den Betrachter zu | Frontansicht: läuft auf der Stelle zur Kamera, Arme und Beine im Takt, bleibt auf derselben Grundlinie zentriert | full body front view, identical character scale, walking in place towards the camera, alternating arms and legs in a rhythmic jogging motion while staying centered on the same baseline, bright cheerful glowing camera-lens eyes, no symbols |
| **walkback** | Bewegung vom Betrachter weg | Rückansicht (Helmrückseite und Rückenpanzerung sichtbar): läuft auf der Stelle von der Kamera weg, Arme und Beine im Takt, bleibt auf derselben Grundlinie zentriert | full body back view, seen from behind showing back of white helmet and back armor, identical character scale, walking in place away from the camera, alternating arms and legs in a rhythmic jogging motion while staying centered on the same baseline, no symbols |

Durch die Formulierung `as both shoulders lift up high ... the oversized head simultaneously tilts noticeably to one side at the peak of the shrug` versteht das Video-Modell (insbesondere Wan 2.1) die zeitliche Kopplung: Der Kopf liegt nicht von Anfang an schief, sondern kippt genau in dem Moment zur Seite, in dem die Schultern hochgezogen werden. Auf pcllm wird dieser Mood mit **MiniMax H3 FL2V** erzeugt (erstes und letztes Frame = derselbe Master, dadurch geschlossener Loop); Wan ist dort nicht installiert.

Der Prompt-Zusatz wird mit der Basisbeschreibung aus Abschnitt 2 und dem **getragenen** Accessoire der jeweiligen Farbe aus 3.2 kombiniert. Gehaltene Gegenstände kommen nicht in den Prompt — im Bild ist nur der Roboter und sein Mood, **einzige Ausnahme:** das Smartphone im `idle`-Mood. Auch beim Idle ist ausschliesslich das Handy erlaubt — jeder andere Gegenstand in den Händen bleibt verboten (siehe Mood-Tabelle).


## **3\.2 Farben & Accessoires (\[FARBE\])**

Die Bewegungen sind für alle Farben identisch (Abschnitt 3.1), und die Figur ist dieselbe (Abschnitt 2). Unterschiedlich ist allein die **Farbe**: sie ersetzt \[FARBE\] an allen Leuchtstellen — Ohr-Pods, Visier-Innenrand, Kamera-Linsen-Augen, Brust-LEDs, Taillen-Kreis, Gelenk- und Handlichter, Stiefel-LED-Streifen. Helm, Brustplatte, Beine und Stiefel bleiben bei **allen** Farben weiss — der Helm trägt nie die Farbe, ausdrücklich auch nicht bei Cyan. Taille, Gelenke und Hände bleiben dunkelgrau-metallisch. Dazu das jeweilige Accessoire.

Farben sind **nicht** an einen Agenten gebunden: welcher Agent welche Farbe trägt, wählt man im Office-Menü **Sprites**. Die Dateien heissen `<farbe>_<mood>.gif` (../characters-readme.md, Abschnitt 3). „Mögliche Anwendung“ ist nur ein Vorschlag, welcher Agent die Farbe tragen könnte (Startfarbe über `suggest`).

* **Cyan** (\#22D3EE) — mögliche Anwendung für Hermy. Accessoire: Hermes-Flügel-Emblem auf der Brust.
  EN: `wearing a small polished silver wing emblem on the chest plate, integrated flat into the armour`
* **Orange** (\#FF9F1C, sattes Amber-Orange) — mögliche Anwendung für Sysadmin. Accessoire: kleine Status-Antenne am Helm & Werkzeuggürtel.
  EN: `wearing a small glowing status antenna on top of the helmet and a slim dark tool belt around the waist, both worn on the body`
* **Blue** (\#4DABF7, kräftiges Azurblau) — mögliche Anwendung für Manager. Accessoire: kleines Holo-Klemmbrett-Emblem auf der Brustplatte (getragen, nicht in der Hand).
  EN: `wearing a small glowing holographic clipboard emblem on the chest plate, lying flat on the armour, not held`
* **Yellow** (\#FFD43B, sattes Goldgelb) — mögliche Anwendung für Analyst. Accessoire: Smart-Brille vor dem Visier.
  EN: `wearing slim glowing smart glasses in front of the visor, worn on the head`
* **Purple** (\#A78BFA, kräftiges Violett) — mögliche Anwendung für Coder. Accessoire: aufgesetzte Kopfhörer.
  EN: `wearing over-ear headphones on the two side ear-pods of the helmet, worn on the head`
* **Green** (\#38D9A9, sattes Mintgrün) — mögliche Anwendung für Webmaster. Accessoire: leichtes Bügel-Headset.
  EN: `wearing a light boom headset with a thin microphone arm on the side of the helmet, worn on the head`
* **Pink** (\#F783AC, kräftiges Magenta-Pink) — mögliche Anwendung für Quality. Accessoire: kleine Holo-Prüfplakette auf der Brustplatte (getragen, nicht in der Hand).
  EN: `wearing a small glowing holographic inspection badge on the chest plate, lying flat on the armour, not held`

Der englische Accessoire-Satz gehört in den Master-Prompt (Standbild) und in den Prompt jedes Clips dieser Farbe — dieselbe Figur mit demselben getragenen Teil. Das Accessoire trägt nie die Farbe, ausser es ist ausdrücklich als leuchtend beschrieben; Helm, Brustplatte, Beine und Stiefel bleiben weiss. Stand 22.10.2026: die Master-Prompts von Cyan enthalten diesen Satz noch nicht (`workflows/zimage_hermy_master_front_512.json`) — dort steht überdies noch „glowing blue accents“ in den Händen statt \[FARBE]. Beides wird beim nächsten Master-Render angeglichen.

### Farbwörter und Ansichten — gemessen, nicht geraten (22.10.2026)

Gemessen an den gerenderten Master-Standbildern (Z-Image, 512 px, 8 Schritte, cfg 1.0, Seed 12345). Ein Hexwert im Prompt wird **ignoriert**; es wirkt nur ein Farbwort.

| Farbe | Farbwort im Prompt | gemessener Farbton |
|---|---|---|
| Cyan | `cyan` | 183° |
| Orange | `amber orange` | 22–30° |
| Blue | `royal blue` | 214° |
| Yellow | `gold yellow` | 38° |
| Purple | `violet` | 275–279° |
| Green | `mint green` | 161° |
| Pink | `rose pink` | 335° |

Verworfen, weil zu nah an Cyan oder zu weit weg: `azure blue` → 191°, `sky blue` → 191°, `bright blue` → 198°, `magenta pink` → 320°, `hot pink` → 327°, `bright pink` → 324°.

Vier Regeln, die aus den Messungen folgen:

1. **Farbwort ganz vorne im Prompt.** Steht es erst nach rund 460 Zeichen, rendert das Modell die Figur weiter in Cyan (Violett blieb 182° statt 275°).
2. **Rückansicht nur mit dem v2-Wortlaut** (`workflows/zimage_hermy_back_v2_seed12345.json`): dort steht die Ansicht im ersten Satz und die Frontbeschreibung fehlt ganz. Bei allen anderen Vorlagen gewinnt der frühe Visier-Satz und es kommt eine Frontansicht heraus.
3. **Das Accessoire steht vor dem Ansicht-Satz** — steht es dahinter, kippt die Ansicht zurück auf die Front.
4. **Vorlagen-Prompts enthalten harte Farbwörter** (`blue`, `cyan`). Werden sie nicht mitgetauscht, bleibt die Figur cyan.


# **4\. Einbindung (characters/bots)**

Wie das `characters/`-Verzeichnis, die Dateinamen und die `sprites.json` allgemein funktionieren, steht in [../characters-readme.md](../characters-readme.md). Hier steht nur, was für das Bots-Set gilt.

* **Ordner:** `characters/bots/` enthält die GIFs als `<farbe>_<mood>.gif` mit den Farben `cyan`, `blue`, `orange`, `yellow`, `purple`, `green` und `pink`, dazu `bot-default.gif` (neutraler Fallback) sowie `bot-default-base.gif/.png` (Basis-Standbild). `_unused/` enthält alte Dateien.
* **Mood-Endungen:** Die Dateien nutzen die Alias-Endungen `thinking` (think), `working` (peek), `success` (clap und pet), `alert` (held und failed), `move_front` (walkfront) und `move_back` (walkback). Die Mood-Tabelle in 3.1 nennt die Schlüssel, nicht die Dateiendungen.
* **Fehlende Moods:** `shy` greift auf `think` zurück. `sleep`, `stretch` und `bored` nutzen das `idle`-Sprite, bis eigene Dateien vorliegen. `failed` nutzt das Alarm-Sprite (`alert`/`held`).
* **Startfarben:** Über `suggest` bekommen die bisherigen Agenten ihre ursprüngliche Farbe als Vorschlag. Die Wahl im Menü **Sprites** überschreibt das.

`sprites.json` des Bots-Sets:

```json
{
  "name": "Bots",
  "colors": {
    "cyan":   { "label": "Cyan",   "swatch": "#06b6d4" },
    "blue":   { "label": "Blue",   "swatch": "#3b82f6" },
    "orange": { "label": "Orange", "swatch": "#f97316" },
    "yellow": { "label": "Yellow", "swatch": "#eab308" },
    "purple": { "label": "Purple", "swatch": "#7c3aed" },
    "green":  { "label": "Green",  "swatch": "#10b981" },
    "pink":   { "label": "Pink",   "swatch": "#ec4899" }
  },
  "aliases": {
    "think": ["think", "thinking"],
    "peek": ["peek", "working"],
    "clap": ["clap", "success"],
    "pet": ["pet", "success"],
    "held": ["held", "alert"],
    "failed": ["failed", "alert"],
    "walkfront": ["walkfront", "move_front"],
    "walkback": ["walkback", "move_back"]
  },
  "fallback": { "shy": "think" },
  "default": { "idle": "bot-default.gif" },
  "suggest": { "default": "cyan", "manager": "blue", "coder": "purple" }
}
```
