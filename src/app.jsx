import React, { useEffect } from 'react';
import { init, isTMA, postEvent } from '@telegram-apps/sdk';

export default function App() {
  useEffect(() => {
    async function initTg() {
      try {
        if (await isTMA()) {
          init();
          
          // Разворачивает BottomSheet на весь экран
          postEvent('web_app_expand');
          
          // Запрашивает полный fullscreen (убирает бары Telegram) — доступно с v8.0
          postEvent('web_app_request_fullscreen');
        }
      } catch (err) {
        console.error('TG init error', err);
      }
    }
    initTg();
  }, []);

  return <div id="root">{/* ... */}</div>;
}
