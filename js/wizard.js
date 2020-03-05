'use strict';

(function () {
  var Nodes = {
    SIMILAR_LIST_ELEMENT: document.querySelector('.setup-similar-list'),
    SIMILAR_TEMPLATE: document.querySelector('#similar-wizard-template')
      .content
      .querySelector('.setup-similar-item'),
    SIMILAR_WINDOW: document.querySelector('.setup-similar'),
  };
  /*
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
  */
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
  var QUANTITY = 4;

  // функция создания массива с количеством 'number' объектов с рандомными данными
  /*
  var createWizards = function (number) {
    var wizards = [];

    for (var i = 0; i < number; i++) {
      wizards.push({
        name: window.util.getRandomElement(NAMES) + ' ' + window.util.getRandomElement(SURNAMES),
        coatColor: window.util.getRandomElement(COAT_COLOR),
        eyesColor: window.util.getRandomElement(EYES_COLOR)
      });
    }

    return wizards;
  };
  */

  // функция создания волшебника с использованием шаблона
  var renderWizard = function (element) {
    var wizardElement = Nodes.SIMILAR_TEMPLATE.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = element.name;
    wizardElement.querySelector('.wizard-coat').style.fill = element.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = element.colorEyes;

    return wizardElement;
  };

  // функция заполнения фрагмента DOM-элементами
  /*
  var fragment = document.createDocumentFragment();

    wizards.forEach(function (wizard) {
      fragment.appendChild(renderWizard(wizard));
    });
    */

  var onSaccess = function (wizards) {
    var fragment = document.createDocumentFragment();
    var node = document.querySelector('.errorMessage');

    if (node) {
      document.body.removeChild(node);
    }

    for (var i = 0; i < QUANTITY; i++) {
      fragment.appendChild(renderWizard(window.util.getRandomElement(wizards)));
    }

    Nodes.SIMILAR_LIST_ELEMENT.appendChild(fragment);
  };

  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.classList.add('errorMessage');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fonsize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var renderWizards = function () {
    window.backend.load(onSaccess, onError);
  };

  // вставка заполненного фрагмента в DOM
  var append = function () {
    renderWizards();
    Nodes.SIMILAR_WINDOW.classList.remove('hidden');
  };

  window.wizard = {
    COAT_COLOR: COAT_COLOR,
    EYES_COLOR: EYES_COLOR,
    append: append,
  };
})();
