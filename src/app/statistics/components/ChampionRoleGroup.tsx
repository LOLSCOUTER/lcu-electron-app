import { championIdMap } from "../../../../types/champion";
import { ChampionCard } from "./ChampionCard";

interface Champion {
  id: number;
  name: string;
  winRate: number;
  games: number;
}

interface ChampionRoleGroupProps {
  type: string;
  champions: Champion[];
}

const typeToKorean = {
  Burst: "폭발",
  "Bruiser AP": "브루저(AP)",
  "DPS Marksman": "딜러(원거리)",
  Poke: "포킹",
  "Bruiser AD": "브루저(AD)",
  "Assassin AD": "암살자(AD)",
  "Sustain Mage": "지속 피해(마법)",
  "Utility Support": "유틸 지원",
  "CC Tank": "군중 제어 탱커",
  "Sustain Tank": "지속 탱커",
} as const;

export const ChampionRoleGroup = ({
  type,
  champions,
}: ChampionRoleGroupProps) => {
  return (
    <div className="p-3 rounded-lg bg-secondary/50">
      <div className="font-medium text-sm mb-2">
        {typeToKorean[type as keyof typeof typeToKorean] ?? "알 수 없는 타입"}{" "}
        챔피언 승률
      </div>
      <div className="grid grid-cols-5 gap-2">
        {champions.map((champion, index) => (
          <ChampionCard
            key={index}
            index={index}
            name={champion.name}
            winRate={champion.winRate}
            games={champion.games}
            imageUrl={`${process.env.NEXT_PUBLIC_CHAMP_IMG_BASE_URL}/${
              championIdMap[champion.id]?.[1] ?? "Annie"
            }.png`}
          />
        ))}
      </div>
    </div>
  );
};
