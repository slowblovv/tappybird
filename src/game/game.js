import Phaser from 'phaser';
import { WebFontLoaderPlugin } from 'phaser3-webfont-loader';
import GameScene from './scenes/Game.js';
import PreloadScene from './scenes/Preload.js';
import './game.css';

import IconFriends from './assets/icons/icon-friends.png';
import IconLeaderboard from './assets/icons/icon-leaderboard.png';
import IconTasks from './assets/icons/icon-tasks.png';
import IconMarket from './assets/icons/icon-market.png';
import IconPlay from './assets/icons/icon-play.png';

console.log('game.js loaded');

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

function ensureGameContainer() {
  if (!document.getElementById('game')) {
    const el = document.createElement('div');
    el.id = 'game';
    el.style.width = '100%';
    el.style.height = '100%';
    document.body.appendChild(el);
  }
}

function setNavIcons() {
  document.querySelector('[data-screen="friends"] .nav-icon').innerHTML = `<img src="${IconFriends}" alt="friends">`;
  document.querySelector('[data-screen="leaderboard"] .nav-icon').innerHTML = `<img src="${IconLeaderboard}" alt="leaderboard">`;
  document.querySelector('[data-screen="tasks"] .nav-icon').innerHTML = `<img src="${IconTasks}" alt="tasks">`;
  document.querySelector('[data-screen="market"] .nav-icon').innerHTML = `<img src="${IconMarket}" alt="market">`;
}

const start = () => {
  try {
    ensureGameContainer();
    new Phaser.Game(config);
  } catch (err) {
    console.error('Phaser failed to start:', err);
  }
};

if (document.readyState === 'complete' || document.readyState === 'interactive') {
  start();
} else {
  window.addEventListener('DOMContentLoaded', start, { once: true });
}

document.addEventListener('DOMContentLoaded', () => {
  setNavIcons();

  const navBtns = document.querySelectorAll('.nav-btn');
  const screens = document.querySelectorAll('.screen');
  const closeBtns = document.querySelectorAll('.screen-close');
  let activeScreen = null;

  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const screenId = 'screen-' + btn.dataset.screen;
      const screen = document.getElementById(screenId);

      if (activeScreen === screenId) {
        screen.classList.remove('open');
        btn.classList.remove('active');
        activeScreen = null;
        return;
      }

      screens.forEach(s => s.classList.remove('open'));
      navBtns.forEach(b => b.classList.remove('active'));

      screen.classList.add('open');
      btn.classList.add('active');
      activeScreen = screenId;
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      screens.forEach(s => s.classList.remove('open'));
      navBtns.forEach(b => b.classList.remove('active'));
      activeScreen = null;
    });
  });
});
