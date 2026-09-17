// Preload script runs in an isolated context before the renderer.
// We expose a tiny, safe API surface — nothing dangerous.
const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('spendwise', {
  platform: process.platform,
  versions: {
    electron: process.versions.electron,
    chrome: process.versions.chrome,
    node: process.versions.node,
  },
  isElectron: true,
});1