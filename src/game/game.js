import Phaser from 'phaser';
import { WebFontLoaderPlugin } from 'phaser3-webfont-loader';
import GameScene from './scenes/Game.js';
import PreloadScene from './scenes/Preload.js';
import './game.css';

const config = {
  type: Phaser.AUTO,
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

// запуск игры — robust version
const start = () => {
  try {
    console.log('Starting Phaser...');
    new Phaser.Game(config);
    console.log('Phaser started');
  } catch (err) {
    console.error('Phaser failed to start:', err);
  }
};

// Если документ уже загружен — запускаем сразу, иначе ждём DOMContentLoaded
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  // already ready
  start();
} else {
  window.addEventListener('DOMContentLoaded', start, { once: true });
}
