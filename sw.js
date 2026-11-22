// Service Worker der GGG Park App: hält die App offline startfähig.
// Reservierungen kommen immer frisch aus dem Netz (Supabase wird nie gecacht).
const VERSION="ggg-park-v1";
const FILES=["./","index.html","config.js","manifest.webmanifest","vendor/three.min.js",
  "icons/icon-192.png","icons/icon-512.png","icons/apple-touch-icon.png","icons/favicon-32.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(VERSION).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==VERSION).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
  const u=new URL(e.request.url);
  if(e.request.method!=="GET"||u.origin!==location.origin)return;
  // Seite und Einstellungen: erst Netz, dann Cache. Rest: erst Cache.
  const fresh=e.request.mode==="navigate"||u.pathname.endsWith("config.js");
  if(fresh){e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(VERSION).then(x=>x.put(e.request,c));return r}).catch(()=>caches.match(e.request).then(r=>r||caches.match("index.html"))));return}
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
});
