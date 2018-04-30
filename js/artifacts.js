'use strict';

(function () {
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
})();
