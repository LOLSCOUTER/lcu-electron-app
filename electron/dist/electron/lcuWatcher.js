"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLCURunning = exports.setupLCUWatcher = void 0;
const league_connect_1 = require("league-connect");
let ws = null;
let client;
let latestSession = null;
const setupLCUWatcher = async (win) => {
    win.webContents.on("did-finish-load", async () => {
        const running = await (0, exports.isLCURunning)();
        win.webContents.send("lcu-status", running);
    });
    const creds = await (0, league_connect_1.authenticate)({
        awaitConnection: true,
        pollInterval: 1000,
    });
    client = new league_connect_1.LeagueClient(creds, { pollInterval: 1000 });
    client.start();
    client.on("connect", async () => {
        console.log("[Client Connected]");
        win.webContents.send("lcu-status", true);
        await (0, exports.setupLCUWatcher)(win);
    });
    client.on("disconnect", () => {
        console.log("[Client Disconnected]");
        ws?.close();
        win.webContents.send("lcu-status", false);
    });
    await initWebSocket();
    subscribeChampSelect(win);
};
exports.setupLCUWatcher = setupLCUWatcher;
async function initWebSocket() {
    ws = await (0, league_connect_1.createWebSocketConnection)({
        authenticationOptions: { awaitConnection: true },
        pollInterval: 1000,
        maxRetries: -1,
    });
    console.log("[Init Socket]");
}
const isLCURunning = async () => {
    try {
        await (0, league_connect_1.authenticate)({
            awaitConnection: false,
            pollInterval: 500,
        });
        return true;
    }
    catch {
        return false;
    }
};
exports.isLCURunning = isLCURunning;
function subscribeChampSelect(win) {
    if (!ws)
        return;
    console.log("[Subscribe lol-champ-select]");
    ws.subscribe("/lol-champ-select/v1/session", (data) => {
        const localCellId = data.localPlayerCellId;
        const champions = data.myTeam.map((p) => ({
            championId: p.championId,
            cellId: p.cellId,
        }));
        const bench = data.benchChampions.map((c) => c.championId);
        latestSession = { localCellId, champions, benchChampionIds: bench };
        win.webContents.send("champ-select-update", latestSession);
    });
}
