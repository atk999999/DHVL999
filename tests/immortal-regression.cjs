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
for(let age=120;age<=450;age++){
 run(`$gameVariables.setValue(1,${age});WebImmortal.year(interpreter)`);
 assert.ok(run('interpreter.list.some(x=>x.code===102)'),'native choice required at '+age);
 assert.equal(run(`WebImmortal.choose(${age},0)`),true);
 assert.equal(run(`WebImmortal.choose(${age},0)`),false,'no duplicate rewards');
}
assert.equal(run('WebImmortal.state().chapter'),8);assert.equal(run('WebImmortal.state().realm'),4);
assert.equal(run('WebImmortal.state().ending'),'Đèn soi nhân thế');
assert.deepEqual(Array.from(run('[actor.mhp-before[0],actor.mmp-before[1],actor.atk-before[2]]')),[100000,25000,10000]);
const saved=run('JSON.stringify($gameSystem._webImmortalV1)');run('$gameSystem._webImmortalV1=JSON.parse('+JSON.stringify(saved)+')');assert.equal(run('WebImmortal.state().lastYear'),450);
run('OfflineGame.beginRun()');assert.equal(run('$gameSystem._webImmortalV1'),undefined);
assert.deepEqual(Array.from(run('[actor.mhp,actor.mmp,actor.atk]')),Array.from(c.before));
// Check alternate story choices produce the second ending without altering elapsed years.
for(let age=120;age<=401;age++){
 run(`$gameVariables.setValue(1,${age});WebImmortal.year(interpreter)`);
 const idx=run('WebImmortal.state().pending.offer.chapter ? 1 : (WebImmortal.state().pending.offer.choices[0].cost > WebImmortal.state().stones ? 1 : 0)');assert.equal(run(`WebImmortal.choose(${age},${idx})`),true);
}
assert.equal(run('WebImmortal.state().ending'),'Người canh thiên môn');
run('OfflineGame.beginRun();$gameVariables.setValue(1,124);WebImmortal.year(interpreter)');assert.equal(run('WebImmortal.choose(124,0)'),true); // first chapter can enter on a later restored year
run('WebImmortal.state().chapter=8;WebImmortal.state().qi=0;WebImmortal.state().stones=0;$gameVariables.setValue(1,127);WebImmortal.year(interpreter)');
assert.equal(run('WebImmortal.choose(127,0)'),false);assert.equal(run('WebImmortal.state().lastYear'),124);assert.equal(run('WebImmortal.choose(127,1)'),true);
run('$gameVariables.setValue(1,180);WebImmortal.year(interpreter)');assert.ok(run('interpreter.list.some(x=>x.code===355 && x.parameters[0].includes("endLife"))'));
const ce=JSON.parse(fs.readFileSync(root+'js/libs/json/CommonEvents.json'));assert.ok(ce[9].list.some(x=>String(x.parameters).includes('>=120')));assert.equal(ce[190].list[1].parameters[0],'WebImmortal.year(this);');
console.log('PASS: age120 entry, annual routing to450, 8 chapters, both endings, 5 realms, exact real stats, duplicate prevention, insufficient funds, save state and new-life reset, lifespan ending.');
run(`OfflineGame.beginRun();$gameVariables.setValue(1,120);$gameVariables.setValue(16,13);$gameVariables.setValue(411,'thọ cùng trời đất');$gameSwitches.setValue(5,true);
var mapId=9,transfer=null,reserved=0;$gameMap.mapId=()=>mapId;$gameMap._interpreter={clear:()=>{}};$gamePlayer.reserveTransfer=(...args)=>transfer=args;
var $gameTemp={clearCommonEvent:()=>{},reserveCommonEvent:id=>reserved=id},$gameMessage={clear:()=>{}};
$gameScreen.startTint=()=>{};$gameScreen.startFadeIn=()=>{};new Scene_Map().start();`);
assert.equal(run('transfer[0]'),3);assert.equal(run('$gameSwitches.value(1)'),false);assert.equal(run('$gameSwitches.value(5)'),false);
run('mapId=3;new Scene_Map().start()');assert.equal(run('reserved'),190);
run('reserved=0;new Scene_Map().start()');assert.equal(run('reserved'),0);
run('OfflineGame.beginRun();$gameSwitches.setValue(5,true);$gameVariables.setValue(16,2);new Scene_Map().start()');assert.equal(run('$gameSwitches.value(5)'),true);
console.log('PASS: old age120 ending resumes once on Map3; no birth reset or combat-death revival.');
