//=============================================================================
// BigAvatar.js
//=============================================================================

/*:
 * @plugindesc Показывает большую аватарку
 * @author Mur
 *
 * @param avatarWidth
 * @desc padding for text
 * @default 320
 *
*/

(function() {
    
    var parameters = PluginManager.parameters('BigAvatar');
    var avatarWidth = Number(parameters['avatarWidth']);
    
    var spr = new Sprite();
    var bitmap;
    var sprPosX;
    
    Window_Message.prototype.newLineX = function() {
        return $gameMessage.faceName() === '' ? 0 : avatarWidth;
    };

    
    Window_Message.prototype.drawMessageFace = function() {
        var faceName = $gameMessage.faceName();
        var faceIndex = $gameMessage.faceIndex();
        if (faceName != '') {
            if (spr.bitmap) {
                this.removeChild(spr);
            }

            bitmap = ImageManager.loadBitmap('img/bigfaces/' + faceName + '/', faceIndex+1, null, true);
            
            var face = this; 
            bitmap.addLoadListener(function() {

                spr.bitmap = new Bitmap(bitmap.width, bitmap.height);
                spr.bitmap.blt(bitmap, 0, 0, bitmap.width, bitmap.height, 0, 0);

                sprPosX = -(bitmap.width);

                spr.x = sprPosX;
                spr.y = -(bitmap.height - face.height);

                face.addChildToBack(spr);

            }.bind(bitmap));        
        }
    };

    var _Window_Base_close = Window_Base.prototype.close;
    Window_Base.prototype.close = function() {
        _Window_Base_close.call(this);
        this.removeChild(spr);  
    };
    
    var _Window_Base_update = Window_Base.prototype.update;
    Window_Base.prototype.update = function() {
        _Window_Base_update.call(this);
        if (sprPosX <0) {
            sprPosX += 5;
            spr.x = sprPosX;
        }
    };
    

})();
