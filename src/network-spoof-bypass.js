const AD_DOMAINS = [
  'pagead2.googlesyndication.com',
  'securepubads.g.doubleclick.net',
  'static.ads-twitter.com',
  'acdn.adnxs.com',
  'c.amazon-adsystem.com',
  'cdn.taboola.com',
  'sb.scorecardresearch.com',
  'widgets.outbrain.com',
  'ad.doubleclick.net',
  'sync.mathtag.com',
  'pixel.rubiconproject.com',
];

function isAdUrl(url) {
  return AD_DOMAINS.some(domain => url.includes(domain));
}

(function spoofFetch() {
  const nativeFetch = window.fetch;

  window.fetch = function spoofedFetch(input, init) {
    const url = typeof input === 'string' ? input : input?.url;

    if (url && isAdUrl(url)) {
      return Promise.resolve(
        new Response(null, {
          status: 200,
          statusText: 'OK',
          headers: { 'Content-Type': 'text/plain' },
        })
      );
    }

    return nativeFetch.call(this, input, init);
  };
})();

(function spoofImage() {
  const nativeImage = window.Image;

  window.Image = function PatchedImage(width, height) {
    const img = new nativeImage(width, height);
    const nativeSrcDescriptor = Object.getOwnPropertyDescriptor(
      Object.getPrototypeOf(img), 'src'
    );

    Object.defineProperty(img, 'src', {
      get() {
        return nativeSrcDescriptor.get.call(this);
      },
      set(value) {
        if (typeof value === 'string' && isAdUrl(value)) {
          Promise.resolve().then(() => {
            if (typeof this.onload === 'function') this.onload();
          });
          return;
        }
        nativeSrcDescriptor.set.call(this, value);
      },
      configurable: true,
    });

    return img;
  };

  window.Image.prototype = nativeImage.prototype;
})();
