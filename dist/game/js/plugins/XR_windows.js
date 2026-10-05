//===========================================================================XR
// XR_windows.js
//===========================================================================XR
/*:
 * @plugindesc [v2.8]     熊窝dodox - 窗口界面管理
 * @author 萧遥小熊
 * @help
 *
 * 〓 说明 〓
 * 1， 官方网站： http://www.idodx.com
 *
 * ===========================================================================XR
 * @param ----基本配置----
 * @desc
 *
 * @param 加载名字
 * @parent ----加载名字配置----
 * @desc 用于加载的名字。
 * @default name
 *
 * @param 加载数据-1
 * @parent ----加载数据配置----
 * @desc 用于加载的数据。
 * @default 1
 *
 * @param 加载数据-2
 * @parent ----加载数据配置----
 * @desc 用于加载的数据。
 * @default 2
 *
 * @param 加载数据-3
 * @parent ----加载数据配置----
 * @desc 用于加载的数据。
 * @default 3
 *
 * @param 加载数据-4
 * @parent ----加载数据配置----
 * @desc 用于加载的数据。
 * @default 4
 */
//===========================================================================XR
/*-------------------------------去掉敌人编号------------------------------------------*/

/*-------------------------------文本框转义------------------------------------------*/
Window_Base.prototype.convertEscapeCharacters = function (text) {
  text = text.replace(/\\/g, "");
  text = text.replace(/\x1b\x1b/g, "\\");
  text = text.replace(/\x1bLD\[(.+?)\]/gi, function (match, p1) {
    return LD.getItem(p1.trim());
    ;
  }.bind(this)); //xiaoruis
  text = text.replace(/\x1bSD\[(.+?)\]/gi, function (match, p1) {
    return SD.getItem(p1.trim());
    ;
  }.bind(this)); //xiaoruis
  text = text.replace(/\x1bV\[(\d+)\]/gi, function () {
    return $gameVariables.value(parseInt(arguments[1]));
  }.bind(this));
  text = text.replace(/\x1bV\[(\d+)\]/gi, function () {
    return $gameVariables.value(parseInt(arguments[1]));
  }.bind(this));
  text = text.replace(/\x1bN\[(\d+)\]/gi, function () {
    return this.actorName(parseInt(arguments[1]));
  }.bind(this));
  text = text.replace(/\x1bP\[(\d+)\]/gi, function () {
    return this.partyMemberName(parseInt(arguments[1]));
  }.bind(this));
  text = text.replace(/\x1bG/gi, TextManager.currencyUnit);
  return text;
};
