import './index.css';
import { init, isTMA, viewport } from '@telegram-apps/sdk';

async function start() {
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
}

// Запуск когда DOM готов
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  start();
} else {
  window.addEventListener('DOMContentLoaded', start, { once: true });
}
