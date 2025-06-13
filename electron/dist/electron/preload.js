"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld("electronAPI", {
    setupLCUWatcher: () => electron_1.ipcRenderer.send("setup-lcu-watcher"),
    onChampSelectUpdate: (cb) => electron_1.ipcRenderer.on("champ-select-update", (_e, data) => cb(data)),
    onLCUStatus: (cb) => electron_1.ipcRenderer.on("lcu-status", (_e, v) => cb(v)),
});
