//盗版破解游戏者,你妈必得梅毒全身溃烂，你爸必得肝癌晚期！
const LD = window.localStorage,
  SD = window.sessionStorage,
  XRW = (location.origin+"/__offline__"),
  XRS = (location.origin+"/__offline__"),
  GID = "d9c557a5-af14-44d7-aed3-a0f34f445503",
  GAMETEST = "1";
ISDEVICE = 3;
SD.info_LocalVersion = 781;
const GetMS = "N4IgZglgNgpg+lCBnALiAXAbVAaxgTwxAGMAmGAFgA5SBmUgRgCMAGY94gVgBMZaBOLkzoBDbgHZynUiAA0IAA4iUACyIQAdrwAeAOhUoAtlBABfWbgJEYLQQ27sWANmJPaFEeP4wqI/i/9iPn5+MH45RWU1dBAAKyQAeliARwBXGAAnfF14swsQPEIYlmpuBmoRWgYqJgpyUjCnESoYTlpbFlJxGHKIpVUieITDEU0cpDzLIpAqcVqGMgp+Cg93GDBSCic61k5/KhYYJjBaPqjBxIUoVIBzTSRxyYKrGMkKWpYRGCaGkQ2Nhg2Q78dxgVw2b5nAYxIYZBQ3ODEAD2GRgj3MUyIEiYri63CctWIYE4xAkIhExBEm3EFBg4mI/AY4gYUOicUScIRIw0IhumQeuQxz2mszsYG4YRoMBB/D2xxEDDAXlI3CqtBES1ZFwSnLgSKYsRgxBQAomQsKRCYTm6JW++NoLScMFIGto7BC4m4tlpc2IWphHPhcCQQQ0MFNTwtMT+RwonCoe2I9gYzUlwjAMB6y0+nDpVH97J1QaQCgyEBQ4fR+SjIC8Nl4TkBDAY7X4LCotHo3HtBNIThY4k4PALsKDAHdNNwkWOI+aXiAnNxyGEWGBV2CnJwPF5PK4qM22+IRCUwCPEogmIl4kiNAkAILGlGmm+R+d1L1zEqhPviAncJh7PuLDCBSYBMD0XRngkF5XkgN73hkhhPuML5ztMWyJnwsziOIAjfF4wg2t47RZkwIhMFBMFJHBt4AMJQCISBIJW14aK+0w4qQpDLI0NIULYm5Esc8a4QwjLEHU7iURAl7UfBtFIoYSEaAAogAbjAGgmihbFoUQnwKkETAgl0cYePwwiqi0CYsGUBzMPm8j9GyQxUaxCQqWGhgQCxNHsfptBgEyDDkG6rjEDQ5SiX2LSkgBnAsCU0mye5ACSFaGM+unVm+0gsIFtCcMczJMPuczHGACY1J8boWfSyWwfBADKODQFAWX+cUJIEp0/DkiBbZgBQzDiEqPCZoFeYwA1cm3k1KDKL5qE5dM4nSLQv5xk4VChMNFC8KVNhMsNtlDk4M3uU1+CoDAhg6Z1IBduIVDEIOVonNtW5rjA3Dxh+r3SmATQXTRCQAOowCICg3h1pgALryDWLBmEAA";
function Ftime() {
  var d = new Date();
  var tyear = d.getFullYear();
  var tmonth = d.getMonth() + 1;
  var tday = d.getDate();
  var thour = d.getHours();
  var tminute = d.getMinutes();
  var tsecond = d.getSeconds();
  var s = tyear * 10000000000 + tmonth * 100000000 + tday * 1000000 + thour * 10000 + tminute * 100 + tsecond;
  return s;
}
function Stime() {
  var d = new Date();
  var tyear = d.getFullYear();
  var tmonth = d.getMonth() + 1;
  var tday = d.getDate();
  var s = tyear * 10000 + tmonth * 100 + tday;
  return s;
}
if (parseInt(ISDEVICE) === parseInt(2)) {
  SD.info_Device = "IOS";
} else if (parseInt(ISDEVICE) === parseInt(3)) {
  SD.info_Device = "Android";
} else if (parseInt(ISDEVICE) === parseInt(4)) {
  SD.info_Device = "PC";
}
const Lee_Xavler = [{
  "a": 0,
  "b": "я"
}, {
  "a": 1,
  "b": "μ"
}, {
  "a": 2,
  "b": "Γ"
}, {
  "a": 3,
  "b": "ψ"
}, {
  "a": 4,
  "b": "η"
}, {
  "a": 5,
  "b": "ш"
}, {
  "a": 6,
  "b": "β"
}, {
  "a": 7,
  "b": "Б"
}, {
  "a": 8,
  "b": "ζ"
}, {
  "a": 9,
  "b": "ж"
}];
