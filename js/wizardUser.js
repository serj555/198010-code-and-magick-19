'use strict';

(function () {
  var Nodes = {
    WIZARD_COAT: document.querySelector('.setup-wizard .wizard-coat'),
    WIZARD_EYES: document.querySelector('.setup-wizard .wizard-eyes'),
    WIZARD_FIREBALL: document.querySelector('.setup-fireball-wrap'),
    POPUP_WIZARD_APPEARANCE: document.querySelector('.setup-wizard-appearance')
  };
  var FIREBALL_COLOR = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848',
  ];
  // случайный выбор цвета мантии волшебника
  var onWizardCoatColor = function () {
    var coatColor = window.util.getRandomElement(window.wizard.COAT_COLOR);
    Nodes.WIZARD_COAT.style.fill = coatColor;
    Nodes.POPUP_WIZARD_APPEARANCE.querySelector('input[name="coat-color"]').value = coatColor;
  };

  // случайный выбор цвета глаз волшебника
  var onWizardEyesColor = function () {
    var eyesColor = window.util.getRandomElement(window.wizard.EYES_COLOR);
    Nodes.WIZARD_EYES.style.fill = eyesColor;
    Nodes.POPUP_WIZARD_APPEARANCE.querySelector('input[name="eyes-color"]').value = eyesColor;
  };

  // случайный выбор цвета файрбола волшебника
  var onWizardFireballColor = function () {
    var fireballColor = window.util.getRandomElement(FIREBALL_COLOR);
    Nodes.WIZARD_FIREBALL.style.background = fireballColor;
    Nodes.WIZARD_FIREBALL.querySelector('input').value = fireballColor;
  };

  Nodes.WIZARD_COAT.addEventListener('click', onWizardCoatColor);
  Nodes.WIZARD_EYES.addEventListener('click', onWizardEyesColor);
  Nodes.WIZARD_FIREBALL.addEventListener('click', onWizardFireballColor);

})();
