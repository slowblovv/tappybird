import Phaser from 'phaser';
import { WebFontLoaderPlugin } from 'phaser3-webfont-loader';
import GameScene from './scenes/Game.js';
import PreloadScene from './scenes/Preload.js';
import './game.css';

console.log('game.js loaded'); // должен появиться в консоли при выполнении скрипта

// Конфиг Phaser (оставляем выше start, чтобы всё было очевидно)
const config = {
  type: Phaser.AUTO,
  parent: 'game',
  backgroundColor: '#1e272e',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 320,
    height: 600,
  },
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

// fallback: создаём контейнер, если его нет в HTML
function ensureGameContainer() {
  if (!document.getElementById('game')) {
    const el = document.createElement('div');
    el.id = 'game';
    el.style.width = '100%';
    el.style.height = '100%';
    document.body.appendChild(el);
    console.log('Injected #game container via JS');
  } else {
    console.log('#game container already exists');
  }
}

// ЕДИНСТВЕННАЯ функция start — запускает Phaser
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

// Надёжный запуск: если DOM уже готов — запускаем сразу, иначе ждём
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  start();
} else {
  window.addEventListener('DOMContentLoaded', start, { once: true });
}
