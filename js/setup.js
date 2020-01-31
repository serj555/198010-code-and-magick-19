// Файл setup.js
'use strict';

var QUANTITY_WIZARDS = 4;
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпина', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var SIMILAR_LIST_ELEMENT = document.querySelector('.setup-similar-list');
var SIMILAR_WIZARD_TEMPLATE = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');
var SETUP_WINDOW = '.setup';
var SIMILAR_WINDOW = '.setup-similar';

// функция отображения скрытого элемента
var showWindow = function (element) {
  document.querySelector(element).classList.remove('hidden');
};

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
};

showWindow(SETUP_WINDOW);
appendWizards();
showWindow(SIMILAR_WINDOW);
