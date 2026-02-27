import React, { useEffect } from 'react';
import { init, isTMA, viewport } from '@telegram-apps/sdk';

export default function App() {
  useEffect(() => {
  async function initTg() {
    try {
      // 1. Сначала нативный WebApp API
      if (window.Telegram?.WebApp) {
        window.Telegram.WebApp.ready();
        window.Telegram.WebApp.expand();                    // убирает BottomSheet
        window.Telegram.WebApp.requestFullscreen?.();       // полный fullscreen (убирает бары Telegram)
        window.Telegram.WebApp.isVerticalSwipesEnabled = false; // отключает свайп вниз
      }

      // 2. Потом SDK
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
    } catch (err) {
      console.error('TG init error', err);
    }
  }
  initTg();
}, []);

  return <div id="root">{/* ... */}</div>;
}
