const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const root = __dirname + '/../dist/game/';
const context = vm.createContext({ console });
vm.runInContext(fs.readFileSync(root+'js/rpg_objects.js','utf8'), context);
const offline = fs.readFileSync(root+'web-offline.js','utf8');
vm.runInContext('var window = this; var SD = {};\n'+offline.slice(offline.indexOf('window.OfflineGame={'),offline.indexOf('window.open=')),context);
context.$dataSkills = JSON.parse(fs.readFileSync(root+'js/libs/json/Skills.json'));
// Exercise the actual final evaluator installed by the enabled YEP plugin.
const yep = fs.readFileSync(root+'js/plugins/YEP_CoreEngine.js','utf8');
const start = yep.indexOf('Game_Action.prototype.evalDamageFormula =');
vm.runInContext(yep.slice(start,yep.indexOf('\n};',start)+3),context);
vm.runInContext(`
Array.prototype.contains = function(x){ return this.indexOf(x)>=0; };
Math.random = function(){ return 0.4; };
Math.randomInt = function(n){ return Math.floor(Math.random()*n); };
var Yanfly={Util:{displayError:function(e){throw e;}}};
var $gameVariables={_data:[],value:function(id){return this._data[id] || 0;}};
var $dataWeapons=[];
var actor={level:15,atk:100,hit:.88,cri:0,mp:555,hp:4000,mhp:4877,
 clearResult:function(){},attackElements:function(){return [1];},
 isStateAffected:function(){return false;},hasWeapon:function(){return false;}};
var result=new Game_ActionResult();
var target={hp:10000,pdr:1,mdr:1,rec:1,eva:.02,mev:0,cev:0,
 result:function(){return result;},elementRate:function(){return 1;},
 isGuard:function(){return false;},isStateAffected:function(){return false;},
 gainHp:function(n){this.hp+=n;result.hpAffected=true;result.hpDamage=-n;},onDamage:function(){}};
var action=Object.create(Game_Action.prototype);
action.subject=function(){return actor;};
action.testApply=function(){return true;};
action.applyItemEffect=function(){};
action.applyItemUserEffect=function(){};
action.gainDrainedHp=function(){};
var skill=$dataSkills[40]; action.item=function(){return skill;};
`,context);
function run(code){ return vm.runInContext(code,context); }
// Reproduce the original failure, separately for missing session and sparse save variables.
assert.equal(run(`skill=JSON.parse(JSON.stringify($dataSkills[40])); skill.damage.formula='1100*(a.level/80)*SD.S1+a.atk*3+v[424]'; action.evalDamageFormula(target)`),0);
assert.equal(run(`SD.S1=1; action.evalDamageFormula(target)`),0);
assert.equal(run(`delete SD.S1; skill=$dataSkills[40]; action.evalDamageFormula(target)`),506.25);
run('action.apply(target)');
assert.equal(run('result.isHit()'),true);
assert.ok(run('target.hp < 10000 && result.hpDamage > 0'));
// A saved bonus and valid multiplier still contribute, with no save reset.
assert.equal(run('$gameVariables._data[424]=100; SD.S1="2"; action.evalDamageFormula(target)'),812.5);
for(const invalid of [undefined,'', 'bad',0,-1,Infinity]){
 context.SD.S1=invalid;
 assert.equal(run('OfflineGame.damageScale()'),1);
}
run('SD.S1=1; $gameVariables._data=[]');
let checked=0;
for(const skill of context.$dataSkills.filter(Boolean)){
 context.skill=skill;
 const value=run('action.evalDamageFormula(target)');
 assert.ok(Number.isFinite(value),`Non-finite damage: skill ${skill.id}`);
 if(skill.damage.formula.includes('OfflineGame.damageScale()')){
  assert.ok(value!==0,`Player skill unexpectedly zero: ${skill.id}`); checked++;
 }
}
assert.equal(run('skill=$dataSkills[225]; action.evalDamageFormula(target)'),400);
console.log(`PASS: original failure reproduced; player skill applies HP damage; ${checked} multiplier-based skills work with fresh session/sparse save; saved bonuses and NPC formula preserved.`);
