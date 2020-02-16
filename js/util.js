'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var isEscEvent = function (evt, action) {
    if (evt.keyCode === ESC_KEYCODE) {
      action();
    }
  };
  var isEnterEvent = function (evt, action) {
    if (evt.keyCode === ENTER_KEYCODE) {
      action();
    }
  };

  // функция получения значения из рандомного елемента массива
  var getRandomElement = function (array) {
    return array[Math.floor(Math.random() * (array.length - 1))];
  };

  window.util = {
    ESC_KEYCODE: ESC_KEYCODE,
    ENTER_KEYCODE: ENTER_KEYCODE,
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent,
    getRandomElement: getRandomElement,
  };
})();
