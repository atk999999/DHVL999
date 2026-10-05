/* Repair only the retired data-validation map; never replay birth or yearly rewards. */
(function () {
 'use strict';
 var start=Scene_Map.prototype.start;
 Scene_Map.prototype.start=function(){
  start.apply(this,arguments);
  if($gameMap.mapId()===8){
   // Map 8 has no story/events; original age 50/70/80 online checks stranded saves here.
   $gameMap._interpreter.clear();
   $gameMessage.clear();
   $gameTemp.clearCommonEvent();
   // Map 3's autorun creates a new life when switch 1 is on. Keep it off during repair.
   $gameSwitches.setValue(1,false);
   $gameSystem._webAgeRecoveryPending=true;
   $gamePlayer.reserveTransfer(3,5,8,2,0);
   return;
  }
  if($gameMap.mapId()===3&&$gameSystem._webAgeRecoveryPending){
   delete $gameSystem._webAgeRecoveryPending;
   $gameScreen.startFadeIn(1);
   $gameScreen.erasePicture(54);
   $gameScreen.erasePicture(21); // Remove the stale busy button above the Next button.
   if(!$gameSwitches.value(5)){
    $gameScreen.showPicture(9,'Next',0,150,740,100,100,255,0);
   }else{
    // Honor an existing death instead of reviving the character.
    $gameTemp.reserveCommonEvent(10);
   }
  }
 };
})();
