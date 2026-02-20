import './index.css';

// paste this at the very top of your entry (src/index.js or src/game/game.js)
(async function tryTelegramFullscreen() {
  function log(...args) { console.log('[TG-FS]', ...args); }

  // helper: short sleep
  const wait = (ms) => new Promise(r => setTimeout(r, ms));

  // Try SDK v2 via dynamic import (safe for build)
  try {
    const sdk = await import('@telegram-apps/sdk');
    const { init, isTMA, viewport } = sdk;

    log('SDK imported');

    const runningInTMA = await (typeof isTMA === 'function' ? isTMA() : Promise.resolve(false));
    log('isTMA:', runningInTMA);

    if (!runningInTMA) {
      log('Not running inside Telegram Mini App (isTMA=false). Stop SDK fullscreen flow.');
    } else {
      init();
      log('SDK init done');

      log('viewport.mount.isAvailable:', viewport.mount.isAvailable && viewport.mount.isAvailable());
      if (viewport.mount.isAvailable()) {
        try {
          await viewport.mount();
          log('viewport.mount() OK');
        } catch (e) { log('viewport.mount() failed:', e); }
      }

      // small delay to let layout settle
      await wait(200);

      log('viewport.expand.isAvailable:', viewport.expand.isAvailable && viewport.expand.isAvailable());
      if (viewport.expand.isAvailable()) {
        try {
          await viewport.expand();
          log('viewport.expand() OK');
        } catch (e) { log('viewport.expand() failed:', e); }
      }

      await wait(200);

      log('viewport.requestFullscreen.isAvailable:', viewport.requestFullscreen && viewport.requestFullscreen.isAvailable && viewport.requestFullscreen.isAvailable());
      if (viewport.requestFullscreen && viewport.requestFullscreen.isAvailable && viewport.requestFullscreen.isAvailable()) {
        try {
          await viewport.requestFullscreen();
          log('viewport.requestFullscreen() -> success');
        } catch (err) {
          log('viewport.requestFullscreen() -> error:', err);
        }
      } else {
        log('viewport.requestFullscreen not available');
      }

      // final state
      log('Final: document.fullscreenElement', document.fullscreenElement, 'screen.orientation?', screen.orientation && screen.orientation.type);
    }
  } catch (err) {
    console.warn('[TG-FS] SDK import/flow failed:', err);
  }

  // Native fallback: Telegram WebApp (older API) — try expand and any requestFullscreen if exists
  try {
    const tg = window.Telegram && window.Telegram.WebApp;
    log('native Telegram.WebApp present?', !!tg);
    if (tg) {
      try { tg.expand && tg.expand(); log('tg.expand() called'); } catch(e){ log('tg.expand error', e); }
      // Some clients might expose requestFullscreen under different names — try common ones:
      try {
        if (tg.requestFullscreen) {
          await tg.requestFullscreen();
          log('tg.requestFullscreen() succeeded');
        } else {
          log('tg.requestFullscreen not present');
        }
      } catch(e){
        log('tg.requestFullscreen error', e);
      }
    }
  } catch (e) {
    log('native fallback error', e);
  }

  // If still no canvas/fullscreen, inject UI prompt and CSS fallback after small delay
  await wait(300);
  if (!document.fullscreenElement && !document.querySelector('canvas')) {
    log('No fullscreen and no canvas detected — injecting rotate/notice overlay as fallback');
    const overlayId = 'tg-fs-overlay';
    if (!document.getElementById(overlayId)) {
      const ov = document.createElement('div');
      ov.id = overlayId;
      ov.style.position = 'fixed';
      ov.style.left = 0;
      ov.style.top = 0;
      ov.style.width = '100%';
      ov.style.height = '100%';
      ov.style.zIndex = 99999;
      ov.style.display = 'flex';
      ov.style.alignItems = 'center';
      ov.style.justifyContent = 'center';
      ov.style.background = 'rgba(0,0,0,0.6)';
      ov.style.color = 'white';
      ov.style.fontSize = '18px';
      ov.style.textAlign = 'center';
      ov.innerHTML = '<div>Если вы в Telegram на телефоне — откройте мини-приложение через inline web_app кнопку или попробуйте повернуть устройство в ландшафт.<br/><br/><button id="tg-fs-hide-btn">Закрыть</button></div>';
      document.body.appendChild(ov);
      document.getElementById('tg-fs-hide-btn').onclick = () => ov.remove();
    }
  }
})();
