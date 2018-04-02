'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var BAR_GAP = 50;
var TEXT_HEIGHT = 20;
var BAR_WIDTH = 40;
var barHeight = 150;

var renderCloud = function(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function(arr) {
    if (arr.length === 0){
        return 'В функцию необходимо передать не пустой массив!'
    };

    var maxElement = arr[0];
    
    for (var i = 1; i < arr.length; i++) {
      if (arr[i] > maxElement) {
        maxElement = arr[i];
      }
    }
    
    return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
    var namesArrLength = names.length;
    var timesArrLength = times.length;

    if (namesArrLength > timesArrLength) {
        for (var j = 0; j < namesArrLength - timesArrLength; j++) {
            names.pop(timesArrLength + j);
        }
    } else if (namesArrLength < timesArrLength) {
        for (var j = 0; j < timesArrLength - namesArrLength; j++) {
            times.pop(namesArrLength + j);
        }
    };

    renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.3)');
    renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff'); 

    ctx.fillStyle = '#000';

    ctx.font = '16px PT Mono';
    ctx.fillText('Ура! Вы победили!', CLOUD_X + GAP, CLOUD_Y + GAP + TEXT_HEIGHT);
    ctx.fillText('Список результатов:', CLOUD_X + GAP, CLOUD_Y + GAP + TEXT_HEIGHT*2);

    var maxTime = getMaxElement(times);
    
    for (var i = 0; i < names.length; i++) {
        if (names[i] === 'Вы') {
            ctx.fillStyle = 'rgba(255, 0, 0, 1)';
        } else {
            var saturation = Math.floor(Math.random()*100) + '%';
            console.log(saturation);
            ctx.fillStyle = 'hsl(240, 81%, 50%)';
        }
        ctx.fillRect(CLOUD_X + BAR_GAP + (BAR_GAP + BAR_WIDTH) * i, CLOUD_HEIGHT - GAP * 2 - (barHeight * times[i]) / maxTime, BAR_WIDTH, (barHeight * times[i]) / maxTime); 
        ctx.fillStyle = '#000';
        ctx.fillText(names[i], CLOUD_X + BAR_GAP + (BAR_GAP + BAR_WIDTH) * i,  CLOUD_HEIGHT);
        ctx.fillText(Math.floor(times[i]), CLOUD_X + BAR_GAP + (BAR_GAP + BAR_WIDTH) * i,  CLOUD_HEIGHT - GAP * 3 - (barHeight * times[i]) / maxTime);
    };
};