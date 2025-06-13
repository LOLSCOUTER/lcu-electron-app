import {
  authenticate,
  createWebSocketConnection,
  LeagueClient,
  LeagueWebSocket,
} from "league-connect";
import { ChampSelectInfo } from "../types/common";

let ws: LeagueWebSocket | null = null;
let client: LeagueClient;
let latestSession: ChampSelectInfo | null = null;

export const setupLCUWatcher = async (win: Electron.BrowserWindow) => {
  const creds = await authenticate({
    awaitConnection: true,
    pollInterval: 1000,
  });

  client = new LeagueClient(creds, { pollInterval: 1000 });
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

async function initWebSocket() {
  if (ws) return;

  ws = await createWebSocketConnection({
    authenticationOptions: { awaitConnection: true },
    pollInterval: 1000,
    maxRetries: -1,
  });

  console.log("[Init Socket]");
}

function subscribeChampSelect(win: Electron.BrowserWindow) {
  if (!ws) return;

  console.log("[Subscribe lol-champ-select]");

  ws.subscribe("/lol-champ-select/v1/session", (data) => {
    const localCellId = data.localPlayerCellId;
    const champions = data.myTeam.map((p: any) => ({
      championId: p.championId,
      cellId: p.cellId,
    }));

    const bench = data.benchChampions.map((c: any) => c.championId);

    latestSession = { localCellId, champions, benchChampionIds: bench };
    win.webContents.send("champ-select-update", latestSession);
  });
}
