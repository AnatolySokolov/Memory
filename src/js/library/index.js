'use strict';

export const library = {
  getRandomInt: function (max) {
    return Math.floor(Math.random() * (max + 1));
  },

  getRandomElFromArr: function (arr) {
    const r = library.getRandomInt(arr.length - 1);

    return arr.find((el, i) => {
      if (i === r) return el;
    });
  }
};
