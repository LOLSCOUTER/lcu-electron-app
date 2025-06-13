"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupLCUWatcher = void 0;
const league_connect_1 = require("league-connect");
let ws = null;
let client;
let latestSession = null;
const setupLCUWatcher = async (win) => {
    const creds = await (0, league_connect_1.authenticate)({
        awaitConnection: true,
        pollInterval: 1000,
    });
    client = new league_connect_1.LeagueClient(creds, { pollInterval: 1000 });
    client.start();
    console.log("[Client Start]");
    win.webContents.on("did-finish-load", () => {
        client.on("connect", () => win.webContents.send("lcu-status", true));
        client.on("disconnect", () => {
            ws?.close();
            win.webContents.send("lcu-status", false);
        });
        subscribeChampSelect(win);
    });
    await initWebSocket();
};
exports.setupLCUWatcher = setupLCUWatcher;
async function initWebSocket() {
    if (ws)
        return;
    ws = await (0, league_connect_1.createWebSocketConnection)({
        authenticationOptions: { awaitConnection: true },
        pollInterval: 1000,
        maxRetries: -1,
    });
    console.log("[Init Socket]");
}
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
        console.log(latestSession);
        win.webContents.send("champ-select-update", latestSession);
    });
}
