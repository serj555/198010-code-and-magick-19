// Файл setup.js
'use strict';

var KEY_ENTER = 'Enter';
var KEY_ESC = 'Escape';
var QUANTITY_WIZARDS = 4;
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпина', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var SIMILAR_LIST_ELEMENT = document.querySelector('.setup-similar-list');
var SIMILAR_WIZARD_TEMPLATE = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');
var SETUP_WINDOW = document.querySelector('.setup');
var SIMILAR_WINDOW = document.querySelector('.setup-similar');
var SETUP_OPEN = document.querySelector('.setup-open');
var SETUP_CLOSE = SETUP_WINDOW.querySelector('.setup-close');
var SETUP_USER_NAME = SETUP_WINDOW.querySelector('.setup-user-name');
var WIZARD_COAT = document.querySelector('.setup-wizard .wizard-coat');
var WIZARD_EYES = document.querySelector('.setup-wizard .wizard-eyes');
var WIZARD_FIREBALL = document.querySelector('.setup-fireball-wrap');
var statFocusInput = false;

// функция получения значения из рандомного елемента массива
var getRandomElement = function (array) {
  return array[Math.floor(Math.random() * (array.length - 1))];
};

// функция создания массива с количеством 'number' объектов с рандомными данными
var createNewWizards = function () {
  var wizards = [];

  for (var i = 0; i < QUANTITY_WIZARDS; i++) {
    wizards.push({
      name: getRandomElement(WIZARD_NAMES) + ' ' + getRandomElement(WIZARD_SURNAMES),
      coatColor: getRandomElement(WIZARD_COAT_COLOR),
      eyesColor: getRandomElement(WIZARD_EYES_COLOR)
    });
  }

  return wizards;
};

// функция создания волшебника с использованием шаблона
var renderWizard = function (wizard) {
  var wizardElement = SIMILAR_WIZARD_TEMPLATE.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

// функция заполнения фрагмента DOM-элементами
var renderWizards = function () {
  var wizards = createNewWizards();
  var fragment = document.createDocumentFragment();

  wizards.forEach(function (wizard) {
    fragment.appendChild(renderWizard(wizard));
  });

  return fragment;
};

// вставка заполненного фрагмента в DOM
var appendWizards = function () {
  SIMILAR_LIST_ELEMENT.appendChild(renderWizards());
  SIMILAR_WINDOW.classList.remove('hidden');
};

// случайный выбор цвета мантии волшебника
var onWizardCoatColor = function () {
  WIZARD_COAT.style.fill = getRandomElement(WIZARD_COAT_COLOR);
};

// случайный выбор цвета глаз волшебника
var onWizardEyesColor = function () {
  WIZARD_EYES.style.fill = getRandomElement(WIZARD_EYES_COLOR);
};

// случайный выбор цвета файрбола волшебника
var onWizardFireballColor = function () {
  var fireballColor = getRandomElement(WIZARD_FIREBALL_COLOR);
  WIZARD_FIREBALL.style.background = fireballColor;
  WIZARD_FIREBALL.querySelector('input').value = fireballColor;
};

var onFocusInput = function () {
  statFocusInput = true;
};

var onBlurInput = function () {
  statFocusInput = false;
};

// функция отображения скрытого элемента
var showElement = function () {
  SETUP_WINDOW.classList.remove('hidden');
};

// функция скрытия элемента
var hiddenElement = function () {
  SETUP_WINDOW.classList.add('hidden');
};

// закрытие окна при нажатии Esc
var onPopupEscPress = function (evt) {
  if (evt.key === KEY_ESC && !statFocusInput) {
    hiddenElement();
  }
};

// функция открытия окна
var openPopup = function () {
  showElement();
  document.addEventListener('keydown', onPopupEscPress);
  SETUP_USER_NAME.addEventListener('focus', onFocusInput);
  SETUP_USER_NAME.addEventListener('blur', onBlurInput);
  WIZARD_COAT.addEventListener('click', onWizardCoatColor);
  WIZARD_EYES.addEventListener('click', onWizardEyesColor);
  WIZARD_FIREBALL.addEventListener('click', onWizardFireballColor);
};

// функция закрытия окна
var closePopup = function () {
  hiddenElement();
  document.removeEventListener('keydown', onPopupEscPress);
  SETUP_USER_NAME.removeEventListener('focus', onFocusInput);
  SETUP_USER_NAME.removeEventListener('blur', onBlurInput);
  WIZARD_COAT.removeEventListener('click', onWizardCoatColor);
  WIZARD_EYES.removeEventListener('click', onWizardEyesColor);
  WIZARD_FIREBALL.removeEventListener('click', onWizardFireballColor);
};

SETUP_OPEN.addEventListener('click', function () {
  openPopup();
});

SETUP_OPEN.addEventListener('keydown', function (evt) {
  if (evt.key === KEY_ENTER) {
    openPopup();
  }
});

SETUP_CLOSE.addEventListener('click', function () {
  closePopup();
});

SETUP_CLOSE.addEventListener('keydown', function (evt) {
  if (evt.key === KEY_ENTER) {
    closePopup();
  }
});

appendWizards();
