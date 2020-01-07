'use strict';

function getRandomInt(max) {
  return Math.floor(Math.random() * (max + 1));
}

function getRandomElFromArr(arr) {
  const r = getRandomInt(arr.length - 1);

  return arr.find((el, i) => {
    if (i === r) return el;
  });
}

export { getRandomInt, getRandomElFromArr };
