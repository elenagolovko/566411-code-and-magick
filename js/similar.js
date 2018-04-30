'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 300;
  var wizards = [];
  var coatColor;
  var eyesColor;
  var fireballColor;
  var userDialog = document.querySelector('.setup');
  var lastTimeout;

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }
    if (wizard.colorFireball === fireballColor) {
      rank += 1;
    }

    return rank;
  };

  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  var updateWizards = function () {
    window.render(wizards.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (!rankDiff) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));
  };

  var debounce = function (fun) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(fun, DEBOUNCE_INTERVAL);
  };

  window.wizard.onEyesChange = function (color) {
    eyesColor = color;
    debounce(updateWizards);
  };

  window.wizard.onCoatChange = function (color) {
    coatColor = color;
    debounce(updateWizards);
  };

  window.wizard.onFireballChange = function (color) {
    fireballColor = color;
    updateWizards();
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var hideFormOnSuccess = function () {
    var form = userDialog.querySelector('.setup-wizard-form');
    form.addEventListener('submit', function (evt) {
      evt.preventDefault();
      window.backend.save(new FormData(form), function () {
        userDialog.classList.add('hidden');
      }, errorHandler);
    });
  };

  var successHandler = function (data) {
    wizards = data;
    updateWizards();
    hideFormOnSuccess();
  };

  window.backend.load(successHandler, errorHandler);
})();
