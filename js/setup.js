'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var WIZARDS_LIST_SIZE = 4;

  var userDialog = document.querySelector('.setup');
  var similarListElement = userDialog.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
      .content
      .querySelector('.setup-similar-item');
  var setup = document.querySelector('.setup');

  var wizardEyes = setup.querySelector('.setup-wizard .wizard-eyes');
  var wizardNameInput = setup.querySelector('.setup-user-name');
  var wizardEyesInput = setup.querySelector('[name="eyes-color"]');
  var fireball = setup.querySelector('.setup-fireball-wrap');
  var fireballInput = setup.querySelector('[name="fireball-color"]');
  var wizardCoat = setup.querySelector('.wizard-coat');
  var wizardCoatInput = setup.querySelector('[name="coat-color"]');

  var findRandom = function (arr) {
    return Math.floor(Math.random() * arr.length);
  };

  // Работа с артефактами
  var shopElement = document.querySelector('.setup-artifacts-shop');
  var draggedItem = null;
  var artifactsElement = document.querySelector('.setup-artifacts');

  shopElement.addEventListener('dragstart', function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedItem = evt.target.cloneNode(true);
    }
    artifactsElement.style = 'outline: 2px dashed red';
  });

  artifactsElement.addEventListener('dragstart', function (evt) {
    draggedItem = evt.target;
    evt.dataTransfer.setData('text/plain', evt.target.alt);
  });

  artifactsElement.addEventListener('dragover', function (evt) {
    evt.preventDefault();
    return false;
  });

  artifactsElement.addEventListener('drop', function (evt) {
    evt.preventDefault();
    evt.target.style.backgroundColor = '';
    if (evt.target.tagName.toLowerCase() === 'img') {
      return;
    }
    evt.target.appendChild(draggedItem);
  });

  artifactsElement.addEventListener('dragenter', function (evt) {
    evt.preventDefault();
    evt.target.style.backgroundColor = 'yellow';
  });

  artifactsElement.addEventListener('dragleave', function (evt) {
    evt.preventDefault();
    evt.target.style.backgroundColor = '';
    artifactsElement.style = 'outline: none';
  });
  // Конец работы с артефактами

  wizardNameInput.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      evt.preventDefault();
    }
  });

  wizardEyes.addEventListener('click', function () {
    wizardEyesInput.value = EYES_COLORS[findRandom(EYES_COLORS)];
    wizardEyes.style = 'fill:' + wizardEyesInput.value;
  });

  fireball.addEventListener('click', function () {
    fireballInput.value = FIREBALL_COLORS[findRandom(FIREBALL_COLORS)];
    fireball.style = 'background-color:' + fireballInput.value;
  });

  wizardCoat.addEventListener('click', function () {
    wizardCoatInput.value = COAT_COLORS[findRandom(COAT_COLORS)];
    wizardCoat.style = 'fill:' + wizardCoatInput.value;
  });

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
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

  var successHandler = function (wizards) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < WIZARDS_LIST_SIZE; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }
    similarListElement.appendChild(fragment);

    userDialog.querySelector('.setup-similar').classList.remove('hidden');
    hideFormOnSuccess();
  };

  window.backend.load(successHandler, errorHandler);
})();
