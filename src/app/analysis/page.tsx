import TeamComposition from "./components/TeamComposition";
import BenchChampions from "./components/BenchChampions";
import { AlertCircle } from "lucide-react";

const typeToKorean: Record<string, string> = {
  Burst: "버스트",
  "Bruiser AP": "AP 브루저",
  "DPS Marksman": "원거리 딜러",
  Poke: "포크",
  "Bruiser AD": "AD 브루저",
  "Assassin AD": "AD 암살자",
  "Sustain Mage": "지속 마법사",
  "Utility Support": "유틸 서포터",
  "CC Tank": "CC 탱커",
  "Sustain Tank": "지속 탱커",
};

const teamComposition = [
  {
    id: 1,
    name: "럭스",
    selected: true,
    image: "/champions/lux.png",
    type: "Burst",
    summonerName: "소환사1",
    isMe: false,
  },
  {
    id: 2,
    name: "이즈리얼",
    selected: true,
    image: "/champions/ezreal.png",
    type: "Poke",
    summonerName: "소환사2",
    isMe: false,
  },
  {
    id: 3,
    name: "레오나",
    selected: true,
    image: "/champions/leona.png",
    type: "CC Tank",
    summonerName: "소환사3",
    isMe: false,
  },
  {
    id: 4,
    name: "다리우스",
    selected: true,
    image: "/champions/darius.png",
    type: "Bruiser AD",
    summonerName: "소환사4",
    isMe: false,
  },
  {
    id: 5,
    name: "가렌",
    selected: true,
    image: "/champions/garen.png",
    type: "Bruiser AD",
    summonerName: "소환사5",
    isMe: true,
  },
];

const benchChampions = [
  {
    id: 1,
    name: "아무무",
    image: "/champions/amumu.png",
    type: "CC Tank",
    score: 95,
    recommended: true,
  },
  {
    id: 2,
    name: "세주아니",
    image: "/champions/sejuani.png",
    type: "CC Tank",
    score: 90,
    recommended: false,
  },
  {
    id: 3,
    name: "자크",
    image: "/champions/zac.png",
    type: "CC Tank",
    score: 85,
    recommended: false,
  },
  {
    id: 4,
    name: "말파이트",
    image: "/champions/malphite.png",
    type: "CC Tank",
    score: 80,
    recommended: false,
  },
  {
    id: 5,
    name: "카직스",
    image: "/champions/khazix.png",
    type: "Assassin AD",
    score: 65,
    recommended: false,
  },
  {
    id: 5,
    name: "카직스",
    image: "/champions/khazix.png",
    type: "Assassin AD",
    score: 65,
    recommended: false,
  },
  {
    id: 5,
    name: "카직스",
    image: "/champions/khazix.png",
    type: "Assassin AD",
    score: 65,
    recommended: false,
  },
  {
    id: 5,
    name: "카직스",
    image: "/champions/khazix.png",
    type: "Assassin AD",
    score: 65,
    recommended: false,
  },
  {
    id: 5,
    name: "카직스",
    image: "/champions/khazix.png",
    type: "Assassin AD",
    score: 65,
    recommended: false,
  },
  {
    id: 5,
    name: "카직스",
    image: "/champions/khazix.png",
    type: "Assassin AD",
    score: 65,
    recommended: false,
  },
  {
    id: 5,
    name: "카직스",
    image: "/champions/khazix.png",
    type: "Assassin AD",
    score: 65,
    recommended: false,
  },
];

const Analysis = () => {
  const isConnected = false;

  return (
    <div className="container py-4 h-[calc(100vh-4rem)]">
      <div className="grid gap-4 h-full">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              칼바람나락 분석
            </h1>
            <p className="text-sm text-muted-foreground">
              팀 구성에 기반한 실시간 챔피언 추천
            </p>
          </div>
        </div>

        {!isConnected && (
          <div className="bg-card border border-destructive/50 rounded-md p-3 flex items-start gap-3 text-destructive">
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold">연결되지 않음</p>
              <p className="text-xs">
                라이엇 클라이언트가 감지되지 않았습니다. 리그 오브 레전드
                클라이언트가 실행 중인지 확인해주세요.
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 flex-1 overflow-hidden">
          <TeamComposition
            teamComposition={teamComposition}
            typeToKorean={typeToKorean}
          />
          <BenchChampions
            benchChampions={benchChampions}
            typeToKorean={typeToKorean}
          />
        </div>
      </div>
    </div>
  );
};

export default Analysis;
