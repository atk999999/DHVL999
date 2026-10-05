(function () {
  'use strict';
  var total=0, done=0, boot=true, active=true, hideTimer;
  var panel=document.getElementById('game-loading'), bar=document.getElementById('loading-fill'), label=document.getElementById('loading-status');
  function paint(){var p=total?Math.min(99,Math.floor(done*100/total)):0;bar.style.width=p+'%';panel.setAttribute('aria-valuenow',p);label.textContent='Đang tải game… '+p+'%';}
  function track(target){total++;paint();var finished=false;function finish(){if(finished)return;finished=true;done++;paint();target.removeEventListener('load',finish);target.removeEventListener('error',finish);target.removeEventListener('abort',finish);}target.addEventListener('load',finish);target.addEventListener('error',finish);target.addEventListener('abort',finish);}
  var send=XMLHttpRequest.prototype.send;XMLHttpRequest.prototype.send=function(){track(this);return send.apply(this,arguments);};
  var src=Object.getOwnPropertyDescriptor(HTMLImageElement.prototype,'src');
  Object.defineProperty(HTMLImageElement.prototype,'src',{configurable:src.configurable,enumerable:src.enumerable,get:src.get,set:function(v){track(this);src.set.call(this,v);}});
  function show(){clearTimeout(hideTimer);active=true;panel.hidden=false;paint();}
  function finish(){active=false;bar.style.width='100%';panel.setAttribute('aria-valuenow','100');label.textContent='Đã tải xong';hideTimer=setTimeout(function(){if(!active)panel.hidden=true;},180);}
  window.addEventListener('load',function(){
    var start=Graphics.startLoading,end=Graphics.endLoading,error=Graphics.printLoadingError;
    Graphics.startLoading=function(){start.apply(this,arguments);show();};
    Graphics.endLoading=function(){end.apply(this,arguments);if(!boot)finish();};
    Graphics._paintUpperCanvas=function(){this._clearUpperCanvas();};
    Graphics.printLoadingError=function(){panel.hidden=true;error.apply(this,arguments);};
    var mapStart=Scene_Map.prototype.start;
    Scene_Map.prototype.start=function(){mapStart.apply(this,arguments);boot=false;finish();};
    var fatal=Graphics.printError;
    Graphics.printError=function(){panel.hidden=true;fatal.apply(this,arguments);};
  });
  paint();
}());
