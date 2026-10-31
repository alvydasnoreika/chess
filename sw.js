// Ėjimas po ėjimo – service worker: leidžia programai veikti be interneto.
// Pakeitę failus, padidinkite VERSION, kad naršyklės atsisiųstų naują versiją.
const VERSION = "v1";
const CACHE = "ejimas-" + VERSION;
const SHELL = [
  "./",
  "index.html",
  "vendor/chess.js",
  "manifest.webmanifest",
  "icons/icon.svg",
  "icons/icon-192.png",
  "icons/icon-512.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith("ejimas-") && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // Google Fonts: rodom iš talpyklos, fone atnaujinam.
  if (url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com") {
    e.respondWith(
      caches.open(CACHE).then(async (c) => {
        const hit = await c.match(req);
        const net = fetch(req).then((r) => { if (r.ok || r.type === "opaque") c.put(req, r.clone()); return r; }).catch(() => hit);
        return hit || net;
      })
    );
    return;
  }

  if (url.origin !== location.origin) return;

  // Puslapis: pirmiausia tinklas (kad gautumėt naujausią versiją), be interneto – talpykla.
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req).then((r) => { const copy = r.clone(); caches.open(CACHE).then((c) => c.put("index.html", copy)); return r; })
        .catch(() => caches.match("index.html"))
    );
    return;
  }

  // Kiti failai: talpykla, o jei nėra – tinklas.
  e.respondWith(caches.match(req).then((hit) => hit || fetch(req)));
});
