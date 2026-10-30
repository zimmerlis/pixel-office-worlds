# Characters: sprite sets for Hermes Office

The `characters/` folder holds the sprite sets (characters) that the office shows at the desks and walking around. This file describes the mechanism only.

## 1. Basics

* A **set** is a subfolder of `characters/` with its own `sprites.json` and image files.
* A set has **colours**. A colour is a variant of the same character with the same moods.
* Sprites are not tied to agent names or fixed roles. In the office's **Sprites** menu you pick a set and a colour for each agent, and the choice is saved. When you pick a **World** whose character set is loaded, every agent uses that set automatically; the colour choice is kept if the set has that colour.
* To add a set, copy its folder in and press **Reload**. The plugin itself does not change.

## 2. Folder layout

```
characters/
  README.md                     <- this file
  <set-a>/                      <- a set; the folder name is the set ID
    sprites.json                <- this set's configuration
    <colour>_<mood>.gif         <- sprites, one file per colour and mood
    …
    world/                      <- optional: the set's own room (section 7)
    _unused/                    <- ignored
  <set-b>/
    sprites.json
    …
```

* Every subfolder with a `sprites.json` and at least one sprite counts as a set. Sets load in alphabetical order of folder name; the first one is the default for agents without a saved choice.
* Folders starting with `_` or `.` are skipped. Keep drafts and old files there.
* If a set cannot be loaded (missing or broken `sprites.json`, no sprites), it is skipped and the reason appears in the status line of the Sprites menu.

## 3. File names

`<colour>_<mood>.<ext>` with the extension `gif`, `png`, `webp`, `apng`, `jpg` or `jpeg`.

* **Colour:** the first word before the first `_` or `-`. Every colour found this way can be picked, even without an entry in `sprites.json`.
* **Mood:** the mood key (section 4) or one of its aliases from `aliases`. Case and `-` instead of `_` do not matter.
* If several files match a mood, the exact mood name wins over the first alias, which wins over the next one.

Example: `red_idle.gif`, `red_thinking.gif` (alias of `think`), `red_move_front.gif` (alias of `walkfront`).

## 4. Moods

The plugin knows thirteen moods. Each one is optional.

| Key | When the plugin shows it |
|---|---|
| `idle` | resting; the base sprite and the fallback for everything missing |
| `think` | the agent is thinking (reasoning) |
| `peek` | the agent is calling tools |
| `held` | the agent is picked up or dragged with the mouse |
| `failed` | the task failed |
| `sleep` | the agent is asleep (night, standby) |
| `pet` | the agent is being petted |
| `clap` | success, cheering, a toast |
| `stretch` | stretching or yawning |
| `shy` | startled or embarrassed |
| `bored` | bored (shows the `idle` sprite if missing) |
| `walkfront` | walking towards the viewer (target is further down) |
| `walkback` | walking away from the viewer (target is further up) |

If a mood is missing, this order applies: the colour's file, then the set's `fallback`, then the colour's `idle` sprite, then the set's `default`. `failed` tries `failed` first, then `held`.

Walking sprites (`walkfront`, `walkback`) are preloaded; an agent only starts walking once they are ready. All other sprites start with a small random offset (0–1000 ms per agent) when the page loads.

## 5. A set's sprites.json

Every key is optional. Without the file, or with invalid JSON, the set is not loaded.

```json
{
  "name": "Display name of the set",
  "colors": {
    "red": { "label": "Red", "swatch": "#ef4444", "files": { "idle": "special_idle.gif" } }
  },
  "aliases": {
    "think": ["think", "thinking"],
    "walkfront": ["walkfront", "move_front"]
  },
  "fallback": { "shy": "think" },
  "default": { "idle": "default.gif" },
  "suggest": { "agentname": "red" }
}
```

| Key | Meaning |
|---|---|
| `name` | name in the dropdown. Defaults to the folder name. |
| `colors` | per colour: `label` (display name), `swatch` (colour value, also used as the agent's accent colour) and optionally `files` (map single moods to files explicitly). Colours that only exist as files need no entry; their label is the capitalised colour name and their swatch a neutral violet. |
| `aliases` | per mood, extra file suffixes that count (first entry wins). Adds to or overrides the plugin's default aliases. |
| `fallback` | `{ "missing-mood": "replacement-mood" }`, used when a colour lacks the mood but has the replacement. |
| `default` | sprites per mood that apply to every colour missing that file. Paths are relative to the set folder. |
| `suggest` | only the **starting colour** for agents without a saved choice (agent name → colour). The menu choice always wins. Without an entry, the colour is derived from the agent name. |

The plugin's default aliases apply to every set, even without `aliases`:

| Mood | Accepted suffixes |
|---|---|
| `think` | `think`, `thinking` |
| `peek` | `peek`, `working` |
| `clap` | `clap`, `success` |
| `pet` | `pet`, `success` |
| `held` | `held`, `alert` |
| `failed` | `failed`, `alert` |
| `walkfront` | `walkfront`, `move_front` |
| `walkback` | `walkback`, `move_back` |

## 6. Sprite requirements

* Square, 128–512 px, transparent background (alpha). Animated GIF, APNG or WebP as a seamless loop; still images (PNG, JPG) work too. 256 × 256 px is plenty.
* **All moods and all colours of a set must share the same image size, scale and baseline.** The plugin scales every sprite the same way; if the scale differs, the character seems to grow or shrink when its mood changes.
* A sprite holds only the character: no furniture, shadows or background. The office supplies the desk and the scene.
* Sprites are loaded into memory at start. File changes take effect after **Reload** in the Sprites menu.

## 7. World (optional)

The "world" is everything in the office that is not an agent: wall, floor, desk, water cooler, and the furniture and objects (coffee machine, fan, chair, paper bin, cat, certificate, aquarium, red button, pizza box, mug, parcel). It lives in its own folder:

* `world/` in the plugin's root folder (next to `characters/`) is the **default world**. It is used for "Plugin default icons", for "Hermes agent avatars", and for sprites when no world of a set is chosen.
* Every folder under `characters/` can have exactly one world of its own in `characters/<set>/world/` (`world.json` plus its images). It is read independently of `sprites.json` and the sprite files, and appears in the Sprites menu under **World** (only with "Sprite GIFs"), labelled "Set: World name". If that folder's character set is loaded too, choosing the world switches every agent to that set. A world only needs to replace what it wants to look different; everything else comes from `world/`.
* If a file or slot is missing, the plugin uses its built-in version.

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

| Key | Meaning |
|---|---|
| `name` | display name in the menu |
| `wall` | tile for the wall band, repeated horizontally. The wall is 86 px high; the tile should be too. |
| `floor` | seamless tile, repeated in both directions |
| `wallSize` / `floorSize` | display size of the tiles (CSS) |
| `wallColor` / `floorColor` | colour under the tiles |
| `desk` | the desk (top, legs, keyboard) as one image. Height 68 px, width = cell width minus 16 px (about 152–234 px); the image is stretched to the width. Top 50 % = desktop, bottom 50 % = legs. Details in [world/README.md](../world/README.md). |
| `props` | objects by ID. Each image is square (42 × 42, `cooler` 22 × 52), transparent, and fitted with `object-fit: contain`. |

Prop IDs: `coffee`, `fan`, `chair`, `bin`, `cat`, `certificate`, `aquarium`, `button`, `pizza-box`, `mug`, `parcel`, `cooler`.

* All keys are optional. A world needs at least one image.
* Formats: SVG, PNG, GIF or WebP. SVGs may be animated (the fan or the fish, for example).
* Flat, without perspective, because desks and sprites stand on the same plane. At night the plugin tints wall and floor automatically.
* Still drawn by the code: the monitor (shows live content), the window with sun and moon (follows the time of day), lamp, hopscotch, noticeboard and door. Position, behaviour and animation of the objects (cat, coffee machine and so on) stay in the plugin too; a world only changes how they look.

## 8. Adding a new set

1. Create a folder under `characters/` (its name is the set ID).
2. Put the sprites in as `<colour>_<mood>.gif`.
3. Create `sprites.json` with at least `name`.
4. Optional: add `world/world.json` with your own wall, floor, desk and object images (same structure as `world/`).
5. In the office, press **Sprites → Reload**.
6. Optional: pick a world in the **World** dropdown; its loaded character set is then used for every agent. With **Default**, choose the set and colour per agent.
