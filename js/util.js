'use strict';

(function () {
  var KeyCode = {
    ESC: 27,
    ENTER: 13,
  };

  var isEscEvent = function (evt, action) {
    if (evt.keyCode === KeyCode.ESC) {
      action();
    }
  };
  var isEnterEvent = function (evt, action) {
    if (evt.keyCode === KeyCode.ENTER) {
      action();
    }
  };

  // функция получения значения из рандомного елемента массива
  var getRandomElement = function (array) {
    return array[Math.floor(Math.random() * (array.length - 1))];
  };

  // изменение положения элемента
  var changeCoordElement = function (elem, x, y) {
    elem.style.left = (elem.offsetLeft - x) + 'px';
    elem.style.top = (elem.offsetTop - y) + 'px';
  };

  // сброс координат елемента до изночальных
  var resetCoordElement = function (elem) {
    elem.style.left = '';
    elem.style.top = '';
  };

  window.util = {
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent,
    getRandomElement: getRandomElement,
    changeCoordElement: changeCoordElement,
    resetCoordElement: resetCoordElement
  };
})();
