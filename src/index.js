import './index.css';
(async function() {
  try {
    const { init, isTMA, viewport } = await import('@telegram-apps/sdk');

    if (await isTMA()) {
      init();
      if (viewport.mount.isAvailable()) {
        await viewport.mount();
        await viewport.expand();
      }
      if (viewport.requestFullscreen.isAvailable()) {
        await viewport.requestFullscreen();
      }
    }
  } catch (e) {
    console.warn('TG SDK error / not available', e);
  }
})();
