const fs = require('fs'), vm = require('vm'), assert = require('assert/strict');
const root = __dirname + '/../dist/game/';
const c = vm.createContext({ console, setTimeout: (fn) => fn() });

vm.runInContext(fs.readFileSync(root + 'js/rpg_objects.js', 'utf8'), c);
for (const n of ['Actors', 'Classes', 'Weapons', 'Armors', 'States', 'System']) {
  c['$data' + n] = JSON.parse(fs.readFileSync(root + 'js/libs/json/' + n + '.json'));
}

vm.runInContext(`
Array.prototype.contains = function(x) { return this.indexOf(x) >= 0; };
Number.prototype.clamp = function(a, b) { return Math.max(a, Math.min(b, this)); };
var DataManager = { isWeapon: x => !!x && $dataWeapons.includes(x), isArmor: x => !!x && $dataArmors.includes(x), isSkill: () => false, isItem: () => false, extractSaveContents: () => {} };
var $gamePlayer = { refresh: () => {} }, $gameMap = { requestRefresh: () => {} }, $gameParty = new Game_Party(), $gameActors = new Game_Actors();
var $gameVariables = new Game_Variables(), $gameSwitches = new Game_Switches();
var $gameTemp = { reserveCommonEvent: () => {} };
var $gameMessage = { setChoices: () => {}, setChoiceCallback: () => {} };
var TickerManager = { show: () => {} };
var Scene_Drill_SLS = function() {}; Scene_Drill_SLS.prototype.drill_SLS_buyOneItem = function() {};
var Scene_Map = function() {}; Scene_Map.prototype.start = function() {};
var DrillUp = { g_SLS_shop_list: [null, null, { list: [] }] };
var $gameSystem = { _drill_SLS_shopList: [null, null, { list: [] }] };
var OfflineGame = { beginRun: function() {} };
`, c);

vm.runInContext('var window = this; var Window_Command = function() {}; var Scene_MenuBase = function() {}; var Window_Base = function() {}; Window_Base.prototype.standardFontFace = function() { return "GameFont"; };', c);
vm.runInContext(fs.readFileSync(root + 'js/plugins/Xiao_SJ.js', 'utf8'), c);
vm.runInContext(fs.readFileSync(root + 'js/plugins/Web_AncientEquipment.js', 'utf8'), c);
vm.runInContext(fs.readFileSync(root + 'js/plugins/Web_Immortal.js', 'utf8'), c);
vm.runInContext(fs.readFileSync(root + 'js/plugins/Web_TalentBuff.js', 'utf8'), c);

const run = s => vm.runInContext(s, c);

// 1. Initial state (no talent chosen, var 17 = 0)
run('var actor = $gameActors.actor(2);');
const baseHp = run('actor.mhp');
const baseMp = run('actor.mmp');
const baseAtk = run('actor.atk');

// 2. Select Tier 1 Talent (e.g. ID 156 - Đôi tay rắn rỏi: Lực tay +2)
run('$gameVariables.setValue(17, 156)');
const t1Hp = run('actor.mhp');
const t1Mp = run('actor.mmp');
const t1Atk = run('actor.atk');

assert.ok(t1Hp >= baseHp + 3000, 'Tier 1 Talent must give at least +3000 HP');
assert.ok(t1Mp >= baseMp + 1000, 'Tier 1 Talent must give at least +1000 MP');
assert.ok(t1Atk >= baseAtk + 500, 'Tier 1 Talent must give at least +500 ATK');

// 3. Select Tier 4 Talent (e.g. ID 405 - Thần thoại)
run('$gameVariables.setValue(17, 405)');
const t4Hp = run('actor.mhp');
const t4Mp = run('actor.mmp');
const t4Atk = run('actor.atk');

assert.ok(t4Hp >= baseHp + 50000, 'Tier 4 Talent must give at least +50000 HP');
assert.ok(t4Mp >= baseMp + 15000, 'Tier 4 Talent must give at least +15000 MP');
assert.ok(t4Atk >= baseAtk + 10000, 'Tier 4 Talent must give at least +10000 ATK');

// 4. Reset talent (var 17 = 0) returns to base stats cleanly
run('$gameVariables.setValue(17, 0)');
assert.equal(run('actor.mhp'), baseHp, 'Resetting talent returns MHP to base');
assert.equal(run('actor.mmp'), baseMp, 'Resetting talent returns MMP to base');
assert.equal(run('actor.atk'), baseAtk, 'Resetting talent returns ATK to base');

// 5. Test choiceTest UI integration
run(`
$gameVariables.setValue(41, 1);
$gameVariables.setValue(61, 156);
$gameVariables.setValue(48, "Đôi tay rắn rỏi [ Lực tay +2 ]");
choiceTest();
`);
assert.ok(run('choices.length') >= 2, 'choiceTest creates choices list');
assert.ok(run('choices[1]').includes('HP'), 'Choice description includes HP buff info');
assert.ok(run('choices[1]').includes('MP'), 'Choice description includes MP buff info');
assert.ok(run('choices[1]').includes('ATK'), 'Choice description includes ATK buff info');

// 6. Test Font Fallback Integration
assert.ok(run('Window_Base.prototype.standardFontFace()').includes('system-ui'), 'Font face has system-ui fallback for crisp Vietnamese text');

// 7. Test CE 50 Talent Quality Drop Rates (Option A: 20% Lục, 30% Lam, 30% Tím, 20% Vàng)
const ce50 = JSON.parse(fs.readFileSync(root + 'js/libs/json/CommonEvents.json', 'utf8'))[50];
const thresholds = ce50.list.filter(cmd => cmd.code === 111 && cmd.parameters[1] === 8).map(cmd => cmd.parameters[3]);
assert.deepEqual(thresholds, [20, 50, 80], 'CE 50 thresholds must match Option A: [20, 50, 80]');

// 8. Test Android Chrome Canvas getImageData float/NaN protection
run(`
var mockContext = {
  createImageData: (w, h) => ({ width: w, height: h, data: new Uint8ClampedArray(w * h * 4) }),
  getImageData: function(sx, sy, sw, sh) {
    if (typeof sx !== 'number' || Math.floor(sx) !== sx) throw new TypeError("Value is not of type 'long'");
    if (typeof sy !== 'number' || Math.floor(sy) !== sy) throw new TypeError("Value is not of type 'long'");
    if (typeof sw !== 'number' || Math.floor(sw) !== sw) throw new TypeError("Value is not of type 'long'");
    if (typeof sh !== 'number' || Math.floor(sh) !== sh) throw new TypeError("Value is not of type 'long'");
    return { width: sw, height: sh, data: new Uint8ClampedArray(sw * sh * 4) };
  }
};
var CanvasRenderingContext2D = function() {};
CanvasRenderingContext2D.prototype = mockContext;
var document = {
  getElementById: () => ({ setAttribute: () => {}, style: {} }),
  addEventListener: () => {}
};
var XMLHttpRequest = function() {};
XMLHttpRequest.prototype.send = function() {};
var HTMLImageElement = function() {};
HTMLImageElement.prototype = {};
window.addEventListener = () => {};
`);
// Load safe wrapper logic
const loadingJs = fs.readFileSync(root + 'web-loading.js', 'utf8');
vm.runInContext(loadingJs, c);
// Verify calling with float, NaN, undefined, negative values works safely
assert.doesNotThrow(() => run('mockContext.getImageData(12.375, 45.89, 100.5, 200.75)'), 'Float coordinates handled safely');
assert.doesNotThrow(() => run('mockContext.getImageData(NaN, undefined, 0, 0)'), 'NaN / zero dimensions handled safely');

console.log('PASS: Talent buffs for Tier 1..4 (HP, MP, ATK), Vietnamese font fallback, Option A drop rates, and Android Canvas protection verified.');
