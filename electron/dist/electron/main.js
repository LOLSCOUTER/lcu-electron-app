"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const lcuWatcher_1 = require("./lcuWatcher");
let mainWindow = null;
function createWindow() {
    mainWindow = new electron_1.BrowserWindow({
        width: 1280,
        height: 800,
        webPreferences: {
            preload: path_1.default.join(__dirname, "/preload.js"),
            contextIsolation: true,
            nodeIntegration: false,
            sandbox: false,
        },
    });
    console.log(__dirname);
    if (!electron_1.app.isPackaged) {
        mainWindow.loadURL("http://localhost:3000");
    }
    else {
        mainWindow.loadFile(path_1.default.join(__dirname, "../../../out/index.html"));
    }
}
electron_1.app.whenReady().then(createWindow);
electron_1.app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        electron_1.app.quit();
    }
});
// Riot lockfile 내용 반환
electron_1.ipcMain.handle("get-lockfile", () => {
    const lockfilePath = path_1.default.join(process.env.LOCALAPPDATA || "", "Riot Games/Riot Client/Config/lockfile");
    return fs_1.default.readFileSync(lockfilePath, "utf8");
});
// LCU 상태 확인 요청 핸들러 (2초마다 클라이언트가 호출)
electron_1.ipcMain.handle("get-client-status", async () => {
    console.log("[GET] client-status");
    return await (0, lcuWatcher_1.getClientStatus)();
});
