'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  window.util = {
    doActionIfEscPressed: function (evt, action, input) {
      if (evt.keyCode === ESC_KEYCODE && evt.target !== input) {
        action();
      }
    },
    doActionIfEnterPressed: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    }
  };
})();
