import './index.css';

async function initTelegramSdkIfAvailable() {
  try {
    const mod = await import('@telegram-apps/sdk');
    const { init, isTMA, viewport } = mod;
    if (await isTMA()) {
      init();
      if (viewport.mount.isAvailable()) {
        await viewport.mount();
        viewport.expand();
      }
      if (viewport.requestFullscreen.isAvailable()) {
        await viewport.requestFullscreen();
      }
    }
  } catch (err) {
    // модуль недоступен — просто игнорируем (или логируем)
    console.warn('@telegram-apps/sdk not available, skipping Telegram-specific init', err);
  }
}

if (document.readyState === 'complete' || document.readyState === 'interactive') {
  initTelegramSdkIfAvailable();
} else {
  window.addEventListener('DOMContentLoaded', initTelegramSdkIfAvailable, { once: true });
}
