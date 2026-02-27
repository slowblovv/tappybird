import React, { useEffect } from 'react';
import { postEvent } from '@telegram-apps/sdk';

export default function App() {
  useEffect(() => {
    try {
      // Вызываем сразу — без async, без проверок
      postEvent('web_app_expand');
      postEvent('web_app_request_fullscreen');
    } catch (err) {
      console.error('TG init error', err);
    }
  }, []);

  return <div id="root">{/* ... */}</div>;
}
