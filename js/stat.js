// Файл stat.js
'use strict';

var GAP = 10;
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_COLOR = '#ffffff'; // цвет облака
var CLOUD_SHADOW_COLOR = 'rgba(0, 0, 0, 0.7'; // цвет тени облака
var FONT_GAP = 10;
var FONT = '16px PT Mono';
var FONT_COLOR = '#000000';
var FONT_HEIGHT = 20; // высота строки
var BAR_WIDTH = 40; // ширина гистограммы
var BAR_HEIGHT = 150; // максимальная высота гистораммы
var BAR_INDENT = 50; // отступ до начала гистограмм
var BAR_MAIN_COLOR = 240; // основной цвет гистограмм для соперников. hue в формате hsl (240 - синий)
var BAR_PLAYER_COLOR = 'rgba(255, 0, 0, 1)'; // цвет гистограммы игрока
var BAR_GAP_Y = 20; // размер отступа от гистограммы по высоте
var START_POINT_Y = (CLOUD_HEIGHT - FONT_GAP); // точка отсчета по оси Y для имен игроков
var INDENT_HEADING_X = CLOUD_X + BAR_INDENT; // точка отсчета по оси X для заглавного текста
var INDENT_HEADING_Y = CLOUD_Y + FONT_GAP; // точка отсчета по оси Y для заглавного текста

// создаем функию для отрисовки прямоугольника
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

// создаем функцию для нахождения максимального числа в массиве
var getMaxElement = function (numbers) {
  return Math.max.apply(null, numbers);
};

// создаем функцию для вычисления рандомного значения насыщенности для цвета
var getRandomSaturationColor = function (hue) {
  return 'hsl(' + hue + ', ' + Math.random() * 100 + '%, 50%)';
};

window.renderStatistics = function (ctx, names, times) {
  // рисуем тень для облака
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, CLOUD_SHADOW_COLOR);

  // рисуем облако
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_COLOR);

  // текст заголовка окна
  ctx.fillStyle = FONT_COLOR;
  ctx.font = FONT;
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', INDENT_HEADING_X, INDENT_HEADING_Y);
  ctx.fillText('Список результатов:', INDENT_HEADING_X, INDENT_HEADING_Y + FONT_HEIGHT);

  //  рисуем гистограммы (результаты игроков)
  var maxTime = getMaxElement(times); // определяем максимальное значение по времени среди игроков

  // функция отображения гистограмм
  var renderHistogram = function (player, i) {
    var currentPlayerTime = Math.round(times[i]);
    var startPointX = CLOUD_X + BAR_INDENT + (BAR_WIDTH + BAR_INDENT) * i;
    var currentHeightBar = (BAR_HEIGHT * times[i] / maxTime);

    ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = FONT_COLOR; // цвет текста
    ctx.fillText(player, startPointX, START_POINT_Y); // указываем имя игрока под гистограммой его резукльтата
    ctx.fillText(currentPlayerTime.toString(), startPointX, START_POINT_Y - BAR_GAP_Y - currentHeightBar - FONT_GAP); // указываем числовой результат игрока над его гистограммой

    // определяем цвет гистограммы для пользователя и других игроков
    ctx.fillStyle = (player === 'Вы') ? BAR_PLAYER_COLOR : getRandomSaturationColor(BAR_MAIN_COLOR);

    // отрисовываем гистораммы, высота зависит от результатов игроков
    ctx.fillRect(startPointX, START_POINT_Y - BAR_GAP_Y, BAR_WIDTH, -currentHeightBar);
  };

  // выводим на экран результаты игроков из массива имен
  names.forEach(renderHistogram);
};
