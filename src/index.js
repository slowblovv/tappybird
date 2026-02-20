import './index.css';

// src/App.jsx (пример)
import React, { useEffect } from 'react';
import { viewport, init, isTMA } from '@telegram-apps/sdk';

export default function App() {
  useEffect(() => {
    let mounted = true;

    async function initTg() {
      try {
        if (!(await isTMA())) return; // не в Telegram — не делаем ничего
        init(); // инициализируем SDK

        // если доступен mount — монтируем и сначала расширяем
        if (viewport.mount.isAvailable()) {
          await viewport.mount();
          viewport.expand();
        }

        // затем запрашиваем full screen (если доступно)
        if (viewport.requestFullscreen.isAvailable()) {
          await viewport.requestFullscreen();
        }
      } catch (err) {
        console.warn('Telegram SDK fullscreen init failed:', err);
      }
    }

    initTg();

    return () => { mounted = false; };
  }, []);

  return (
    <div id="root">
      {/* ваше приложение */}
    </div>
  );
}
