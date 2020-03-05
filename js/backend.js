'use strict';

(function () {
  var Url = {
    UPLOAD: 'https://js.dump.academy/code-and-magick',
    LOAD: 'https://js.dump.academy/code-and-magick/data'
  };
  var StatusCode = {
    OK: 200,
  };
  var TIMEOUT_IN_MS = 10000;

  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполнится за ' + xhr.timeout + 'мс. Попробуйте повторить');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open('GET', Url.LOAD);
    xhr.send();
  };

  var save = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onLoad(xhr.response);
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполнится за ' + xhr.timeout + 'мс. Попробуйте повторить');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open('POST', Url.UPLOAD);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save,
  };
})();
