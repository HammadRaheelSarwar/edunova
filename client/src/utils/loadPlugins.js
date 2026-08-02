/**
 * useJQueryPlugins — dynamically loads jQuery + all vendor plugins in order,
 * then calls the provided callback once everything is ready.
 * This ensures carousels init AFTER React has painted the DOM.
 */

const SCRIPTS = [
  '/vendor/jquery/jquery.min.js',
  '/vendor/bootstrap/js/bootstrap.bundle.min.js',
  '/assets/js/isotope.min.js',
  '/assets/js/owl-carousel.js',
  '/assets/js/lightbox.js',
  '/assets/js/slick-slider.js',
];

let scriptsLoaded = false;
let loadingPromise = null;

function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const s = document.createElement('script');
    s.src = src;
    s.onload = resolve;
    s.onerror = reject;
    document.body.appendChild(s);
  });
}

export function loadAllPlugins() {
  if (scriptsLoaded) return Promise.resolve();
  if (loadingPromise) return loadingPromise;

  loadingPromise = SCRIPTS.reduce(
    (chain, src) => chain.then(() => loadScript(src)),
    Promise.resolve()
  ).then(() => {
    scriptsLoaded = true;
  });

  return loadingPromise;
}
