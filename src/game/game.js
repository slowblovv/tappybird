import Phaser from 'phaser';
import { WebFontLoaderPlugin } from 'phaser3-webfont-loader';
import GameScene from './scenes/Game.js';
import PreloadScene from './scenes/Preload.js';
import './game.css';

console.log('game.js loaded'); // <- модуль загружен (должно появиться в консоли)

// Перед конфигом или в начале start()
function ensureGameContainer() {
  if (!document.getElementById('game')) {
    const el = document.createElement('div');
    el.id = 'game';
    el.style.width = '320px';
    el.style.height = '600px';
    el.style.margin = '0 auto';
    document.body.appendChild(el);
    console.log('Injected #game container via JS');
  } else {
    console.log('#game container already exists');
  }
}

// В start() вызови ensureGameContainer() перед new Phaser.Game(config)
const start = () => {
  try {
    console.log('Starting Phaser...');
    ensureGameContainer();
    new Phaser.Game(config);
    console.log('Phaser started');
  } catch (err) {
    console.error('Phaser failed to start:', err);
  }
};

const config = {
  type: Phaser.AUTO,
  parent: 'game',            // <- явно указываем контейнер
  autoCenter: true,
  width: 320,
  height: 600,
  backgroundColor: '#1e272e',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 },
    },
  },
  scene: [PreloadScene, GameScene],
  plugins: {
    global: [{
      key: 'WebFontLoader',
      plugin: WebFontLoaderPlugin,
      start: true,
    }],
  },
};

const start = () => {
  try {
    console.log('Starting Phaser...');
    new Phaser.Game(config);
    console.log('Phaser started');
  } catch (err) {
    console.error('Phaser failed to start:', err);
  }
};

// Надёжный запуск: если DOM уже готов — запускаем сразу, иначе ждём
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  start();
} else {
  window.addEventListener('DOMContentLoaded', start, { once: true });
}
