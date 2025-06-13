"use client";

import { TopChampionSection } from "./components/TopChampionSection";

export default function StatisticsPage() {
  // 분류별 챔피언 승률 데이터
  const topChampionsByType = {
    "Utility Support": [
      {
        id: 37,
        name: "소나",
        winRate: 58.7,
        image: "/champions/sona.png",
        games: 12500,
      },
      {
        id: 147,
        name: "세라핀",
        winRate: 57.2,
        image: "/champions/seraphine.png",
        games: 10800,
      },
      {
        id: 26,
        name: "질리언",
        winRate: 56.5,
        image: "/champions/zilean.png",
        games: 8900,
      },
      {
        id: 26,
        name: "질리언",
        winRate: 56.5,
        image: "/champions/zilean.png",
        games: 8900,
      },
      {
        id: 100,
        name: "질리언",
        winRate: 56.5,
        image: "/champions/zilean.png",
        games: 8900,
      },
    ],
    "CC Tank": [
      {
        id: 26,
        name: "아무무",
        winRate: 57.5,
        image: "/champions/amumu.png",
        games: 9800,
      },
      {
        id: 26,
        name: "오른",
        winRate: 56.8,
        image: "/champions/ornn.png",
        games: 8500,
      },
      {
        id: 26,
        name: "세주아니",
        winRate: 55.9,
        image: "/champions/sejuani.png",
        games: 7600,
      },
      {
        id: 26,
        name: "오른",
        winRate: 56.8,
        image: "/champions/ornn.png",
        games: 8500,
      },
      {
        id: 26,
        name: "세주아니",
        winRate: 55.9,
        image: "/champions/sejuani.png",
        games: 7600,
      },
    ],
    "DPS Marksman": [
      {
        id: 26,
        name: "진",
        winRate: 56.3,
        image: "/champions/jhin.png",
        games: 14200,
      },
      {
        id: 26,
        name: "카이사",
        winRate: 55.7,
        image: "/champions/kaisa.png",
        games: 15800,
      },
      {
        id: 26,
        name: "징크스",
        winRate: 54.9,
        image: "/champions/jinx.png",
        games: 12600,
      },
      {
        id: 26,
        name: "카이사",
        winRate: 55.7,
        image: "/champions/kaisa.png",
        games: 15800,
      },
      {
        id: 26,
        name: "징크스",
        winRate: 54.9,
        image: "/champions/jinx.png",
        games: 12600,
      },
    ],
    Burst: [
      {
        id: 26,
        name: "베이가",
        winRate: 55.8,
        image: "/champions/veigar.png",
        games: 11200,
      },
      {
        id: 26,
        name: "브랜드",
        winRate: 55.1,
        image: "/champions/brand.png",
        games: 10500,
      },
      {
        id: 26,
        name: "아리",
        winRate: 54.5,
        image: "/champions/ahri.png",
        games: 9800,
      },
      {
        id: 26,
        name: "브랜드",
        winRate: 55.1,
        image: "/champions/brand.png",
        games: 10500,
      },
      {
        id: 26,
        name: "아리",
        winRate: 54.5,
        image: "/champions/ahri.png",
        games: 9800,
      },
    ],
    "Bruiser AD": [
      {
        id: 26,
        name: "다리우스",
        winRate: 54.7,
        image: "/champions/darius.png",
        games: 12100,
      },
      {
        id: 26,
        name: "가렌",
        winRate: 54.1,
        image: "/champions/garen.png",
        games: 13500,
      },
      {
        id: 26,
        name: "야스오",
        winRate: 53.5,
        image: "/champions/yasuo.png",
        games: 14800,
      },
      {
        id: 26,
        name: "야스오",
        winRate: 53.5,
        image: "/champions/yasuo.png",
        games: 14800,
      },
      {
        id: 26,
        name: "다리우스",
        winRate: 54.7,
        image: "/champions/darius.png",
        games: 12100,
      },
    ],
  };

  return (
    <div className="container py-4 h-[calc(100vh-4rem)]">
      <div className="grid gap-4 h-full">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">칼바람나락 통계</h1>
          <p className="text-sm text-muted-foreground">
            승률 기반 챔피언 및 조합 통계
          </p>
        </div>
        <div className="gap-4 overflow-hidden">
          <TopChampionSection topChampionsByType={topChampionsByType} />
        </div>
      </div>
    </div>
  );
}
