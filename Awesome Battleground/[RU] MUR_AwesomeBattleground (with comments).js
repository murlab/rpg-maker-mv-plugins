//=============================================================================
// MUR Awesome Battleground v1.1
// by MUR (https://github.com/murlab)
// BSD 3-Clause License
// Free for use with both free and commercial RPG Maker games.
//=============================================================================

/*:
 * @plugindesc v1.1 Фон + эффекты для битвы
 * @author Mur
 * @help Позволяет задать фон битвы для каждого региона, а также
 * добавить дополнительные эффекты
 *
 * @param regionData
 * @text Настройки для регионов
 * @desc Массив данных настроек для каждого региона
 * 0й — настройки для не заданной области
 * @type struct<RegionParams>[]
 *
 * @param screenResolutionEnable
 * @text Изменить разрешение экрана
 * @desc При запуске игры будет изменён размер экрана
 * @type boolean
 * @default false
 * @on Активно
 * @off Отключено
 *
 * @param screenWidth
 * @text Ширина экрана
 * @desc Значение по умолчанию — 816
 * @type number
 * @default 816
 * @min 640
 *
 * @param screenHeight
 * @text Высота экрана
 * @desc Значение по умолчанию — 624
 * @type number
 * @default 624
 * @min 480
 *
 * @param wildScreenDetect
 * @text корректировать соотношение сторон?
 * @desc Ширина экрана будет подкоректирована. Актуально для
 * широкоформатных экранов (без чёрных полос по бокам)
 * @type boolean
 * @default true
 * @on учитывать 16:9
 * @off только 4:3
 *
*/
/*~struct~RegionParams:
 * @param regionId
 * @text Номер региона
 * @desc Номер отмеченной области на карте
 * @type number
 * @min 0
 * @max 255
 *
 * @param foreground
 * @text Верхняя часть фона
 * @type file
 * @dir img/fx_foreground
 * @desc Верхняя часть фона
 * Расположена «выше» всех параллаксов
 * @require 1
 *
 * @param background
 * @text Нижняя часть фона
 * @type file
 * @dir img/fx_background
 * @desc Нижняя часть фона
 * Расположена «ниже» всех
 * @require 1
 *
 * @param parallax1
 * @text 1-й параллакс
 * @desc Не используется
 *
 * @param layer1
 * @parent parallax1
 * @text Изображение
 * @desc Графическое изображение для 1-го параллакса
 * @type file
 * @dir img/fx_parallax
 * @require 1
 *
 * @param layer1effect
 * @parent parallax1
 * @text Эффект
 * @desc Способ поведения изображения на экране
 * @type select
 * @option Зацикленное движение вверх
 * @value move_up
 * @option Зацикленное движение вниз
 * @value move_down
 * @option Зацикленное движение влево
 * @value move_left
 * @option Зацикленное движение вправо
 * @value move_right
 * @option Зацикленное движение вверх влево
 * @value move_up_left
 * @option Зацикленное движение вверх право
 * @value move_up_right
 * @option Зацикленное движение вниз влево
 * @value move_down_left
 * @option Зацикленное движение вниз вправо
 * @value move_down_right
 * @option Движение маятник вверх вниз
 * @value move_up_down
 * @option Движение маятник влево вправо
 * @value move_left_right
 * @option Движение зигзагом
 * @value move_zigzag
 * @option Движение по часовой стрелке
 * @value move_cw
 * @option Движение против часовой стрелки
 * @value move_ccw
 * @option Проявление и затухание
 * @value fade_in_out
 * @option Мерцание
 * @value flashing
 * @default move_up
 *
 * @param layer1speed
 * @parent parallax1
 * @text Скорость
 * @desc Чем больше значение тем чаще вызывается эффект
 * @type number
 * @decimals 2
 * @default 1
 *
 * @param layer1pause
 * @parent parallax1
 * @text Повторить через
 * @desc Задержка перед повторным вызовом.
 * 0 - выводить без задержек
 * @type number
 * @default 0
 *
 * @param parallax2
 * @text 2-й параллакс
 * @desc Не используется
 *
 * @param layer2
 * @parent parallax2
 * @text Изображение
 * @desc Графическое изображение для 2-го параллакса
 * @type file
 * @dir img/fx_parallax
 * @require 1
 *
 * @param layer2effect
 * @parent parallax2
 * @text Эффект
 * @desc Способ поведения изображения на экране
 * @type select
 * @option Зацикленное движение вверх
 * @value move_up
 * @option Зацикленное движение вниз
 * @value move_down
 * @option Зацикленное движение влево
 * @value move_left
 * @option Зацикленное движение вправо
 * @value move_right
 * @option Зацикленное движение вверх влево
 * @value move_up_left
 * @option Зацикленное движение вверх право
 * @value move_up_right
 * @option Зацикленное движение вниз влево
 * @value move_down_left
 * @option Зацикленное движение вниз вправо
 * @value move_down_right
 * @option Движение маятник вверх вниз
 * @value move_up_down
 * @option Движение маятник влево вправо
 * @value move_left_right
 * @option Движение зигзагом
 * @value move_zigzag
 * @option Движение по часовой стрелке
 * @value move_cw
 * @option Движение против часовой стрелки
 * @value move_ccw
 * @option Проявление и затухание
 * @value fade_in_out
 * @option Мерцание
 * @value flashing
 * @default move_up
 *
 * @param layer2speed
 * @parent parallax2
 * @text Скорость
 * @desc Чем больше значение тем чаще вызывается эффект
 * @type number
 * @decimals 2
 * @default 2
 *
 * @param layer2pause
 * @parent parallax2
 * @text Повторить через
 * @desc Задержка перед повторным вызовом
 * 0 - выводить без задержек
 * @type number
 * @default 0
 *
 * @param animation1
 * @text Анимация 1
 * @desc Не используется
 *
 * @param aniFile1
 * @parent animation1
 * @text Изображение
 * @desc Графическое изображение с кадрами для анимации
 * @type file
 * @dir img/fx_animation
 * @require 1
 *
 * @param aniFrames1
 * @parent animation1
 * @text Количество кадров
 * @desc Из скольки кадров состоит файл анимации
 * @type number
 * @min 1
 * @default 1
 *
 * @param aniWaitFrame1
 * @parent animation1
 * @text Задержка
 * @desc Задержка после отображения одно кадра
 * @type number
 * @default 0
 *
 * @param aniReverse1
 * @parent animation1
 * @text Реверс
 * @desc Если задано, то анимация будет возвращатся обратно,
 * иначе будет повторятся сразу с 0-го кадра
 * @type boolean
 * @on Включен
 * @off Отключен
 * @default false
 *
 * @param aniPosition1
 * @parent animation1
 * @text Положение
 * @desc Положение анимаций на экране
 * @type struct<aniPos>[]
 *
 * @param animation2
 * @text Анимация 2
 * @desc Не используется
 *
 * @param aniFile2
 * @parent animation2
 * @text Изображение
 * @desc Графическое изображение с кадрами для анимации
 * @type file
 * @dir img/fx_animation
 * @require 1
 *
 * @param aniFrames2
 * @parent animation2
 * @text Количество кадров
 * @desc Из скольки кадров состоит файл анимации
 * @type number
 * @min 1
 * @default 1
 *
 * @param aniWaitFrame2
 * @parent animation2
 * @text Задержка
 * @desc Задержка после отображения одно кадра
 * @type number
 * @default 0
 *
 * @param aniReverse2
 * @parent animation2
 * @text Реверс
 * @desc Если задано, то анимация будет возвращатся обратно,
 * иначе будет повторятся сразу с 0-го кадра
 * @type boolean
 * @on Включен
 * @off Отключен
 * @default false
 *
 * @param aniPosition2
 * @parent animation2
 * @text Положение
 * @desc Положение анимаций на экране
 * @type struct<aniPos>[]
 *
 * @param animation3
 * @text Анимация 3
 * @desc Не используется
 *
 * @param aniFile3
 * @parent animation3
 * @text Изображение
 * @desc Графическое изображение с кадрами для анимации
 * @type file
 * @dir img/fx_animation
 * @require 1
 *
 * @param aniFrames3
 * @parent animation3
 * @text Количество кадров
 * @desc Из скольки кадров состоит файл анимации
 * @type number
 * @min 1
 * @default 1
 *
 * @param aniWaitFrame3
 * @parent animation3
 * @text Задержка
 * @desc Задержка после отображения одно кадра
 * @type number
 * @default 0
 *
 * @param aniReverse3
 * @parent animation3
 * @text Реверс
 * @desc Если задано, то анимация будет возвращатся обратно,
 * иначе будет повторятся сразу с 0-го кадра
 * @type boolean
 * @on Включен
 * @off Отключен
 * @default false
 *
 * @param aniPosition3
 * @parent animation3
 * @text Положение
 * @desc Положение анимаций на экране
 * @type struct<aniPos>[]
 *
 * @param animation4
 * @text Анимация 4
 * @desc Не используется
 *
 * @param aniFile4
 * @parent animation4
 * @text Изображение
 * @desc Графическое изображение с кадрами для анимации
 * @type file
 * @dir img/fx_animation
 * @require 1
 *
 * @param aniFrames4
 * @parent animation4
 * @text Количество кадров
 * @desc Из скольки кадров состоит файл анимации
 * @type number
 * @min 1
 * @default 1
 *
 * @param aniWaitFrame4
 * @parent animation4
 * @text Задержка
 * @desc Задержка после отображения одно кадра
 * @type number
 * @default 0
 *
 * @param aniReverse4
 * @parent animation4
 * @text Реверс
 * @desc Если задано, то анимация будет возвращатся обратно,
 * иначе будет повторятся сразу с 0-го кадра
 * @type boolean
 * @on Включен
 * @off Отключен
 * @default false
 *
 * @param aniPosition4
 * @parent animation4
 * @text Положение
 * @desc Положение анимаций на экране
 * @type struct<aniPos>[]
 *
 * @param bgsound
 * @text Фоновый шум
 * @desc Звуковой эффект для фона
 * @type file
 * @dir audio/bgs
 * @require 1
 *
 * @param bgsVolume
 * @text Громкость шума
 * @desc Уровень громкости звукового эффекта
 * @type number
 * @min 0
 * @max 100
 * @default 60
 *
 * @param bgmusic
 * @text Фоновая музыка
 * @desc Музыка для фона
 * @type file
 * @dir audio/bgm
 * @require 1
 *
 * @param bgmVolume
 * @text Громкость музыки
 * @desc Уровень громкости музыки
 * @type number
 * @min 0
 * @max 100
 * @default 80
 *
 */
/*~struct~aniPos:
 * @param posX
 * @text Координата X
 * @desc Положение анимации на экране по оси X
 * @type number
 * @default 0
 *
 * @param posY
 * @text Координата Y
 * @desc Положение анимации на экране по оси Y
 * @type number
 * @default 0
 *
 * @param startFrame
 * @text Номер кадра
 * @desc С какого кадра начать анимацию
 * @type number
 * @default 0
 *
 */

// Начало основного кода плагина
(function() {
    
    // Получаем настройки плагина
    var params = PluginManager.parameters('MUR_AwesomeBattleground');
    
    // Данные для регионов на карте
    var regionData = JSON.parse(params["regionData"]);

    // Разрешено ли изменять разрешение экрана
    var screenResolutionEnable = params["screenResolutionEnable"].toUpperCase() == "TRUE" ? true : false;
    
    // Опеределение некоторых переменных которые будут использованы в дальнейшем:
    var background = null;          // Здесь будет хранится название файла изображения (нижняя часть)
    var foreground = null;          // Здесь будет хранится название файла изображения (верхняя часть)

    var layers = [];                // Здесь будут хранится список данных для слоёв (параллаксов)
    var layersSize = 2;             // Сколько всего всего будет слоёв (по умолчанию два: parallax1 и parallax2)
    
    var animations = [];            // Здесь будут хранится список данных для анимаций
    var animationsSize = 4;         // Сколько всего анимаций (по умолчанию четыре: animation1, animation2, animation3, animation4)
    
    var bgsound = null;             // Здесь будет хранится название файла фонового шума
    var bgsVolume = 0;              // Громкость фонового шума
    
    var bgmusic = null              // Здесь будет хранится название файла фоновой музыки
    var bgmVolume = 0;              // Громкость фоновой музыки
    
    
    var angle = 2 * Math.PI/180;    // Расчёт значения для пересчёта градусов в радианы
                                    // Используется для расчёта плавности движения
    
    // Если разрешено изменение разрешение экрана
    if (screenResolutionEnable) {
    
        // Данный параметр используется для корректировки соотношения сторон между 4:3 и 16:9
        var detectWildscreen = params["wildScreenDetect"].toUpperCase() == "TRUE" ? true : false;
        
        // Получаем значение ширины и высоты экрана, если параметры не заданы или заданы некорректно,
        // то будут использованы значение по умолчанию (ширина 816 и высота 624)
        var screenWidth = Number(params['screenWidth'] || 816);
        var screenHeight = Number(params['screenHeight'] || 624);

        // Корректировка разрешена?
        if (detectWildscreen) {
            // Получаем оригинальное разрешение монитора
            var originalWidth = screen.width;
            var originalHeight = screen.height;
            // Вычисляем процентное соотношение сторон
            var percent = originalWidth/originalHeight;
            screenWidth = Math.ceil(screenHeight * percent);
        }
        
        // Меняем разрешение окна игры
        SceneManager._screenWidth  = screenWidth;
        SceneManager._screenHeight = screenHeight;
        SceneManager._boxWidth     = screenWidth;
        SceneManager._boxHeight    = screenHeight;

        // Корректировка размеров для мобильных устройств
        var sceneManager_run = SceneManager.run;
        SceneManager.run = function(sceneClass) {
            sceneManager_run.call(this, sceneClass);
            if (!Utils.isMobileDevice() && !Utils.isMobileSafari() && !Utils.isAndroidChrome()) {
                var resizeWidth = Graphics.boxWidth - window.innerWidth;
                var resizeHeight = Graphics.boxHeight - window.innerHeight;
                window.moveBy(-1 * resizeWidth / 2, -1 * resizeHeight / 2);
                window.resizeBy(resizeWidth, resizeHeight);
            }
        };
        
        // Корректировка положения бойцов во время сцены боя
        Sprite_Battler.prototype.updatePosition = function() {
            var corrX = (Math.abs(screenWidth - 816))/2;
            var corrY = (Math.abs(screenHeight - 624))/2;    
            this.x = this._homeX + this._offsetX + corrX*1.5;
            this.y = this._homeY + this._offsetY + corrY*1.5;
        };    
    }
    
    //------------------------------------------------------
    // Обработка запуска сцены битвы
    //------------------------------------------------------
    // Переопределяем вызов на свою функцию
    var _Game_Interpreter_command301 = Game_Interpreter.prototype.command301;
    Game_Interpreter.prototype.command301 = function() {
        // Вызываем оригинальный обработчик 
        _Game_Interpreter_command301.call(this);
        // Если сцена битвы ещё не началась (первое обращение)
        if (!$gameParty.inBattle()) {
            // Получаем номер ригиона в месте где находился игрок (перед началом битвы)
            var regionId = $gameMap.regionId($gamePlayer.x,$gamePlayer.y);
            // Проверяем на ошибку
            if (regionId != undefined) {
                // Получаем данные из настроек плагина для данного региона
                var regionData = getRegionData(regionId);
                // Проверяем, а описан ли запрашиваемый регион в данных?
                if (regionData != undefined) {
                    //
                    background = regionData.background;     // Получаем название файла изображения (нижняя часть)
                    foreground = regionData.foreground;     // Получаем название файла изображения (верхняя часть)
                    
                    layers = regionData.layers;             // Получаем список данных для слоёв (параллаксов)
                    animations = regionData.animations;     // Получаем список данных для анимаций
                    
                    bgsound = regionData.bgsound;           // Получаем название файла фонового шума
                    bgsVolume = regionData.bgsVolume;       // Получаем громкость фонового шума
                    
                    bgmusic = regionData.bgmusic;           // Получаем название файла фоновой музыки
                    bgmVolume = regionData.bgmVolume;       // Получаем громкость фоновой музыки

                } else {
                    // Если запрашиваемый регион не описан в настройках, выводим предупреждение в консоль отладчика
                    console.warn("Data for region " + regionId + " not found!");
                }
            }
        }
        return true;
    }

    //------------------------------------------------------
	// Устанавливаем обработку вызова команд плагина
	//------------------------------------------------------
    // Переопределяем вызов на свою функцию
	var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function(command, args) {
        // Вызываем оригинальный обработчик 
		_Game_Interpreter_pluginCommand.call(this, command, args);
        // Сравниваем название вызываемой команды
		if (command.toLowerCase() === "setcurrentregionid") {
			var regionId = Number(args[0]);
            // Устанавливаем номер региона в место где разположени герой
            $gameMap.setRegionId($gamePlayer.x,$gamePlayer.y, regionId);
		}
	};
    
    //------------------------------------------------------
	// Добавляем фунцию установить значение региона в указанных координатах
	//------------------------------------------------------
    Game_Map.prototype.setRegionId = function(x, y, value) {
        // Получаем размеры текущей карты
        var mapWidth = $dataMap.width;
        var mapHeight = $dataMap.height;
        // Указываем, что хотим изменить данные в области регионов (5)
        var z = 5;
        // Сохраняем значение
        $dataMap.data[(z * mapHeight + y) * mapWidth + x] = value;
    };
    
    //------------------------------------------------------
	// Устанавливаем обработку отрисовки фоновых изображений
	//------------------------------------------------------
    // Переопределяем вызов на свою функцию
    Spriteset_Battle.prototype.createBattleback = function() {
        // Сохраняем указатель на Spriteset_Battle (будет использован в дальнейшем)
        var sprsetBattle = this;

        // Создаём спрайт для нижней части фонового изображения
        this._backgroundSprite = new Sprite();
        // Подгружаем изображение
        this._backgroundSprite.bitmap = ImageManager.loadBitmap('img/fx_background/', background, null, true);
        // Смещаем спрайт в начало координат
        this._backgroundSprite.move(0,0);
        // Прикрепляем спрайт к основной сцене
        this._battleField.addChild(this._backgroundSprite);
        
        // Резервируем массивы для спрайтов и картинок для параллаксов
        this._parallaxSprites = [];
        this._parallaxBitmaps = [];
        
        // Перебираем список слоёв(паралаксов) описанных в настройках плагина
        for (var j = 0; j < layers.length; j++) {
            // Получаем слой
            var l = layers[j];
            // Устанавливаем дополнительные настройки эффектов по умолчанию (в дальнейшем они изменяются):
            l.angle = 0;                // Счётчик угла, используется в эффекте движения типа «маятник»
            l.leftRightSign = -1;       // Направление движения по горизонтали: -1 влево, +1 вправо
            l.upDownSign = -1;          // Направление движения по вертикали: -1 вверх, +1 вниз
            l.fadeInSign = 1;           // Определяет текущее состояние слоя: проявление +1 или -1 угасание
            l.flashingRepeat = 0;       // Количество вспышек, в дальнейшем генерится случайным образом
            l.flashingFrame = 0;        // Внутренний счётчик (Время задержки между вспышками)
            
            // Проверяем определен ли слой
            if (l.layer && l.layer != "") {
                
                l.interval = 0;             // Внутренний счётчик (Время ожидания между очередной обработкой слоя)
                
                // Создаём спрайт для слоя паралаксов
                this._parallaxSprites[j] = new Sprite();
                // Загружаем изображение для спрайта
                this._parallaxBitmaps[j] = ImageManager.loadBitmap('img/fx_parallax/', l.layer, null, true);                
                // Добавляем обработку события по завершении загрузки изображения, в idx содержится номер слоя на момент загрузки
                this._parallaxBitmaps[j].addLoadListener(function(idx) {
                    // Поскольку внутри события this указывает на bitmap(this._parallaxBitmaps[j]),
                    // Для того что бы обратится к this внутри Spriteset_Battle, мы будем использовать
                    // временную переменную sprsetBattle
                    
                    // Проверяем, загрузилась ли картинка в память и кореектны ли её размеры (не было ошибок)
                    if (this.isReady() && this.width > 0 && this.height > 0) {
                        // получаем данные для данного слоя
                        var l = layers[idx];
                        // Если эффект проявления/затухания или мерцания слоя
                        if (l.effect == "fade_in_out" || l.effect == "flashing") {
                            // Задаём размеры спрайта
                            sprsetBattle._parallaxSprites[idx].width = this.width;
                            sprsetBattle._parallaxSprites[idx].height = this.height;
                            // Создаём новую картику в спрайте
                            sprsetBattle._parallaxSprites[idx].bitmap = new Bitmap(this.width, this.height);
                            // Копируем данные из загруженной картинки во вновь созданную (у спрайта):
                            // this — bitmap с загруженной картинкой
                            // 0,0 — откуда начать копирование картики
                            // this.width, this.height — ширина и высота копируемой области
                            // 0,0 — куда копировать в спрайт
                            sprsetBattle._parallaxSprites[idx].bitmap.blt(this, 0, 0, this.width, this.height, 0, 0);
                        
                        // Если эффект движение вверх, вниз или маятник «вверх/вниз»
                        } else if (l.effect == "move_up" || l.effect == "move_down" || l.effect == "move_up_down") {
                            // По сути тут всё повторяется, за исключением размеров спрайта и дополнительного дублирования
                            // загруженной картинки в спрайте
                            // Это необходимо для зацикленных движений
                            sprsetBattle._parallaxSprites[idx].width = this.width;
                            sprsetBattle._parallaxSprites[idx].height = this.height*2;
                            sprsetBattle._parallaxSprites[idx].bitmap = new Bitmap(this.width, this.height*2);

                            sprsetBattle._parallaxSprites[idx].bitmap.blt(this, 0, 0, this.width, this.height, 0, 0);
                            sprsetBattle._parallaxSprites[idx].bitmap.blt(this, 0, 0, this.width, this.height, 0, this.height);

                        // Если эффект движение влево, вправоили маятник «влево/вправо»
                        } else if (l.effect == "move_left" || l.effect == "move_right" || l.effect == "move_left_right"  ||  l.effect == "move_zigzag"){
                            sprsetBattle._parallaxSprites[idx].width = this.width*2;
                            sprsetBattle._parallaxSprites[idx].height = this.height;
                            sprsetBattle._parallaxSprites[idx].bitmap = new Bitmap(this.width*2, this.height);

                            sprsetBattle._parallaxSprites[idx].bitmap.blt(this, 0, 0, this.width, this.height, 0, 0);
                            sprsetBattle._parallaxSprites[idx].bitmap.blt(this, 0, 0, this.width, this.height, this.width, 0);

                        // Для всех остальных эффектов картинка дублируется как по вертикали, так и по горизонтали
                        } else {
                            sprsetBattle._parallaxSprites[idx].width = this.width*2;
                            sprsetBattle._parallaxSprites[idx].height = this.height*2;
                            sprsetBattle._parallaxSprites[idx].bitmap = new Bitmap(this.width*2, this.height*2);

                            sprsetBattle._parallaxSprites[idx].bitmap.blt(this, 0, 0, this.width, this.height, 0, 0);
                            sprsetBattle._parallaxSprites[idx].bitmap.blt(this, 0, 0, this.width, this.height, this.width, 0);
                            sprsetBattle._parallaxSprites[idx].bitmap.blt(this, 0, 0, this.width, this.height, 0, this.height);
                            sprsetBattle._parallaxSprites[idx].bitmap.blt(this, 0, 0, this.width, this.height, this.width, this.height);
                        }

                        // Смещаем спрайт слоя на начальные координаты
                        sprsetBattle._parallaxSprites[idx].move(0, 0);
                        // Добавляем в главную сцену спрайт слоя
                        sprsetBattle._battleField.addChildAt(sprsetBattle._parallaxSprites[idx], 1);    
                    }
                // Если в параметрах bind не указать объект bitmap c загружаемой картинкой, то внутри фунции выше
                // this, будет указывать на Spriteset_Battle. j внутри фунции будет в виде аргумента idx
                }.bind(this._parallaxBitmaps[j], j));
            }
        }
        
        // Резервируем массивы для спрайтов и картинок для анимации
        this._aniSprites = [];
        this._aniBitmaps = [];
        
        // Перебираем список анимаций описанных в настройках плагина
        for (var j = 0; j < animations.length; j++) {
            // Получаем анимцию
            var a = animations[j];
            // Проверяем задана ли анимация
            if (a.fileName && a.fileName != "") {
                
                a.waitCurrent = 0;      // Внутренний счётчик (Время ожидания между кадрами анимации)
                
                // Загружаем изображение для спрайта
                this._aniBitmaps[j] = ImageManager.loadBitmap('img/fx_animation/', a.fileName, null, true);
                // Добавляем обработку события по завершении загрузки изображения, в idx содержится номер анимации на момент загрузки
                this._aniBitmaps[j].addLoadListener(function(idx) {
                    // Вызываем фунцию создания нового спрайта
                    sprsetBattle.createSprites(this, idx);
                // Если в параметрах bind не указать объект bitmap c загружаемой картинкой, то внутри фунции выше
                // this, будет указывать на Spriteset_Battle. j внутри фунции будет в виде аргумента idx
                }.bind(this._aniBitmaps[j], j));
            }
        }
        
        // Создаём спрайт для верхней части фонового изображения
        this._foregroundSprite = new Sprite();
        // Подгружаем изображение
        this._foregroundSprite.bitmap = ImageManager.loadBitmap('img/fx_foreground/', foreground, null, true);
        // Смещаем спрайт в начало координат
        this._foregroundSprite.move(0,0);
        // Прикрепляем спрайт к основной сцене
        this._battleField.addChild(this._foregroundSprite);

    };
    
    //------------------------------------------------------
	// Добавляем свою фунцию спрайта анимации
	//------------------------------------------------------
    Spriteset_Battle.prototype.createSprites = function(bmp, idx) {
        // В bmp — загруженное изображение с кадрами анимации
        // idx — номер анимации
        var a = animations[idx];
        // настройки анимации
        // Ширина и высота одного кадра анимации
        a.frameWidth = bmp.width;
        a.frameHeight = bmp.height / a.framesCount;
        // Внутренний счётчик ожидания до смены следующего кадра
        a.waitCurrent = 0;

        // Создаём массив спрайтов для каждой позиции данной анимации
        var newSprites = [];
        for (var i=0; i<a.positions.length; i++) {        
            // Получаем данные:
            var aData = JSON.parse(a.positions[i]);   
            // С какого кадра начать анимцию
            var startFrame = Number(aData.startFrame);
            // Кординаты на экране
            var posX = Number(aData.posX);
            var posY = Number(aData.posY);

            // Создаём спрайт
            newSprites[i] = new Sprite();
            // Задаём размеры
            newSprites[i].width = a.frameWidth;
            newSprites[i].height = a.frameHeight;

            // Создаём новую картику в спрайте
            newSprites[i].bitmap = new Bitmap(a.frameWidth, a.frameHeight);
            // Копируем кадр
            newSprites[i].bitmap.blt(bmp, 0, a.frameHeight * Number(aData.startFrame), a.frameWidth, a.frameHeight, 0, 0);

            // Сохраняем текущий нормер кадра
            newSprites[i].currentFrame = startFrame;
            // Шаг прироста для следуешего кадра
            newSprites[i].frameSign = 1;
            // Расположение спрайта на экране
            newSprites[i].move(posX, posY);
            // Добавляем спрайт на главную сцену
            this._battleField.addChild(newSprites[i]);
        }
        // Сохраняем массив спрайтов
        this._aniSprites[idx] = newSprites;        
    }

    //------------------------------------------------------
	// Добавляем свою фунцию обновления фонового изображения
	//------------------------------------------------------
    // Переопределяем вызов на свою функцию
    Spriteset_Battle.prototype.updateBattleback = function() {
        // Обновляем кадры для всех анимаций по списку
        for (var j = 0; j < animations.length; j++) {
            // Текущая анимация
            var a = animations[j];
            // Если задан файл анимации и он загружен и загружен без ошибок
            if (a.fileName && a.fileName != "" && this._aniBitmaps[j] && this._aniBitmaps[j].isReady() && this._aniBitmaps[j].width > 0 && this._aniBitmaps[j].height > 0) {
                // Ожидаем задержку межу кадрами анимации
                if (a.waitCurrent == 0) {
                    // Берём массив координат для данной анимации
                    var aniSprites = this._aniSprites[j];
                    // Перебираем все координаты для данной анимации
                    for (var i = 0; i < a.positions.length; i++) {
                        // Спрайт анимации
                        var aSprite = aniSprites[i];
                        // Расчитываем положение нового кадра в картинке анимации
                        var framePos = a.frameHeight * aSprite.currentFrame;
                        // Создаём новую картинку в спрайте (по просту очищаем)
                        aSprite.bitmap = new Bitmap(a.frameWidth, a.frameHeight);
                        // Копиируем в неё новый кадр
                        aSprite.bitmap.blt(this._aniBitmaps[j], 0, framePos, a.frameWidth, a.frameHeight, 0, 0);
                        // Если анимация в режиме возвращения
                        if (a.isReverse) {
                            aSprite.currentFrame += aSprite.frameSign;
                            
                            // то дойдя до последнего кадра анимации меняется направление: 30,31,32 … 32, 31, 30 итд
                            if (aSprite.frameSign == 1 && aSprite.currentFrame == a.framesCount - 1) {
                                aSprite.frameSign = -1;

                            } else if (aSprite.frameSign == -1 && aSprite.currentFrame == 0) {
                                aSprite.frameSign = 1;
                            }
                        // иначе 
                        } else {                        
                            aSprite.currentFrame += 1;
                            // дойдя до последнего каждра анимация сбрасывается на 0: 30,31,32 … 0, 1, 2 итд
                            if (aSprite.currentFrame == a.framesCount) {
                                aSprite.currentFrame = 0;
                            }
                        }
                    }
                    // Устанавливаем вновь интревал задержки
                    a.waitCurrent = a.waitFrame;
                } else {
                    // Уменьшаем иинтревал задержкин
                    a.waitCurrent -= 1;
                }
            }
        }
        
        // Обновляем слои (параллаксы)
        for (var j = 0; j < layers.length; j++) {
            // текущий слой
            var l = layers[j];
            // Если слой задан и он не пустой
            if (l.layer && l.layer != "") {
                // Если эффект «исчезновение/проявление»
                if (l.effect == "fade_in_out") {
                    // Ожидаем интервал задержки
                    if (l.interval == 0) {
                        // Устанавливаем прозрачность (альфа-канал)
                        this._parallaxSprites[j].alpha += l.fadeInSign;
                        // Если максимальное значение, то меняем направление прироста с +1 на -1
                        if (this._parallaxSprites[j].alpha > 1) {
                            this._parallaxSprites[j].alpha = 1;
                            l.fadeInSign = -(0.01 * l.speed);
                        // То же самое и по достижении другой границы
                        } else if (this._parallaxSprites[j].alpha < 0) {
                            this._parallaxSprites[j].alpha = 0;
                            l.fadeInSign = 0.01 * l.speed;
                            // По достижению 0, устанавливаем ожидание
                            l.interval = l.pause;
                        }
                    } else {
                        l.interval -= 1;
                    }
                
                // Если эффект «мерцания»
                } else if (l.effect == "flashing") {
                    // Ожиданием между вызывами
                    if (l.interval == 0) {
                        // Если количество мерцаний 0, то задать количество от 1 до 5
                        if (l.flashingRepeat == 0) {
                            l.flashingRepeat = Math.ceil(Math.random() * 4) + 1;
                            this._parallaxSprites[j].alpha = 0;

                        } else { // Иначе отображение мерцаний

                            // Ожидание отображения картики
                            if (l.flashingFrame == 0) {
                                // Если изображение скрыто (apha 0)
                                if (this._parallaxSprites[j].alpha == 0) {
                                    // Показываем изображение
                                    this._parallaxSprites[j].alpha = 1;
                                    // выставляем подождать 5 обращений (в противном случае картинку просто не будет видно)
                                    l.flashingFrame = 5;
                                } else {
                                    // Иначе скрываем изображение
                                    this._parallaxSprites[j].alpha = 0;
                                    // Уменьщаем счётчик количества мерцаний
                                    l.flashingRepeat -= 1;
                                    // Если количество мерцаний исчерпано, то устонавливаем интервал до следующего вызова
                                    if (l.flashingRepeat == 0) {
                                        l.interval = l.pause;
                                    }
                                }
                            } else {
                                // Уменьшаем интервал ожидания отображения
                                l.flashingFrame -= 1;
                            }
                        }
                    } else {
                        // Уменьшаем интервал ожидания между вызовами
                        l.interval -= 1;
                    }
                // Для других эффектов
                } else {
                    // Ожиданием между вызывами
                    if (l.interval == 0) {
                        // Расчитываем новый угл для эффектов типа маятник
                        l.angle += angle/10 * l.speed;
                        // Вызваем функцию движения слоя (паралакса)
                        var r = moveParallax(this._parallaxSprites[j], l.effect, l.speed, l.angle, l.upDownSign, l.leftRightSign);
                        var finished = r[0];
                        // Обновляем направления для движения вверх/вниз и влево/вправо
                        l.upDownSign = r[1];
                        l.leftRightSign = r[2];
                        // Если вернулось значение true, эффект закончился и можно выстаить интервал ожидания между вызовами
                        if (finished) {
                            l.interval = l.pause;
                        }
                    } else {
                        // Уменьшаем интервал ожидания между вызовами
                        l.interval -= 1;
                    }  
                }
            }
        }
    };
    
    //------------------------------------------------------
	// Создаём дополнительную фунцию эффектов для параллаксов
	//------------------------------------------------------
    function moveParallax(parallax, effect, speed, angle, upDownSign, leftRightSign) {
        // устанавливаем значение по умолчанию, эффект не завершен
        var finished = false;
        // Проверяем, а задан ли эффект
        if (effect && effect != "") {
            
            // Если эффект вращения по часовой стрелке
            if (effect == "move_cw") {
                // Рассчитываем положение по формуле движения по окружности
                parallax.x = parallax.width/4 * Math.sin(angle) - parallax.width/4;
                parallax.y = parallax.height/4 * Math.cos(angle) - parallax.height/4;
            
            // Если эффект вращения против часовой стрелке
            } else if (effect == "move_ccw") {
                // Так же рассчитываем положение по формуле движения по окружности,
                // но в обратном направлении
                parallax.x = parallax.width/4 * -Math.sin(angle) - parallax.width/4;
                parallax.y = parallax.height/4 * -Math.cos(angle) - parallax.height/4;
            
            // Если эффект маятник вверх/вниз
            } else if (effect == "move_up_down") {
                // Расчитываем положение по формуле движения по окружности,
                // но только для координаты Y
                parallax.y = parallax.height/4 * Math.cos(angle) - parallax.height/4;
            
            // Если эффект маятник влево/вправо
            } else if (effect == "move_left_right") {
                // Расчитываем положение по формуле движения по окружности,
                // но только для координаты X
                parallax.x = parallax.width/4 * Math.sin(angle) - parallax.width/4;
            
            // Если эффект движения зигзагом (как мячик отскакивает от стенок)
            } else if (effect == "move_zigzag") {
                parallax.y += speed*upDownSign;
                if (Math.abs(parallax.y) > parallax.height/2) {
                    upDownSign = 1;
                } else if (parallax.y > 0) {
                    upDownSign = -1;
                }             
                parallax.x += speed*leftRightSign;
                if (Math.abs(parallax.x) > parallax.width/2) {
                    leftRightSign = 1;
                } else if (parallax.x > 0) {
                    leftRightSign = -1;
                }
            }
            
            // Если эффект движения вверх, вверх и влево или вверх и вправо
            if (effect == "move_up" || effect == "move_up_left" || effect == "move_up_right") {
                parallax.y -= speed;
                if (Math.abs(parallax.y) > parallax.height/2) {
                    parallax.y = 0;
                    finished = true;
                }
            }
            // Если эффект движения вниз, вниз и влево или вниз и вправо
            if (effect == "move_down" || effect == "move_down_left" || effect == "move_down_right") {
                parallax.y += speed;
                if (parallax.y > 0) {
                    parallax.y = -(parallax.height/2);
                    finished = true;
                }
                
            }
            
            // Если эффект движения влево, вверх и влево или вниз и влево
            if (effect == "move_left" || effect == "move_up_left" || effect == "move_down_left") {
                parallax.x -= speed;
                if (Math.abs(parallax.x) > parallax.width/2) {
                    parallax.x = 0;
                    finished = true;
                }
                
            }
            // Если эффект движения вправо, вверх и вправо или вниз и вправо
            if (effect == "move_right" || effect == "move_up_right" || effect == "move_down_right") {
                parallax.x += speed;
                if (parallax.x > 0) {
                    parallax.x = -(parallax.width/2);
                    finished = true;
                }
            }
        }
        // Возвращаем состояние эффекта и обновлённые значение направления движения
        return [finished, upDownSign, leftRightSign];
    }
    
    //------------------------------------------------------
	// Переопределяем вызов фунции инициализации звуков сцены
	//------------------------------------------------------
    BattleManager.playBattleBgm = function() {
        // Запускаем шумовой эффект, если он задан
        if (bgsound && bgsound != "") {
            AudioManager.playBgs({name: bgsound, volume: bgsVolume, pitch: 100, pan: 0, pos: 0});
        }
        // Запускаем музыку, если она задана
        if (bgmusic && bgmusic != "") {
            AudioManager.playBgm({name: bgmusic, volume: bgmVolume, pitch: 100, pan: 0, pos: 0});
        }
    };
    
    //------------------------------------------------------
	// Создаём дополнительную фунцию получения параметров региона из настроек плагина
	//------------------------------------------------------
    function getRegionData(rId) {
        // в rId номер запрашиваемого региона
        
        var rData;  // Специально не ининилизируем rData, на случий отсутсвия данных для региона
        
        // Перебираем весь массив с данными регионов
        for (var i=0; i < regionData.length; i++) {
            // Получаем массив данных одного региона
            // С помощь JSON.parse превращаем строку в массив данных
            var tmpData = JSON.parse(regionData[i]); //   
            // Получаем номер региона
            var tmpRegionId = Number(tmpData.regionId);
            // Если запись верна и регион сопадает с запрашиваемыми данными,
            // то начинаем заполнение данных
            if (!isNaN(tmpRegionId) && tmpRegionId == rId) {
                rData = {}; // Инициализируем
                
                // Сохраняем имена фоновых картинок
                rData.background = tmpData.background;
                rData.foreground = tmpData.foreground;
                
                // Сохраняем имена звуковых файлов
                rData.bgsound = tmpData.bgsound;
                rData.bgmusic = tmpData.bgmusic;
                // Сохраняем настройки громкости
                rData.bgsVolume = tmpData.bgsVolume;        
                rData.bgmVolume = tmpData.bgmVolume;
                
                // Формируем данные для слоёв (параллаксов)
                rData.layers = [];
                for (var i = 0; i < layersSize; i++) {
                    rData.layers[i]= {
                        "layer" : tmpData["layer" + (i+1)],
                        "effect" : tmpData["layer" + (i+1) + "effect"],
                        "speed" : Number(tmpData["layer" + (i+1) + "speed"]),
                        "pause" : Number(tmpData["layer" + (i+1) + "pause"])
                    }
                }
                
                // Формируем данные для анимаций
                rData.animations = [];
                for (var i = 0; i < animationsSize; i++) {
                    rData.animations[i]= {
                        "fileName" : tmpData["aniFile" + (i+1)],
                        "framesCount" : Number(tmpData["aniFrames" + (i+1)]),
                        "waitFrame" : Number(tmpData["aniWaitFrame" + (i+1)]),
                        "isReverse" : false,
                        "positions" : []
                    };
                    if (tmpData["aniReverse" + (i+1)] != undefined) {
                        rData.animations[i].isReverse = tmpData["aniReverse" + (i+1)].toUpperCase() == "TRUE" ? true : false;
                    }
                    if (tmpData["aniPosition" + (i+1)] && tmpData["aniPosition" + (i+1)] != "") {
                        rData.animations[i].positions= JSON.parse(tmpData["aniPosition" + (i+1)]);
                    }
                }
                // выходим из цикла, больше в поиске небходимости нет
                break;
            }
        }
        // Возвращаем результат
        return rData;
    }
// Завершение основного кода плагина
})();
