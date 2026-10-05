const http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const root=path.join(__dirname,'dist');
const types={'.html':'text/html; charset=utf-8','.js':'application/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.css':'text/css','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.ogg':'audio/ogg','.m4a':'audio/mp4','.woff2':'font/woff2','.ttf':'font/ttf'};
http.createServer((req,res)=>{
 if(!['GET','HEAD'].includes(req.method)){res.writeHead(405);return res.end();}
 let file;try{let url=decodeURIComponent(new URL(req.url,'http://localhost').pathname);file=path.resolve(root,'.'+url);if(!file.startsWith(root+path.sep)&&file!==root)throw Error();if(fs.statSync(file).isDirectory())file=path.join(file,'index.html');if(!fs.statSync(file).isFile())throw Error();}catch{res.writeHead(404);return res.end('Not found');}
 res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Content-Length':fs.statSync(file).size});if(req.method==='HEAD')return res.end();fs.createReadStream(file).pipe(res);
}).listen(Number(process.env.PORT)||3000,'0.0.0.0',()=>console.log('Game ready on port '+(process.env.PORT||3000)));
