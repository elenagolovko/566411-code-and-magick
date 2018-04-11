'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var WIZARDS_LIST_SIZE = 4;
var wizards = [];

var userDialog = document.querySelector('.setup');
var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');
var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var wizardEyes = setup.querySelector('.setup-wizard .wizard-eyes');
var wizardEyesInput = setup.querySelector('[name="eyes-color"]');
var fireball = setup.querySelector('.setup-fireball-wrap');
var fireballInput = setup.querySelector('[name="fireball-color"]');

var findRandom = function (arr) {
  return Math.floor(Math.random() * arr.length);
};

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && evt.target !== wizardNameInput) {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
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

var generateWizardsData = function (wizardsNumber) {
  for (var i = 0; i < wizardsNumber; i++) {
    wizards.push(
        {
          name: WIZARD_NAMES[findRandom(WIZARD_NAMES)] + ' ' + WIZARD_SURNAMES[findRandom(WIZARD_SURNAMES)],
          coatColor: COAT_COLORS[findRandom(COAT_COLORS)],
          eyesColor: EYES_COLORS[findRandom(EYES_COLORS)]
        }
    );
  }
  return wizards;
};

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var createWizardsFragment = function () {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  similarListElement.appendChild(fragment);
};

var showDialog = function () {
  userDialog.classList.remove('hidden');
  userDialog.querySelector('.setup-similar').classList.remove('hidden');
};

var initWizards = function () {
  generateWizardsData(WIZARDS_LIST_SIZE);
  createWizardsFragment();
  //showDialog();
};

initWizards();
