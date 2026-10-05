const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.join(__dirname,'dist');for(const p of ['index.html','game/index.html','game/js/main.js','game/js/plugins.js','game/js/plugins/Web_AncientEquipment.js','game/js/plugins/Web_Immortal.js','game/js/plugins/Web_ImmortalNPC.js'])if(!fs.existsSync(path.join(root,p)))throw Error('Missing '+p);
const c={};vm.runInNewContext(fs.readFileSync(path.join(root,'game/js/plugins.js'),'utf8'),c);for(const p of c.$plugins.filter(p=>p.status)){if(!fs.existsSync(path.join(root,'game/js/plugins',p.name+'.js')))throw Error('Missing plugin '+p.name);}
console.log('Static game validated; publish dist/ with all subdirectories.');
