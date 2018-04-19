'use strict';
(function () {
  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var dialogHandle = setup.querySelector('.setup-user-pic');
  var wizardNameInput = setup.querySelector('.setup-user-name');

  var setDefaultCoords = function () {
    window.defaultSetupPosition = {
      top: setup.offsetTop,
      left: setup.offsetLeft
    };
    initPositionReset();
    setupOpen.removeEventListener('click', setDefaultCoords);
  };

  var initPositionReset = function () {
    setup.style.top = defaultSetupPosition.top + 'px';
    setup.style.left = defaultSetupPosition.left + 'px';
  };

  var onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, closePopup, wizardNameInput);
  };

  var openPopup = function () {
    setup.classList.remove('hidden');
    initPositionReset();
    document.addEventListener('keydown', onPopupEscPress);
  };

  setupOpen.addEventListener('click', openPopup);
  setupOpen.addEventListener('click', setDefaultCoords);

  setupOpen.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openPopup);
  });

  setupClose.addEventListener('click', function () {
    closePopup();
  });

  setupClose.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closePopup);
  });

  var closePopup = function () {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  dialogHandle.addEventListener('mousedown', function (evt) {
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

