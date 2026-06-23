(function overrideBeforeReload() {
  const injected = document.createElement('script');
  injected.textContent = `
    Object.defineProperty(window, 'o1', {
      value: 'disabled',
      writable: false,
      configurable: false
    });
  `;
  document.documentElement.appendChild(injected);
  console.log('[bypass] Injected o1 override');
})();
