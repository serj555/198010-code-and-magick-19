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

  // функция создания волшебника с использованием шаблона
  var renderWizard = function (element) {
    var wizardElement = Nodes.SIMILAR_TEMPLATE.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = element.name;
    wizardElement.querySelector('.wizard-coat').style.fill = element.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = element.eyesColor;

    return wizardElement;
  };

  // функция заполнения фрагмента DOM-элементами
  var renderWizards = function (wizards) {
    var fragment = document.createDocumentFragment();

    wizards.forEach(function (wizard) {
      fragment.appendChild(renderWizard(wizard));
    });

    return fragment;
  };

  // вставка заполненного фрагмента в DOM
  var append = function () {
    Nodes.SIMILAR_LIST_ELEMENT.appendChild(renderWizards(window.mock.createWizards(QUANTITY)));
    Nodes.SIMILAR_WINDOW.classList.remove('hidden');
  };

  window.wizard = {
    append: append,
  };
})();
