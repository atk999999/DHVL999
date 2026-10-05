const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');
const root=__dirname+'/../dist/game/';const c=vm.createContext({console});
vm.runInContext(fs.readFileSync(root+'js/rpg_objects.js','utf8'),c);
for(const n of ['Actors','Classes','Weapons','Armors','States','System'])c['$data'+n]=JSON.parse(fs.readFileSync(root+'js/libs/json/'+n+'.json'));
vm.runInContext(`Array.prototype.contains=function(x){return this.indexOf(x)>=0}; Number.prototype.clamp=function(a,b){return Math.max(a,Math.min(b,this))};
var DataManager={isWeapon:x=>!!x&&$dataWeapons.includes(x),isArmor:x=>!!x&&$dataArmors.includes(x),isSkill:()=>false,isItem:()=>false,extractSaveContents:()=>{}};
var $gamePlayer={refresh:()=>{}},$gameMap={requestRefresh:()=>{}},$gameParty=new Game_Party(),$gameActors=new Game_Actors();
var Scene_Drill_SLS=function(){};Scene_Drill_SLS.prototype.drill_SLS_buyOneItem=function(){$gameParty.loseGold(this._window_goods.drill_SLS_curPrice());$gameParty.gainItem(this._window_goods.drill_SLS_curItem(),1)};
Game_Actor.prototype.paramMax=function(i){return [22000,2500,1100][i]||1100};
var actor=$gameActors.actor(2);var before=[actor.mhp,actor.mmp,actor.atk];
var DrillUp={g_SLS_shop_list:[null,null,{list:[{type:'护甲',armor_id:44,weapon_id:0},{type:'护甲',armor_id:45,weapon_id:0},{type:'武器',weapon_id:22,armor_id:0}]}]};
var $gameSystem={_drill_SLS_shopList:[null,null,{list:[]}]};`,c);

vm.runInContext(`var window=this;var OfflineGame={beginRun:function(){}};var Scene_Map=function(){};Scene_Map.prototype.start=function(){};
var $gameVariables=new Game_Variables(),$gameSwitches=new Game_Switches();var $gameScreen={erasePicture:function(){},showPicture:function(){}};var TickerManager={show:function(){}};`,c);
vm.runInContext('var window=this;var Window_Command=function(){};var Scene_MenuBase=function(){};',c);
vm.runInContext(fs.readFileSync(root+'js/plugins/Web_AncientEquipment.js','utf8'),c);
vm.runInContext(fs.readFileSync(root+'js/plugins/Web_Immortal.js','utf8'),c);
const run=s=>vm.runInContext(s,c);
run('var interpreter={_eventId:0,setupChild:function(list){this.list=list;}}');
run('$gameVariables.setValue(1,119);WebImmortal.year(interpreter)');assert.equal(run('interpreter.list'),undefined);

vm.runInContext(fs.readFileSync(root+'js/plugins/Web_ImmortalNPC.js','utf8'),c);
assert.equal(run('WebImmortalNPC.roster.length'),8);
for(let age=120;age<=900;age++){
 run(`$gameVariables.setValue(1,${age});WebImmortal.year(interpreter)`);
 const index=run('WebImmortal.state().pending.offer.choices.length===3 ? 2 : 0');
 assert.equal(run(`WebImmortal.choose(${age},${index})`),true,'year '+age);
 assert.equal(run(`WebImmortal.choose(${age},${index})`),false);
}
assert.equal(run('Object.keys(WebImmortal.state().npcs).length'),8);
assert.equal(run('Object.values(WebImmortal.state().npcs).filter(n=>n.questDone).length'),8);
assert.deepEqual(Array.from(run('[actor.mhp-before[0],actor.mmp-before[1],actor.atk-before[2]]')),[125000,34000,14000]);
run('var s=WebImmortal.state();var original=JSON.stringify(s.bonus);');
assert.equal(run('WebImmortalNPC.valid(s,{npc:"moc_nuong",npcAction:"quest"})'),false);
run('var chosenOffer=WebImmortalNPC.offer(901,s);s.pending={age:901,offer:chosenOffer};s.stones=0;');
const relation=run('JSON.stringify(s.npcs)');assert.equal(run('WebImmortal.choose(901,1)'),false);
assert.equal(run('JSON.stringify(s.npcs)'),relation);assert.equal(run('s.lastYear'),900);
assert.equal(run('JSON.stringify(s.bonus)'),run('original'));
run('$gameSystem._webImmortalV1=JSON.parse(JSON.stringify(s))');assert.equal(run('Object.values(WebImmortal.state().npcs).filter(n=>n.questDone).length'),8);
run('OfflineGame.beginRun()');assert.equal(run('$gameSystem._webImmortalV1'),undefined);
assert.deepEqual(Array.from(run('[actor.mhp,actor.mmp,actor.atk]')),Array.from(c.before));
console.log('PASS: 8 NPC age gates/annual encounters, all quests earned once by age900, exact HP/MP/ATK rewards, insufficient funds atomicity, save and reset.');
