const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=__dirname+'/../dist/game/';const events=JSON.parse(fs.readFileSync(root+'js/libs/json/CommonEvents.json'));
for(const i of [120,140,150])assert.deepEqual(events[i].list.filter(c=>c.code===117).map(c=>c.parameters[0]),[57,24]);
assert.ok(!events.some(e=>e&&e.list.some(c=>c.code===201&&c.parameters[0]===0&&c.parameters[1]===8)));
const context=vm.createContext({});vm.runInContext(`
var map=8,age=58,gold=27228,attributes=[5,-60,58,-3,79,65,1,59],cleared=0,shown=0,death=false,reserved=[];
function Scene_Map(){};Scene_Map.prototype.start=function(){};
var $gameMap={mapId:function(){return map;},_interpreter:{clear:function(){cleared++;}}};
var $gameMessage={clear:function(){}};var $gameTemp={clearCommonEvent:function(){},reserveCommonEvent:function(id){reserved.push(id);}};
var $gameSwitches={setValue:function(id,v){if(id===1)this.birth=v;},value:function(){return death;}};
var $gameSystem={},$gamePlayer={reserveTransfer:function(id){map=id;}},$gameScreen={startFadeIn:function(){},erasePicture:function(){},showPicture:function(id,name){if(id===9&&name==='Next')shown++;}};
`,context);
vm.runInContext(fs.readFileSync(root+'web-age-recovery.js','utf8'),context);
const run=s=>vm.runInContext(s,context);
run('new Scene_Map().start();new Scene_Map().start();new Scene_Map().start()');
assert.equal(run('map'),3);assert.equal(run('shown'),1);assert.equal(run('cleared'),1);assert.equal(run('$gameSwitches.birth'),false);
assert.equal(run('age'),58);assert.equal(run('gold'),27228);assert.equal(run('attributes.join()'),'5,-60,58,-3,79,65,1,59');assert.equal(run('reserved.length'),0);
run('map=8;death=true;new Scene_Map().start();new Scene_Map().start()');assert.equal(run('reserved[0]'),10);assert.equal(run('shown'),1);
console.log('PASS: age 50/70/80 offline branches; stuck-save recovery once; age, money, attributes preserved; no repeated yearly rewards; existing death respected.');
