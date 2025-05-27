import { contextBridge, ipcRenderer } from "electron";
import { ChampSelectInfo } from "../types/common";

console.log("[preload] preload script loaded");

contextBridge.exposeInMainWorld("electronAPI", {
  getClientStatus: (): Promise<ChampSelectInfo> =>
    ipcRenderer.invoke("get-client-status"),
});
