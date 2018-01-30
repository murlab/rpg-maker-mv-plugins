//=============================================================================
// MUR Event Hero v1.0
// by MUR (https://github.com/murlab)
// BSD 3-Clause License
// Free for use with both free and commercial RPG Maker games.
//=============================================================================

/*:en
 * @plugindesc v1.0 Event Hero
 * @author Mur
 * @help This plug-in does not have any additional settings, and all control takes
 * place through comments at the beginning of the event:
 *
 * <hero: id> — changing the event's graphics as hero graphics with the specified Id
 *
 */
/*:ru
 * @plugindesc v1.0 Герой события
 * @author Mur
 * @help Данный плагин не имеет дополнительных настроек, а всё управление происходит
 * через комментарии в начале события:
 *
 * <hero: id> — устанавливает графику события как графика героя с указанным ID
 *
*/

(function() {

    var Game_Event_setupPageSettings = Game_Event.prototype.setupPageSettings;
    Game_Event.prototype.setupPageSettings = function() {
        
        if (this.page()) {
            var comments = this.getEventComments();
            if (comments != undefined && comments != "") {
                if(comments.match(/<hero:\s*(.*)>/im)) {
                    var shift = comments.match(/<hero:\s*(.*)>/im)[1].split(/(?:\s+,\s+|,\s+|\s+,|\s+|,)/);
                    this._heroId = shift[0] ? Number(shift[0]) : 0;
                    this._heroRefresh = true;
                    console.log("Set new hero Id:" + this._heroId);
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
            if (char._heroId != undefined && char._heroRefresh == true) {
                if ($gameActors.actor(char._heroId) != undefined) {
                    var actorName = $gameActors.actor(char._heroId)._characterName;
                    var actorIndex = $gameActors.actor(char._heroId)._characterIndex;            
                    char.setImage(actorName, actorIndex);
                    char._heroRefresh = false;
                } else {
                    console.error("[MUR Event Hero]: Не найден герой с ID=" + char._heroId);
                    char._heroRefresh = false;
                }
            }
        }
    }
    
    Game_Event.prototype.getEventComments = function() {
        var comments = "";
        if(this.page()) {
            for (var cmd of this.page().list) {
                if(cmd.code == 108 || cmd.code == 408) { comments += cmd.parameters[0] + "\n"; }
            }
        }
        return comments;
    };

})();
