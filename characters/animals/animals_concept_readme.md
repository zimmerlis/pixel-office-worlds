# **Hermes AI Office Plugin: Tier-Sprite & Animations-Konzept (512px GIFs)**

Spezifikation zur Generierung, Modellierung und Implementierung der animierten Tier-Agenten-Avatare („Tierische Büro-Crew“) im Hermes AI Office Plugin (512x512px transparent GIFs).

# **1\. Übersicht & Technische Spezifikationen**

* **Format:** Animiertes GIF (Seamless Loop) mit transparentem Hintergrund (Alpha-Channel).
* **Auflösung:** 512 × 512 Pixel (quadratisches 1:1 Format).
* **Bildaufbau (fixer Kamera-Rahmen, in allen Renders identisch):** Feste, weite Ganzkörper-Kamera, fixierter Kameraabstand und **identischer Massstab in allen Renders**. Die Tierfigur füllt von den Pfoten/Schuhen bis zur Oberkante des Kopfes (bzw. der Ohrenspitzen) exakt **70 % der Bildhöhe**; die Füsse stehen auf einer fixen Grundlinie **10 % über dem unteren Bildrand**; darüber bleiben **20 % leere Kopffreiheit**. Damit stehen alle Tiere auf der festen Standlinie, und alle Spezies bzw. alle Moods sind deckungsgleich skalierbar. Die 20 % Kopffreiheit bleiben dauerhaft leer und dienen als Puffer, damit kein Mood, kein Ohr und kein Symbol die obere Bildkante berührt; die Symbolik sitzt daneben auf Kopfhöhe (Abschnitt 3.1). Die Figur wird also bewusst kleiner gerendert, nicht formatfüllend. Kopf bis Fuss müssen vollständig sichtbar bleiben.
* **Stil-Referenz (deutsche Fassung der verbindlichen Basisbeschreibung; englischer Wortlaut in Abschnitt 2):** Niedlicher, anthropomorpher 3D-Chibi-Tiercharakter im modernen Animationsfilm- und *Animal Crossing*- / *Zootopia*-Chibi-Stil, zentriert stehend auf reinweissem Hintergrund. Überdimensionaler, abgerundeter Chibi-Tierkopf mit weicher, fein strukturierter Fell- oder Feder-Oberfläche, ausdrucksstarker Schnauze/Schnabel und zwei grossen, glänzenden, runden Knopfaugen mit lebendigen Lichtreflexen. Kompakte, aufrechte Zweibeiner-Körperproportionen. Damit alle Tiere als zusammengehöriges Büro-Team erkennbar sind, tragen alle eine einheitliche Basis-Kleidung: ein schlichtes, dunkelgraues Office-Oberteil (bzw. Hoodie beim Waschbären) mit einem leuchtenden **\[FARBE\]** Akzentstreifen am Kragen/Saum, eine dunkle Hose sowie einheitliche, breite, runde weisse Chibi-Sneaker mit leuchtenden **\[FARBE\]** Sohlenstreifen am Fussansatz. Bewegliche, niedliche Tierpfoten/Hände mit vier Fingern. Studio-Beleuchtung, Octane-Render, hohe Detailtiefe (feines Stylised Fur/Feathers), freigestellter Umriss (isolated cutout).
* **Spezies- & Farbregel:** Anders als bei den Bots wird die Rolle hier primär über die **Tierart (\[SPEZIES\])** und deren typische **Accessoires (\[ACCESSOIRE\])** definiert. Zusätzlich behält jedes Tier eine zugewiesene **Leuchtfarbe (\[FARBE\])** für die Sohlenstreifen der Sneaker, den Kleidungs-Akzent, leuchtende Accessoire-Details und die **Mood-Symbolik** neben dem Kopf. So bleibt das System zu 100 % kompatibel mit der bestehenden Farb- und Menü-Logik des Plugins.
* **Hintergrund — strikt verboten:** Die Tierfigur wird **isoliert auf vollständig transparentem Hintergrund** gerendert. Es darf **kein einziges** weiteres Objekt im Bild sein: keine Räume, Wände, Böden, Decken, keine Möbel, keine Tische oder Schreibtische, keine Stühle, keine Monitore, Bildschirme, PCs oder Tastaturen, keine Lampen, Pflanzen, Kabel, Teppiche, keine Deko, Requisiten oder abgelegten Gegenstände, kein Bodenschatten und keine Standfläche. Grund: Die Agenten werden in einer **bestehenden Office-Szene** animiert umherbewegt, die Schreibtische und Hintergrund bereits mitbringt. Wenn ein Mood „am Schreibtisch arbeitend" zeigt, liefert die Office-Szene den Schreibtisch — der Sprite zeigt nur die passende Körperhaltung und Pfoten-Geste dazu, ohne Möbel und ohne Geräte.
* **Accessoires:** Accessoires sind erlaubt, solange sie **das Tier selbst fest am Körper trägt** (Halstuch, Schutzhelm, Werkzeuggürtel, Krawatte, Brille, Kopfhörer, Headset, Ansteckplakette). Sie gehören zum Charakter, nicht zur Szene. **Lose Gegenstände in den Pfoten** (wie lose Klemmbretter oder Handlupen) sind verboten, da die Pfoten für die 12 Mood-Animationen (Tippen, Jubeln, Strecken, Kopf kratzen) frei bleiben müssen. Stattdessen werden Klemmbrett und Lupe als leuchtende Brust-Anstecker oder Kopf-Accessoires getragen. **Einzige Ausnahme von gehaltenen Gegenständen:** der `idle`-Mood hält bewusst ein Smartphone in einer Vorderpfote. Auch beim Idle ist ausschliesslich das Handy erlaubt — jeder andere Gegenstand in den Pfoten bleibt verboten (siehe Mood-Tabelle).
* **Symbolik — erwünscht:** Sterne, Funken, Punkte, Ausrufezeichen, Fragezeichen, Denk-, Seufzer- oder Sprechwolken und Herzen sind zulässig und sollen genutzt werden, wo sie den Mood tragen. Regeln: **intensive, gesättigte Farbe (\[FARBE\])** (nie blass), Grösse **markant und augenfällig** (bei 512 px auch verkleinert noch klar erkennbar), Position **neben dem Kopf auf Schläfen-, Ohren- oder Wangenhöhe** — nie über die Kopfoberkante hinaus und den Kopf nie verdeckend; Symbole dürfen die Figur nie höher machen als der Kopf, sonst bricht der Grössen-Lock. Bewegung immer **sanft und langsam** — schwebend, pulsierend oder aufsteigend, im Takt des Seamless Loop. Kein Flackern, kein Springen, kein Zappeln.
* **Audio:** Es soll keine Musik oder Hintergrund-Audio generiert werden (reine visuelle GIFs).

---

# **2\. Basisbeschreibung der Tier-Crew (Master-Template für alle Tiere)**

Dieser englische Prompt definiert Massstab, Proportionen und Stil für alle Tier-Agenten. Da Vorder- und Rückansicht beim Rendering (z. B. in Z-Image / Wan / MiniMax) strikt getrennt werden müssen, damit keine Gesichter auf dem Hinterkopf entstehen, gibt es ein **Front-Template** und ein **Back-Template**.

Die Platzhalter `\[FARBE\]`, `\[SPEZIES_FRONT\]` bzw. `\[SPEZIES_BACK\]` und `\[ACCESSOIRE\]` werden pro Tier aus Abschnitt 3.2 eingesetzt. Der mood-spezifische Zusatz aus Abschnitt 3.1 wird am Ende angehängt.

### **2.1 Master-Template: Frontansicht (`idle`, `sleep`, `pet`, `stretch`, `shy`, `bored`, `walkfront`)**

> Full body 3D front view character render of a cute chibi-proportioned anthropomorphic \[SPEZIES\_FRONT\] office worker standing centered on a pure white background, wearing \[ACCESSOIRE\]. Fixed wide full-body camera framing, locked camera distance, identical character scale across all renders: the character's body from feet to the top of the head/ears occupies exactly 70% of the canvas height, feet planted on a fixed bottom baseline at 10% from the bottom edge, leaving 20% empty white headroom above the head. Oversized rounded chibi animal head with soft stylized fur or feather texture, expressive snout or beak, and two large glossy circular dark eyes with lively catchlights. Compact upright bipedal body wearing a sleek dark grey tailored office top with subtle glowing \[FARBE\] trim, dark trousers, and wide rounded white sneakers with glowing \[FARBE\] LED strips at the sole base. Expressive anthropomorphic paws with four digits. Studio lighting, Octane render, Stylized 3D Animal Crossing and Zootopia chibi aesthetic, high detail, isolated cutout. \[MOOD\_ANIMATION\]

### **2.2 Master-Template: Rückansicht (`think`, `held`, `clap`, `peek`, `walkback`)**

*(Hinweis: Gemäss den Messregeln steht die Rückansicht ganz vorne im ersten Satz, und Gesichtsmerkmale wie Augen/Schnauze werden im Basis-Prompt komplett weggelassen, damit die KI garantiert die Rückseite rendert.)*

> Full body 3D back view character render, seen strictly from behind, of a cute chibi-proportioned anthropomorphic \[SPEZIES\_BACK\] office worker standing centered on a pure white background, wearing \[ACCESSOIRE\]. Fixed wide full-body camera framing, locked camera distance, identical character scale across all renders: the character's body from feet to the top of the head/ears occupies exactly 70% of the canvas height, feet planted on a fixed bottom baseline at 10% from the bottom edge, leaving 20% empty white headroom above the head. Showing the back of the oversized rounded chibi animal head with soft stylized fur or feather texture, back of ears, and cute tail visible at the lower back. Compact upright bipedal body seen from behind wearing a sleek dark grey tailored office top with subtle glowing \[FARBE\] back trim, dark trousers, and wide rounded white sneakers with glowing \[FARBE\] LED strips at the heel base. Expressive anthropomorphic paws. Studio lighting, Octane render, Stylized 3D Animal Crossing and Zootopia chibi aesthetic, high detail, isolated cutout. \[MOOD\_ANIMATION\]

**Default-Tier:** Als neutraler Fallback (`characters/animals/animal-default-base.gif` samt Standbild `.png`) dient **Hermy (Golden Retriever)** in der `idle`-Grundhaltung mit ruhigem Atmen.

---

# **3\. Moods, Spezies & Accessoires**

## **3\.1 Mood-Tabelle (gilt für alle Tiere)**

Die zwölf Moods sind bei allen Tier-Agenten identisch: gleiche Bewegung, gleicher englischer Prompt-Zusatz. Der englische Mood-Name ist zugleich der Schlüssel in `sprites.json`.

**Grössen-Lock & Symbolik-Spezifikation:** Jeder Mood-Zusatz beginnt mit `full body` + Ansicht + `identical character scale`. Symbole schweben **neben dem Kopf auf Schläfen-, Ohren- oder Wangenhöhe** in der jeweiligen leuchtenden `\[FARBE\]` des Tiers — nie über die Kopfoberkante hinaus. Posen, die Arme/Pfoten einsetzen (`clap`, `stretch`), bleiben ebenfalls **auf oberer Kopfhöhe** und nicht darüber.

| Mood (Key) | Bedeutung | Bewegung (Animation) | Spezifischer englischer Prompt-Zusatz (\[MOOD\_ANIMATION\]) |
| :---- | :---- | :---- | :---- |
| **idle** | Ruhezustand: wartet auf Anweisungen, in das Handy vertieft | Frontansicht: Kopf leicht nach vorn geneigt, Blick auf ein leuchtendes Handy gerichtet, das eine Vorderpfote auf Brusthöhe hält; die andere Vorderpfote wischt mit ihrem Zeh ruhig und gleichmässig über den Bildschirm, Körper fast still | `full body front view, identical character scale, head bowed forward, a small black rectangular smartphone with a bright glowing cyan screen held flat in the right furry front paw at chest height, the left furry front paw hovering over the screen with its index toe touching the glass and dragging sideways in a swiping motion, slight forward head tilt of about thirty degrees, calm absorbed posture, gaze fixed on the screen, expressive glossy eyes, no symbols. Calm and slow micro-movement only: the head stays slightly bowed and steady, the index toe of the left furry front paw swipes sideways across the glowing screen twice during the clip, about one swipe per second, the right paw holds the phone still, the body stays almost completely still with only a soft subtle sway, no other gestures, no walking, no turning, no jumping, the camera is fixed` |
| **think** | Nachdenken, Grübeln vor dem Problem | Rückansicht (Hinterkopf, Ohrenrückseite und kleiner Schwanz sichtbar), Kopf leicht zur Seite geneigt, eine Pfote nachdenklich auf Kinnhöhe erhoben | `full body back view, seen from behind showing furry back of head and cute tail, identical character scale, head tilted slightly aside, one furry paw raised to chin height, pensive posture, a single vibrant saturated glowing [FARBE] thought bubble floating beside the upper head at temple level without exceeding head height, drifting slowly` |
| **held** | Alarm / Fehler: der Ablauf ist angehalten, etwas hält das Tier auf | Rückansicht, angespannte Haltung, Schultern hochgezogen, Ohren alarmiert aufgestellt, beide Pfoten auf Ohrhöhe gehoben | `full body back view, seen from behind, identical character scale, tense startled posture with shoulders raised, ears perked up, and both furry paws lifted to ear level, one large vibrant saturated glowing [FARBE] exclamation mark floating beside the head at ear level without exceeding head height, pulsing gently` |
| **clap** | Erfolg, Applaus, Jubel über ein Ergebnis | Rückansicht: Jubelpose, beide Arme/Pfoten auf obere Kopfhöhe erhoben — nicht höher als die Kopfoberkante, Schwanz wedelt/wippt fröhlich | `full body back view, seen from behind, identical character scale, joyful victory pose with both furry arms raised cheerfully to upper head level (not higher than the top of the head) and tail wagging happily, three small vibrant saturated glowing [FARBE] sparkles and stars floating beside the upper head, twinkling softly` |
| **peek** | Arbeiten: eifrig beschäftigt, über die Schulter gesehen | Rückansicht, aufrecht stehend, Kopf leicht vorgeneigt, beide Pfoten auf Hüfthöhe vor dem Körper in einer geschäftigen Tipphaltung in der Luft | `full body back view, seen from behind, identical character scale, standing upright with head leaning slightly forward, both furry paws held out in front at waist height in a busy mid-air typing gesture, three vibrant saturated glowing [FARBE] activity dots floating beside the head at temple level, bobbing gently` |
| **sleep** | Schlaf / Standby: schläft im Stehen | Frontansicht: Augen friedlich geschlossen (sanfte Schlaf-Lider), Kopf leicht gesenkt, Ohren entspannt hängend, Arme schlaff an den Seiten, langsames Atemschwingen | `full body front view, identical character scale, eyes peacefully closed in sleeping lids, head tilted slightly down, ears relaxed, arms hanging limp at sides, slow breathing sway, three vibrant saturated glowing [FARBE] ZZZ symbols floating beside the upper head at temple level` |
| **pet** | Zuwendung: das Tier wird gestreichelt und geniesst es | Frontansicht: Kopf zuneigend geneigt, Augen zu glücklich nach oben geschwungenen Bögen geschlossen, sanftes zufriedenes Schwingen/Schwanzwedeln, Arme entspannt | `full body front view, identical character scale, head tilted affectionately, eyes happily closed in upward-curving arcs, content gentle body sway, arms relaxed, three vibrant saturated glowing [FARBE] heart symbols floating beside the head at temple level, pulsing softly` |
| **stretch** | Strecken und Recken nach längerem Stillstand | Frontansicht: beide Arme/Pfoten auf obere Kopfhöhe nach aussen gestreckt (innerhalb der Kopfhöhe), Schultern nach hinten rollend, Brust leicht vorgeschoben | `full body front view, identical character scale, both furry arms raised and stretched outward at upper head level (staying within head height), shoulders rolling back, chest pushed slightly forward in a refreshing stretch, small vibrant saturated glowing [FARBE] sparkles beside the head` |
| **shy** | Schüchtern / verlegen | Frontansicht: Kopf leicht abgewandt, Ohren leicht angelegt, Schultern eingezogen, Zeigefinger/Pfotenspitzen schüchtern vor der Brust aneinandergelegt, zartes rosa Schamglühen auf den Fellwangen | `full body front view, identical character scale, head turned slightly away, ears folded back shyly, timid posture with shoulders drawn in, furry index fingers touching shyly in front of chest, soft pink blush glow on the cheeks, two small saturated glowing [FARBE] dots floating beside the head at temple level` |
| **bored** | Gelangweilt / untätig, wartet auf Arbeit | Frontansicht: schaukelt träge seitlich, Augen halb geschlossen mit müden Lidern, Arme schlaff an den Seiten | `full body front view, identical character scale, rocking lazily side to side, eyes half-closed with flat sleepy upper lids, arms hanging loosely at sides, a small vibrant saturated glowing [FARBE] puff cloud floating beside the head at cheek level, drifting lazily` |
| **walkfront** | Bewegung auf den Betrachter zu | Frontansicht: läuft fröhlich auf der Stelle zur Kamera, Arme und Beine im Takt (0,5s-Rhythmus), bleibt auf derselben Grundlinie zentriert | `full body front view, identical character scale, walking in place towards the camera, alternating furry arms and legs in a rhythmic jogging motion while staying centered on the same baseline, bright cheerful expression, no symbols` |
| **walkback** | Bewegung vom Betrachter weg | Rückansicht (Hinterkopf, Rücken und Schwanz sichtbar): läuft auf der Stelle von der Kamera weg, Arme und Beine im Takt, bleibt auf derselben Grundlinie zentriert | `full body back view, seen from behind showing back of animal head and tail, identical character scale, walking in place away from the camera, alternating arms and legs in a rhythmic jogging motion while staying centered on the same baseline, no symbols` |

---

## **3\.2 Die 7 Tier-Charaktere (Spezies, Farben & Accessoires)**

Hier werden die Platzhalter `\[FARBE\]`, `\[SPEZIES_FRONT\]`, `\[SPEZIES_BACK\]` und `\[ACCESSOIRE\]` für jeden der 7 Agenten definiert. Die Farb-Keys (`cyan`, `orange`, `blue`, `yellow`, `purple`, `green`, `pink`) bleiben erhalten, damit das Plugin nahtlos zwischen Bots und Tieren wechseln kann.

### **1. Hermy — Golden Retriever (`cyan`)**
* **Rolle:** Haupt-Assistent / Allrounder
* **Charakter-Design:** Freundlicher, treuer Golden Retriever mit weichem, goldblondem Fell, Schlappohren und einem kleinen cyan-blauen Halstuch (Bandana) mit silbernem Hermes-Flügel-Pin.
* **Platzhalter für Prompts:**
  * `\[FARBE\]`: `cyan` (#22D3EE)
  * `\[SPEZIES_FRONT\]`: `golden retriever dog with soft cream-gold fur, cute floppy ears, and a friendly dark nose`
  * `\[SPEZIES_BACK\]`: `golden retriever dog with soft cream-gold fur, floppy ears seen from behind, and a fluffy golden tail`
  * `\[ACCESSOIRE\]`: `a neat cyan neck bandana with a small silver wing pin worn around the neck`

### **2. Sysadmin — Biber (`orange`)**
* **Rolle:** Infrastruktur & Server
* **Charakter-Design:** Fleissiger, bodenständiger Biber mit kastanienbraunem Fell, typischen Vorderzähnen (in der Frontansicht), breitem gepaddeltem Biberschwanz, gelb-orangem Bau-/Schutzhelm und Werkzeuggürtel.
* **Platzhalter für Prompts:**
  * `\[FARBE\]`: `amber orange` (#FF9F1C)
  * `[SPEZIES_FRONT]`: `warm chestnut-brown beaver with small rounded ears and cute prominent front incisors`
  * `\[SPEZIES_BACK\]`: `warm chestnut-brown beaver with small rounded ears and a flat textured paddle tail visible at the lower back`
  * `\[ACCESSOIRE\]`: `a compact glowing amber-orange hard hat helmet on the head and a slim dark tool belt around the waist`

### **3. Manager — Löwe (`blue`)**
* **Rolle:** Personalchef / Orchestrator
* **Charakter-Design:** Souveräner, charismatischer Chibi-Löwe mit gepflegter, runder Löwenmähne (die kompakt bleibt, um den 70%-Grössen-Lock einzuhalten), königsblauer Krawatte und einem leuchtenden Holo-Klemmbrett-Anstecker an der Brust.
* **Platzhalter für Prompts:**
  * `\[FARBE\]`: `royal blue` (#4DABF7)
  * `\[SPEZIES_FRONT\]`: `charismatic lion with golden-tan fur and a neat, compact rounded brown mane framing the face`
  * `\[SPEZIES_BACK\]`: `charismatic lion showing the full rounded brown mane covering the back of the head and a tufted lion tail`
  * `\[ACCESSOIRE\]`: `a crisp royal blue necktie and a small glowing blue holographic clipboard badge pinned flat to the chest`

### **4. Analyst — Eule (`yellow`)**
* **Rolle:** Daten & Strategie
* **Charakter-Design:** Weise, hochkonzentrierte kleine Eule mit weichem braun-beigem Gefieder, kleinen Federohren, kurzem Schnabel und einer grossen, goldgelb schimmernden Smart-Brille. (Statt Fellpfoten hat sie gefiederte Flügel-Arme mit greifenden Flügelspitzen).
* **Platzhalter für Prompts:**
  * `\[FARBE\]`: `gold yellow` (#FFD43B)
  * `\[SPEZIES_FRONT\]`: `wise little owl with soft speckled tawny-brown feathers, cute small ear tufts, and a small neat beak`
  * `\[SPEZIES_BACK\]`: `wise little owl with speckled tawny-brown back feathers, small ear tufts seen from behind, and short tail feathers`
  * `\[ACCESSOIRE\]`: `oversized round gold-rimmed smart glasses with a subtle gold yellow glow worn in front of the eyes`

### **5. Coder — Waschbär (`purple`)**
* **Rolle:** Software Developer
* **Charakter-Design:** Cleverer, nachtaktiver Waschbär mit der typischen dunklen „Augenmaske“ (perfekt als Anspielung auf durchprogrammierte Nächte), gestreiftem buschigem Schwanz, lässigem Kapuzenpullover (Hoodie-Kragen) und aufgesetzten Kopfhörern mit violettem LED-Ring.
* **Platzhalter für Prompts:**
  * `\[FARBE\]`: `violet` (#A78BFA)
  * `\[SPEZIES_FRONT\]`: `clever raccoon with grey-and-white fur, iconic dark bandit mask markings around the eyes, and pointed ears`
  * `\[SPEZIES_BACK\]`: `clever raccoon with grey fur, pointed ears seen from behind, and a bushy black-and-grey striped tail`
  * `\[ACCESSOIRE\]`: `sleek over-ear headphones with glowing violet LED rings worn on the head and a casual hoodie collar`

### **6. Webmaster — Chamäleon (`green`)**
* **Rolle:** Frontend / Design / UI
* **Charakter-Design:** Kreatives, farbenfrohes Mintgrün-Chamäleon (Meister der Farben und des Designs!) mit sanfter Schuppen-Textur, eingerolltem Schwanz und einem leichten Designer-Bügel-Headset. *(Alternativ auch als Rotfuchs möglich, aber das Chamäleon passt perfekt zur Farbe `mint green` und zum Thema UI/Farbdesign).*
* **Platzhalter für Prompts:**
  * `\[FARBE\]`: `mint green` (#38D9A9)
  * `\[SPEZIES_FRONT\]`: `friendly chibi chameleon with smooth vibrant mint-green skin, cute expressive turret eyes, and a small crest`
  * `\[SPEZIES_BACK\]`: `friendly chibi chameleon with smooth mint-green skin, small head crest seen from behind, and a cute spiraled tail`
  * `\[ACCESSOIRE\]`: `a lightweight designer boom headset with a thin microphone arm and glowing mint green accent worn on the head`

### **7. Quality — Erdmännchen (`pink`)**
* **Rolle:** Quality Assurance / Testing
* **Charakter-Design:** Extrem wachsames, akribisches Erdmännchen (Meerkat) mit warmem sandfarbenem Fell, das jedem Bug sofort auf die Spur kommt. Trägt eine hochklappbare Prüflupe am Stirnband (damit die Pfoten frei bleiben) und eine leuchtende Prüfplakette an der Brust.
* **Platzhalter für Prompts:**
  * `\[FARBE\]`: `rose pink` (#F783AC)
  * `\[SPEZIES_FRONT\]`: `attentive meerkat with warm sandy-tan fur, dark patches around the alert eyes, and a slender snout`
  * `\[SPEZIES_BACK\]`: `attentive meerkat with smooth sandy-tan fur, small low-set ears seen from behind, and a slenderdark-tipped tail`
  * `\[ACCESSOIRE\]`: `a jeweler's magnifying loupe visor band on the forehead and a glowing rose pink inspection badge on the chest`

---

### **Wichtige Prompt-Regeln für die Generierung (übernommen aus den Messungen):**

1. **Ohren im Grössen-Lock beachten:** Bei Tieren mit aufstehenden Ohren (Waschbär, Eule) oder Helm (Biber) gilt die 70%-Höhenregel **inklusive der Ohren/Helmspitze**. Die 20 % Kopffreiheit darüber müssen komplett frei bleiben.
2. **Strikte Trennung von Front- und Back-Template (Abschnitt 2.1 & 2.2):** Für `think`, `held`, `clap`, `peek` und `walkback` **muss** zwingend das Back-Template (2.2) verwendet werden, in dem keine Augen und keine Schnauze erwähnt werden. Sonst rendert das Modell ein Gesicht auf den Hinterkopf des Tiers.
3. **Farbwort früh platzieren:** Das Farbwort aus der Tabelle (`cyan`, `amber orange`, `royal blue`, `gold yellow`, `violet`, `mint green`, `rose pink`) wird direkt im Accessoire-Satz im ersten Drittel des Prompts genannt, damit die Symbolik und Leuchtstreifen exakt den richtigen Farbton treffen.

---

# **4\. Einbindung (`characters/animals`)**

Das Tier-Set kann entweder als eigenes Set unter `characters/animals/` parallel zu `characters/bots/` eingebunden werden oder dieselben Farb-Schlüssel nutzen, sodass im Office-Menü **Sprites** direkt das Charakter-Theme („Tierische Büro-Crew“) und die jeweilige Tierrolle ausgewählt werden können.

* **Ordner:** `characters/animals/` enthält die GIFs als `<farbe>_<mood>.gif` (oder `<tier>_<mood>.gif`, je nach Präferenz; durch die Beibehaltung der Farb-Keys `cyan`, `orange`, `blue`, `yellow`, `purple`, `green`, `pink` funktioniert die bestehende Logik ohne Code-Umbau).
* **Fallback & Aliase:** Identisch zum Bots-Set.

`sprites.json` des Animals-Sets:

```json
{
  "name": "Animal Crew",
  "colors": {
    "cyan":   { "label": "Retriever (Hermy)",     "swatch": "#06b6d4" },
    "orange": { "label": "Beaver (Sysadmin)",     "swatch": "#f97316" },
    "blue":   { "label": "Lion (Manager)",        "swatch": "#3b82f6" },
    "yellow": { "label": "Owl (Analyst)",         "swatch": "#eab308" },
    "purple": { "label": "Raccoon (Coder)",       "swatch": "#7c3aed" },
    "green":  { "label": "Chameleon (Webmaster)", "swatch": "#10b981" },
    "pink":   { "label": "Meerkat (Quality)",     "swatch": "#ec4899" }
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
  "default": { "idle": "animal-default.gif" },
  "suggest": {
    "default": "cyan",
    "hermy": "cyan",
    "sysadmin": "orange",
    "manager": "blue",
    "analyst": "yellow",
    "coder": "purple",
    "webmaster": "green",
    "quality": "pink"
  }
}
```