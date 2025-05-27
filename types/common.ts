export interface ChampSelectInfo {
  champions: ChampionInfo[] | null;
  localCellId: number | null;
  benchChampionIds: number[] | null;
}

export interface ChampionInfo {
  championId: number; // 챔피언 고유 ID
  cellId: number; // 챔피언 픽 위치 (셀 ID)
}
