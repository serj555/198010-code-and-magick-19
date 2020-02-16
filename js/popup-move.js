'use strict';

// перемещение окна при клике на аватар
(function () {
  var POPUP_WINDOW = document.querySelector('.setup');
  var POPUP_USER_AVATAR = document.querySelector('.upload');
  var dragged = false;

  POPUP_USER_AVATAR.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      dragged = true;
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      POPUP_WINDOW.style.left = (POPUP_WINDOW.offsetLeft - shift.x) + 'px';
      POPUP_WINDOW.style.top = (POPUP_WINDOW.offsetTop - shift.y) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      // отменяет стандартное действие при перетаскивании окна
      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          POPUP_USER_AVATAR.removeEventListener('click', onClickPreventDefault);
        };
        POPUP_USER_AVATAR.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
