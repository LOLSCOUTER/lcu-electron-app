import {
  authenticate,
  createWebSocketConnection,
  Credentials,
  LeagueClient,
  LeagueWebSocket,
} from "league-connect";
import { ChampSelectInfo } from "../types/common";

let ws: LeagueWebSocket | null = null;
let client: LeagueClient;
let latestSession: ChampSelectInfo | null = null;

export const setupLCUWatcher = async (win: Electron.BrowserWindow) => {
  win.webContents.on("did-finish-load", async () => {
    const running = await isLCURunning();
    win.webContents.send("lcu-status", running);
  });

  const creds: Credentials = await authenticate({
    awaitConnection: true,
    pollInterval: 1000,
  });

  client = new LeagueClient(creds, { pollInterval: 1000 });
  client.start();

  client.on("connect", async () => {
    console.log("[Client Connected]");
    win.webContents.send("lcu-status", true);
    await setupLCUWatcher(win);
  });

  client.on("disconnect", () => {
    console.log("[Client Disconnected]");
    ws?.close();
    win.webContents.send("lcu-status", false);
  });

  await initWebSocket();
  subscribeChampSelect(win);
};

async function initWebSocket() {
  ws = await createWebSocketConnection({
    authenticationOptions: { awaitConnection: true },
    pollInterval: 1000,
    maxRetries: -1,
  });

  console.log("[Init Socket]");
}

export const isLCURunning = async (): Promise<boolean> => {
  try {
    await authenticate({
      awaitConnection: false,
      pollInterval: 500,
    });
    return true;
  } catch {
    return false;
  }
};

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
