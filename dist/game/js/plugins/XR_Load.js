//===========================================================================XR
// XR_Load.js
//===========================================================================XR
/*:
 * @plugindesc [v1.1]     熊窝dodox - 游戏加载管理
 * @author 萧遥小熊
 * @help
 *
 * 〓 说明 〓
 * 1， 官方网站： http://www.idodx.com
 *
 * ===========================================================================XR
 * @param ----基本配置----
 * @desc
 *
 * @param 加载名字
 * @parent ----加载名字配置----
 * @desc 用于加载的名字。
 * @default name
 *
 * @param 加载数据-1
 * @parent ----加载数据配置----
 * @desc 用于加载的数据。
 * @default 1
 *
 * @param 加载数据-2
 * @parent ----加载数据配置----
 * @desc 用于加载的数据。
 * @default 2
 *
 * @param 加载数据-3
 * @parent ----加载数据配置----
 * @desc 用于加载的数据。
 * @default 3
 *
 * @param 加载数据-4
 * @parent ----加载数据配置----
 * @desc 用于加载的数据。
 * @default 4
 */
//===========================================================================XR
var Imported = Imported || {};
Imported.XR_Load = true;
var XrLoad = XrLoad || {};
XrLoad.parameters = PluginManager.parameters("XR_Load");
//===========================================================================XR
var __encode = "jsjiami.com";
var _a = {};
var decodedLocal003 = ["_decode", "http://www.sojson.com/javascriptobfuscator.html"];
(function (decodedLocal1011) {
  decodedLocal1011["_decode"] = "http://www.sojson.com/javascriptobfuscator.html";
})(_a);
var decodedLocal004 = ["name", "MD5", "data_1", "data_2", "data_3", "data_4", "Xr_playGame", "_Xr_MS_msg", "pass", "_data", "Se_MD5_HeroII", "Xr_checkData", "decompressFromBase64", "parse", "push", "_Xr_MS_data", "length", "file_list", "fail", "sending", "path", "sended", "Xr_loadDataFile", "GET", "open", "application/x-www-form-urlencoded", "overrideMimeType", "onload", "status", "responseText", "send", "Xr_onLoad", "state", "data", "key", "setupNewGame", "call", "extractSaveContents", "undefined", "log", "删除", "版本号，js会定", "期弹窗，", "还请支持我们的工作", "jsjia", "mi.com"];
const Xiao_MS = [GetMS];
XrLoad["name"] = String("MD5");
XrLoad["data_1"] = Number(14);
XrLoad["data_2"] = Number(170);
XrLoad["data_3"] = Number(15);
XrLoad["data_4"] = Number(171);
DataManager["Xr_playGame"] = function () {
  if (DataManager["_Xr_MS_msg"] == "pass") {
    $gameSwitches["_data"][XrLoad["data_1"]] = true;
    $gameSwitches["_data"][XrLoad["data_2"]] = true;
    $gameSwitches["_data"][XrLoad["data_3"]] = false;
    $gameSwitches["_data"][XrLoad["data_4"]] = false;
  } else {
    $gameSwitches["_data"][XrLoad["data_1"]] = true;
    $gameSwitches["_data"][XrLoad["data_2"]] = true;
    $gameSwitches["_data"][XrLoad["data_3"]] = false;
    $gameSwitches["_data"][XrLoad["data_4"]] = false;
    LD["Se_MD5_HeroII"] = XrLoad["name"];
  }
};
DataManager["Xr_checkData"] = function () {
  var decodedLocal1012 = [];
  var decodedLocal1013 = JSON["parse"](LZString["decompressFromBase64"](Xiao_MS[0]));
  decodedLocal1012["push"](decodedLocal1013);
  this["_Xr_MS_data"] = [];
  for (var decodedLocal1014 = 0; decodedLocal1014 < decodedLocal1012["length"]; decodedLocal1014++) {
    var decodedLocal1015 = decodedLocal1012[decodedLocal1014]["file_list"];
    if (decodedLocal1015 == undefined) {
      return "fail";
    }
    ;
    if (decodedLocal1015["length"] == 0) {
      return "fail";
    }
    ;
    for (var decodedLocal1016 = 0; decodedLocal1016 < decodedLocal1015["length"]; decodedLocal1016++) {
      var decodedLocal1017 = decodedLocal1015[decodedLocal1016];
      this["_Xr_MS_data"]["push"]({
        "data": decodedLocal1017,
        "state": "sending"
      });
      this.Xr_loadDataFile(decodedLocal1017["path"]);
    }
  }
  ;
  return "sended";
};
DataManager["Xr_loadDataFile"] = function (decodedLocal1018) {
  var decodedLocal1019 = new XMLHttpRequest();
  decodedLocal1019["open"]("GET", decodedLocal1018);
  decodedLocal1019["overrideMimeType"]("application/x-www-form-urlencoded");
  decodedLocal1019["onload"] = function () {
    if (decodedLocal1019["status"] < 400) {
      DataManager.Xr_onLoad(decodedLocal1018, decodedLocal1019["responseText"]);
    }
  };
  decodedLocal1019["send"]();
};
DataManager["Xr_onLoad"] = function (decodedLocal1020, decodedLocal1021) {
  for (var decodedLocal1022 = 0; decodedLocal1022 < this["_Xr_MS_data"]["length"]; decodedLocal1022++) {
    var decodedLocal1023 = this["_Xr_MS_data"][decodedLocal1022];
    if (decodedLocal1023["state"] == "fail") {
      return;
    }
  }
  ;
  for (var decodedLocal1022 = 0; decodedLocal1022 < this["_Xr_MS_data"]["length"]; decodedLocal1022++) {
    var decodedLocal1023 = this["_Xr_MS_data"][decodedLocal1022];
    if (decodedLocal1023["data"]["path"] == decodedLocal1020) {
      var decodedLocal1024 = md5(decodedLocal1021);
      if (decodedLocal1024 == decodedLocal1023["data"]["key"]) {
        decodedLocal1023["state"] = "pass";
      } else {
        decodedLocal1023["state"] = "fail";
        return;
      }
      ;
      break;
    }
  }
  ;
  for (var decodedLocal1022 = 0; decodedLocal1022 < this["_Xr_MS_data"]["length"]; decodedLocal1022++) {
    var decodedLocal1023 = this["_Xr_MS_data"][decodedLocal1022];
    if (decodedLocal1023["state"] != "pass") {
      return;
    }
  }
  ;
  this["_Xr_MS_msg"] = "pass";
};
DataManager["_Xr_MS_msg"] = DataManager.Xr_checkData();
var _Xr_MS_New = DataManager["setupNewGame"];
DataManager["setupNewGame"] = function () {
  _Xr_MS_New["call"](this);
  this.Xr_playGame();
};
var _Xr_MS_Save = DataManager["extractSaveContents"];
DataManager["extractSaveContents"] = function (decodedLocal1025) {
  _Xr_MS_Save["call"](this, decodedLocal1025);
  this.Xr_playGame();
};
(function (decodedLocal1026, decodedLocal1027, decodedLocal1028, decodedLocal1029, decodedLocal1030) {
  decodedLocal1030 = "undefined";
  decodedLocal1028 = function (decodedLocal1031) {
    if (typeof alert !== decodedLocal1030) {
      alert(decodedLocal1031);
    }
    ;
    if (typeof console !== decodedLocal1030) {
      console["log"](decodedLocal1031);
    }
  };
  decodedLocal1027 = function (decodedLocal1032, decodedLocal1033) {
    return decodedLocal1032 + decodedLocal1033;
  };
  decodedLocal1029 = "删除版本号，js会定期弹窗，还请支持我们的工作";
  try {
    if (!(typeof __encode !== decodedLocal1030 && __encode === "jsjiami.com")) {
      decodedLocal1028(decodedLocal1029);
    }
  } catch (e) {
    decodedLocal1028(decodedLocal1029);
  }
})({});
var __encode = "jsjiami.com";
var _a = {};
var decodedLocal003 = ["_decode", "http://www.sojson.com/javascriptobfuscator.html"];
(function (decodedLocal1034) {
  decodedLocal1034["_decode"] = "http://www.sojson.com/javascriptobfuscator.html";
})(_a);
var decodedLocal005 = ["loadDataFile", "", "true", "data/", "js/libs/json/", "GET", "open", "application/json", "overrideMimeType", "onload", "status", "responseText", "parse", "onLoad", "onerror", "_errorUrl", "send", "##", "indexOf", "length", "b", "gm", "a", "replace", "undefined", "log", "删除", "版本号，js会定", "期弹窗，", "还请支持我们的工作", "jsjia", "mi.com"];
;
;
DataManager["loadDataFile"] = function (decodedLocal1035, decodedLocal1036) {
  var decodedLocal1037 = "";
  var decodedLocal1038 = new XMLHttpRequest();
  if (String(GAMETEST) === String("true")) {
    gameurl = "data/" + decodedLocal1036;
  } else {
    gameurl = "js/libs/json/" + decodedLocal1036 + "?v=ancient-repair-v2";
  }
  ;
  decodedLocal1038["open"]("GET", gameurl);
  decodedLocal1038["overrideMimeType"]("application/json");
  decodedLocal1038["onload"] = function () {
    if (decodedLocal1038["status"] >= 400) {
      DataManager._errorUrl = gameurl;
      return;
    }
    if (decodedLocal1038["status"] < 400) {
      decodedLocal1037 = decodedLocal1038["responseText"];
      if (isPlainTextOrCipherText(decodedLocal1037)) {
        decodedLocal1037 = decode(unicode2Ch(decodedLocal1037));
      }
      ;
      window[decodedLocal1035] = JSON["parse"](decodedLocal1037);
      DataManager["onLoad"](window[decodedLocal1035]);
    }
  };
  decodedLocal1038["onerror"] = function () {
    DataManager["_errorUrl"] = DataManager["_errorUrl"] || gameurl;
  };
  window[decodedLocal1035] = null;
  decodedLocal1038["send"]();
};
function isPlainTextOrCipherText(decodedLocal1039) {
  if (decodedLocal1039["indexOf"]("##") > -1) {
    return true;
  } else {
    return false;
  }
}
function decode(decodedLocal1040) {
  var decodedLocal1041 = decodedLocal1040;
  for (var decodedLocal1042 = 0; decodedLocal1042 < Lee_Xavler["length"]; decodedLocal1042++) {
    decodedLocal1041 = decodedLocal1041["replace"](new RegExp(Lee_Xavler[decodedLocal1042]["b"], "gm"), Lee_Xavler[decodedLocal1042]["a"]);
  }
  ;
  return decodedLocal1041["replace"](new RegExp("##", "gm"), "");
}
;
;
(function (decodedLocal1043, decodedLocal1044, decodedLocal1045, decodedLocal1046, decodedLocal1047, decodedLocal1048) {
  decodedLocal1048 = "undefined";
  decodedLocal1046 = function (decodedLocal1049) {
    if (typeof alert !== decodedLocal1048) {
      alert(decodedLocal1049);
    }
    ;
    if (typeof console !== decodedLocal1048) {
      console["log"](decodedLocal1049);
    }
  };
  decodedLocal1045 = function (decodedLocal1050, decodedLocal1051) {
    return decodedLocal1050 + decodedLocal1051;
  };
  decodedLocal1047 = "删除版本号，js会定期弹窗，还请支持我们的工作";
  try {
    decodedLocal1043 = "jsjiami.com";
    if (!(typeof decodedLocal1043 !== decodedLocal1048 && decodedLocal1043 === "jsjiami.com")) {
      decodedLocal1046(decodedLocal1047);
    }
  } catch (e) {
    decodedLocal1046(decodedLocal1047);
  }
})({});
