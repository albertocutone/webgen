# assets/

Inputs to the build. Nothing here is served directly — `public/` is generated
from it (see `scripts/build-logo.mjs` and `scripts/optimize-images.mjs`).

| Folder    | Committed    | What it is                                                                                                                   |
| --------- | ------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| `brand/`  | ✅ yes       | The venue's logo, as supplied. `npm run logo` turns it into the header mark, favicon, apple-touch-icon and social card.      |
| `photos/` | ✅ yes       | The photographs actually used on the site, at full resolution. `npm run images` emits responsive WebP into `public/images/`. |
| `source/` | ❌ **never** | Raw material the site was built from: the saved Facebook pages and every usable photograph out of that export.               |

## Why `source/` is not committed

The saved Facebook pages contain the owner's **personal account email**, and
this repository is public. They are kept locally for provenance — so a claim on
the site can be traced back to where it came from — but must not be pushed.

`source/facebook-2026-09/` holds the two saved pages plus 14 photographs,
named by whether the site uses them (`used-as-hero-…`, `unused-03-…`) and
carrying their pixel dimensions. Facebook's 31 MB of bundled JavaScript and CSS
was discarded; only the pages and images were kept.

## Adding a photograph

Drop a JPEG into `photos/` and rebuild. The filename is the key:

```bash
cp ~/Desktop/new-room.jpg assets/photos/tripla-superior.jpg
npm run images
```

Name it after a room id from `src/content/it/site.js` — `doppia-economy`,
`doppia`, `tripla-giardino`, `tripla-superior`, `familiare-superior` — and that
room's card picks it up with no code change. Anything unmatched keeps its
placeholder. Several unused photographs are sitting in `source/…/photos/` if
you want to promote one.
