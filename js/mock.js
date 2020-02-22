'use strict';

(function () {
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
  var FIREBALL_COLOR = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848',
  ];

  // функция создания массива с количеством 'number' объектов с рандомными данными
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

  window.mock = {
    COAT_COLOR: COAT_COLOR,
    EYES_COLOR: EYES_COLOR,
    FIREBALL_COLOR: FIREBALL_COLOR,
    createWizards: createWizards
  };
})();
