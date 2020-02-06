// Файл setup.js
'use strict';

var Nodes = {
  SIMILAR_LIST_ELEMENT: document.querySelector('.setup-similar-list'),
  SIMILAR_WIZARD_TEMPLATE: document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item'),
  SETUP_WINDOW: document.querySelector('.setup'),
  SIMILAR_WINDOW: document.querySelector('.setup-similar'),
  SETUP_OPEN: document.querySelector('.setup-open'),
  SETUP_CLOSE: document.querySelector('.setup-close'),
  SETUP_USER_NAME: document.querySelector('.setup-user-name'),
  SETUP_WIZARD_APPEARANCE: document.querySelector('.setup-wizard-appearance'),
  WIZARD_COAT: document.querySelector('.setup-wizard .wizard-coat'),
  WIZARD_EYES: document.querySelector('.setup-wizard .wizard-eyes'),
  WIZARD_FIREBALL: document.querySelector('.setup-fireball-wrap')
};
var QUANTITY_WIZARDS = 4;
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпина', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var Key = {
  ENTER: 'Enter',
  ESC: 'Escape'
};
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
  var wizardElement = Nodes.SIMILAR_WIZARD_TEMPLATE.cloneNode(true);

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
  Nodes.SIMILAR_LIST_ELEMENT.appendChild(renderWizards());
  Nodes.SIMILAR_WINDOW.classList.remove('hidden');
};

// случайный выбор цвета мантии волшебника
var onWizardCoatColor = function () {
  var coatColor = getRandomElement(WIZARD_COAT_COLOR);
  Nodes.WIZARD_COAT.style.fill = coatColor;
  Nodes.SETUP_WIZARD_APPEARANCE.querySelector('input[name="coat-color"]').value = coatColor;
};

// случайный выбор цвета глаз волшебника
var onWizardEyesColor = function () {
  var eyesColor = getRandomElement(WIZARD_EYES_COLOR);
  Nodes.WIZARD_EYES.style.fill = eyesColor;
  Nodes.SETUP_WIZARD_APPEARANCE.querySelector('input[name="eyes-color"]').value = eyesColor;
};

// случайный выбор цвета файрбола волшебника
var onWizardFireballColor = function () {
  var fireballColor = getRandomElement(WIZARD_FIREBALL_COLOR);
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
  if (evt.key === Key.ESC && !statFocusInput) {
    hideElement();
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

Nodes.SETUP_OPEN.addEventListener('click', function () {
  openPopup();
});

Nodes.SETUP_OPEN.addEventListener('keydown', function (evt) {
  if (evt.key === Key.ENTER) {
    openPopup();
  }
});

Nodes.SETUP_CLOSE.addEventListener('click', function () {
  closePopup();
});

Nodes.SETUP_CLOSE.addEventListener('keydown', function (evt) {
  if (evt.key === Key.ENTER) {
    closePopup();
  }
});

appendWizards();
