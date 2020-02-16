// Файл setup.js
'use strict';

(function () {
  var Nodes = {
    SETUP_WINDOW: document.querySelector('.setup'),
    SETUP_OPEN: document.querySelector('.setup-open'),
    SETUP_CLOSE: document.querySelector('.setup-close'),
    SETUP_USER_NAME: document.querySelector('.setup-user-name'),
    SETUP_WIZARD_APPEARANCE: document.querySelector('.setup-wizard-appearance'),
    WIZARD_COAT: document.querySelector('.setup-wizard .wizard-coat'),
    WIZARD_EYES: document.querySelector('.setup-wizard .wizard-eyes'),
    WIZARD_FIREBALL: document.querySelector('.setup-fireball-wrap')
  };
  var FIREBALL_COLOR = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848',
  ];
  var statFocusInput = false;

  // случайный выбор цвета мантии волшебника
  var onWizardCoatColor = function () {
    var coatColor = window.util.getRandomElement(window.wizard.COAT_COLOR);
    Nodes.WIZARD_COAT.style.fill = coatColor;
    Nodes.SETUP_WIZARD_APPEARANCE.querySelector('input[name="coat-color"]').value = coatColor;
  };

  // случайный выбор цвета глаз волшебника
  var onWizardEyesColor = function () {
    var eyesColor = window.util.getRandomElement(window.wizard.EYES_COLOR);
    Nodes.WIZARD_EYES.style.fill = eyesColor;
    Nodes.SETUP_WIZARD_APPEARANCE.querySelector('input[name="eyes-color"]').value = eyesColor;
  };

  // случайный выбор цвета файрбола волшебника
  var onWizardFireballColor = function () {
    var fireballColor = window.util.getRandomElement(FIREBALL_COLOR);
    Nodes.WIZARD_FIREBALL.style.background = fireballColor;
    Nodes.WIZARD_FIREBALL.querySelector('input').value = fireballColor;
  };

  var onFocusInput = function () {
    statFocusInput = true;
  };

  var onBlurInput = function () {
    statFocusInput = false;
  };

  // функция отображения скрытого элемента
  var showElement = function () {
    Nodes.SETUP_WINDOW.classList.remove('hidden');
  };

  // функция скрытия элемента
  var hideElement = function () {
    Nodes.SETUP_WINDOW.classList.add('hidden');
  };

  // закрытие окна при нажатии Esc
  var onPopupEscPress = function (evt) {
    if (!statFocusInput) {
      window.util.isEscEvent(evt, hideElement);
    }
  };

  // функция открытия окна
  var openPopup = function () {
    showElement();
    document.addEventListener('keydown', onPopupEscPress);
    Nodes.SETUP_USER_NAME.addEventListener('focus', onFocusInput);
    Nodes.SETUP_USER_NAME.addEventListener('blur', onBlurInput);
    Nodes.WIZARD_COAT.addEventListener('click', onWizardCoatColor);
    Nodes.WIZARD_EYES.addEventListener('click', onWizardEyesColor);
    Nodes.WIZARD_FIREBALL.addEventListener('click', onWizardFireballColor);
  };

  // функция закрытия окна
  var closePopup = function () {
    hideElement();
    document.removeEventListener('keydown', onPopupEscPress);
    Nodes.SETUP_USER_NAME.removeEventListener('focus', onFocusInput);
    Nodes.SETUP_USER_NAME.removeEventListener('blur', onBlurInput);
    Nodes.WIZARD_COAT.removeEventListener('click', onWizardCoatColor);
    Nodes.WIZARD_EYES.removeEventListener('click', onWizardEyesColor);
    Nodes.WIZARD_FIREBALL.removeEventListener('click', onWizardFireballColor);
  };

  // События
  Nodes.SETUP_OPEN.addEventListener('click', function () {
    openPopup();
  });

  Nodes.SETUP_OPEN.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openPopup);
  });

  Nodes.SETUP_CLOSE.addEventListener('click', function () {
    closePopup();
  });

  Nodes.SETUP_CLOSE.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closePopup);
  });

  window.wizard.append();
})();
