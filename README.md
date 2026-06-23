# bypass-ad

bypass the red-square.space B.Y.P.A.S.S browser integrity check.

## usage

see [docs/human-guide.md](docs/human-guide.md) for all bypass methods.

## src

| file | method |
|------|--------|
| `src/url-direct-bypass.js` | navigate straight to `/TaskStarted` |
| `src/override-o1-bypass.js` | flip `window.o1` to skip all checks |
| `src/localStorage-forge-bypass.js` | forge `adchk_step` / `adchk_res` |
| `src/network-spoof-bypass.js` | spoof `fetch()` + `Image` for ad domains |

## license

Copyright 2026 talkingtogod. All rights reserved. See [LICENSE](LICENSE).
