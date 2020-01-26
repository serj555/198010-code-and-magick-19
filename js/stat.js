'use strict';
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_HEIGHT = 10;
var BAR_WIDTH = 40; // ширина гистограммы
var BAR_HEIGHT = 150; // максимальная высота гистораммы
var BAR_INDENT = 50; // отступ до начала гистограмм
var MAIN_COLOR_BAR = 240; // основной цвет гистограмм для соперников. hue в формате hsl (240 - синий)

// создаем функию для отрисовки прямоугольника
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

// создаем функцию для нахождения максимального числа в массиве
var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

// создаем функцию для вычисления рандомного значения насыщенности для цвета
var getRandomSaturationColor = function (hue) {
  return 'hsl(' + hue + ', ' + Math.random() * 100 + '%, 50%)';
};

window.renderStatistics = function (ctx, players, times) {
  // рисуем тень для облака
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7');

  // рисуем облако
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff');

  // текст заголовка результатов
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', 130, 40);
  ctx.fillText('Список результатов:', 130, 60);

  //  рисуем гистограммы (результаты игроков)
  for (var i = 0; i < players.length; i++) {
    var maxTime = getMaxElement(times); // определяем максимальное значение по времени среди игроков
    var currentPlayerTime = Math.round(times[i]);

    ctx.fillStyle = '#000'; // цвет текста
    ctx.fillText(players[i], CLOUD_X + BAR_INDENT + (BAR_WIDTH + BAR_INDENT) * i, CLOUD_HEIGHT - FONT_HEIGHT);
    ctx.fillText(currentPlayerTime.toString(), CLOUD_X + BAR_INDENT + (BAR_WIDTH + BAR_INDENT) * i, CLOUD_HEIGHT - FONT_HEIGHT - GAP * 3 - (BAR_HEIGHT * times[i] / maxTime));

    // определяем цвет гистограммы для пользователя и других игроков
    if (players[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)'; // цвет гистограммы для пользователя
    } else {
      ctx.fillStyle = getRandomSaturationColor(MAIN_COLOR_BAR); // цвет гистограммы для соперников
    }

    // отрисовываем гистораммы, высота зависит от результатов игроков
    ctx.fillRect(CLOUD_X + BAR_INDENT + (BAR_WIDTH + BAR_INDENT) * i, CLOUD_HEIGHT - FONT_HEIGHT - GAP * 2, BAR_WIDTH, -(BAR_HEIGHT * times[i] / maxTime));
  }

};
