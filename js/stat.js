// Файл stat.js
'use strict';

(function () {

  var Cloud = {
    WIDTH: 420,
    HEIGHT: 270,
    X: 100,
    Y: 10,
    COLOR: '#ffffff', // цвет облака
    SHADOW_COLOR: 'rgba(0, 0, 0, 0.7', // цвет тени облака
  };
  var Font = {
    GAP: 10,
    MAIN: '16px PT Mono',
    COLOR: '#000000',
    HEIGHT: 20, // высота строки

  };
  var Bar = {
    WIDTH: 40, // ширина гистограммы
    HEIGHT: 150, // максимальная высота гистораммы
    INDENT: 50, // отступ до начала гистограмм
    MAIN_COLOR: 240, // основной цвет гистограмм для соперников. hue в формате hsl (240 - синий)
    PLAYER_COLOR: 'rgba(255, 0, 0, 1)', // цвет гистограммы игрока
    GAP_Y: 20, // размер отступа от гистограммы по высоте

  };
  var IndentHeading = {
    X: Cloud.X + Bar.INDENT, // точка отсчета по оси X для заглавного текста
    Y: Cloud.Y + Font.GAP, // точка отсчета по оси Y для заглавного текста

  };
  var GAP = 10;
  var START_POINT_Y = (Cloud.HEIGHT - Font.GAP); // точка отсчета по оси Y для имен игроков

  // создаем функию для отрисовки прямоугольника
  var renderCloud = function (ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, Cloud.WIDTH, Cloud.HEIGHT);
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
    renderCloud(ctx, Cloud.X + GAP, Cloud.Y + GAP, Cloud.SHADOW_COLOR);

    // рисуем облако
    renderCloud(ctx, Cloud.X, Cloud.Y, Cloud.COLOR);

    // текст заголовка окна
    ctx.fillStyle = Font.COLOR;
    ctx.font = Font.MAIN;
    ctx.textBaseline = 'hanging';
    ctx.fillText('Ура вы победили!', IndentHeading.X, IndentHeading.Y);
    ctx.fillText('Список результатов:', IndentHeading.X, IndentHeading.Y + Font.HEIGHT);

    //  рисуем гистограммы (результаты игроков)
    var maxTime = getMaxElement(times); // определяем максимальное значение по времени среди игроков

    // функция отображения гистограмм
    var renderHistogram = function (player, i) {
      var currentPlayerTime = Math.round(times[i]);
      var startPointX = Cloud.X + Bar.INDENT + (Bar.WIDTH + Bar.INDENT) * i;
      var currentHeightBar = (Bar.HEIGHT * times[i] / maxTime);

      ctx.textBaseline = 'alphabetic';
      ctx.fillStyle = Font.COLOR; // цвет текста
      ctx.fillText(player, startPointX, START_POINT_Y); // указываем имя игрока под гистограммой его резукльтата
      ctx.fillText(currentPlayerTime.toString(), startPointX, START_POINT_Y - Bar.GAP_Y - currentHeightBar - Font.GAP); // указываем числовой результат игрока над его гистограммой

      // определяем цвет гистограммы для пользователя и других игроков
      ctx.fillStyle = (player === 'Вы') ? Bar.PLAYER_COLOR : getRandomSaturationColor(Bar.MAIN_COLOR);

      // отрисовываем гистораммы, высота зависит от результатов игроков
      ctx.fillRect(startPointX, START_POINT_Y - Bar.GAP_Y, Bar.WIDTH, -currentHeightBar);
    };

    // выводим на экран результаты игроков из массива имен
    names.forEach(renderHistogram);
  };
})();
