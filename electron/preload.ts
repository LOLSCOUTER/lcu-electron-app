import { contextBridge, ipcRenderer } from "electron";
import { ChampSelectInfo } from "../types/common";

contextBridge.exposeInMainWorld("electronAPI", {
  setupLCUWatcher: () => ipcRenderer.send("setup-lcu-watcher"),

  onChampSelectUpdate: (cb: (session: ChampSelectInfo | null) => void) =>
    ipcRenderer.on("champ-select-update", (_e, data) => cb(data)),

  onLCUStatus: (cb: (connected: boolean) => void) =>
    ipcRenderer.on("lcu-status", (_e, v) => cb(v)),
});
