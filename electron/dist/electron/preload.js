"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
console.log("[preload] preload script loaded");
electron_1.contextBridge.exposeInMainWorld("electronAPI", {
    getClientStatus: () => electron_1.ipcRenderer.invoke("get-client-status"),
});
