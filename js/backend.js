'use strict';

(function () {
  var checkError = function (xhr, onSuccess, onError) {
    if (xhr.status === 200) {
      onSuccess(xhr.response);
    } else {
      onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
    }
  };

  var createErrorMessage = function (xhr, onError) {
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
  };

  var saveFormData = function (data, onSuccess, onError) {
    var URL = 'https://js.dump.academy/code-and-magick';

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      checkError(xhr, onSuccess, onError);
    });
    createErrorMessage(xhr, onError);

    xhr.open('POST', URL);
    xhr.send(data);
  };

  var loadWizardsData = function (onSuccess, onError) {
    var URL = 'https://js.dump.academy/code-and-magick/data';

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';


    xhr.addEventListener('load', function () {
      checkError(xhr, onSuccess, onError);
    });
    createErrorMessage(xhr, onError);

    xhr.timeout = 10000; // 10s

    xhr.open('GET', URL);
    xhr.send();
  };

  window.backend = {
    save: saveFormData,
    load: loadWizardsData
  };
})();
