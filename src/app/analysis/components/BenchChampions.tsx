import Image from "next/image";
import { championIdMap } from "../../../../types/champion";
import { ChampSelectInfo } from "../../../../types/common";
import { Top1Result } from "../hooks/usePredictTop1";

interface BenchChampionsProps {
  status: ChampSelectInfo | null;
  result: Top1Result[];
  loading?: boolean;
}

const BenchChampions = ({ status, result }: BenchChampionsProps) => {
  return (
    <div className="flex flex-col h-full border rounded-lg bg-zinc-100 dark:bg-zinc-800 shadow p-4 overflow-auto">
      <div className="pb-3 border-b">
        <h2 className="text-lg font-semibold">벤치 챔피언</h2>
        <p className="text-xs text-gray-500">주사위로 나온 챔피언 목록</p>
      </div>
      <div className="flex-1 overflow-auto py-2 px-1 mt-2">
        <div className="flex flex-col gap-2">
          {status?.benchChampionIds?.map((champion, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-3 p-2 rounded-lg ${
                champion === 0
                  ? "bg-red-100 border border-red-400"
                  : "bg-zinc-200 dark:bg-zinc-700"
              }`}
            >
              <div className="w-12 h-12 rounded-md bg-gray-200 flex items-center justify-center overflow-hidden">
                <Image
                  src={`${process.env.NEXT_PUBLIC_CHAMP_IMG_BASE_URL}/${championIdMap[champion][1]}.png`}
                  alt={championIdMap[champion][1]}
                  width={48}
                  height={48}
                  className="rounded-md"
                  priority
                />
              </div>
              <div className="flex-1 grid gap-1">
                <div className="font-medium flex items-center gap-2 text-sm">
                  {championIdMap[champion][0]}
                  {idx === 0 && (
                    <span className="bg-red-400 text-white rounded px-2 py-0.5 text-xs font-semibold">
                      추천
                    </span>
                  )}
                </div>
                <div className="text-xs text-red-500">{"챔피언 타입"}</div>
                <div className="flex items-center gap-2">
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-red-500 rounded-full transition-all"
                      style={{ width: `${result?.[idx]?.winrate ?? 0}%` }}
                    ></div>
                  </div>
                  <span className="text-xs font-medium text-red-500">
                    {result?.[idx]?.winrate ?? 0}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BenchChampions;
