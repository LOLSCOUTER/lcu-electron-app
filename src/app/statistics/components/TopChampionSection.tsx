import { ChampionRoleGroup } from "./ChampionRoleGroup";

interface Champion {
  id: number;
  name: string;
  winRate: number;
  games: number;
}

interface TopChampionSectionProps {
  topChampionsByType: Record<string, Champion[]>;
}

export const TopChampionSection = ({
  topChampionsByType,
}: TopChampionSectionProps) => {
  return (
    <div className="flex flex-col h-full">
      <div className="py-3">
        <div className="text-lg">분류별 챔피언 승률 TOP 3</div>
        <div className="text-xs">역할군별 최고 승률 챔피언</div>
      </div>
      <div className="overflow-auto py-2 px-3">
        <div className="grid gap-3">
          {Object.entries(topChampionsByType).map(([type, champions]) => (
            <ChampionRoleGroup key={type} type={type} champions={champions} />
          ))}
        </div>
      </div>
    </div>
  );
};
