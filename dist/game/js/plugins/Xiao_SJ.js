//=============================================================================
/*:
* @plugindesc [v.1.01]
* get.
* @author XiaoRuis
 * @param Start Actor Command
 * @parent ---Window Settings---
 * @type boolean
 * @on Actor Command Window
 * @off Party Command Window
 * @desc Starts turn with the Actor Command Window instead of Party.
 * OFF - false     ON - true
 * @default true
 */
//=============================================================================
function Xiao_sj() {
  $gameTemp.reserveCommonEvent(1);
}
function Xiao_alert() {
  alert("123");
}
function Xiao_msg() {
  TickerManager.show("\\c[14]\\fs[28] 48\\fs[16]Tuổi\\fs[22]：\\c[0]" + $gameVariables.value(1));
}
function Xiao_sj3() {
  $gameTemp.reserveCommonEvent(3);
}
Game_Enemy.prototype.name = function () {
  return this.originalName();
};
function SXhe() {
  $gameVariables.setValue(41 + $gameVariables.value(55), 2);
}
function choiceTest() {
  choices = [];
  params = [];
  $gameMessage.setChoices(choices, 0, 1);
  choices.push("\\fs[18]\\b[4]    Nghịch thiên cải mệnh [Đổi mới tất cả thiên phú]");
  //========================================================================================================
  for (var i = 0; i <= 6; i++) {
    switch ($gameVariables.value(41 + i)) {
      case 1:
        choices.push("           \\fs[14]\\b[1]" + $gameVariables.value(48 + i));
        break;
      case 2:
        choices.push("           \\fs[14]\\b[2]" + $gameVariables.value(48 + i));
        break;
      case 3:
        choices.push("           \\fs[14]\\b[3]" + $gameVariables.value(48 + i));
        break;
      case 4:
        choices.push("           \\fs[14]\\b[4]" + $gameVariables.value(48 + i));
        break;
      default:
        choices.push("           \\fs[14]\\b[4]Sai lầm!");
    }
    params.push();
  }
  $gameMessage.setChoiceCallback(n => {
    if (n == 0) {
      $gameTemp.reserveCommonEvent(40);
    }
    if (n == 1) {
      $gameTemp.reserveCommonEvent(41);
    }
    if (n == 2) {
      $gameTemp.reserveCommonEvent(42);
    }
    if (n == 3) {
      $gameTemp.reserveCommonEvent(43);
    }
    if (n == 4) {
      $gameTemp.reserveCommonEvent(44);
    }
    if (n == 5) {
      $gameTemp.reserveCommonEvent(45);
    }
    if (n == 6) {
      $gameTemp.reserveCommonEvent(46);
    }
    if (n == 7) {
      $gameTemp.reserveCommonEvent(47);
    }
  });
}
