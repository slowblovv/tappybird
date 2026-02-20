import React, { useEffect } from 'react';
import { init, isTMA, viewport } from '@telegram-apps/sdk';

export default function App() {
  useEffect(() => {
    async function initTg() {
      try {
        if (await isTMA()) {
          init();

          if (viewport.mount.isAvailable()) {
            await viewport.mount();
            await viewport.expand();
          }

          if (viewport.requestFullscreen.isAvailable()) {
            await viewport.requestFullscreen();
          } else {
            console.log('viewport.requestFullscreen not available');
          }
        } else {
          console.log('Not running in Telegram Mini App');
        }
      } catch (err) {
        console.error('TG init error', err);
      }
    }
    initTg();
  }, []);

  return <div id="root">{/* ... */}</div>;
}
