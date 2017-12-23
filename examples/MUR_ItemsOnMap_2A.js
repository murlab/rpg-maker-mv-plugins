//=============================================================================
// MUR Items On Map v2.0
//=============================================================================
/*:
 * @plugindesc Показать предметы на карте v2.0
 * @author Mur
 * @help Item ID — номер предмета в базе данных
 * Show switch ID — номер переключателя разрешающего отображение
 * Position X — положение окна на экране по оси X
 * Position Y — положение окна на экране по оси Y
 * Enabled while message — показывать ли при отображении окна сообщений
 *
 * @param Item ID
 * @text Номер предмета
 * @desc номер предмета в базе данных (по умолчанию 1)
 * @default 1
 * @type item
 *
 * @param Show switch ID
 * @text Номер переключателя
 * @desc номер переключателя разрешающего отображение (по умолчанию 1)
 * @default 1
 * @type switch
 *
 * @param Position
 * @text Положение окна на экране
 *
 * @param X
 * @parent Position
 * @text Координата X
 * @desc положение окна на экране по оси X (по умолчанию 10)
 * @default 10
 * @min 0
 * @max 800
 * @type number
 *
 * @param Y
 * @parent Position
 * @text Координата Y
 * @desc положение окна на экране по оси Y (по умолчанию 10)
 * @default 10
 * @type number
 *
 * @param Enabled while message
 * @text Показывать ли окно
 * @desc показывать ли при отображении окна сообщений (по умолчанию true)
 * @default true
 * @type boolean
 * @on Отображать всегда
 * @off Скрыто при сообщениях
 *
*/

(function() {
    var params = PluginManager.parameters('MUR_ItemsOnMap_2');
    
    var itemId = Number(params["Item ID"]);
    var showSwitchID = Number(params['Show switch ID']);
    var positionX = Number(params['X']);
    var positionY = Number(params['Y']);
    
    var enableWhileMessage = params['Enabled while message'].toUpperCase() == "TRUE" ? true : false;

    if (isNaN(itemId) || isNaN(showSwitchID) || isNaN(positionX) || isNaN(positionY)) {
        console.error('MUR Items On Map: Не верно заданы параметры плагина');
    } else {
        console.log("itemId=" + itemId);
        console.log("showSwitchID=" + showSwitchID);
        console.log("positionX=" + positionX);
        console.log("positionY=" + positionY);
        console.log("enableWhileMessage=" + enableWhileMessage);
    }
    
})();
