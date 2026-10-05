/* Original post-120 story. State and native choice interpreter serialize with the game. */
(function () {
'use strict';
var KEY='_webImmortalV1';
var realms=['Luyện Khí','Trúc Cơ','Kim Đan','Nguyên Anh','Hóa Thần'];
var thresholds=[80,180,360,600],lifespans=[180,300,600,1200,2400];
function option(label,text,qi,stones,heart){return {label:label,text:text,qi:qi||0,stones:stones||0,heart:heart||0};}
var chapters=[
 {age:120,title:'Tàn Đăng Vấn Đạo',text:'Đêm sinh nhật thứ một trăm hai mươi, ngươi đã viết xong lời từ biệt. Bỗng ngọn đèn trên bàn cháy ngược, soi ra một dòng chữ: Người hết thọ, đạo chưa tận. Một bà lão chèo chiếc thuyền giấy đến trước cửa. Bà tên Mộc Nương, người giữ Bến Vô Sinh. Bà không hứa trường sinh; chỉ hỏi ngươi còn điều gì chưa muốn buông.',choices:[option('Giữ lời hẹn với nhân gian','Ngươi mang theo một nắm đất quê nhà. Mộc Nương trao Tàn Đăng Quyết: dùng ký ức giữ tâm, dùng hơi thở dẫn linh. Mạch khí đầu tiên thức tỉnh; thọ nguyên kéo dài đến 180 tuổi.',20,10,2),option('Tìm chân tướng ngọn đèn','Ngươi giữ lại trang di thư để làm bấc đèn. Trong lửa hiện bóng một thành trì chìm dưới nước. Mộc Nương dặn: đừng tin kẻ nói trường sinh không có giá. Ngươi bước vào Luyện Khí, thọ nguyên 180 tuổi.',25,5,0)]},
 {age:125,title:'Bến Vô Sinh',text:'Bên kia sông, những chiếc thuyền chở tên người thay vì chở khách. Thiếu niên A Tịch mắc kẹt vì không nhớ tên mình. Người coi bến đòi ngươi giao ngọn đèn để đổi đường lên núi. Mộc Nương im lặng: lần này ngươi phải tự quyết.',choices:[option('Dẫn A Tịch cùng qua sông','Ngươi đọc từng cái tên trên thuyền cho đến khi A Tịch bật khóc. Cậu nhớ mình là người đưa thư của thành chìm, trao ngươi mảnh bản đồ khắc trên đồng. Từ đó, cậu đồng hành cùng ngươi.',22,12,3),option('Đổi bản đồ lấy lối đi','Ngươi dò ra dòng nước không có bóng trăng, tự mở đường vượt bến. Người coi bến trả công bằng linh thạch, nhưng A Tịch vẫn ở lại chờ một cái tên.',18,35,-1)]},
 {age:135,title:'Thanh Khuyết Sơn',text:'Tông môn Thanh Khuyết chỉ nhận người trẻ, nhưng chưởng viện Khương Hoài nhận ra ngọn đèn trong tay ngươi. Ông cho phép ngươi ở lại với điều kiện sửa linh trận đã cạn. Dưới chân núi, dân làng đang đào giếng ngày càng sâu.',choices:[option('Dẫn linh khí về giếng làng','Ngươi sửa trận thành hai nhánh. Ruộng làng hồi sinh, còn việc tu luyện của ngươi chậm hơn lời mời của chưởng viện. Một người thợ rèn tặng ngươi hộp linh sa để bù công.',20,20,3),option('Khôi phục trận cho tông môn','Linh trận sáng lại. Khương Hoài cho ngươi đọc phần chú giải Tàn Đăng Quyết bị thất truyền. Trong bản chú có một câu bị gạch: linh mạch không phải vật vô tri.',40,15,0)]},
 {age:150,title:'Bí Cảnh Thành Chìm',text:'Nước hồ rút đúng một đêm, để lộ thành Lưu Quang. Trong kho sách, ngươi biết những người đầu tiên tu Tàn Đăng Quyết đã dùng tuổi thọ dân thành để giữ linh mạch. Một chiếc chuông đồng vẫn vang dưới tầng hầm.',choices:[option('Mở cửa cứu những hồn bị giữ','Ngươi đập khóa trận, dẫn các hồn còn tỉnh đi theo ánh đèn. Trước khi tan đi, họ để lại những đoạn pháp quyết và lời nhắn: kẻ dựng trận vẫn còn sống.',45,20,4),option('Thu hồi lõi trận cổ','Ngươi tháo lõi trận mang về nghiên cứu. Tiếng chuông tắt, nhưng những chiếc bóng không còn lối ra. Trong lõi có tọa độ cánh cửa nằm ngoài ranh giới nhân gian.',55,45,-3)]},
 {age:180,title:'Thư Gửi Người Đã Khuất',text:'Một trăm tám mươi tuổi, ngươi trở về quê cũ. Con đường vẫn đó, người quen chỉ còn trên bia đá. Trong căn nhà cũ có bức thư của hậu nhân: nếu người còn sống, xin đừng lấy cả đời mình chỉ để chạy khỏi cái chết.',choices:[option('Ở lại dựng lại mái nhà','Ngươi dành một mùa truyền võ và sửa cầu. Khi rời đi, đèn cổ sáng dịu; Tàn Đăng Quyết không còn khiến ngươi mất ngủ vì những giọng nói cũ.',35,10,4),option('Mang thư tiếp tục hành trình','Ngươi cất bức thư sát ngực rồi đi. Từ nỗi cô độc, ngươi ngộ ra cách gom linh khí thành một điểm, nhưng hiểu rằng tu vi không thay thế được một lời từ biệt.',55,20,1)]},
 {age:220,title:'Người Giữ Mạch',text:'Khương Hoài thú nhận mình là người sống sót cuối cùng của thành Lưu Quang. Ông muốn tái lập đại trận: đổi một vùng đất lấy linh khí đủ nuôi cả giới tu hành. Mộc Nương từng là người canh trận; bà đã trốn đi vì không chịu nổi tiếng chuông.',choices:[option('Lập lời thề không hiến tế','Ngươi cùng những người ở bến tìm cách phân tán linh mạch. Mộc Nương trao bản trận đồ nguyên vẹn. Từ đây ngươi đứng về phía những người bị bỏ ngoài tiên môn.',70,40,5),option('Giành quyền điều khiển đại trận','Ngươi không giao quyền quyết định cho Khương Hoài. Ông đưa chìa khóa trận để đổi lấy lời hứa giữ linh mạch tồn tại. Ngươi nhận lấy cả sức mạnh lẫn món nợ ấy.',95,70,-4)]},
 {age:300,title:'Đêm Không Có Trăng',text:'Đại trận thức tỉnh sớm. Trên bầu trời, một khe nứt hút linh khí từ từng căn nhà. Ngươi nhận ra ngọn đèn cổ chính là chốt cuối cùng: thắp nó thì cửa tiên mở; dập nó thì trận vỡ, nhưng đường lên cao cũng đứt.',choices:[option('Chia lửa cho người dưới núi','Ngươi phân lửa thành trăm ngọn, nối từng làng thành một trận bảo hộ. Khe trời chưa khép, nhưng không còn ai phải chết thay để giữ nó. Ngươi tìm được con đường thứ ba.',100,50,5),option('Mang ngọn đèn vào khe trời','Ngươi tự bước vào tâm trận, kéo sức hút khỏi nhân gian. Trong bóng tối, ngươi nhìn thấy những kẻ đã bỏ lại thế giới này để trường sinh. Cánh cửa sau lưng vẫn chưa đóng.',130,80,1)]},
 {age:400,title:'Một Ngọn Đèn Cho Người Sau',text:'Sau nhiều năm lần theo các vết nứt, ngươi tìm đến nguồn linh mạch. Ở đó không có tiên đế, chỉ có một hạt giống đang cạn sức vì bị hút linh khí. Mọi lời hứa trường sinh đều bắt đầu từ thứ nhỏ bé này. Ngươi quyết định sẽ để lại điều gì.',choices:[option('Trồng lại hạt giống','Ngươi trả linh khí về đất, để các tiên môn phải học cách tu hành mà không cướp thọ người khác. Ngọn đèn trở thành dấu đường cho những người đến sau.',150,100,6),option('Canh cửa giữa hai cõi','Ngươi giữ hạt giống trong một vùng trời riêng, nhận trách nhiệm mở cửa theo từng mùa linh khí. Tự do của ngươi từ đây gắn với sự bình yên của thế giới bên dưới.',180,120,2)]}
];
function state(){return $gameSystem[KEY]||($gameSystem[KEY]={realm:0,qi:0,stones:0,heart:0,chapter:0,lastYear:119,bonus:[0,0,0,0,0,0,0,0],log:[],pending:null});}
function command(code,parameters,indent){return {code:code,parameters:parameters||[],indent:indent||0};}
function say(list,text,indent){
 var words=text.split(/\s+/),lines=[],line='';words.forEach(function(w){if((line+' '+w).length>43){lines.push(line);line=w;}else line+=(line?' ':'')+w;});if(line)lines.push(line);
 for(var i=0;i<lines.length;i+=4){list.push(command(101,['',0,0,2],indent));lines.slice(i,i+4).forEach(function(l){list.push(command(401,[l],indent));});}
}
function status(s){return realms[s.realm]+' · Tu vi '+s.qi+(s.realm<4?'/'+thresholds[s.realm]:'')+' · Linh thạch '+s.stones+' · Thọ nguyên '+lifespans[s.realm];}
function offer(age,s){
 var ch=chapters[s.chapter];if(ch&&age>=ch.age)return {title:ch.title,text:ch.text,choices:ch.choices,chapter:true};
 if(s.realm<4&&s.qi>=thresholds[s.realm])return {title:'Cửa ải '+realms[s.realm+1],text:'Linh khí đã đủ. Tàn Đăng Quyết chỉ dẫn ngươi thu tâm, vượt cửa ải tiếp theo. Đột phá tiêu hao '+thresholds[s.realm]+' tu vi và mở rộng thọ nguyên; ngươi cũng có thể tiếp tục tích lũy.',choices:[{label:'Đột phá '+realms[s.realm+1],text:'Ngươi vượt qua cửa ải, thân thể và linh hồn cùng đổi mới.',breakthrough:true},option('Củng cố thêm một năm','Ngươi giữ nhịp thở, gia cố kinh mạch để dành cho lần đột phá sau.',12,4,0)]};
 var npc=window.WebImmortalNPC&&WebImmortalNPC.offer(age,s);if(npc)return npc;
 var events=[
 {title:'Mưa Linh Sa',text:'Mưa bụi sáng phủ xuống thung lũng. Một đoàn người hái thuốc không biết mình đang bước vào vùng linh khí hỗn loạn.',choices:[option('Hộ tống người hái thuốc','Ngươi đưa họ ra ngoài; được tặng linh thạch và hiểu thêm cách giữ khí ổn định.',14,12,1),option('Bế quan hấp thu linh sa','Ngươi tìm một hang đá vắng, luyện Tàn Đăng Quyết trọn một mùa.',24,3,0)]},
 {title:'Chợ Đêm Dưới Gốc Tùng',text:'Một người bán sách mang đến bản ghi chú tu luyện. Giá là mười linh thạch; bên cạnh, thương đội đang cần người dẫn đường.',choices:[{label:'Mua bản chú giải (10 linh thạch)',text:'Ngươi đối chiếu chú giải với kinh nghiệm của mình, khai thông một đoạn vận khí.',qi:35,stones:-10,cost:10},option('Dẫn đường cho thương đội','Chuyến đi giúp ngươi tích lũy linh thạch và nhận biết các dấu vết linh mạch.',12,18,0)]},
 {title:'Tiếng Chuông Trong Sương',text:'Trong giấc định, ngươi lại nghe tiếng chuông thành Lưu Quang. Lần này, một giọng nói hỏi ngươi tu đạo để giữ điều gì.',choices:[option('Nhớ những người từng gặp','Ngươi điểm lại từng ân nghĩa, dùng ký ức làm neo giữ đạo tâm.',18,6,2),option('Luyện khí đến bình minh','Ngươi không trả lời, chỉ vận khí cho đến khi tiếng chuông lắng xuống.',26,4,0)]}
 ];return events[(age-120)%events.length];
}
function choose(age,index){
 var s=state(),p=s.pending;if(!p||p.age!==age||s.lastYear>=age)return false;var c=p.offer.choices[index];if(!c||(c.cost&&s.stones<c.cost))return false;
 if(window.WebImmortalNPC&&!WebImmortalNPC.valid(s,c))return false;
 if(window.WebImmortalNPC)WebImmortalNPC.apply(s,c);
 s.qi+=c.qi||0;s.stones+=c.stones||0;s.heart+=c.heart||0;
 if(c.breakthrough){if(s.realm>=4||s.qi<thresholds[s.realm])return false;s.qi-=thresholds[s.realm];s.realm++;var n=s.realm;s.bonus[0]+=10000*n;s.bonus[1]+=2500*n;s.bonus[2]+=1000*n;}
 if(p.offer.chapter){s.chapter++;s.storyHeart=(s.storyHeart||0)+(c.heart||0);}
 var result=c.text;if(c.breakthrough)result+=' '+status(s)+'. Máu, nội lực và công kích đã tăng.';
 if(s.chapter===chapters.length&&p.offer.chapter){s.ending=s.storyHeart>=12?'Đèn soi nhân thế':'Người canh thiên môn';result+=' Kết cục: '+s.ending+'. Hành trình tu luyện vẫn tiếp tục.';}
 s.lastYear=age;s.log.push({age:age,title:p.offer.title,choice:c.label,result:result});s.pending=null;
 $gameVariables.setValue(2,p.offer.title+': '+result);var a=$gameActors.actor(2);a.refresh();a.recoverAll();return true;
}
function year(interpreter){
 var age=$gameVariables.value(1);if(age<120||$gameSwitches.value(5))return;
 var s=state(),list=[];
 if(s.lastYear>=age){finish();return;}
 if(age>=lifespans[s.realm]){
  say(list,'Ngọn đèn khép lại. Ngươi đã sống '+age+' năm, đạt '+realms[s.realm]+'. Thọ nguyên đã tận, nhưng những việc ngươi làm còn ở lại.');
  list.push(command(355,["WebImmortal.endLife();"]));
 }else{
  var offered=offer(age,s);s.pending={age:age,offer:offered};
  say(list,age+' tuổi — '+offered.title+'. '+status(s));say(list,offered.text);
  var choices=offered.choices.map(function(c){return c.cost&&s.stones<c.cost?'Thiếu linh thạch — '+c.label:c.label;});
  // Costly choices use a conditional retry, so selecting them never spends a year for nothing.
  list.push(command(102,[choices,-1,0,2,0]));offered.choices.forEach(function(c,i){list.push(command(402,[i,choices[i]]));
   list.push(command(111,[12,'WebImmortal.choose('+age+','+i+')'],1));
   say(list,c.text,2);list.push(command(355,["WebImmortal.announce();"],2));
   list.push(command(411,[],1));say(list,'Không đủ linh thạch. Năm này chưa kết thúc; hãy chọn lại.',2);
   list.push(command(412,[],1));list.push(command(0,[],1));});list.push(command(404));
  list.push(command(355,['if(WebImmortal.state().lastYear < '+age+'){WebImmortal.year(this);}else{WebImmortal.finish();}']));
 }
 list.push(command(0));interpreter.setupChild(list,interpreter._eventId);
}
function finish(){ $gameScreen.erasePicture(21);$gameScreen.erasePicture(54);if(!$gameSwitches.value(5))$gameScreen.showPicture(9,'Next',0,150,740,100,100,255,0); }
function endLife(){ $gameSwitches.setValue(5,true);$gameVariables.setValue(411,'Tận thọ tiên đạo');$gameVariables.setValue(16,13);$gameScreen.erasePicture(9);$gameScreen.erasePicture(21);$gameScreen.showPicture(10,'End',0,150,740,100,100,255,0); }
var plus=Game_Actor.prototype.paramPlus,max=Game_Actor.prototype.paramMax;
function bonus(actor,id){var s=$gameSystem&&$gameSystem[KEY];return actor.actorId()===2&&s?s.bonus[id]||0:0;}
Game_Actor.prototype.paramPlus=function(id){return plus.call(this,id)+bonus(this,id);};
Game_Actor.prototype.paramMax=function(id){return max.call(this,id)+bonus(this,id);};
// Recover only the old scripted 120-year lifespan ending, never battle deaths.
var startMap=Scene_Map.prototype.start;
Scene_Map.prototype.start=function(){
 startMap.apply(this,arguments);
 var oldEnd=!$gameSystem[KEY] && $gameVariables.value(1)===120 && $gameVariables.value(16)===13 && $gameVariables.value(411)==='thọ cùng trời đất' && $gameSwitches.value(5);
 if(oldEnd && [3,9,10].indexOf($gameMap.mapId())>=0){
  state();$gameSystem._webImmortalResume=true;
  $gameSwitches.setValue(5,false);$gameSwitches.setValue(1,false);
  $gameVariables.setValue(12,190);$gameVariables.setValue(16,0);
  $gameMap._interpreter.clear();$gameTemp.clearCommonEvent();$gameMessage.clear();
  for(var pictureId=1;pictureId<=100;pictureId++)$gameScreen.erasePicture(pictureId);
  if($gameMap.mapId()!==3){$gamePlayer.reserveTransfer(3,5,8,2,0);return;}
 }
 if($gameMap.mapId()===3 && $gameSystem._webImmortalResume){
  delete $gameSystem._webImmortalResume;$gameScreen.startTint([0,0,0,0],1);$gameScreen.startFadeIn(1);
  $gameActors.actor(2).recoverAll();$gameTemp.reserveCommonEvent(190);
 }
};
var begin=OfflineGame.beginRun;OfflineGame.beginRun=function(){begin.apply(this,arguments);if(window.$gameSystem)delete $gameSystem[KEY];};
window.WebImmortal={state:state,choose:choose,year:year,finish:finish,endLife:endLife,chapters:chapters,announce:function(){var s=state();TickerManager.show(status(s)+(s.ending?' · '+s.ending:''));}};
}());
