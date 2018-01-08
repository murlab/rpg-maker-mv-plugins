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

(function() {

    var params = PluginManager.parameters('MUR_AwesomeBattleground');
    var regionData = JSON.parse(params["regionData"]);
    var screenResolutionEnable = params["screenResolutionEnable"].toUpperCase() == "TRUE" ? true : false;
    
    var background = null;
    var foreground = null;

    var layers = [];
    var layersSize = 2;
    
    var animations = [];
    var animationsSize = 4;
    
    var bgsound = null;
    var bgsVolume = 0;
    
    var bgmusic = null;
    var bgmVolume = 0;
    
    
    var angle = 2 * Math.PI/180;

    if (screenResolutionEnable) {
        var detectWildscreen = params["wildScreenDetect"].toUpperCase() == "TRUE" ? true : false;
        var screenWidth = Number(params['screenWidth'] || 816);
        var screenHeight = Number(params['screenHeight'] || 624);

        if (detectWildscreen) {
            var originalWidth = screen.width;
            var originalHeight = screen.height;
            var percent = originalWidth/originalHeight;
            screenWidth = Math.ceil(screenHeight * percent);
        }
        
        SceneManager._screenWidth  = screenWidth;
        SceneManager._screenHeight = screenHeight;
        SceneManager._boxWidth     = screenWidth;
        SceneManager._boxHeight    = screenHeight;

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
        
        Sprite_Battler.prototype.updatePosition = function() {
            var corrX = (Math.abs(screenWidth - 816))/2;
            var corrY = (Math.abs(screenHeight - 624))/2;    
            this.x = this._homeX + this._offsetX + corrX*1.5;
            this.y = this._homeY + this._offsetY + corrY*1.5;
        };    
    }
    
    var _Game_Interpreter_command301 = Game_Interpreter.prototype.command301;
    Game_Interpreter.prototype.command301 = function() {
        _Game_Interpreter_command301.call(this);
        if (!$gameParty.inBattle()) {
            var regionId = $gameMap.regionId($gamePlayer.x,$gamePlayer.y);
            if (regionId != undefined) {
                var regionData = getRegionData(regionId);
                if (regionData != undefined) {
                    background = regionData.background;
                    foreground = regionData.foreground;
                    
                    layers = regionData.layers;
                    animations = regionData.animations;
                    
                    bgsound = regionData.bgsound;
                    bgsVolume = regionData.bgsVolume;
                    
                    bgmusic = regionData.bgmusic;
                    bgmVolume = regionData.bgmVolume;

                } else {
                    console.warn("Data for region " + regionId + " not found!");
                }
            }
        }
        return true;
    }

	var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function(command, args) {
		_Game_Interpreter_pluginCommand.call(this, command, args);
		if (command.toLowerCase() === "setcurrentregionid") {
			var regionId = Number(args[0]);
            $gameMap.setRegionId($gamePlayer.x,$gamePlayer.y, regionId);
		}
	};

    Game_Map.prototype.setRegionId = function(x, y, value) {
        var mapWidth = $dataMap.width;
        var mapHeight = $dataMap.height;
        var z = 5;
        $dataMap.data[(z * mapHeight + y) * mapWidth + x] = value;
    };

    Spriteset_Battle.prototype.createBattleback = function() {
        var sprsetBattle = this;
        this._backgroundSprite = new Sprite();
        this._backgroundSprite.bitmap = ImageManager.loadBitmap('img/fx_background/', background, null, true);
        this._backgroundSprite.move(0,0);
        this._battleField.addChild(this._backgroundSprite);
        this._parallaxSprites = [];
        this._parallaxBitmaps = [];

        for (var j = 0; j < layers.length; j++) {
            var l = layers[j];
            l.angle = 0;
            l.leftRightSign = -1;
            l.upDownSign = -1;
            l.fadeInSign = 1;
            l.flashingRepeat = 0;
            l.flashingFrame = 0;

            if (l.layer && l.layer != "") {
                
                l.interval = 0;
                this._parallaxSprites[j] = new Sprite();
                this._parallaxBitmaps[j] = ImageManager.loadBitmap('img/fx_parallax/', l.layer, null, true);                
                this._parallaxBitmaps[j].addLoadListener(function(idx) {
                    if (this.isReady() && this.width > 0 && this.height > 0) {
                        // получаем данные для данного слоя
                        var l = layers[idx];
                        if (l.effect == "fade_in_out" || l.effect == "flashing") {
                            sprsetBattle._parallaxSprites[idx].width = this.width;
                            sprsetBattle._parallaxSprites[idx].height = this.height;
                            sprsetBattle._parallaxSprites[idx].bitmap = new Bitmap(this.width, this.height);
                            sprsetBattle._parallaxSprites[idx].bitmap.blt(this, 0, 0, this.width, this.height, 0, 0);
                        
                        } else if (l.effect == "move_up" || l.effect == "move_down" || l.effect == "move_up_down") {
                            sprsetBattle._parallaxSprites[idx].width = this.width;
                            sprsetBattle._parallaxSprites[idx].height = this.height*2;
                            sprsetBattle._parallaxSprites[idx].bitmap = new Bitmap(this.width, this.height*2);

                            sprsetBattle._parallaxSprites[idx].bitmap.blt(this, 0, 0, this.width, this.height, 0, 0);
                            sprsetBattle._parallaxSprites[idx].bitmap.blt(this, 0, 0, this.width, this.height, 0, this.height);

                        } else if (l.effect == "move_left" || l.effect == "move_right" || l.effect == "move_left_right"  ||  l.effect == "move_zigzag"){
                            sprsetBattle._parallaxSprites[idx].width = this.width*2;
                            sprsetBattle._parallaxSprites[idx].height = this.height;
                            sprsetBattle._parallaxSprites[idx].bitmap = new Bitmap(this.width*2, this.height);

                            sprsetBattle._parallaxSprites[idx].bitmap.blt(this, 0, 0, this.width, this.height, 0, 0);
                            sprsetBattle._parallaxSprites[idx].bitmap.blt(this, 0, 0, this.width, this.height, this.width, 0);

                        } else {
                            sprsetBattle._parallaxSprites[idx].width = this.width*2;
                            sprsetBattle._parallaxSprites[idx].height = this.height*2;
                            sprsetBattle._parallaxSprites[idx].bitmap = new Bitmap(this.width*2, this.height*2);

                            sprsetBattle._parallaxSprites[idx].bitmap.blt(this, 0, 0, this.width, this.height, 0, 0);
                            sprsetBattle._parallaxSprites[idx].bitmap.blt(this, 0, 0, this.width, this.height, this.width, 0);
                            sprsetBattle._parallaxSprites[idx].bitmap.blt(this, 0, 0, this.width, this.height, 0, this.height);
                            sprsetBattle._parallaxSprites[idx].bitmap.blt(this, 0, 0, this.width, this.height, this.width, this.height);
                        }

                        sprsetBattle._parallaxSprites[idx].move(0, 0);
                        sprsetBattle._battleField.addChildAt(sprsetBattle._parallaxSprites[idx], 1);    
                    }
                }.bind(this._parallaxBitmaps[j], j));
            }
        }
        
        this._aniSprites = [];
        this._aniBitmaps = [];

        for (var j = 0; j < animations.length; j++) {
            var a = animations[j];
            if (a.fileName && a.fileName != "") {
                
                a.waitCurrent = 0;
                this._aniBitmaps[j] = ImageManager.loadBitmap('img/fx_animation/', a.fileName, null, true);
                this._aniBitmaps[j].addLoadListener(function(idx) {
                    sprsetBattle.createSprites(this, idx);
                }.bind(this._aniBitmaps[j], j));
            }
        }
        this._foregroundSprite = new Sprite();
        this._foregroundSprite.bitmap = ImageManager.loadBitmap('img/fx_foreground/', foreground, null, true);
        this._foregroundSprite.move(0,0);
        this._battleField.addChild(this._foregroundSprite);

    };

    Spriteset_Battle.prototype.createSprites = function(bmp, idx) {
        var a = animations[idx];
        a.frameWidth = bmp.width;
        a.frameHeight = bmp.height / a.framesCount;
        a.waitCurrent = 0;
        var newSprites = [];
        for (var i=0; i<a.positions.length; i++) {        
            var aData = JSON.parse(a.positions[i]);   
            var startFrame = Number(aData.startFrame);
            var posX = Number(aData.posX);
            var posY = Number(aData.posY);

            newSprites[i] = new Sprite();
            newSprites[i].width = a.frameWidth;
            newSprites[i].height = a.frameHeight;

            newSprites[i].bitmap = new Bitmap(a.frameWidth, a.frameHeight);
            newSprites[i].bitmap.blt(bmp, 0, a.frameHeight * Number(aData.startFrame), a.frameWidth, a.frameHeight, 0, 0);

            newSprites[i].currentFrame = startFrame;
            newSprites[i].frameSign = 1;
            newSprites[i].move(posX, posY);
            this._battleField.addChild(newSprites[i]);
        }
        this._aniSprites[idx] = newSprites;        
    }

    Spriteset_Battle.prototype.updateBattleback = function() {
        for (var j = 0; j < animations.length; j++) {
            var a = animations[j];
            if (a.fileName && a.fileName != "" && this._aniBitmaps[j] && this._aniBitmaps[j].isReady() && this._aniBitmaps[j].width > 0 && this._aniBitmaps[j].height > 0) {
                if (a.waitCurrent == 0) {
                    var aniSprites = this._aniSprites[j];
                    for (var i = 0; i < a.positions.length; i++) {
                        var aSprite = aniSprites[i];
                        var framePos = a.frameHeight * aSprite.currentFrame;
                        aSprite.bitmap = new Bitmap(a.frameWidth, a.frameHeight);
                        aSprite.bitmap.blt(this._aniBitmaps[j], 0, framePos, a.frameWidth, a.frameHeight, 0, 0);
                        if (a.isReverse) {
                            aSprite.currentFrame += aSprite.frameSign;
                            if (aSprite.frameSign == 1 && aSprite.currentFrame == a.framesCount - 1) {
                                aSprite.frameSign = -1;

                            } else if (aSprite.frameSign == -1 && aSprite.currentFrame == 0) {
                                aSprite.frameSign = 1;
                            }
                        } else {                        
                            aSprite.currentFrame += 1;
                            if (aSprite.currentFrame == a.framesCount) {
                                aSprite.currentFrame = 0;
                            }
                        }
                    }
                    a.waitCurrent = a.waitFrame;
                } else {
                    a.waitCurrent -= 1;
                }
            }
        }
        
        for (var j = 0; j < layers.length; j++) {
            var l = layers[j];
            if (l.layer && l.layer != "") {
                if (l.effect == "fade_in_out") {
                    if (l.interval == 0) {
                        this._parallaxSprites[j].alpha += l.fadeInSign;
                        if (this._parallaxSprites[j].alpha > 1) {
                            this._parallaxSprites[j].alpha = 1;
                        } else if (this._parallaxSprites[j].alpha < 0) {
                            this._parallaxSprites[j].alpha = 0;
                            l.fadeInSign = 0.01 * l.speed;
                            l.interval = l.pause;
                        }
                    } else {
                        l.interval -= 1;
                    }
                
                } else if (l.effect == "flashing") {
                    if (l.interval == 0) {
                        if (l.flashingRepeat == 0) {
                            l.flashingRepeat = Math.ceil(Math.random() * 4) + 1;
                            this._parallaxSprites[j].alpha = 0;

                        } else {
                            if (l.flashingFrame == 0) {
                                if (this._parallaxSprites[j].alpha == 0) {
                                    this._parallaxSprites[j].alpha = 1;
                                    l.flashingFrame = 5;
                                } else {
                                    this._parallaxSprites[j].alpha = 0;
                                    l.flashingRepeat -= 1;
                                    if (l.flashingRepeat == 0) {
                                        l.interval = l.pause;
                                    }
                                }
                            } else {
                                l.flashingFrame -= 1;
                            }
                        }
                    } else {
                        l.interval -= 1;
                    }
                } else {
                    if (l.interval == 0) {
                        l.angle += angle/10 * l.speed;
                        var r = moveParallax(this._parallaxSprites[j], l.effect, l.speed, l.angle, l.upDownSign, l.leftRightSign);
                        var finished = r[0];
                        l.upDownSign = r[1];
                        l.leftRightSign = r[2];
                        if (finished) {
                            l.interval = l.pause;
                        }
                    } else {
                        l.interval -= 1;
                    }  
                }
            }
        }
    };

    function moveParallax(parallax, effect, speed, angle, upDownSign, leftRightSign) {
        var finished = false;
        if (effect && effect != "") {
            if (effect == "move_cw") {
                parallax.x = parallax.width/4 * Math.sin(angle) - parallax.width/4;
                parallax.y = parallax.height/4 * Math.cos(angle) - parallax.height/4;
            } else if (effect == "move_ccw") {
                parallax.x = parallax.width/4 * -Math.sin(angle) - parallax.width/4;
                parallax.y = parallax.height/4 * -Math.cos(angle) - parallax.height/4;
            
            } else if (effect == "move_up_down") {
                parallax.y = parallax.height/4 * Math.cos(angle) - parallax.height/4;

            } else if (effect == "move_left_right") {
                parallax.x = parallax.width/4 * Math.sin(angle) - parallax.width/4;
            
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
            
            if (effect == "move_up" || effect == "move_up_left" || effect == "move_up_right") {
                parallax.y -= speed;
                if (Math.abs(parallax.y) > parallax.height/2) {
                    parallax.y = 0;
                    finished = true;
                }
            }

            if (effect == "move_down" || effect == "move_down_left" || effect == "move_down_right") {
                parallax.y += speed;
                if (parallax.y > 0) {
                    parallax.y = -(parallax.height/2);
                    finished = true;
                }
                
            }
            
            if (effect == "move_left" || effect == "move_up_left" || effect == "move_down_left") {
                parallax.x -= speed;
                if (Math.abs(parallax.x) > parallax.width/2) {
                    parallax.x = 0;
                    finished = true;
                }
                
            }

            if (effect == "move_right" || effect == "move_up_right" || effect == "move_down_right") {
                parallax.x += speed;
                if (parallax.x > 0) {
                    parallax.x = -(parallax.width/2);
                    finished = true;
                }
            }
        }
        return [finished, upDownSign, leftRightSign];
    }
    
    BattleManager.playBattleBgm = function() {
        if (bgsound && bgsound != "") {
            AudioManager.playBgs({name: bgsound, volume: bgsVolume, pitch: 100, pan: 0, pos: 0});
        }
        if (bgmusic && bgmusic != "") {
            AudioManager.playBgm({name: bgmusic, volume: bgmVolume, pitch: 100, pan: 0, pos: 0});
        }
    };

    function getRegionData(rId) {
        var rData;
        for (var i=0; i < regionData.length; i++) {
            var tmpData = JSON.parse(regionData[i]); //   
            var tmpRegionId = Number(tmpData.regionId);
            if (!isNaN(tmpRegionId) && tmpRegionId == rId) {
                rData = {};
                rData.background = tmpData.background;
                rData.foreground = tmpData.foreground;
                rData.bgsound = tmpData.bgsound;
                rData.bgmusic = tmpData.bgmusic;
                rData.bgsVolume = tmpData.bgsVolume;        
                rData.bgmVolume = tmpData.bgmVolume;
                rData.layers = [];
                for (var i = 0; i < layersSize; i++) {
                    rData.layers[i]= {
                        "layer" : tmpData["layer" + (i+1)],
                        "effect" : tmpData["layer" + (i+1) + "effect"],
                        "speed" : Number(tmpData["layer" + (i+1) + "speed"]),
                        "pause" : Number(tmpData["layer" + (i+1) + "pause"])
                    }
                }
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
                break;
            }
        }
        return rData;
    }
})();
