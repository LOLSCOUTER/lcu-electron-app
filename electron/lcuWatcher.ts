import { createWebSocketConnection } from "league-connect";
import { ChampSelectInfo, ChampionInfo } from "../types/common";

export async function getClientStatus(): Promise<ChampSelectInfo> {
  return new Promise(async (resolve) => {
    const ws = await createWebSocketConnection({
      authenticationOptions: {
        awaitConnection: true,
      },
    });

    console.log("[SUBSCRIBE] /lol-champ-select/v1/session");
    ws.subscribe("/lol-champ-select/v1/session", (data: any) => {
      if (!data) return;

      console.log(data);

      const localCellId = data.localPlayerCellId;

      const champions: ChampionInfo[] = data.myTeam.map(
        (player: ChampionInfo) => ({
          championId: player.championId,
          cellId: player.cellId,
        })
      );

      const benchChampionIds = data.benchChampions.map(
        (champ: any) => champ.championId
      );

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
