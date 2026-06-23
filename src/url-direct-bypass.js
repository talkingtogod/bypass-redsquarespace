(function directFromPage() {
  const base = window.location.href;
  if (base.includes('DTOM')) {
    const next = base.replace('DTOM', 'TaskStarted') + '&CA=' + crypto.randomUUID();
    window.location.href = next;
  } else {
    console.warn('[bypass] URL does not contain "DTOM". Use hardcoded method.');
  }
})();

(function directHardcoded() {
  const TASK_STARTED =
    '/TaskStarted/184e7f8b-064f-4b7b-be8b-2b965125a6d6' +
    '?antibypass=true' +
    '&CA=' + crypto.randomUUID();
  console.log('[bypass] Target ->', TASK_STARTED);
})();

(function directConstruct() {
  const path =
    window.location.origin +
    '/TaskStarted/184e7f8b-064f-4b7b-be8b-2b965125a6d6' +
    '?antibypass=true' +
    '&CA=' + crypto.randomUUID();
  console.log('[bypass] Target ->', path);
})();
