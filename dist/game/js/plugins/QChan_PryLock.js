//=============================================================================
// QChan_PryLock.js - Version 1.0.3
//=============================================================================

/*:
 * @plugindesc 撬锁小游戏
 * @author QChan
 * @help 版本: 1.0.3
 * 
 * 使用方法:
 * 插件指令: qchan_prelock show switch=4 level=5 break=0 time=15
 * switch=开关id
 * level=难度等级1-5
 * break=撬棍耐久度, 0 为无限耐久, 建议设置在20左右
 * time=限时, 单位: 秒, 0为不限时
 * 
 * 例子: qchan_prelock show switch=4 level=5 break=20 time=15
 * 开关id 4, 难度 5, 撬棍耐久 20, 限时 15秒
 * 
 * 小游戏结束后，会把结果保存在对应的开关
 * 
 * @param 音效
 * @param 音效: 开锁成功
 * @parent 音效
 * @desc 开锁成功音效 
 * [audio/se/filename, 输入音效文件名]
 * @default Equip1
 * 
 * @param 音效: 撬棍卡住
 * @parent 音效
 * @desc 撬棍卡住音效 
 * [audio/se/filename, 输入音效文件名]
 * @default Switch2
 * 
 * @param 音效: 撬棍损坏
 * @parent 音效
 * @desc 撬棍损坏音效 
 * [audio/se/filename, 输入音效文件名]
 * @default Break
 *
 * @param 图片
 * @param 图片: 锁背景
 * @parent 图片
 * @desc 基础文件夹: img/pictures
 * 例子: img/pictures/name.webp 输入: name
 * @default QChan_PryLock/Lock_Back
 * 
 * @param 图片: 锁芯
 * @parent 图片
 * @desc 基础文件夹: img/pictures
 * 例子: img/pictures/name.webp 输入: name
 * @default QChan_PryLock/Lock_Cylinder
 * 
 * @param 图片: 固定撬棍
 * @parent 图片
 * @desc 基础文件夹: img/pictures
 * 例子: img/pictures/name.webp 输入: name
 * @default QChan_PryLock/Crowbar_Fixed
 * 
 * @param 图片: 活动撬棍
 * @parent 图片
 * @desc 基础文件夹: img/pictures
 * 例子: img/pictures/name.webp 输入: name
 * @default QChan_PryLock/Crowbar_Movable
 *
 * @param 图片偏移
 * @param 图片偏移: 锁芯
 * @type struct<Position>
 * @parent 图片偏移
 * @desc 图片基于锁背景的偏移
 * @default {"x":"0","y":"0"}
 * 
 * @param 图片偏移: 固定撬棍
 * @type struct<Position>
 * @parent 图片偏移
 * @desc 图片基于锁芯的偏移
 * @default {"x":"-10","y":"25"}
 * 
 * @param 图片偏移: 活动撬棍
 * @type struct<Position>
 * @parent 图片偏移
 * @desc 基础文件夹: img/pictures
 * @desc 图片基于锁芯的偏移
 * @default {"x":"0","y":"-25"}
 * 
 * @param 文本
 * @param 文本: 帮助
 * @parent 文本
 * @type String
 * @desc 帮助文本设置
 * @default [Trái/phải: xoay] [Enter: mở] [Esc: thoát]
 * 
 * @param 进度条
 * @param 进度条: 方向
 * @parent 进度条
 * @type select
 * @option 水平
 * @option 垂直
 * @desc 进度条的摆放方向
 * @default 水平
 * 
 * @param 进度条: 层次
 * @parent 进度条
 * @type select
 * @option 顶部
 * @option 底部
 * @desc 顶部可以不被撬棍遮挡, 底部会被遮挡
 * @default 顶部
 * 
 * @param 进度条: 宽度
 * @parent 进度条
 * @type Number
 * @desc 进度条宽度
 * @default 300
 * 
 * @param 进度条: 高度
 * @parent 进度条
 * @type Number
 * @desc 进度条高度
 * @default 15
 * 
 * @param 进度条: 边框厚度
 * @parent 进度条
 * @type Number
 * @desc 进度条边框厚度
 * @default 3
 * 
 * @param 进度条: 居中
 * @parent 进度条
 * @type Boolean
 * @desc 设置是否居中, 如果居中偏移则从屏幕中心开始,
 * 否则偏移将会是屏幕坐标
 * @default true
 * 
 * @param 进度条: 偏移
 * @parent 进度条
 * @type struct<Position>
 * @desc 剩余时间文本设置
 * @default {"x":"0","y":"250"}
 * 
 * @param 进度条: 边框色
 * @parent 进度条
 * @type String
 * @desc 进度条边框色
 * @default #000000
 * 
 * @param 进度条: 底色
 * @parent 进度条
 * @type String
 * @desc 进度条底色
 * @default #FF0000
 * 
 * @param 进度条: 填充色
 * @parent 进度条
 * @type String
 * @desc 进度条边框填充色
 * @default #006400
 * 
*/

/*~struct~Position:
 * @param x
 * @type Number
 * @default 0
 * 
 * @param y
 * @type Number
 * @default 0
 * 
*/

(function () {
  "use strict";

  function getOffset(jsonString, defaultValue) {
    if (jsonString == null || jsonString.length == 0) {
      if (defaultValue == null) {
        return {
          x: 0,
          y: 0
        };
      }
      return defaultValue;
    }
    var json = JSON.parse(jsonString);
    return {
      x: Number(json.x),
      y: Number(json.y)
    };
  }
  function clampNumber(value, min, max) {
    var retValue = value;
    if (retValue < min) {
      value = min;
    }
    if (retValue > max) {
      value = max;
    }
    return value;
  }
  var QChan_PreLock = {};
  QChan_PreLock.parameters = PluginManager.parameters("QChan_PryLock");
  QChan_PreLock.params = {};
  QChan_PreLock.params.se = {};
  QChan_PreLock.params.se.break = String(QChan_PreLock.parameters["音效: 撬棍损坏"] || "Break");
  QChan_PreLock.params.se.success = String(QChan_PreLock.parameters["音效: 开锁成功"] || "Equip1");
  QChan_PreLock.params.se.stuck = String(QChan_PreLock.parameters["音效: 撬棍卡住"] || "switch2");
  QChan_PreLock.params.se.break = String(QChan_PreLock.parameters["音效: 撬棍损坏"] || "Break");
  QChan_PreLock.params.images = {};
  QChan_PreLock.params.images.lockBack = String(QChan_PreLock.parameters["图片: 锁背景"] || "QChan_PryLock/Lock_Back");
  QChan_PreLock.params.images.lockCylinder = String(QChan_PreLock.parameters["图片: 锁芯"] || "QChan_PryLock/Lock_Cylinder");
  QChan_PreLock.params.images.crowbarFixed = String(QChan_PreLock.parameters["图片: 固定撬棍"] || "QChan_PryLock/Crowbar_Fixed");
  QChan_PreLock.params.images.crowbarMovable = String(QChan_PreLock.parameters["图片: 活动撬棍"] || "QChan_PryLock/Crowbar_Movable");
  QChan_PreLock.params.imageOffsets = {};
  QChan_PreLock.params.imageOffsets.lockCylinder = getOffset(QChan_PreLock.parameters["图片偏移: 锁芯"]);
  QChan_PreLock.params.imageOffsets.crowbarFixed = getOffset(QChan_PreLock.parameters["图片偏移: 固定撬棍"]);
  QChan_PreLock.params.imageOffsets.crowbarMovable = getOffset(QChan_PreLock.parameters["图片偏移: 活动撬棍"]);
  QChan_PreLock.params.textHelp = String(QChan_PreLock.parameters["文本: 帮助"] || "[Trái/phải: xoay] [Enter: mở] [Esc: thoát]");
  QChan_PreLock.params.textLimitTime = String(QChan_PreLock.parameters["文本: 剩余时间"] || "[Còn lại: %1]");
  QChan_PreLock.params.progressBar = {};
  QChan_PreLock.params.progressBar.orientation = String(QChan_PreLock.parameters["进度条: 方向"] || "水平");
  QChan_PreLock.params.progressBar.layer = String(QChan_PreLock.parameters["进度条: 层次"] || "顶部");
  QChan_PreLock.params.progressBar.offset = getOffset(QChan_PreLock.parameters["进度条: 偏移"], {
    x: 0,
    y: 250
  });
  QChan_PreLock.params.progressBar.borderColor = String(QChan_PreLock.parameters["进度条: 边框色"] || "#000000");
  QChan_PreLock.params.progressBar.backColor = String(QChan_PreLock.parameters["进度条: 底色"] || "#FF0000");
  QChan_PreLock.params.progressBar.fillColor = String(QChan_PreLock.parameters["进度条: 填充色"] || "#006400");
  QChan_PreLock.params.progressBar.width = Number(QChan_PreLock.parameters["进度条: 宽度"] || 300);
  QChan_PreLock.params.progressBar.height = Number(QChan_PreLock.parameters["进度条: 高度"] || 10);
  QChan_PreLock.params.progressBar.borderSize = Number(QChan_PreLock.parameters["进度条: 边框厚度"] || 3);
  QChan_PreLock.params.progressBar.center = eval(String(QChan_PreLock.parameters["进度条: 居中"]));
  QChan_PreLock.returnSwitch = -1;
  QChan_PreLock.difficulty = 1;
  QChan_PreLock.breakCount = -1;
  QChan_PreLock.limitTime = -1;
  function Scene_PryLock() {
    this.initialize.apply(this, arguments);
  }
  ;
  Scene_PryLock.prototype = Object.create(Scene_MenuBase.prototype);
  Scene_PryLock.prototype.constructor = Scene_PryLock;
  Scene_PryLock.prototype.initialize = function () {
    Scene_MenuBase.prototype.initialize.call(this);
    this.rotBack = 0;
    this.rotMove = 0;
    this.unlockAngle = 0;
    this.unlockRangeSuccess = 0;
    this.unlockRangeClose = 0;
    this.setSuccessRange(QChan_PreLock.difficulty);
    this.stuck = false;
    this.stuckCount = 0;
    this.success = false;
    this.break = false;
    this.limitTime = QChan_PreLock.limitTime;
    this.time = 0;
    this.breakCount = QChan_PreLock.breakCount;
    this.exitTimer = null;
    this.faildTimer = null;
    this.progressBarTimer = null;
    this.init = false;
    this.returnValue = false;
    this._progressBarSprite = null;
    this._mouseMoveX = -1;
  };
  Scene_PryLock.prototype.create = function () {
    Scene_MenuBase.prototype.create.call(this);
    var createProgressBarState = false;
    if (QChan_PreLock.params.progressBar.layer == "底部") {
      createProgressBarState = true;
      this.createProgressBar();
    }
    this.createSprites();
    this.createText();
    if (!createProgressBarState) {
      this.createProgressBar();
    }
    if (this.limitTime != -1) {
      this.progressBarTimer = setInterval(function () {
        this.time += 100;
        this.updateProgressBar();
      }.bind(this), 100);
      this.faildTimer = setTimeout(function () {
        this.faildTimer = null;
        this.closeScene(false);
      }.bind(this), this.limitTime);
    }
  };
  Scene_PryLock.prototype.createSprites = function () {
    this._sprites = {};
    this._sprites.Backg = new Sprite(ImageManager.loadPicture("Background_KS", 0));
    this._sprites.Backg.anchor = new Point(0.5, 0.5);
    this._sprites.Backg.move(Graphics.boxWidth / 2, Graphics.boxHeight / 2);
    this._sprites.lockBack = new Sprite(ImageManager.loadPicture(QChan_PreLock.params.images.lockBack, 0));
    this._sprites.lockBack.anchor = new Point(0.5, 0.5);
    this._sprites.lockBack.move(Graphics.boxWidth / 2, Graphics.boxHeight / 2);
    this._sprites.lockCylinder = new Sprite(ImageManager.loadPicture(QChan_PreLock.params.images.lockCylinder, 0, 0));
    this._sprites.lockCylinder.anchor = new Point(0.5, 0.5);
    this._sprites.lockCylinder.move(QChan_PreLock.params.imageOffsets.lockCylinder.x, QChan_PreLock.params.imageOffsets.lockCylinder.y);
    this._sprites.crowbarFixed = new Sprite(ImageManager.loadPicture(QChan_PreLock.params.images.crowbarFixed, 0, 0));
    this._sprites.crowbarFixed.anchor = new Point(0, 0);
    this._sprites.crowbarFixed.move(QChan_PreLock.params.imageOffsets.crowbarFixed.x, QChan_PreLock.params.imageOffsets.crowbarFixed.y);
    this._sprites.crowbarMovable = new Sprite(ImageManager.loadPicture(QChan_PreLock.params.images.crowbarMovable, 0, 0));
    this._sprites.crowbarMovable.anchor = new Point(1, 0.5);
    this._sprites.crowbarMovable.move(QChan_PreLock.params.imageOffsets.crowbarMovable.x, QChan_PreLock.params.imageOffsets.crowbarMovable.y);
    this._sprites.lockanniA = new Sprite(ImageManager.loadPicture("BT_11", 0, 0));
    this._sprites.lockanniA.move(66, 640); //xiaoruis

    this._sprites.lockanniB = new Sprite(ImageManager.loadPicture("BT_12", 0, 0));
    this._sprites.lockanniB.move(380, 640); //xiaoruis

    this._sprites.lockanniC = new Sprite(ImageManager.loadPicture("BT_13", 0, 0));
    this._sprites.lockanniC.move(210, 780); //xiaoruis

    this._sprites.lockBack.addChild(this._sprites.lockCylinder);
    this._sprites.lockCylinder.addChild(this._sprites.crowbarFixed);
    this._sprites.lockCylinder.addChild(this._sprites.crowbarMovable);
    this.addChild(this._sprites.Backg);
    this.addChild(this._sprites.lockanniA);
    this.addChild(this._sprites.lockanniB);
    this.addChild(this._sprites.lockanniC);
    this.addChild(this._sprites.lockBack);
  };
  Scene_PryLock.prototype.createText = function () {
    this._textSprite = new Sprite(new Bitmap(Graphics.width, Graphics.height));
    this.addChild(this._textSprite);
    this._textSprite.bitmap.font;
    this._textSprite.bitmap.fontSize = 18;
    this._textSprite.bitmap.drawText(QChan_PreLock.params.textHelp, 0, Graphics.height - this._textSprite.bitmap.fontSize / 2 - 25, Graphics.width - 5, 0, "right");
  };
  Scene_PryLock.prototype.createProgressBar = function () {
    this._progressBarSprite = new Sprite(new Bitmap(Graphics.width, Graphics.height));
    this.addChild(this._progressBarSprite);
  };
  Scene_PryLock.prototype.updateProgressBar = function () {
    if (this._progressBarSprite == null || this.limitTime == -1) {
      return;
    }
    var width = QChan_PreLock.params.progressBar.width;
    var height = QChan_PreLock.params.progressBar.height;
    var borderSize = QChan_PreLock.params.progressBar.borderSize;
    var borderColor = QChan_PreLock.params.progressBar.borderColor;
    var backColor = QChan_PreLock.params.progressBar.backColor;
    var fillColor = QChan_PreLock.params.progressBar.fillColor;
    var orientation = QChan_PreLock.params.progressBar.orientation;
    if (orientation == "垂直") {
      width = QChan_PreLock.params.progressBar.height;
      height = QChan_PreLock.params.progressBar.width;
    }
    var startX = 0;
    var startY = 0;
    if (QChan_PreLock.params.progressBar.center) {
      startX = Graphics.width / 2 - width / 2;
      startY = Graphics.height / 2 - height / 2;
    }
    startX += QChan_PreLock.params.progressBar.offset.x;
    startY += QChan_PreLock.params.progressBar.offset.y;
    var maxValue = this.limitTime;
    var value = this.limitTime - this.time;
    if (value < 0) {
      value = 0;
    }
    if (value >= maxValue) {
      value = maxValue;
    }
    var percentage = value / maxValue;
    this._progressBarSprite.bitmap.clear();
    this._progressBarSprite.bitmap.fillRect(startX, startY, width, height, borderColor);
    var inside = {};
    inside.x = startX + borderSize;
    inside.y = startY + borderSize;
    inside.w = width - borderSize * 2;
    inside.h = height - borderSize * 2;
    this._progressBarSprite.bitmap.fillRect(inside.x, inside.y, inside.w, inside.h, backColor);
    if (orientation == "水平") {
      inside.w = Math.floor(inside.w * percentage);
    } else {
      var offset = Math.floor(inside.h - inside.h * percentage);
      inside.y += offset;
      inside.h -= offset;
    }
    this._progressBarSprite.bitmap.fillRect(inside.x, inside.y, inside.w, inside.h, fillColor);
  };
  Scene_PryLock.prototype.closeSceneDelay = function (unlock, time) {
    this.exitTimer = setTimeout(function () {
      this.exitTimer = null;
      this.closeScene(unlock);
    }.bind(this), time);
  };
  Scene_PryLock.prototype.closeScene = function (unlock) {
    this.returnValue = unlock;
    SceneManager.pop();
  };
  Scene_PryLock.prototype.terminate = function () {
    if (this.exitTimer != null) {
      clearInterval(this.exitTimer);
    }
    if (this.faildTimer != null) {
      clearInterval(this.faildTimer);
    }
    if (this.progressBarTimer != null) {
      clearInterval(this.progressBarTimer);
    }
    $gameSwitches.setValue(QChan_PreLock.returnSwitch, this.returnValue);
  };
  Scene_PryLock.prototype.isPressed = function () {
    //return Input.isPressed('ok') || TouchInput.isPressed();
    if (TouchInput.isPressed() && TouchInput.x > 210 && TouchInput.x < 337 && TouchInput.y > 782 && TouchInput.y < 826) {
      return Input.isPressed("ok") || TouchInput.isPressed();
    }
    //console.log(TouchInput.x,TouchInput.y)//xiaoruis
  };
  Scene_PryLock.prototype.isCancel = function () {
    //return Input.isPressed('cancel') || TouchInput.isCancelled();
  };
  Scene_PryLock.prototype.mouseMove = function () {
    if (this._mouseMoveX == -1) {
      this._mouseMoveX = TouchInput.mouseX;
    }
    var offset = TouchInput.mouseX - this._mouseMoveX;
    this._mouseMoveX = TouchInput.mouseX;
    return offset;
  };
  Scene_PryLock.prototype.update = function () {
    Scene_MenuBase.prototype.update.call(this);

    //防止按住Z键进入场景
    if (!this.init) {
      if (!this.isPressed()) {
        this.init = true;
        this._mouseMoveX = -1;
      }
      return;
    }
    if (this.success || this.break) {
      return;
    }
    if (this.stuck) {
      switch (this.stuckCount) {
        case 0:
          this.rotBack += 0.03;
          break;
        case 3:
          this.rotBack -= 0.03;
          this.stuck = false;
          break;
      }
      // 损坏
      if (this.stuckCount == 0 && this.breakCount != -1) {
        this.breakCount -= 1;
        if (this.breakCount <= 0) {
          this.break = true;
          AudioManager.playSe({
            name: QChan_PreLock.params.se.break,
            pan: 0,
            pitch: 100,
            volume: 100
          });
          this.rotBack = 0;
          this.rotMove = 0;
          this._sprites.crowbarMovable.visible = false;
          this._sprites.lockCylinder.rotation = this.rotBack;
          this._sprites.crowbarMovable.rotation = this.rotMove;
          this.closeSceneDelay(false, 500);
          return;
        }
      }
      this._sprites.lockCylinder.rotation = this.rotBack;
      this.stuckCount++;
      return;
    }
    if (this.isCancel()) {
      this.closeScene(false);
      return;
    }
    var oldRotBack = this.rotBack;
    var oldRotMove = this.rotMove;
    /*    if (this.isPressed()) {
              this.rotBack += 0.05;
          } else {
              this.rotBack -= 0.1;
              var offset = this.mouseMove();
              this.rotMove += offset * 0.01;
              if (Input.isPressed('right')) {
                  this.rotMove += 0.03;
              } else if (Input.isPressed('left')) {
                  this.rotMove -= 0.03;
              }
          }*/
    if (this.isPressed()) {
      this.rotBack += 0.05;
    } else {
      this.rotBack -= 0.1;
      if (TouchInput.isPressed() && TouchInput.x > 64 && TouchInput.x < 166 && TouchInput.y > 638 && TouchInput.y < 736) {
        this.rotMove += 0.03;
      }
      if (TouchInput.isPressed() && TouchInput.x > 382 && TouchInput.x < 476 && TouchInput.y > 640 && TouchInput.y < 736) {
        this.rotMove -= 0.03;
      }
    } //xiaoruis
    this.rotBack = clampNumber(this.rotBack, 0, 1.57);
    this.rotMove = clampNumber(this.rotMove, 0, 1.57 * 2);
    var unlock = false;
    var stuck = false;
    if (this.isPressed()) {
      if (this.isInRangeSuccess()) {
        //180度
        if (this.rotBack >= 1.57) {
          unlock = true;
        }
      } else if (this.isInRangeClose()) {
        //55度
        if (this.rotBack >= 0.95) {
          stuck = true;
        }
      } else {
        stuck = true;
      }
    }
    if (stuck) {
      // console.log('卡住');
      this.rotBack = oldRotBack;
      this.rotMove = oldRotMove;
      this.stuck = true;
      this.stuckCount = 0;
      AudioManager.playSe({
        name: QChan_PreLock.params.se.stuck,
        pan: 0,
        pitch: 150,
        volume: 40
      });
    } else if (unlock) {
      // console.log('解锁完成');
      this.success = true;
      AudioManager.playSe({
        name: QChan_PreLock.params.se.success,
        pan: 0,
        pitch: 100,
        volume: 70
      });
      this.closeSceneDelay(true, 500);
    }
    this._sprites.lockCylinder.rotation = this.rotBack;
    this._sprites.crowbarMovable.rotation = this.rotMove;
  };
  Scene_PryLock.prototype.getAngle = function () {
    return Math.floor(this.rotMove * 180 / Math.PI);
  };
  Scene_PryLock.prototype.isInRangeClose = function () {
    var angle = Math.abs(this.unlockAngle - this.getAngle());
    return angle <= this.unlockRangeSuccess + this.unlockRangeClose;
  };
  Scene_PryLock.prototype.isInRangeSuccess = function () {
    var angle = Math.abs(this.unlockAngle - this.getAngle());
    return angle <= this.unlockRangeSuccess;
  };
  Scene_PryLock.prototype.setSuccessRange = function (difficulty) {
    this.unlockAngle = Math.floor(Math.random() * 181);
    switch (difficulty) {
      default:
      case 1:
        this.unlockRangeSuccess = 30;
        this.unlockRangeClose = 30;
        break;
      case 2:
        this.unlockRangeSuccess = 20;
        this.unlockRangeClose = 20;
        break;
      case 3:
        this.unlockRangeSuccess = 10;
        this.unlockRangeClose = 10;
        break;
      case 4:
        this.unlockRangeSuccess = 5;
        this.unlockRangeClose = 5;
        break;
      case 5:
        this.unlockRangeSuccess = 3;
        this.unlockRangeClose = 3;
        break;
    }
  };
  function getArg(args, tag) {
    var tagStr = tag + "=";
    var reg = new RegExp("^" + tagStr);
    for (var i = 0; i < args.length; i++) {
      if (reg.test(args[i].toLowerCase())) {
        return args[i].slice(tagStr.length);
      }
    }
    return null;
  }
  var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function (command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command != "qchan_prelock" || args.length == 0) {
      return;
    }
    switch (args[0]) {
      case "show":
        var level = Number(getArg(args, "level")) || 0;
        var switchID = Number(getArg(args, "switch")) || -1;
        var breakCount = Number(getArg(args, "break") || -1);
        var limitTime = Number(getArg(args, "time")) || -1;
        if (breakCount <= 0) {
          breakCount = -1;
        }
        if (limitTime <= 0) {
          limitTime = -1;
        } else {
          limitTime *= 1000;
        }
        if (switchID == -1) {
          console.error("qchan_prelock show 开关未指定, 或填写错误");
          return;
        }
        QChan_PreLock.difficulty = level;
        QChan_PreLock.returnSwitch = switchID;
        QChan_PreLock.breakCount = breakCount;
        QChan_PreLock.limitTime = limitTime;
        SceneManager.push(Scene_PryLock);

        /*
        if (args.length < 3) {
          console.error('qchan_prelock show 使用有误, 使用方法: qchan_prelock show 难度 开关id');
          return;
        }
        if (isNaN(args[1])) {
          console.error('qchan_prelock show 指定难度有误');
          return;
        }
        if (isNaN(args[2])) {
          console.error('qchan_prelock show 指定开关有误');
          return;
        }
        QChan_PreLock.difficulty = Number(args[1]);
        QChan_PreLock.returnSwitch = Number(args[2]);
        SceneManager.push(Scene_PryLock);
        */
        break;
    }
  };

  //=============================================================================
  // 鼠标扩展
  //=============================================================================
  var _touchInput_clear = TouchInput.clear;
  TouchInput.clear = function () {
    _touchInput_clear.call(this);
    this.mouseX = 0;
    this.mouseY = 0;
  };

  /*var _touchInput__onMouseMove = TouchInput._onMouseMove;
  TouchInput._onMouseMove = function(event) {
    _touchInput__onMouseMove.call(this, event);
    this.mouseX = Graphics.pageToCanvasX(event.pageX);
    this.mouseY = Graphics.pageToCanvasY(event.pageY);
  };*/
})();
