import Player from '@vimeo/player';
const throttle = require('lodash.throttle');

const iframeEl = document.querySelector('iframe');

const player = new Player(iframeEl);

player.on('timeupdate', ({ seconds }) => {
  updateLocalStorageThrottled(seconds);
});

const updateLocalStorageThrottled = throttle(seconds => {
  localStorage.setItem('videoplayer-current-time', seconds);
}, 1000);

const savedTime = localStorage.getItem('videoplayer-current-time');
if (savedTime) {
  player.setCurrentTime(parseFloat(savedTime));
}
