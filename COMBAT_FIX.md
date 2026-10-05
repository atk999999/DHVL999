# Player skill damage repair — 2026-09-28

The offline web loader never initialized sessionStorage.S1. All 121 player formulas referencing SD.S1 evaluated to NaN and the YEP damage evaluator converted that to zero. NPC skill 225, for example, uses a.atk*4 and does not have this dependency. Some player formulas also indexed sparse game-variable arrays directly, turning absent bonuses into undefined.

The web formulas now use OfflineGame.damageScale(), which keeps finite positive session multipliers and otherwise uses a neutral multiplier of 1. Bonus variables use Game_Variables.value(), the engine accessor that returns zero for unset variables. No save reset or currency reset is required. Existing hit/evasion rules from the preceding release remain unchanged; this repair addresses zero damage and does not guarantee every attack hits.

Validation: node tests/combat-regression.cjs reproduces both missing-value failures, exercises Game_Action.apply with the enabled YEP formula evaluator, checks all skill formulas for finite values, verifies all 121 multiplier-based skills produce nonzero values in the fresh-session fixture, and checks saved bonuses and the NPC formula. It is a headless regression test, not a full browser battle playthrough.

## Uploaded APK assessment

com.dodox.Comb (1).apk declares internal version 795; the current web content is based on 781. Its index.html calls WinFileDll for Xr_Core, Xr_Game_Comeb, Xr_Tool_Comeb and Xr_Other_Comeb. The loader and these modules are absent from the extracted APK. Its data folder contains only 10 skill records and 4 common-event records, including non-executable placeholder damage formulas, rather than the complete game database. This APK cannot safely replace the web runtime. No claim is made that this release upgrades game content to 795. Integration needs the complete runtime modules and database from an authorized export/source package.
