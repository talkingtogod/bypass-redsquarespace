(function forgeToStep2() {
  localStorage.setItem('adchk_step', '2');
  localStorage.setItem('adchk_res', JSON.stringify([false, false]));
  console.log('[bypass] Forged: step=2, res=[false, false]');
  console.log('[bypass] Reload. Only check3 will run.');
})();

(function forgeWithCheck3Override() {
  localStorage.setItem('adchk_step', '2');
  localStorage.setItem('adchk_res', JSON.stringify([false, false]));

  const origImage = window.Image;
  const patchedImage = function PatchedImage(w, h) {
    const img = new origImage(w, h);
    const origSrcDescriptor = Object.getOwnPropertyDescriptor(
      Object.getPrototypeOf(img), 'src'
    );

    const pixelDomains = [
      'pixel.rubiconproject.com',
      'sync.mathtag.com',
    ];

    Object.defineProperty(img, 'src', {
      get() {
        return origSrcDescriptor.get.call(this);
      },
      set(value) {
        if (typeof value === 'string' && pixelDomains.some(d => value.includes(d))) {
          setTimeout(() => this.onload && this.onload(), 0);
          return;
        }
        origSrcDescriptor.set.call(this, value);
      },
    });

    return img;
  };
  patchedImage.prototype = origImage.prototype;
  window.Image = patchedImage;
})();

(function forgeCompletePass() {
  localStorage.setItem('adchk_step', '2');
  localStorage.setItem('adchk_res', JSON.stringify([false, false, false]));
  console.log('[bypass] Forged complete pass.');
})();
