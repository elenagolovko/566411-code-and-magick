'use strict';

(function () {
  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var dialogHandle = setup.querySelector('.setup-user-pic');
  var wizardNameInput = setup.querySelector('.setup-user-name');
  var defaultSetupPosition = {
    top: setup.offsetTop,
    left: setup.offsetLeft
  };

  var initPositionReset = function () {
    if (defaultSetupPosition.top === 0 && defaultSetupPosition.left === 0) {
      defaultSetupPosition.top = setup.offsetTop;
      defaultSetupPosition.left = setup.offsetLeft;
    }
    setup.style.top = defaultSetupPosition.top + 'px';
    setup.style.left = defaultSetupPosition.left + 'px';
  };

  var onPopupEscPress = function (evt) {
    window.util.doActionIfEscPressed(evt, closePopup, wizardNameInput);
  };

  var openPopup = function () {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
    initPositionReset();
  };

  setupOpen.addEventListener('click', openPopup);

  setupOpen.addEventListener('keydown', function (evt) {
    window.util.doActionIfEnterPressed(evt, openPopup);
  });

  setupClose.addEventListener('click', function () {
    closePopup();
  });

  setupClose.addEventListener('keydown', function (evt) {
    window.util.doActionIfEnterPressed(evt, closePopup);
  });

  var closePopup = function () {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  dialogHandle.addEventListener('mousedown', function (evt) {
    // evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setup.style.top = (setup.offsetTop - shift.y) + 'px';
      setup.style.left = (setup.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();

