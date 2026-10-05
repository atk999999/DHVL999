const game=document.getElementById('game');
const fullscreen=document.getElementById('fullscreen');
if(!document.fullscreenEnabled) fullscreen.hidden=true;
fullscreen.addEventListener('click',async()=>{try{await document.documentElement.requestFullscreen();game.focus()}catch{fullscreen.textContent='Không hỗ trợ'}});
game.addEventListener('load',()=>game.focus());
if(document.modelContext?.registerTool){try{Promise.resolve(document.modelContext.registerTool({name:'read_game_state',title:'Xem trạng thái trò chơi',description:'Đọc bản đồ và tuổi nhân vật hiện tại mà không thay đổi tiến trình.',inputSchema:{type:'object',properties:{},additionalProperties:false},annotations:{readOnlyHint:true},execute(input){if(!input||typeof input!=='object'||Object.keys(input).length)throw new Error('Không nhận tham số');const w=game.contentWindow;return{ready:!!w.$gameMap,map:w.$gameMap?.mapId()??null,age:w.$gameVariables?.value(1)??null}}})).catch(()=>{})}catch{}}

document.getElementById('encounter').addEventListener('click',()=>{const api=game.contentWindow.WebEncounter;const message=api?api.open():'Game đang tải, vui lòng chờ.';if(message)window.alert(message);});

document.getElementById('ancient-gear').addEventListener('click',()=>{const api=game.contentWindow.WebAncientEquipment;const message=api?api.open():'Game đang tải, vui lòng chờ.';if(message)window.alert(message);});
