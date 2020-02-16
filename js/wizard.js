'use strict';

(function () {
  var Nodes = {
    SIMILAR_LIST_ELEMENT: document.querySelector('.setup-similar-list'),
    SIMILAR_TEMPLATE: document.querySelector('#similar-wizard-template')
      .content
      .querySelector('.setup-similar-item'),
    SIMILAR_WINDOW: document.querySelector('.setup-similar'),
  };

  var QUANTITY = 4;
  var NAMES = [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпина',
    'Вашингтон',
  ];
  var SURNAMES = [
    'да Марья',
    'Верон',
    'Мирабелла',
    'Вальц',
    'Онопко',
    'Топольницкая',
    'Нионго',
    'Ирвинг',
  ];
  var COAT_COLOR = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)',
  ];
  var EYES_COLOR = [
    'black',
    'red',
    'blue',
    'yellow',
    'green',
  ];

  // функция создания массива с количеством 'number' объектов с рандомными данными
  var createNewOnes = function () {
    var wizards = [];

    for (var i = 0; i < QUANTITY; i++) {
      wizards.push({
        name: window.util.getRandomElement(NAMES) + ' ' + window.util.getRandomElement(SURNAMES),
        coatColor: window.util.getRandomElement(COAT_COLOR),
        eyesColor: window.util.getRandomElement(EYES_COLOR)
      });
    }

    return wizards;
  };

  // функция создания волшебника с использованием шаблона
  var renderNew = function (element) {
    var wizardElement = Nodes.SIMILAR_TEMPLATE.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = element.name;
    wizardElement.querySelector('.wizard-coat').style.fill = element.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = element.eyesColor;

    return wizardElement;
  };

  // функция заполнения фрагмента DOM-элементами
  var renderNewOnes = function () {
    var wizards = createNewOnes();
    var fragment = document.createDocumentFragment();

    wizards.forEach(function (wizard) {
      fragment.appendChild(renderNew(wizard));
    });

    return fragment;
  };

  // вставка заполненного фрагмента в DOM
  var append = function () {
    Nodes.SIMILAR_LIST_ELEMENT.appendChild(renderNewOnes());
    Nodes.SIMILAR_WINDOW.classList.remove('hidden');
  };

  window.wizard = {
    COAT_COLOR: COAT_COLOR,
    EYES_COLOR: EYES_COLOR,
    append: append,
  };
})();
