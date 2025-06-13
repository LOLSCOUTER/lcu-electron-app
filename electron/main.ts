import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { setupLCUWatcher } from "./lcuWatcher";

let mainWindow: BrowserWindow | null = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "/preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
    },
  });

  if (!app.isPackaged) {
    mainWindow.loadURL("http://localhost:3000");
  } else {
    mainWindow.loadFile(path.join(__dirname, "../../../out/index.html"));
  }

  setupLCUWatcher(mainWindow);
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.on("setup-lcu-watcher", async () => {
  if (mainWindow) await setupLCUWatcher(mainWindow);
});
