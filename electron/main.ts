import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import fs from "fs";
import { getClientStatus } from "./lcuWatcher";

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

  console.log(__dirname);

  if (!app.isPackaged) {
    mainWindow.loadURL("http://localhost:3000");
  } else {
    mainWindow.loadFile(path.join(__dirname, "../../../out/index.html"));
  }
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// Riot lockfile 내용 반환
ipcMain.handle("get-lockfile", () => {
  const lockfilePath = path.join(
    process.env.LOCALAPPDATA || "",
    "Riot Games/Riot Client/Config/lockfile"
  );
  return fs.readFileSync(lockfilePath, "utf8");
});

// LCU 상태 확인 요청 핸들러 (2초마다 클라이언트가 호출)
ipcMain.handle("get-client-status", async () => {
  console.log("[GET] client-status");
  return await getClientStatus();
});
