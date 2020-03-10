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

  Nodes.FORM.addEventListener('submit', function (evt) {
    window.backend.save(onLoad, window.util.onErrorLoad, new FormData(Nodes.FORM));
    evt.preventDefault();
  });
})();
