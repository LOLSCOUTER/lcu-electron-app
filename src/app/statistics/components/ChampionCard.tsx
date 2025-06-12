import Image from "next/image";

interface ChampionCardProps {
  index: number;
  name: string;
  winRate: number;
  games: number;
  imageUrl: string;
}

export const ChampionCard = ({
  index,
  name,
  winRate,
  games,
  imageUrl,
}: ChampionCardProps) => {
  return (
    <div className="flex items-center gap-2 p-2 rounded-lg bg-card/50">
      <div className="relative">
        <div className="w-8 h-8 rounded-md bg-card flex items-center justify-center overflow-hidden">
          <Image
            src={imageUrl}
            alt={name}
            width={32}
            height={32}
            className="rounded-md"
          />
        </div>
        <div className="absolute -top-1 -left-1 bg-salmon-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
          {index + 1}
        </div>
      </div>
      <div>
        <div className="text-xs font-medium">{name}</div>
        <div className="flex items-center justify-between">
          <div className="text-xs text-muted-foreground">
            {(games / 1000).toFixed(1)}K
          </div>
          <div className="bg-salmon-500 hover:bg-salmon-600 text-xs py-0 px-1.5">
            {winRate}%
          </div>
        </div>
        <progress value={winRate} className="h-1 mt-1" />
      </div>
    </div>
  );
};
