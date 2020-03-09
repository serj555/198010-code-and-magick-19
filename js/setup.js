// Файл setup.js
'use strict';

(function () {
  var Nodes = {
    POPUP_WINDOW: document.querySelector('.setup'),
    POPUP_OPEN: document.querySelector('.setup-open'),
    POPUP_CLOSE: document.querySelector('.setup-close'),
    POPUP_USER_NAME: document.querySelector('.setup-user-name'),
    POPUP_USER_AVATAR: document.querySelector('.upload'),
    SIMILAR_WINDOW: document.querySelector('.setup-similar'),
  };

  var statFocusInput = false;

  var onFocusInput = function () {
    statFocusInput = true;
  };

  var onBlurInput = function () {
    statFocusInput = false;
  };

  // функция отображения скрытого элемента
  var showElement = function () {
    Nodes.POPUP_WINDOW.classList.remove('hidden');
  };

  // функция скрытия элемента
  var hideElement = function () {
    Nodes.POPUP_WINDOW.classList.add('hidden');
  };

  // функция открытия окна
  var openPopup = function () {
    showElement();
    document.addEventListener('keydown', onPopupEscPress);
    Nodes.POPUP_USER_NAME.addEventListener('focus', onFocusInput);
    Nodes.POPUP_USER_NAME.addEventListener('blur', onBlurInput);
  };

  // функция закрытия окна
  var closePopup = function () {
    hideElement();
    window.util.resetCoordElement(Nodes.POPUP_WINDOW);
    document.removeEventListener('keydown', onPopupEscPress);
    Nodes.POPUP_USER_NAME.removeEventListener('focus', onFocusInput);
    Nodes.POPUP_USER_NAME.removeEventListener('blur', onBlurInput);
  };

  // закрытие окна при нажатии Esc
  var onPopupEscPress = function (evt) {
    if (!statFocusInput) {
      window.util.isEscEvent(evt, closePopup);
    }
  };

  // вставка заполненного фрагмента в DOM
  var insertWizards = function () {
    window.wizard.render();
    Nodes.SIMILAR_WINDOW.classList.remove('hidden');
  };

  // События
  Nodes.POPUP_OPEN.addEventListener('click', function () {
    openPopup();
  });

  Nodes.POPUP_OPEN.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openPopup);
  });

  Nodes.POPUP_CLOSE.addEventListener('click', function () {
    closePopup();
  });

  Nodes.POPUP_CLOSE.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closePopup);
  });

  insertWizards();
})();
