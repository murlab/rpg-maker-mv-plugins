//=============================================================================
// ItemOnMap.js
//=============================================================================

/*:
 * @plugindesc Отображает на экране количество предметов в ячейке
 * @author Mur
 *
 * @param enableSwitchId
 * @desc Показать/скрыть (номер ключа)
 * @default 1
 *
 * @param itemVarId
 * @desc Иконка предмета (номер переменной) 
 * @default 1
 *
 * @param countVarId
 * @desc Количество предметов (номер переменной) 
 * @default 2

*/

(function() {

    var parameters = PluginManager.parameters('ItemOnMap');
    var enableSwitchId = Number(parameters['enableSwitchId']);
    var itemVarId = Number(parameters['itemVarId']);
    var countVarId = Number(parameters['countVarId']);
    
    //Обновление всех окон
    var _Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
    Scene_Map.prototype.createAllWindows = function() {
        _Scene_Map_createAllWindows.call(this);
        this._itemOnMap = new ItemOnMap(10,10, 120, 60);
        this.addWindow(this._itemOnMap);
    };

    //---------------------------------------
    
    function ItemOnMap() {
        this.initialize.apply(this, arguments);
    }

    ItemOnMap.prototype = Object.create(Window_Base.prototype);
    ItemOnMap.prototype.constructor = ItemOnMap;

    ItemOnMap.prototype.standardPadding = function() {
        return 0;
    };
    
    ItemOnMap.prototype.initialize = function(x, y, width, height) {
        Window_Base.prototype.initialize.call(this, x, y, width, height);
        this._id = 1;
    };

    ItemOnMap.prototype.update = function() {
        this.contents.clear();
        if ($gameSwitches.value(enableSwitchId)) {
            this.show();
            this.resetTextColor();
            var itemId = $gameVariables.value(itemVarId);
            if (itemId == 0) {
                itemId = 1;
            }
            this.drawIcon($dataItems[itemId].iconIndex, 15, 15);
            this.drawTextEx(":" + $gameVariables.value(countVarId), 52, 15);
        } else {
            this.hide();
        }
    }

})();
