//=============================================================================
// MUR Event Graphics v1.3
// by MUR (https://github.com/murlab)
// BSD 3-Clause License
// Free for use with both free and commercial RPG Maker games.
//=============================================================================

/*:en
 * @plugindesc v1.3 Graphics for events
 * @author Mur
 * @help This plug-in does not have any additional settings, and all control takes
 * place through comments at the beginning of the event:
 *
 * <move_event_gfx_to: x, y, z> — event image shift by pixels.
 * By horizontal (X axis), by vertical (Y axis), and you can also specify Z,
 * the number of the layer.
 *
 * <slide_event_vertical: size, speed> — Cycle motion of the image by vertical
 * (pendulum effect). Where the "size" is the size in pixels of the motion zone,
 * the "speed" is the speed of movement.
 *
 * <slide_event_horizontal size, speed> — Cycle motion of the image by horizontal
 * (pendulum effect). Where the "size" is the size in pixels of the motion zone,
 * the "speed" is the speed of movement.
 *
 * <set_event_bg_gfx: bitmap, offsetX, offsetY> — Additional image, located
 * behind the image of events. Where bitmap is the name of the image that
 * is loaded from img/events/, and offsetX and offsetY are the offset relative
 * to the event center.
 *
 * <set_event_fg_gfx: bitmap, offsetX, offsetY> — Additional image, located
 * in front of the image of events. Where bitmap is the name of the image that
 * is loaded from img/events/, and offsetX and offsetY are the offset relative
 * to the event center.
 *
 * <animation_event_start: frames, pause, reverse> - starts sequential animation
 * (frame change: down 1, down 2, down 3, left 1, left 2,... etc)
 * Where frames - the number of frames used (up to 12), pause - the delay between
 * frames, reverse - if true, the frames are repeated ...10,11,12 - 11,10,
 * if false ...10,11,12 - 1,2...
 *
 * <jump_event: hight, speed> — Cycled motion of the image vertically, namely,
 * bouncing. Where "hight" - height of jump, "speed" - how quickly this do it.
 *
 * <set_event_shadow_to: bitmap, offsetX, offsetY> — adds an shadow's image,
 * located behind the image of events. Unlike set_event_bg_gfx, this image
 * is deformed (varies in size) depending on the values of "height" when used
 * with slide_event_vertical or jump_event, its transparency (alpha channel)
 * also change. Where bitmap is the name of the image that is loaded from
 * img/events/, and offsetX and offsetY are the offset relative to
 * the center of the event.
 *
 * Different animations can be combined together, listing them in several
 * comments in a row.
 *
 */
 /*:ru
* @plugindesc v1.3 Графика для событий
 * @author Mur
 * @help Данный плагин не имеет дополнительных настроек, а всё управление происходит
 * через комментарии в начале события:
 *
 * <move_event_gfx_to: x, y, z> — смещение в пикселях изображение события.
 * По горизонтали (ось X), по вертикали (ось Y), а также можно задать номер
 * слоя Z.
 *
 * <slide_event_vertical: size, speed> — зацикленное движение изображения
 * по вертикали (эффект маятника). Где size — размер в пикселях зоны движения,
 * а speed — скорость движения.
 *
 * <slide_event_horizontal size, speed> — зацикленное движение изображения
 * по горизонтали (эффект маятника). Где size — размер в пикселях зоны движения,
 * а speed — скорость движения.
 *
 * <set_event_bg_gfx: bitmap, offsetX, offsetY> — дополнительное изображение,
 * расположенное за изображением события. Где bitmap — имя изображения, которое
 * подгружается из img/events/, а offsetX и offsetY — смещение относительно
 * центра события.
 *
 * <set_event_fg_gfx: bitmap, offsetX, offsetY> — дополнительное изображение,
 * расположенное перед изображением события. Где bitmap — имя изображения, которое
 * подгружается из img/events/, а offsetX и offsetY — смещение относительно
 * центра события.
 *
 * <animation_event_start: frames, pause, reverse> - запускает последовательную
 * анимацию (смену кадров: вниз 1, вниз 2, вниз 3, влево 1, влево 2,... итд)
 * Где frames — количество используемых кадров (до 12), pause - задержка
 * между кадрами, reverse — если true, то кадры повторяются ...10,11,12 — 11,10,
 * если false ...10,11,12 — 1,2...
 *
 * <jump_event: hight, speed> — Циклическое движение изображения по вертикали,
 * а именно, подпрыгивание. Где hight - высота прыжка, speed - как быстро
 * это делается.
 *
 * <set_event_shadow_to: bitmap, offsetX, offsetY> — добавляет за основным
 * изображением события изображение тени. В отличии от set_event_bg_gfx,
 * данное изображение деформируется (изменяется в размере) в зависимости от
 * значений «высоты» при совместоном использованиии с slide_event_vertical или
 * jump_event, а также изменяется его прозрачность (альфа-канал). Где bitmap —
 * имя изображения которое подгружается из img/events/, а offsetX и offsetY —
 * смещение относительно центра события.
 *
 * Различную анимацию можно комбинировать вместе, перечислив их в нескольких
 * комментариях подряд.
 *
*/

(function() {

    var angleRad = 2 * Math.PI/180;
    
    // 2 = Down, 4 = Left, 6 = Right, 8 = Up
    var eventGraphicsFrames = [
        [2,0],[2,1],[2,2],
        [4,0],[4,1],[4,2],
        [6,0],[6,1],[6,2],
        [8,0],[8,1],[8,2]
    ]
    
    var eventsBgImage = new Array();
    var eventsFgImage = new Array();
    var eventsShadow = new Array();

    var Game_Event_setupPageSettings = Game_Event.prototype.setupPageSettings;
    Game_Event.prototype.setupPageSettings = function() {
        if (this.page()) {
            var comments = this.getEventComments();
            if (comments != undefined && comments != "") {
                if (this._eventGfxOffsetX == undefined && this._eventGfxOffsetY == undefined && this._eventGfxOffsetZ == undefined) {
                    if(comments.match(/<move_event_gfx_to:\s*(.*)>/im)) {
                        var shift = comments.match(/<move_event_gfx_to:\s*(.*)>/im)[1].split(/(?:\s+,\s+|,\s+|\s+,|\s+|,)/);
                        this._eventGfxOffsetX = shift[0] ? Number(shift[0]) : 0;
                        this._eventGfxOffsetY = shift[1] ? Number(shift[1]) : 0;
                        this._eventGfxOffsetZ = shift[2] ? Number(shift[2]) : 0;
                    }
                }
                if (this._eventVSlideSize == undefined && this._eventVSlideSpeed == undefined) {
                    if(comments.match(/<slide_event_vertical:\s*(.*)>/im)) {
                        var vSlide = comments.match(/<slide_event_vertical:\s*(.*)>/im)[1].split(/(?:\s+,\s+|,\s+|\s+,|\s+|,)/);
                        this.vAngle = 0;
                        this._eventVSlideSize = vSlide[0] ? Number(vSlide[0]) : 0;
                        this._eventVSlideSpeed = vSlide[1] ? Number(vSlide[1]) : 0;
                    }
                }
                if (this._eventHSlideSize == undefined && this._eventHSlideSpeed == undefined) {
                    if(comments.match(/<slide_event_horizontal:\s*(.*)>/im)) {
                        var hSlide = comments.match(/<slide_event_horizontal:\s*(.*)>/im)[1].split(/(?:\s+,\s+|,\s+|\s+,|\s+|,)/);
                        this.hAngle = 0;
                        this._eventHSlideSize = hSlide[0] ? Number(hSlide[0]) : 0;
                        this._eventHSlideSpeed = hSlide[1] ? Number(hSlide[1]) : 0;
                    }
                }
                if (eventsBgImage[this._eventId] == undefined && this._eventBgImageOffsetX == undefined && this._eventBgImageOffsetY == undefined) {
                    if(comments.match(/<set_event_bg_gfx:\s*(.*)>/im)) {
                        var bgGfx = comments.match(/<set_event_bg_gfx:\s*(.*)>/im)[1].split(/(?:\s+,\s+|,\s+|\s+,|\s+|,)/);
                        eventsBgImage[this._eventId] = new Sprite();
                        eventsBgImage[this._eventId].bitmap = ImageManager.loadBitmap('img/events/', bgGfx[0], null, true);
                        this._eventBgImageOffsetX = bgGfx[1] ? Number(bgGfx[1]) : 0;
                        this._eventBgImageOffsetY = bgGfx[2] ? Number(bgGfx[2]) : 0;
                    }
                }
                if (eventsFgImage[this._eventId] == undefined && this._eventFgImageOffsetX == undefined && this._eventFgImageOffsetY == undefined) {
                    var comments = this.getEventComments();
                    if(comments.match(/<set_event_fg_gfx:\s*(.*)>/im)) {
                        var fgGfx = comments.match(/<set_event_fg_gfx:\s*(.*)>/im)[1].split(/(?:\s+,\s+|,\s+|\s+,|\s+|,)/);
                        eventsFgImage[this._eventId] = new Sprite();
                        eventsFgImage[this._eventId].bitmap = ImageManager.loadBitmap('img/events/', fgGfx[0], null, true);
                        this._eventFgImageOffsetX = fgGfx[1] ? Number(fgGfx[1]) : 0;
                        this._eventFgImageOffsetY = fgGfx[2] ? Number(fgGfx[2]) : 0;
                    }
                }
                if (this._eventAniFrames == undefined && this._eventAniPause == undefined && this._eventAniReverse == undefined ) {
                    if(comments.match(/<animation_event_start:\s*(.*)>/im)) {
                        var anima = comments.match(/<animation_event_start:\s*(.*)>/im)[1].split(/(?:\s+,\s+|,\s+|\s+,|\s+|,)/);
                        this._eventAniFramesCurrent = 0;
                        this._eventAniFrames = anima[0] ? Number(anima[0]) : 0;
                        this._eventAniPause = anima[1] ? Number(anima[1]) : 0;
                        this._eventAniPauseCurrent = this._eventAniPause;
                        this._eventAniReverse = anima[2].toUpperCase() == "TRUE" ? true : false;
                        this._eventAniStep = 1;
                    }
                }
                if (this._eventJumpHeight == undefined && this._eventJumpSpeed == undefined) {
                    var comments = this.getEventComments();
                    if(comments.match(/<jump_event:\s*(.*)>/im)) {
                        var jump = comments.match(/<jump_event:\s*(.*)>/im)[1].split(/(?:\s+,\s+|,\s+|\s+,|\s+|,)/);
                        this.vAngle = 0;
                        this._eventJumpHeight = jump[0] ? Number(jump[0]) : 0;
                        this._eventJumpSpeed = jump[1] ? Number(jump[1]) : 0;
                    }
                }
                if (eventsShadow[this._eventId] == undefined && this._eShadowOffsetX == undefined && this._eShadowOffsetY == undefined) {
                    if(comments.match(/<set_event_shadow_to:\s*(.*)>/im)) {
                        var shadow = comments.match(/<set_event_shadow_to:\s*(.*)>/im)[1].split(/(?:\s+,\s+|,\s+|\s+,|\s+|,)/);
                        eventsShadow[this._eventId] = new Sprite();
                        eventsShadow[this._eventId].bitmap = ImageManager.loadBitmap('img/events/', shadow[0], null, true);
                        this._eShadowOffsetX = shadow[1] ? Number(shadow[1]) : 0;
                        this._eShadowOffsetY = shadow[2] ? Number(shadow[2]) : 0;
                    } 
                }
            } else {
                if (eventsShadow[this._eventId] != undefined) { this._eShadowDelete = true; }
                if (eventsBgImage[this._eventId] != undefined) {this._eventBgImageDelete = true; }
                if (eventsFgImage[this._eventId] != undefined) { this._eventFgImageDelete = true; }
                if (this._eventAniFrames != undefined) {
                    this._eventAniFrames = undefined;
                    this._eventAniPause = undefined;
                    this._eventAniReverse = undefined;
                }
                if (this._eventJumpHeight != undefined) {
                    this._eventJumpHeight = undefined;
                    this._eventJumpSpeed = undefined;
                }
                if (this._eventVSlideSize != undefined) {
                    this._eventVSlideSize = undefined;
                    this._eventVSlideSpeed = undefined;
                }
                if (this._eventHSlideSize != undefined) {
                    this._eventHSlideSize = undefined;
                    this._eventHSlideSpeed = undefined;
                }
            }
        }
        Game_Event_setupPageSettings.call(this);
    };

    var Sprite_Character_updatePosition = Sprite_Character.prototype.updatePosition;
    Sprite_Character.prototype.updatePosition = function() {
        Sprite_Character_updatePosition.call(this);

        var char = this._character;
        if(char instanceof Game_Event) {
            if (eventsShadow[char._eventId] != undefined && char._eShadowDelete == true) {
                this.parent.removeChild(eventsShadow[char._eventId]);
                delete eventsShadow[char._eventId];
                char._eShadowOffsetX = undefined;
                char._eShadowOffsetY = undefined;
                char._eShadowDelete = false;
            }
            if (eventsBgImage[char._eventId] != undefined && char._eventBgImageDelete == true) {
                this.parent.removeChild(eventsBgImage[char._eventId]);
                delete eventsBgImage[char._eventId];
                char._eventBgImageOffsetX = undefined;
                char._eventBgImageOffsetY = undefined;
                char._eventBgImageDelete = false;
            }
            if (eventsFgImage[char._eventId] != undefined && char._eventFgImageDelete == true) {
                this.parent.removeChild(eventsFgImage[char._eventId]);
                delete eventsFgImage[char._eventId];
                char._eventFgImageOffsetX = undefined;
                char._eventFgImageOffsetY = undefined;
                char._eventFgImageDelete = false;
            }
            
            if (eventsShadow[char._eventId] != undefined && eventsShadow[char._eventId]._isNew && eventsShadow[char._eventId].bitmap.isReady()) {
                var selfPosition = this.parent.children.indexOf(this);
                this.parent.addChildAt(eventsShadow[char._eventId], selfPosition);
                eventsShadow[char._eventId]._isNew = false;
                eventsShadow[char._eventId].z = 1;
            }
            if (char._eShadowOffsetX != undefined && char._eShadowOffsetY != undefined) {
                var shadowWidth = eventsShadow[char._eventId].bitmap.width;
                var shadowHeight = eventsShadow[char._eventId].bitmap.height;
                eventsShadow[char._eventId].move(this.x + char._eShadowOffsetX - shadowWidth/2, this.y + char._eShadowOffsetY - shadowHeight);
                eventsShadow[char._eventId].z = this.z;
            }
            
            if (char._eventGfxOffsetX != undefined && char._eventGfxOffsetX != 0) { this.x += char._eventGfxOffsetX; }
            if (char._eventGfxOffsetY != undefined && char._eventGfxOffsetY != 0) { this.y += char._eventGfxOffsetY; }
            if (char._eventGfxOffsetZ != undefined && char._eventGfxOffsetZ != 0) { this.z += char._eventGfxOffsetZ; }
            
            if (char._eventVSlideSize != undefined && char._eventVSlideSize != 0 &&
                char._eventVSlideSpeed != undefined && char._eventVSlideSpeed != 0) {
                char.vAngle += angleRad/10 * char._eventVSlideSpeed;
                this.y += char._eventVSlideSize * Math.cos(char.vAngle) - char._eventVSlideSize;
                if (eventsShadow[char._eventId] != undefined) {
                    eventsShadow[char._eventId].alpha = 1 + Math.cos(char.vAngle)/2;
                    var scalePart = char._eventVSlideSize * 4;
                    var scale = (1-(1/scalePart)) + Math.cos(char.vAngle)/scalePart;
                    eventsShadow[char._eventId].scale.x = scale;
                    eventsShadow[char._eventId].scale.y = scale;
                    var shiftX = (eventsShadow[char._eventId].bitmap.width - eventsShadow[char._eventId].bitmap.width * scale) / 2;
                    eventsShadow[char._eventId].x += shiftX;
                }
            }
            if (char._eventHSlideSize != undefined && char._eventHSlideSize != 0 &&
                char._eventHSlideSpeed != undefined && char._eventHSlideSpeed != 0) {
                char.hAngle += angleRad/10 * char._eventHSlideSpeed;
                this.x += char._eventHSlideSize * Math.sin(char.hAngle) - char._eventHSlideSize;
            }
            if (eventsBgImage[char._eventId] != undefined && eventsBgImage[char._eventId]._isNew && eventsBgImage[char._eventId].bitmap.isReady()) {
                var selfPosition = this.parent.children.indexOf(this);
                this.parent.addChildAt(eventsBgImage[char._eventId], selfPosition);
                eventsBgImage[char._eventId]._isNew = false;
            }
            if (char._eventBgImageOffsetX != undefined && char._eventBgImageOffsetY != undefined) {
                eventsBgImage[char._eventId].move(this.x + char._eventBgImageOffsetX, this.y + char._eventBgImageOffsetY);
                eventsBgImage[char._eventId].z = this.z;
            }
            if (eventsFgImage[char._eventId] != undefined && eventsFgImage[char._eventId]._isNew && eventsFgImage[char._eventId].bitmap.isReady()) {
                var selfPosition = this.parent.children.indexOf(this);
                this.parent.addChildAt(eventsFgImage[char._eventId], selfPosition+1);
                eventsFgImage[char._eventId]._isNew = false;
            }
            if (char._eventFgImageOffsetX != undefined && char._eventFgImageOffsetY != undefined) {
                eventsFgImage[char._eventId].move(this.x + char._eventFgImageOffsetX, this.y + char._eventFgImageOffsetY);
                eventsFgImage[char._eventId].z = 100;
            }
            if (char._eventAniFrames != undefined && char._eventAniPause != undefined && char._eventAniSpeed != 0 && char._eventAniReverse != undefined ) {
                if (char._eventAniPauseCurrent == 0) {
                    
                    char._eventAniPauseCurrent = char._eventAniPause;
                    
                    var d = eventGraphicsFrames[char._eventAniFramesCurrent][0];
                    var p = eventGraphicsFrames[char._eventAniFramesCurrent][1];
 
                    char._directionFix = true;
                    char._direction = d;
                    char._originalPattern = p;
                    char._pattern = p;                
                    
                    if (char._eventAniReverse == true) {                
                        char._eventAniFramesCurrent += char._eventAniStep;
                        if (char._eventAniFramesCurrent == char._eventAniFrames - 1) {
                            char._eventAniStep = -1;
                        } else if (char._eventAniFramesCurrent == 0) {
                            char._eventAniStep = 1;
                        }

                     } else {   
                        char._eventAniFramesCurrent += 1;
                        if (char._eventAniFramesCurrent == char._eventAniFrames) {
                            char._eventAniFramesCurrent = 0;
                        }
                    }
                } else {
                    char._eventAniPauseCurrent -= 1;
                }
            }
            if (char._eventJumpHeight != undefined && char._eventJumpHeight != 0 &&
                char._eventJumpSpeed != undefined && char._eventJumpSpeed != 0) {
                char.vAngle += angleRad/10 * char._eventJumpSpeed;
                this.y += char._eventJumpHeight * -Math.abs(Math.cos(char.vAngle)) - char._eventJumpHeight;
                if (eventsShadow[char._eventId] != undefined) {
                    eventsShadow[char._eventId].alpha = 1 - Math.abs(Math.cos(char.vAngle))/2;
                    
                    var scalePart = char._eventJumpHeight * 4;
                    var scale = (1-(1/scalePart)) - Math.abs(Math.cos(char.vAngle))/scalePart;
                    eventsShadow[char._eventId].scale.x = scale;
                    eventsShadow[char._eventId].scale.y = scale;
                    var shiftX = (eventsShadow[char._eventId].bitmap.width - eventsShadow[char._eventId].bitmap.width * scale) / 2;
                    eventsShadow[char._eventId].x += shiftX;
                }
            }
            
        }
    };

    Game_Event.prototype.getEventComments = function() {
        var comments = "";
        if(this.page()) {
            for (var cmd of this.page().list) {
                if(cmd.code == 108 || cmd.code == 408) { comments += cmd.parameters[0] + "\n"; }
            }
        }
        return comments;
    };
    
    var Game_Event_setupPage = Game_Event.prototype.setupPage;
    Game_Event.prototype.setupPage = function() {
        Game_Event_setupPage.call(this);
        eventsBgImage.forEach(function callback(currentValue, index, array) {
            eventsBgImage[index]._isNew = true;
        });
        eventsFgImage.forEach(function callback(currentValue, index, array) {
            eventsFgImage[index]._isNew = true;
        });
        eventsShadow.forEach(function callback(currentValue, index, array) {
            eventsShadow[index]._isNew = true;
        });
    }

})();
