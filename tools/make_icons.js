// Erzeugt die App-Icons aus tools/icon.html. Aufruf: node tools/make_icons.js
const {chromium}=require('playwright');const path=require('path');const fs=require('fs');
(async()=>{const b=await chromium.launch();const p=await b.newPage();
await p.goto('file://'+path.join(__dirname,'icon.html'));await p.waitForFunction(()=>document.title==='ready');
const data=await p.evaluate(()=>document.getElementById('c').toDataURL('image/png'));
const big=Buffer.from(data.split(',')[1],'base64');const out=path.join(__dirname,'..','icons');fs.mkdirSync(out,{recursive:true});
fs.writeFileSync(path.join(out,'icon-1024.png'),big);
for(const [n,s] of [['icon-512.png',512],['icon-192.png',192],['apple-touch-icon.png',180],['favicon-32.png',32],['profilbild-400.png',400]]){
  const d=await p.evaluate(s=>{const src=document.getElementById('c');const c=document.createElement('canvas');c.width=c.height=s;const g=c.getContext('2d');g.imageSmoothingQuality='high';g.drawImage(src,0,0,s,s);return c.toDataURL('image/png')},s);
  fs.writeFileSync(path.join(out,n),Buffer.from(d.split(',')[1],'base64'))}
await b.close();console.log('ok')})();
