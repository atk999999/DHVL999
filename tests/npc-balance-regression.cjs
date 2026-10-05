const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const base=__dirname+'/../dist/game/';const c=vm.createContext({console});
vm.runInContext(fs.readFileSync(base+'js/rpg_objects.js','utf8'),c);
for(const [key,file] of Object.entries({$dataEnemies:'Enemies',$dataSkills:'Skills',$dataStates:'States'})) c[key]=JSON.parse(fs.readFileSync(base+'js/libs/json/'+file+'.json'));
vm.runInContext(`
Array.prototype.contains=function(x){return this.indexOf(x)>=0;};Number.prototype.clamp=function(a,b){return Math.max(a,Math.min(b,this));};
Math.randomInt=function(n){return Math.floor(n/2);};
var $gameVariables={value:function(i){return i===56?3:0;},_data:[]};
var $gameParty={inBattle:function(){return true;}},$gameSwitches={value:function(){return false;}};
var OfflineGame={damageScale:function(){return 1;}};
var target={pdr:1,mdr:1,rec:1,grd:1,mhp:10000,hp:10000,rate:1,
 elementRate:function(){return this.rate;},isActor:function(){return true;},isGuard:function(){return false;},isStateAffected:function(){return false;}};
var enemy=new Game_Enemy(48,0,0),skill=$dataSkills[339],action=Object.create(Game_Action.prototype);
action.subject=function(){return enemy;};action.item=function(){return skill;};
`,c);
const run=s=>vm.runInContext(s,c);
assert.equal(run('action.evalDamageFormula(target)'),7490);
assert.equal(run('action.makeDamageValue(target,false)'),5618);
assert.equal(run('action.applyCritical(100)'),150);
assert.equal(run('$gameVariables.value=function(){return 20;};action.applyCritical(100)'),150);
assert.equal(run('target.rate=0.5;action.calcElementRate(target)'),0.5);
assert.equal(run('$dataStates[41].traits[0].value'),9.5); // Real injuries unchanged.
assert.equal(run('enemy.isEnemy=function(){return false;};action.applyCritical(100)'),2000);
run('enemy.isEnemy=function(){return true;};target.rate=1;');
// Match the enabled YEP plugin's parameter ceiling and final damage evaluator.
const plugin=fs.readFileSync(base+'js/plugins/YEP_CoreEngine.js','utf8');
const list=fs.readFileSync(base+'js/plugins.js','utf8');
const settings=JSON.parse(list.slice(list.indexOf('[')).trim().replace(/;$/, '')).find(p=>p.name==='YEP_CoreEngine').parameters;
c.Yanfly={Param:{EnemyMaxHp:Number(settings['Enemy MaxHP']),EnemyMaxMp:Number(settings['Enemy MaxMP']),EnemyParam:Number(settings['Enemy Parameter'])},Util:{displayError(e){throw e;}}};
for(const name of ['Game_BattlerBase.prototype.paramMax','Game_Action.prototype.evalDamageFormula']){
 const begin=plugin.indexOf(name+' = function');vm.runInContext(plugin.slice(begin,plugin.indexOf('\n};',begin)+3),c);
}
// Reproduce >100k without state 41: hidden read-error state 49, NPC rage,
// and the player's school critical multiplier incorrectly used by NPCs.
assert.ok((4600+345*3*6)*4.5*2.2>100000);
run('enemy=new Game_Enemy(185,0,0);enemy.addState(48);skill=$dataSkills[323]');
assert.equal(run('enemy.atk'),1035);
assert.ok(run('action.makeDamageValue(target,true)')<13000);
// A legacy save containing the invisible penalty is cleaned, real injuries stay.
const managers=fs.readFileSync(base+'js/rpg_managers.js','utf8');
const begin=managers.indexOf('DataManager.clearOfflineReadPenalty = function');
run('var DataManager={};var saved=new Game_Enemy(1,0,0);saved._states=[49,41];saved._stateTurns={49:1,41:1};var $gameActors={_data:[null,saved]};var flag=true;$gameSwitches.setValue=function(id,v){if(id===287)flag=v;};');
vm.runInContext(managers.slice(begin,managers.indexOf('\n};',begin)+3),c);
run('DataManager.clearOfflineReadPenalty();saved.addState(49)');
assert.equal(run('saved.isStateAffected(49)'),false);
assert.equal(run('saved.isStateAffected(41)'),true);
assert.equal(run('flag'),false);
assert.ok(managers.match(/this\.clearOfflineReadPenalty\(\);/g).length>=2);
let count=0,max=0,worst=null,zero=[];
for(const e of c.$dataEnemies.filter(Boolean)){
 run(`enemy=new Game_Enemy(${e.id},0,0)`);
 for(const id of [...new Set(e.actions.map(a=>a.skillId))]){
  c.skill=c.$dataSkills[id];if(!c.skill||![1,5].includes(c.skill.damage.type))continue;
  const value=run('action.makeDamageValue(target,false)');assert.ok(Number.isFinite(value)&&value>=0);
  for(const rage of [false,true]){run(rage?'enemy.addState(48)':'enemy.removeState(48)');const critical=run('action.makeDamageValue(target,true)');assert.ok(Number.isFinite(critical)&&critical>=0);assert.ok(critical<100000,'Excessive healthy-target critical damage for NPC '+e.id+' skill '+id);}
  run('enemy.removeState(48)');
  count++;if(value===0)zero.push([e.id,id]);if(value>max){max=value;worst=[e.id,id];}
 }
}
console.log(JSON.stringify({pass:true,enemyCount:c.$dataEnemies.filter(Boolean).length,attackPairs:count,maxUnbuffedNormalDamage:max,worstEnemySkill:worst,zeroDamagePairs:zero}));
