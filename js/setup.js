// Файл setup.js
'use strict';

var QUANTITY_WIZARDS = 4;
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпина', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];

document.querySelector('.setup').classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

// функция получения значения из рандомного елемента массива
var getRandomData = function (array) {
  return array[Math.floor(Math.random() * (array.length - 1))];
};

// функция создания массива с количеством 'number' объектов с рандомными данными
var createNewWizards = function (number) {
  var array = [];

  for (var i = 0; i < number; i++) {
    array.push({
      name: getRandomData(WIZARD_NAMES) + ' ' + getRandomData(WIZARD_SURNAMES),
      coatColor: getRandomData(WIZARD_COAT_COLOR),
      eyesColor: getRandomData(WIZARD_EYES_COLOR)
    });
  }

  return array;
};

// функция создания волшебника с использованием шаблона
var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

// функция заполнения фрагмента DOM-элементами
var fillingFragment = function (number) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < number; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }

  return fragment;
};

var wizards = createNewWizards(QUANTITY_WIZARDS);
var fragment = fillingFragment(QUANTITY_WIZARDS);

similarListElement.appendChild(fragment);

document.querySelector('.setup-similar').classList.remove('hidden');
