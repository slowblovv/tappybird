import React, { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (tg) {
      tg.ready();
      tg.expand();
      // requestFullscreen появился в v8.0
      if (typeof tg.requestFullscreen === 'function') {
        tg.requestFullscreen();
      }
      // Отключаем свайп вниз чтобы не закрывалось
      tg.disableVerticalSwipes?.();
    }
  }, []);

  return <div id="root">{/* ... */}</div>;
}
