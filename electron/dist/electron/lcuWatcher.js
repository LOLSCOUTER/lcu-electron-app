"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClientStatus = getClientStatus;
const league_connect_1 = require("league-connect");
async function getClientStatus() {
    return new Promise(async (resolve) => {
        const ws = await (0, league_connect_1.createWebSocketConnection)({
            authenticationOptions: {
                awaitConnection: true,
            },
        });
        console.log("[SUBSCRIBE] /lol-champ-select/v1/session");
        ws.subscribe("/lol-champ-select/v1/session", (data) => {
            if (!data)
                return;
            console.log(data);
            const localCellId = data.localPlayerCellId;
            const champions = data.myTeam.map((player) => ({
                championId: player.championId,
                cellId: player.cellId,
            }));
            const benchChampionIds = data.benchChampions.map((champ) => champ.championId);
            console.log(localCellId);
            console.log(champions);
            console.log(benchChampionIds);
            resolve({
                champions: champions,
                localCellId: localCellId,
                benchChampionIds: benchChampionIds,
            });
            ws.close();
        });
    });
}
