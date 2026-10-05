/* Cổ Thần: native equipment, existing shop currency and save support. */
(function () {
  'use strict';
  function ancient(item) { return item && /<CoThan>/.test(item.note || ''); }
  function items() { return [$dataArmors[44], $dataArmors[45], $dataWeapons[22]]; }
  function equip(item) {
    var actor = $gameActors.actor(2), slot = actor.equipSlots().indexOf(item.etypeId);
    if (slot < 0 || !actor.canEquip(item) || !$gameParty.hasItem(item)) return false;
    actor.changeEquip(slot, item);
    return actor.equips()[slot] === item;
  }
  function repairOwned() {
    if ($gameSystem._webAncientRepairV2) return;
    items().forEach(function(item) {
      var actor=$gameActors.actor(2);
      if (!actor.isEquipped(item) && $gameParty.hasItem(item)) equip(item);
    });
    $gameSystem._webAncientRepairV2=true;
  }
  var max = Game_Actor.prototype.paramMax;
  Game_Actor.prototype.paramMax = function (id) {
    return max.call(this, id) + this.equips().reduce(function (sum, item) {
      return sum + (ancient(item) ? item.params[id] || 0 : 0);
    }, 0);
  };
  // Saved shops contain their own goods array. Append only missing new entries.
  var extract = DataManager.extractSaveContents;
  DataManager.extractSaveContents = function (contents) {
    extract.call(this, contents);
    repairOwned();
    var shop = $gameSystem._drill_SLS_shopList[2];
    DrillUp.g_SLS_shop_list[2].list.forEach(function (entry) {
      var item = entry.type === '武器' ? $dataWeapons[entry.weapon_id] : entry.type === '护甲' ? $dataArmors[entry.armor_id] : null;
      if (ancient(item) && !shop.list.some(function (old) {
        return old.type === entry.type && old.weapon_id === entry.weapon_id && old.armor_id === entry.armor_id;
      })) shop.list.push(JSON.parse(JSON.stringify(entry)));
    });
  };
  var buy = Scene_Drill_SLS.prototype.drill_SLS_buyOneItem;
  Scene_Drill_SLS.prototype.drill_SLS_buyOneItem = function () {
    var item = this._window_goods.drill_SLS_curItem();
    var actor = $gameActors.actor(2);
    if (ancient(item) && (!actor || $gameParty.gold() < this._window_goods.drill_SLS_curPrice())) return;
    buy.call(this);
    if (ancient(item)) {
      equip(item);
    }
  };
  function Window_AncientGear() { this.initialize.apply(this,arguments); }
  Window_AncientGear.prototype=Object.create(Window_Command.prototype);
  Window_AncientGear.prototype.constructor=Window_AncientGear;
  Window_AncientGear.prototype.windowWidth=function(){return Graphics.boxWidth;};
  Window_AncientGear.prototype.numVisibleRows=function(){return 4;};
  Window_AncientGear.prototype.makeCommandList=function(){
    var actor=$gameActors.actor(2),self=this;
    items().forEach(function(item,i){
      var wearing=actor.isEquipped(item),owned=$gameParty.hasItem(item);
      self.addCommand(item.name+(wearing?' — Đang mặc':owned?' — Trang bị':' — Chưa sở hữu'),'gear'+i,wearing||owned);
    });
    this.addCommand('Trở về game','cancel');
  };
  function Scene_AncientGear(){this.initialize.apply(this,arguments);}
  Scene_AncientGear.prototype=Object.create(Scene_MenuBase.prototype);
  Scene_AncientGear.prototype.constructor=Scene_AncientGear;
  Scene_AncientGear.prototype.create=function(){
    Scene_MenuBase.prototype.create.call(this);
    this._helpWindow=new Window_Help(4);this.addWindow(this._helpWindow);
    this._gearWindow=new Window_AncientGear(0,this._helpWindow.height);
    for(var i=0;i<3;i++)this._gearWindow.setHandler('gear'+i,this.toggle.bind(this,i));
    this._gearWindow.setHandler('cancel',this.popScene.bind(this));this.addWindow(this._gearWindow);this.refreshGear();
  };
  Scene_AncientGear.prototype.refreshGear=function(){
    var a=$gameActors.actor(2);
    this._helpWindow.setText('Cổ Thần: chọn món đang mặc để tháo.\nMáu tối đa: '+a.mhp+' · Nội lực: '+a.mmp+'\nCông kích: '+a.atk+'\nChỉ số thay đổi ngay khi trang bị/tháo.');
    this._gearWindow.refresh();this._gearWindow.activate();
  };
  Scene_AncientGear.prototype.toggle=function(index){
    var item=items()[index],a=$gameActors.actor(2),slot=a.equipSlots().indexOf(item.etypeId);
    if(a.isEquipped(item))a.changeEquip(slot,null);else equip(item);
    this.refreshGear();
  };
  window.WebAncientEquipment={equip:equip,repairOwned:repairOwned,open:function(){
    if(!window.$gameParty||!window.$gameActors||!window.$gameMap)return 'Game đang tải, vui lòng chờ.';
    if(!(SceneManager._scene instanceof Scene_Map)||$gameParty.inBattle()||$gameMessage.isBusy()||$gameMap.isEventRunning()||SceneManager.isSceneChanging())return 'Hãy hoàn tất sự kiện hoặc trận đấu hiện tại trước.';
    $gameParty.setMenuActor($gameActors.actor(2));SceneManager.push(Scene_AncientGear);return '';
  }};
}());
