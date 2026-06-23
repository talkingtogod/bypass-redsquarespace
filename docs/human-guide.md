# bypass-ad

bypass the `Checking your browser's integrity` screen on red-square.space (B.Y.P.A.S.S)

## direct-url

```js
window.location.href = '/TaskStarted/184e7f8b-064f-4b7b-be8b-2b965125a6d6?antibypass=true&CA=' + crypto.randomUUID()
```

skips all checks, goes straight to the page

## o1-override

```js
// userscript @run-at document-start, or puppeteer addInitScript
Object.defineProperty(window, 'o1', { value: 'disabled' })
```

gates all checks set to anything but `"enabled"` and they're skipped

## localStorage-forge

```js
localStorage.setItem('adchk_step', '2')
localStorage.setItem('adchk_res', JSON.stringify([false, false]))
```

jumps to final step with clean results for guaranteed pass also patch Image to spoof pixel probe:

```js
const orig = window.Image
const PixelDomains = ['pixel.rubiconproject.com', 'sync.mathtag.com']
window.Image = function(w, h) {
  const img = new orig(w, h)
  const desc = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(img), 'src')
  Object.defineProperty(img, 'src', {
    get() { return desc.get.call(this) },
    set(v) {
      if (typeof v === 'string' && PixelDomains.some(d => v.includes(d))) {
        setTimeout(() => this.onload?.(), 0); return
      }
      desc.set.call(this, v)
    },
  })
  return img
}
Image.prototype = orig.prototype
```

## network-spoof

```js
// addInitScript or userscript @run-at document-start
const AD_DOMAINS = [
  'pagead2.googlesyndication.com',  'securepubads.g.doubleclick.net',
  'static.ads-twitter.com',         'acdn.adnxs.com',
  'c.amazon-adsystem.com',          'cdn.taboola.com',
  'sb.scorecardresearch.com',       'widgets.outbrain.com',
  'ad.doubleclick.net',             'sync.mathtag.com',
  'pixel.rubiconproject.com',
]
const isAd = u => AD_DOMAINS.some(d => u.includes(d))

const nf = window.fetch
window.fetch = (i, init) => isAd(typeof i === 'string' ? i : i?.url)
  ? Promise.resolve(new Response(null, { status: 200 }))
  : nf.call(this, i, init)

const nI = window.Image
window.Image = function(w, h) {
  const img = new nI(w, h)
  const d = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(img), 'src')
  Object.defineProperty(img, 'src', {
    get() { return d.get.call(this) },
    set(v) {
      if (typeof v === 'string' && isAd(v)) { Promise.resolve().then(() => this.onload?.()); return }
      d.set.call(this, v)
    },
    configurable: true,
  })
  return img
}
Image.prototype = nI.prototype
```

returns 200 for every ad-domain fetch and fires onload for every ad pixel

