/* Original Vietnamese side story, using the recovered WD_4 artwork. */
(function () {
 'use strict';
 var KEY='_tuYenStoryV1';
 var chapters=[
  {age:12,title:'Người khách dưới mưa',text:'Dưới mái đình, một thiếu nữ áo tím giữ chặt chiếc túi thuốc đã sờn. Nàng tên Lạc Tử Yên, đang tìm đường đến thôn Thanh Khê vừa mất mùa. Bên đường, người phu xe bị thương vẫn cố níu dây cương. Tử Yên nhìn ngươi: “Ta có thể tự đi. Nhưng người này không thể bỏ lại.”',choices:[
   {label:'Giúp người phu xe băng bó',hint:'Thiện ác +2 · Quan hệ +2',vars:{24:2},trust:2,result:'Ngươi xé một dải áo băng vết thương. Tử Yên ghi nhớ người đã chịu dừng chân giữa cơn mưa.'},
   {label:'Đọc bản đồ, tìm đường tránh lũ',hint:'Học thức +2 · Quan hệ +1',vars:{22:2},trust:1,result:'Từ những dấu mực cũ, ngươi tìm được một lối qua sườn đồi. Chuyến thuốc kịp đến trước khi nước dâng.'}]},
  {age:14,title:'Dấu chân bên khe núi',text:'Trong chuyến trở lại Thanh Khê, Tử Yên tìm đến cùng một đoàn xe lương. Cây cầu Thanh Khê đã bị cắt dây. Nàng phát hiện dấu chân dẫn về kho bỏ hoang, còn dân làng chỉ đủ gạo qua ba ngày. Ngươi sẽ đưa đoàn xe vượt qua khe bằng cách nào?',choices:[
   {label:'Gánh lương qua lối đá',hint:'Cần Thể chất 5 · Thể chất +1 · Danh vọng +2 · Quan hệ +2',requires:[26,5],vars:{26:1,21:2},trust:2,result:'Ngươi chia lương thành từng gánh nhỏ, đưa cả đoàn qua lối đá. Không một bao gạo nào bị bỏ lại.'},
   {label:'Kết bè từ tre ven khe',hint:'Học thức +1 · Ngộ tính +1 · Quan hệ +1',vars:{22:1,28:1},trust:1,result:'Đoàn xe mất thêm nửa ngày đan bè, nhưng lương và người đều sang bờ an toàn.'}]},
  {age:16,title:'Cuốn sổ trong kho cũ',text:'Trong kho hoang, ngươi và Tử Yên tìm thấy sổ thu mua lương có dấu của một thương hội. Một người môi giới đề nghị trả bạc để đổi lấy cuốn sổ. Tử Yên không ngăn tay ngươi, chỉ nói: “Người đói ngoài kia không có gì để trả cho chúng ta.”',choices:[
   {label:'Đưa chứng cứ cho dân làng',hint:'Danh vọng +3 · Thiện ác +2 · Quan hệ +2',vars:{21:3,24:2},trust:2,result:'Ngươi giao sổ trước sân đình. Dân làng cùng ký tên đòi lại số lương bị giữ, còn Tử Yên đứng bên làm chứng.'},
   {label:'Giữ bản sao, thương lượng trả lương',hint:'Cần Học thức 5 · Học thức +2 · Quan hệ +1',requires:[22,5],vars:{22:2},trust:1,result:'Bản sao được gửi ở hai nơi. Thương hội phải trả lương, còn cuốn sổ gốc được niêm phong làm bằng chứng.'},
   {label:'Nhận bạc, giao cuốn sổ',hint:'Xu +200 · Thiện ác −3 · Quan hệ −3',gold:200,vars:{24:-3},trust:-3,result:'Bạc rơi nặng trong tay áo. Tử Yên nhận ra sự lựa chọn của ngươi và lặng lẽ rời kho trước.'}]},
  {age:18,title:'Lời hẹn mùa hoa tím',text:'Mùa hoa tím trở lại trên sườn Thanh Khê. Đoàn xe cứu tế năm ấy nay đã thành một nhóm người tự nguyện giúp khách lỡ đường. Tử Yên chờ ở mái đình cũ. Những việc ngươi từng làm quyết định điều nàng sắp nói.',choices:[
   {label:'Ở lại nghe lời Tử Yên',hint:'Khép lại câu chuyện · Nhận phần thưởng theo quan hệ',ending:true}]}
 ];
 function state(){return $gameSystem[KEY]||($gameSystem[KEY]={stage:0,trust:0,log:[],done:false});}
 function hero(){return $gameParty.members().filter(function(a){return a.actorId()===2;})[0];}
 function ready(){return !!(window.$gameSystem&&window.$gameMap&&window.$gameParty&&$gameMap.mapId()===3&&hero()&&hero().isAlive()&&!$gameParty.inBattle());}
 function choose(index){
  if(!ready())return false;
  var s=state(),chapter=chapters[s.stage];
  if(s.done||!chapter||$gameVariables.value(1)<chapter.age)return false;
  var c=chapter.choices[index];if(!c)return false;
  if(c.requires&&$gameVariables.value(c.requires[0])<c.requires[1])return false;
  // Stage advances synchronously; repeat clicks cannot grant the same reward twice.
  var result=c.result;
  if(c.ending){
   if(s.trust>=4){hero().learnSkill(450);$gameVariables.setValue(28,$gameVariables.value(28)+3);result='Kết cục: Tri kỷ Thanh Khê. Tử Yên trao truyền Tử Hà Chưởng, để ngươi có thể tiếp tục bảo vệ người qua đường. Đã học Tử Hà Chưởng; Ngộ tính +3.';}
   else{$gameParty.gainGold(100);$gameVariables.setValue(22,$gameVariables.value(22)+2);result='Kết cục: Một đoạn nhân duyên. Tử Yên cảm ơn những lần ngươi đã giúp, nhưng không trao tâm pháp. Nàng hoàn lại lộ phí rồi từ biệt. Xu +100; Học thức +2.';}
   s.done=true;
  }
  Object.keys(c.vars||{}).forEach(function(k){$gameVariables.setValue(Number(k),$gameVariables.value(Number(k))+c.vars[k]);});
  if(c.gold)$gameParty.gainGold(c.gold);
  s.trust+=c.trust||0;s.stage++;s.log.push({title:chapter.title,choice:c.label,result:result,age:$gameVariables.value(1)});
  return true;
 }
 var originalBegin=OfflineGame.beginRun;
 OfflineGame.beginRun=function(){originalBegin.apply(this,arguments);if(window.$gameSystem)delete $gameSystem[KEY];if(window.$gameActors&&$gameActors.actor(2))$gameActors.actor(2).forgetSkill(450);};
 function Scene_TuYen(){this.initialize.apply(this,arguments);}
 Scene_TuYen.prototype=Object.create(Scene_Base.prototype);Scene_TuYen.prototype.constructor=Scene_TuYen;
 Scene_TuYen.prototype.create=function(){Scene_Base.prototype.create.call(this);this.panel=document.createElement('section');this.panel.className='encounter';this.panel.setAttribute('role','dialog');this.panel.setAttribute('aria-modal','true');this.panel.setAttribute('aria-label','Kỳ ngộ Thanh Khê');document.body.appendChild(this.panel);this.panel.addEventListener('keydown',function(e){
 if(e.key==='Tab'){var nodes=Array.prototype.slice.call(this.querySelectorAll('button:not(:disabled),summary'));var first=nodes[0],last=nodes[nodes.length-1];if(e.shiftKey&&document.activeElement===first){last.focus();e.preventDefault();}else if(!e.shiftKey&&document.activeElement===last){first.focus();e.preventDefault();}}
 });this.render();};
 Scene_TuYen.prototype.render=function(){
  var self=this,s=state(),ch=chapters[s.stage],age=$gameVariables.value(1);
  this.panel.innerHTML='<div class="encounter-wrap"><header><span>KỲ NGỘ THANH KHÊ</span><button type="button" class="close">Trở về game</button></header><div class="encounter-hero"><img src="img/pictures/WD_4.webp" alt="Lạc Tử Yên mặc áo tím"><div><small>Truyện phụ sáng tác thêm</small><h1>Lạc Tử Yên</h1><p class="relation"></p></div></div><main><p class="chapter"></p><h2></h2><p class="story"></p><div class="choices"></div><div class="history"><h3>Những việc đã trải qua</h3></div><p class="save-note">Tiến trình đi cùng bản lưu game. Hãy lưu bằng chức năng lưu game sau khi trở về. Một đời mới sẽ bắt đầu lại kỳ ngộ.</p></main></div>';
  this.panel.querySelector('.close').onclick=function(){SceneManager.pop();};
  this.panel.querySelector('.relation').textContent='Quan hệ: '+s.trust+' · Tuổi: '+age;
  this.panel.querySelector('.chapter').textContent=s.done?'ĐÃ HOÀN THÀNH':'CHẶNG '+(s.stage+1)+' / 4 · TỪ '+ch.age+' TUỔI';
  this.panel.querySelector('h2').textContent=s.done?'Một lời hẹn còn lưu':ch.title;
  this.panel.querySelector('.story').textContent=s.done?s.log[s.log.length-1].result:ch.text;
  var choices=this.panel.querySelector('.choices');
  if(!s.done){if(age<ch.age){var p=document.createElement('p');p.className='locked';p.textContent='Tiếp tục cuộc đời trong game. Chặng này mở khi ngươi đủ '+ch.age+' tuổi.';choices.appendChild(p);}
   ch.choices.forEach(function(c,i){var b=document.createElement('button');b.type='button';var title=document.createElement('strong'),hint=document.createElement('span');title.textContent=c.label;hint.textContent=c.hint;b.appendChild(title);b.appendChild(hint);b.disabled=age<ch.age||!!(c.requires&&$gameVariables.value(c.requires[0])<c.requires[1]);b.onclick=function(){if(choose(i))self.render();};choices.appendChild(b);});}
  s.log.slice().reverse().forEach(function(entry){var d=document.createElement('details'),title=document.createElement('summary'),p=document.createElement('p');title.textContent=entry.age+' tuổi · '+entry.title;p.textContent=entry.choice+'. '+entry.result;d.appendChild(title);d.appendChild(p);self.panel.querySelector('.history').appendChild(d);});
  this.panel.querySelector('.close').focus();
 };
 Scene_TuYen.prototype.update=function(){Scene_Base.prototype.update.call(this);if(Input.isTriggered('cancel'))SceneManager.pop();};
 Scene_TuYen.prototype.terminate=function(){if(this.panel)this.panel.remove();Scene_Base.prototype.terminate.call(this);Input.clear();TouchInput.clear();};
 window.WebEncounter={state:state,choose:choose,chapters:chapters,open:function(){
  if(!ready())return 'Hãy bắt đầu cuộc đời và vào màn hình sự kiện trước khi mở Kỳ ngộ.';
  if(!(SceneManager._scene instanceof Scene_Map)||SceneManager.isSceneChanging()||$gameMessage.isBusy())return 'Hãy hoàn tất lời thoại hoặc lựa chọn hiện tại rồi mở Kỳ ngộ.';
  SceneManager.push(Scene_TuYen);return '';
 }};
})();
