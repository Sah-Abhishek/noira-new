
// Minimal service worker just to make PWA installable
self.addEventListener("install", (event) => {
  console.log("Service Worker installed");
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker activated");
});

// Required for installability in Chrome
self.addEventListener("fetch", () => { });
