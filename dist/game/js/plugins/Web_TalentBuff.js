/*:
 * @plugindesc [v1.1] Tăng cường chỉ số Thiên Phú (MHP, MMP, ATK) & Tối ưu Font chữ tiếng Việt
 * @author AI Studio
 * @help
 * Plugin tự động buff thêm Máu (HP), Nội lực (MP) và Công kích (ATK) dựa theo phẩm cấp
 * và thuộc tính của Thiên Phú được chọn khi khởi đầu đời mới.
 * Đồng thời tối ưu hiển thị font chữ tiếng Việt sắc nét và căn chỉnh giao diện gọn gàng.
 */
(function () {
  'use strict';

  var TIER_BONUS = {
    1: { hp: 3000, mp: 1000, atk: 500, def: 50, mat: 50, agi: 20 },   // Phẩm 1: Lục
    2: { hp: 8000, mp: 2500, atk: 1500, def: 150, mat: 150, agi: 50 }, // Phẩm 2: Lam
    3: { hp: 20000, mp: 6000, atk: 4000, def: 400, mat: 400, agi: 100 }, // Phẩm 3: Tử
    4: { hp: 50000, mp: 15000, atk: 10000, def: 1000, mat: 1000, agi: 250 } // Phẩm 4: Hồng / Cam
  };

  function formatStat(n) {
    if (!n) return '0';
    if (n >= 1000) {
      var k = n / 1000;
      return (Number.isInteger(k) ? k : k.toFixed(1)) + 'k';
    }
    return '' + n;
  }

  function getTalentTier(id) {
    if (!id || id <= 0) return 0;
    if (id >= 400 || (id >= 4 && id < 10)) return 4;
    if (id >= 300) return 3;
    if (id >= 200) return 2;
    if (id >= 100 || id > 0) return 1;
    return 1;
  }

  function getTalentBonus(talentId) {
    if (!talentId || talentId <= 0) return [0, 0, 0, 0, 0, 0, 0, 0];
    var tier = getTalentTier(talentId);
    var base = TIER_BONUS[tier] || TIER_BONUS[1];

    var hp = base.hp;
    var mp = base.mp;
    var atk = base.atk;
    var def = base.def || 0;
    var mat = base.mat || 0;
    var mdf = 0;
    var agi = base.agi || 0;
    var luk = 0;

    // Bonus scaling theo ID đặc thù (Lực tay, Thể chất, Căn cốt...)
    if ((talentId >= 156 && talentId <= 158) || talentId % 10 === 5) {
      atk += tier * 200;
      hp += tier * 500;
    }
    if (talentId === 157 || talentId % 10 === 6) {
      hp += tier * 1000;
      def += tier * 50;
    }
    if (talentId === 153 || talentId === 159 || talentId % 10 === 8) {
      mp += tier * 500;
      mat += tier * 100;
    }

    return [hp, mp, atk, def, mat, mdf, agi, luk];
  }

  function currentTalentBonus(actor) {
    if (!actor || actor.actorId() !== 2) return [0, 0, 0, 0, 0, 0, 0, 0];
    if (typeof $gameVariables === 'undefined') return [0, 0, 0, 0, 0, 0, 0, 0];
    var talentId = $gameVariables.value(17);
    if (!talentId || talentId <= 0) return [0, 0, 0, 0, 0, 0, 0, 0];
    return getTalentBonus(talentId);
  }

  // Chuẩn hóa Font chữ tiếng Việt cho tất cả cửa sổ RPG Maker MV
  if (typeof Window_Base !== 'undefined' && Window_Base.prototype) {
    var _Window_Base_standardFontFace = Window_Base.prototype.standardFontFace;
    Window_Base.prototype.standardFontFace = function () {
      return 'GameFont, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
    };
  }

  // Hook paramPlus và paramMax để mở rộng chỉ số thực của nhân vật chính
  var _Game_Actor_paramPlus = Game_Actor.prototype.paramPlus;
  Game_Actor.prototype.paramPlus = function (id) {
    var val = _Game_Actor_paramPlus.call(this, id);
    var b = currentTalentBonus(this);
    return val + (b[id] || 0);
  };

  var _Game_Actor_paramMax = Game_Actor.prototype.paramMax;
  Game_Actor.prototype.paramMax = function (id) {
    var val = _Game_Actor_paramMax.call(this, id);
    var b = currentTalentBonus(this);
    return val + (b[id] || 0);
  };

  // Cải tiến giao diện chọn thiên phú trong choiceTest(): không tràn khung, chữ sắc nét
  if (typeof choiceTest === 'function' || typeof window !== 'undefined') {
    var _choiceTest = typeof choiceTest === 'function' ? choiceTest : null;
    window.choiceTest = function () {
      if (typeof window !== 'undefined') {
        window.choices = [];
        window.params = [];
      }
      var choices = (typeof window !== 'undefined' && window.choices) || [];
      var params = (typeof window !== 'undefined' && window.params) || [];
      $gameMessage.setChoices(choices, 0, 1);
      choices.push("\\fs[15]\\b[4]  Nghịch thiên cải mệnh [Đổi mới]");
      for (var i = 0; i <= 6; i++) {
        var tier = $gameVariables.value(41 + i);
        var talentId = $gameVariables.value(61 + i) || (tier * 100 + 1);
        var bonus = getTalentBonus(talentId);
        var bonusText = " \\c[14][+" + formatStat(bonus[0]) + " HP, +" + formatStat(bonus[1]) + " MP, +" + formatStat(bonus[2]) + " ATK]\\c[0]";
        var rawText = ($gameVariables.value(48 + i) || "").trim();
        var displayText = rawText + bonusText;

        switch (tier) {
          case 1:
            choices.push("  \\fs[12]\\b[1]" + displayText);
            break;
          case 2:
            choices.push("  \\fs[12]\\b[2]" + displayText);
            break;
          case 3:
            choices.push("  \\fs[12]\\b[3]" + displayText);
            break;
          case 4:
            choices.push("  \\fs[12]\\b[4]" + displayText);
            break;
          default:
            choices.push("  \\fs[12]\\b[4]Trống");
        }
        params.push();
      }

      $gameMessage.setChoiceCallback(function (n) {
        if (n >= 0 && n <= 7) {
          $gameTemp.reserveCommonEvent(40 + n);
          if (n > 0) {
            var selectedId = $gameVariables.value(60 + n);
            if (selectedId && typeof TickerManager !== 'undefined') {
              var b = getTalentBonus(selectedId);
              setTimeout(function () {
                TickerManager.show("\\c[6]Thiên phú kích hoạt: +" + b[0] + " HP, +" + b[1] + " Nội lực, +" + b[2] + " Công kích\\c[0]");
              }, 500);
            }
          }
        }
      });
    };
    choiceTest = window.choiceTest;
  }

  window.WebTalentBuff = {
    getTalentTier: getTalentTier,
    getTalentBonus: getTalentBonus,
    currentTalentBonus: currentTalentBonus,
    formatStat: formatStat
  };
})();
