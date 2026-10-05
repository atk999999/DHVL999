// Web adaptation: expose the existing offline mode, never pretend a server request succeeded.
Object.assign(SD, {
  info_Open: "0",
  server_code: "999",
  server_msg: "Chức năng này cần máy chủ gốc và không khả dụng trong bản web offline.",
  set_NoticeTime: "99999999999999",
  set_ActivityTime: "99999999999999",
  set_BattleTime: "99999999999999",
  set_SaveSize: "20",
  set_IsEnable: "0",
  set_CheckIn: "0",
  set_XiaoYao: "0",
  set_IceName: "0",
  set_BDcod: "0",
  set_HM: "0"
});
const originalAjax = $.ajax;
$.ajax = function (options) {
  const o = typeof options === "string" ? {
    url: options
  } : options;
  const url = new URL(o.url, location.href);
  if (url.origin === location.origin && !url.pathname.includes("/__offline__") && !url.pathname.startsWith("/api/")) return originalAjax.apply(this, arguments);
  SD.server_code = "999";
  SD.server_msg = "Chức năng mạng không có trong bản offline.";
  const deferred = $.Deferred();
  const result = {
    status: 0,
    statusText: "offline",
    abort: function () {}
  };
  if (o.error) o.error(result, "offline", SD.server_msg);
  if (o.complete) o.complete(result, "offline");
  deferred.reject(result, "offline", SD.server_msg);
  return deferred.promise(result);
};

window.OfflineGame={
 // The Android loader supplied S1. A fresh browser session has no such value.
 // Use the neutral offline multiplier; retain a valid existing multiplier.
 damageScale:function(){
  var scale=Number(SD.S1);
  return Number.isFinite(scale)&&scale>0?scale:1;
 },
 serverUnavailable:function(){SD.server_code='999';SD.server_VIP='false';SD.server_msg='Chức năng máy chủ không có trong bản cục bộ.';return false;},
 beginRun:function(){
  [1,3,5,6,10,11,12,42].forEach(function(i){$gameSwitches.setValue(i,false);});
  $gameSwitches.setValue(6,true);$gameSwitches.setValue(11,true);
  for(var i=1;i<=34;i++)$gameVariables.setValue(i,0);
  for(var i=39;i<=67;i++)$gameVariables.setValue(i,0);
  $gameVariables.setValue(6,'Không Môn phái');
  $gameSelfSwitches.setValue([5,1,'A'],false);$gameSelfSwitches.setValue([4,1,'A'],false);
 },
 notice:function(){if(window.$gameMessage)$gameMessage.add('Tính năng trực tuyến không có trong bản cục bộ.');}
};
window.open=function(){OfflineGame.notice();return null;};
