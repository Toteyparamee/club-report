export function detectPlatform() {
  const ua = navigator.userAgent || '';
  const isStandalone =
    window.matchMedia?.('(display-mode: standalone)').matches ||
    window.navigator.standalone === true;

  const isIOS = /iPhone|iPad|iPod/.test(ua) || (ua.includes('Macintosh') && navigator.maxTouchPoints > 1);
  const isAndroid = /Android/.test(ua);
  const isSafari = /Safari/.test(ua) && !/Chrome|CriOS|FxiOS|EdgiOS/.test(ua);
  const isChrome = /Chrome/.test(ua) && !/Edg|OPR/.test(ua);
  const isFirefox = /Firefox/.test(ua);
  const isEdge = /Edg/.test(ua);

  let os = 'desktop';
  if (isIOS) os = 'ios';
  else if (isAndroid) os = 'android';

  let browser = 'other';
  if (isEdge) browser = 'edge';
  else if (isChrome) browser = 'chrome';
  else if (isFirefox) browser = 'firefox';
  else if (isSafari) browser = 'safari';

  return { os, browser, isStandalone };
}
