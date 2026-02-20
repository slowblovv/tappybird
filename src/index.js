import './index.css';

// src/index.js (поместите в самый верх или перед init игры)
async function initTelegramFullscreen() {
  try {
    const sdk = await import('@telegram-apps/sdk'); // динамический — безопасно для билда
    const { init, isTMA, viewport } = sdk;

    if (!(await isTMA())) {
      console.log('Not running as Telegram Mini App');
      return;
    }

    init(); // инициализируем SDK

    // Попробуем смонтировать BottomSheet (если доступно) и расшириться
    if (viewport.mount.isAvailable()) {
      await viewport.mount();
      // expand полезно вызвать, чтобы BottomSheet поднимется до максимума
      await viewport.expand();
    }

    // Подождём стабильности (если нужно) — viewport.stability говорит, изменится ли скоро размер
    // SDK может предоставить событие/проверку — при отсутствии, можно поставить короткую паузу.
    if (!viewport.stability) {
      // опционально: ждём небольшую паузу
      await new Promise(r => setTimeout(r, 300));
    }

    // Запрашиваем полноэкранный режим, если он доступен
    if (viewport.requestFullscreen.isAvailable()) {
      await viewport.requestFullscreen();
      console.log('Requested Telegram fullscreen');
    } else {
      console.log('requestFullscreen not available');
    }

  } catch (err) {
    console.warn('Telegram fullscreen init failed (SDK missing or error):', err);
  }
}

// Запуск при DOMContentLoaded
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  initTelegramFullscreen();
} else {
  window.addEventListener('DOMContentLoaded', initTelegramFullscreen, { once: true });
}
