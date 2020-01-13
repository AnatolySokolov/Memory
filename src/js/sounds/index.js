'use strict';

const { Howl } = require('howler');

const settings = {
  src: ['./assets/sounds/gameSound.mp3'],
  sprite: {
    open: [0, 400],
    plus: [2000, 1900],
    minus: [5000, 1950],
    end: [8000, 6400],
  }
};

export const gameSound = new Howl(settings);
