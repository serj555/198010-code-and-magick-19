'use strict';

(function () {
  var Nodes = {
    POPUP_WINDOW: document.querySelector('.setup'),
    FORM: document.querySelector('.setup-wizard-form'),
    ERROR_MESSAGE: document.querySelector('.errorMessage')
  };

  var onLoad = function () {
    if (Nodes.ERROR_MESSAGE) {
      document.body.removeChild(Nodes.ERROR_MESSAGE);
    }
    Nodes.POPUP_WINDOW.classList.add('hidden');
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

  Nodes.FORM.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(Nodes.FORM), onLoad, onError);
    evt.preventDefault();
  });
})();
