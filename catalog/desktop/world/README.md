# World: room, sizes and elements

This folder is the default world of Hermes Office. It is used for "Plugin default icons", for "Hermes agent avatars", and for sprites when a character set brings no `world.json` of its own. How a set adds its own world is described in [../characters/README.md](../characters/README.md) (section 7). This file lists the sizes everything is built on.

All sizes are CSS pixels at 100 % zoom. Images may be supplied at a higher resolution (SVG is ideal; for PNG, use 2× or 3×). What matters is the aspect ratio and where the content sits inside the image.

## 1. The room

```
+--------------------------------------------------------------+ -
|  WALL  (86 px high, tile repeats horizontally)               | 86
+--------------------------------------------------------------+ -
|                                                              |
|  FLOOR  (tile repeats in both directions)                    |
|    desks in a grid, agents stand behind them                 |
|                                                              |
|  [ furniture strip: 150 px high, at the very bottom ]        |
+--------------------------------------------------------------+
```

| Property | Value |
|---|---|
| Width | follows the window: window width minus 36 px, at most **1242 px**. The floor is at least 560 px wide; below that the room scrolls. |
| Height | preferred 690 px, at most 90 % of (window height minus 245 px), at least 162 px. The floor area itself is at least **466 px** high (86 px wall + 380 px). |
| Wall | fixed height **86 px**, with a 12 px shadow gradient below it. |
| Floor | starts right under the wall (y = 86 px) and fills the rest. The floor tile starts there. |
| Room shape | rounded corners (10 px), border and shadow. The plugin draws these, not the world. |
| Perspective | none. Wall and floor are flat so desks and sprites stand on the same plane. |
| Night | a dark tint (52 %) is laid over wall and floor automatically. A world does not need a night image. |

Wall and floor are **tiles**, not one big picture. A tile must be seamless when it repeats (the wall only horizontally, the floor in both directions). For one large wall picture, set `wallSize` to the picture's width and keep in mind that the room can be up to 1242 px wide.

| File | Tile size (default) | Repeat |
|---|---|---|
| `wall.svg` | 160 × 86 px (`wallSize`) | horizontal. Height is always 86 px. |
| `floor.svg` | 96 × 96 px (`floorSize`) | horizontal and vertical |

## 2. The desk

Desks sit in a grid with as many columns as fit at 168 px or more per cell. Cells grow with the window up to about 250 px, with an 18 to 20 px gap.

| Part | Value |
|---|---|
| Cell | 168 px to about 250 px wide |
| Desk (`desk.svg`) | **width = cell width minus 16 px** (about 152 to 234 px), **height 68 px** |
| Image layout | top 34 px (50 %) = desktop seen from above, bottom 34 px = legs and front |
| Stretching | the image is stretched to the width (`preserveAspectRatio="none"`). Edges and legs may stretch; keep round details near the middle. |
| Position | the top edge of the desk is 48 px below the top of the cell, with 8 px space left and right |
| Agent | stands behind the desk; the feet disappear behind the desktop |

The example [desk.svg](./desk.svg) uses `viewBox="0 0 120 68"`. The ratio is only a guide because the width varies.

The code draws more things on the desk: the monitor (58 × 40 px), the lamp and the name plate. The monitor stands behind the agent on top of the desk.

## 3. The agent (for reference)

So a world fits the characters:

| Part | Value |
|---|---|
| Sprite | inserted at 42 × 42 px and then scaled by **2.73**, so it appears about **115 × 115 px**. Anchored at the bottom centre. |
| Wall portrait | Employee of the Month: frame 64 × 64 px, picture 72 × 72 px |
| Speech bubbles | above the head, about 70 px above the sprite |

A world for very large or very small characters should size the desk and objects to match. The desk is 68 px high; a 115 px sprite clearly towers over it.

## 4. Objects (`props/`)

Every object sits in a **square 42 × 42 px box** and is centred in it with `object-fit: contain`. Objects should be transparent and rest on the bottom of the image. The exception is `cooler.svg`.

| ID | File | Box | Where it stands | Note |
|---|---|---|---|---|
| `coffee` | `coffee.svg` | 42 × 42 | furniture strip, x 17 %, y 79 | stands on a counter drawn by the code (65 × 28 px), shifted up by 10 px |
| `fan` | `fan.svg` | 42 × 42 | furniture strip, x 35 %, y 81 | |
| `chair` | `chair.svg` | 42 × 42 | furniture strip, x 53 %, y 78 | also used in scenes (ice, boss) |
| `bin` | `bin.svg` | 42 × 42 | furniture strip, x 69 %, y 83 | |
| `cat` | `cat.svg` | 42 × 42 | furniture strip, x 83 %, y 78 | |
| `certificate` | `certificate.svg` | 42 × 42 | x 12 %, y 63 | unlocked after the first completed task |
| `aquarium` | `aquarium.svg` | 42 × 42 | x 31 %, y 65 | from 5 tasks |
| `button` | `button.svg` | 42 × 42 | x 66 %, y 67 | from 10 tasks |
| `pizza-box` | `pizza-box.svg` | 42 × 42 | x 83 %, y 63 | from 20 tasks |
| `mug` | `mug.svg` | 42 × 42 | on the desk, scaled to 35 % | desk keepsake, up to three |
| `parcel` | `parcel.svg` | 42 × 42 | on the desk | delivery for the agent |
| `cooler` | `cooler.svg` | **22 × 52** | wall, 46 px from the left, 42 px from the top | portrait, not square |

The furniture strip (`office-life-scene`) is 150 px high at the bottom of the room. The percentages are the default positions; users can move furniture with **Furnish**. Every piece of furniture takes a clickable area of **66 × 60 px**.

When an image is set, the code does **not animate** the object. Movement (a spinning fan, a swimming fish) has to live inside the SVG itself, as in the examples.

## 5. What a world does not supply (still in the code)

These are still drawn by the plugin and cannot be replaced through `world.json`:

| Element | Size |
|---|---|
| Monitor and screen content | 58 × 40 px |
| Window with sun and moon (follows the time of day) | 44 × 40 px, 24 % from the right |
| Desk lamp (at night) | 16 × 26 px |
| Door | 54 × 78 px, at 48 % from the left |
| Noticeboard | 89 × 50 px, at 20 % from the left |
| Sofa and rug (lounge) | 105 × 42 px, rug 34 % wide |
| Bar (counter, shelf, stools) | counter 28 px high |
| Hopscotch | squares on the floor |
| Wall clock (analogue or digital) | freely movable |
| Employee of the Month frame | 64 × 64 px, golden frame |

## 6. Is this enough to build very different worlds?

For a first, simple version, yes: wall, floor, desk and the twelve objects can all be redesigned. A block-style room gets a block floor and wall, a wooden desk, a chest instead of the paper bin, and so on.

Limits for a completely different world (a spaceship, a castle):

* **Window, door, noticeboard, sofa, rug, lamp, monitor, hopscotch and bar** stay office items and would stand out. They would need to become extra slots in `world.json`. That is possible but not done yet.
* **Object names** (coffee machine, cat, paper bin) live in the plugin. A chest shown as `bin` keeps the label "Paper bin". This could also be made overridable in `world.json`.
* **Texts and scenes** (boss visit, printer, pizza, ice rink) are office scenes and stay that way.
* **UI colours** (chips, speech bubbles, menu) come from the Hermes theme, not from the world.

So for a very different world: fill the existing slots first (wall, floor, desk, twelve objects), then decide which of the remaining office elements should become extra slots.
