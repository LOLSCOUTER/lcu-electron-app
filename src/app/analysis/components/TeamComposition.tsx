import Image from "next/image";
import { championIdMap } from "../../../../types/champion";
import { ChampSelectInfo } from "../../../../types/common";

interface TeamCompositionProps {
  status: ChampSelectInfo | null;
}

const TeamComposition = ({ status }: TeamCompositionProps) => {
  return (
    <div className="flex flex-col h-full border rounded-lg bg-zinc-100 dark:bg-zinc-800 shadow p-4">
      <div className="pb-3 border-b">
        <h2 className="text-lg font-semibold">현재 팀 구성</h2>
        <p className="text-xs text-gray-500">
          칼바람나락에서 감지된 현재 챔피언 픽
        </p>
      </div>
      <div className="flex-1 overflow-auto py-2 px-1 mt-2">
        <div className="flex flex-col gap-5">
          {status?.champions?.map((champion, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-3 p-2 rounded-lg ${
                champion.cellId === status.localCellId
                  ? "bg-red-300 border border-red-400"
                  : "bg-zinc-100 dark:bg-zinc-700"
              }`}
            >
              <div className="relative w-12 h-12 rounded-md bg-gray-200 flex items-center justify-center overflow-hidden">
                <Image
                  src={`${process.env.NEXT_PUBLIC_CHAMP_IMG_BASE_URL}/${
                    championIdMap[champion.championId][1]
                  }.png`}
                  alt={championIdMap[champion.championId][0]}
                  width={48}
                  height={48}
                  className="rounded-md"
                  priority
                />
              </div>
              <div className="flex-1">
                <div className="font-medium flex items-center gap-2 text-sm">
                  {champion.championId
                    ? championIdMap[champion.championId][0]
                    : "챔피언"}
                  {champion.cellId === status.localCellId && (
                    <span className="bg-red-400 text-white rounded px-2 py-0.5 text-xs font-semibold">
                      나
                    </span>
                  )}
                </div>
                {/* {champion.type && (
                  <div className="text-xs text-red-500">{champion.type}</div>
                )} */}
                <div className="text-xs text-gray-300">
                  {champion.championId
                    ? championIdMap[champion.championId][1]
                    : "분류"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamComposition;
