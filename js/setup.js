'use strict';

(function () {
  var wizards = [];
  var coatColor;
  var eyesColor;
  var fireballColor;
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var userDialog = document.querySelector('.setup');
  var wizardEyes = userDialog.querySelector('.setup-wizard .wizard-eyes');
  var wizardNameInput = userDialog.querySelector('.setup-user-name');
  var wizardEyesInput = userDialog.querySelector('[name="eyes-color"]');
  var fireball = userDialog.querySelector('.setup-fireball-wrap');
  var fireballInput = userDialog.querySelector('[name="fireball-color"]');
  var wizardCoat = userDialog.querySelector('.wizard-coat');
  var wizardCoatInput = userDialog.querySelector('[name="coat-color"]');

  var findRandom = function (arr) {
    return Math.floor(Math.random() * arr.length);
  };

  wizardNameInput.addEventListener('keydown', function (evt) {
    window.util.doActionIfEnterPressed(evt, function () {
      evt.preventDefault();
    });
  });

  wizardCoat.addEventListener('click', function () {
    var newColor = COAT_COLORS[findRandom(COAT_COLORS)];
    this.style.fill = newColor;
    wizardCoatInput.value = newColor;
    window.wizard.onCoatChange(newColor);
  });

  wizardEyes.addEventListener('click', function () {
    var newColor = EYES_COLORS[findRandom(EYES_COLORS)];
    this.style.fill = newColor;
    wizardEyesInput.value = newColor;
    window.wizard.onEyesChange(newColor);
  });

  fireball.addEventListener('click', function () {
    var newColor = FIREBALL_COLORS[findRandom(FIREBALL_COLORS)];
    this.style = 'background-color:' + newColor;
    fireballInput.value = newColor;
    window.wizard.onFireballChange(newColor);
  });

  return window.wizard = wizard;
})();
