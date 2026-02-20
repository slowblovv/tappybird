import React, { useEffect } from 'react';
import { init, isTMA, viewport } from '@telegram-apps/sdk'; // согласно примеру на SO

function App() {
  useEffect(() => {
    async function initTg() {
      if (await isTMA()) {           // проверяем, что это Telegram Mini App
        init();                      // инициализируем SDK

        // если доступно mount (встраивание)
        if (viewport.mount.isAvailable()) {
          await viewport.mount();    // монтируем (если требуется)
          viewport.expand();         // разворачиваем WebApp (из аккаунта)
        }

        // запросить нативный полноэкран, если доступен
        if (viewport.requestFullscreen.isAvailable()) {
          await viewport.requestFullscreen();
        }
      }
    }
    initTg();
  }, []);

  return (
    <div id="root">
      {/* ваше приложение */}
    </div>
  );
}

export default App;
