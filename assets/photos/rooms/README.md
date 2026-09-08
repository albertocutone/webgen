# Room photographs

One folder per room. Drop photographs straight in — **any filename works**, no
code change needed:

```bash
cp ~/Desktop/IMG_4821.jpg assets/photos/rooms/doppia/
npm run images
```

The first file alphabetically becomes that room's card image on
`/appartamenti`; the rest are processed too and are available for a gallery
later. Until a folder has something in it, the card keeps the placeholder.

| Folder                | Room (as shown on the site)      | Sleeps |
| --------------------- | -------------------------------- | ------ |
| `doppia-economy/`     | Camera Doppia Economy            | 2      |
| `doppia/`             | Camera Doppia                    | 2      |
| `tripla-giardino/`    | Camera Tripla con Vista Giardino | 3      |
| `tripla-superior/`    | Camera Tripla Superior           | 3      |
| `familiare-superior/` | Camera Familiare Superior        | 4      |

Folder names match the room `id`s in `src/content/it/site.js`. Renaming a
folder without renaming the id there silently drops the photo.

**Sizing:** anything from about 1200px wide up is fine — the build produces
480/768/1200/1800/2400px WebP variants and never upscales. Landscape suits the
4:3 cards best.

`../venue/` is for general property shots that are not tied to one room.
