import Image from "next/image";
import { championIdMap } from "../../../../types/champion";

interface Champion {
  id: number;
  name: string;
  image: string;
  type: string;
  summonerName: string;
  isMe: boolean;
}

interface TeamCompositionProps {
  teamComposition: Champion[];
  typeToKorean: Record<string, string>;
}

const TeamComposition = ({
  teamComposition,
  typeToKorean,
}: TeamCompositionProps) => {
  console.log(`${process.env.CHAMP_IMG_BASE_URL}/${championIdMap[1][1]}`);
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
          {teamComposition.map((champion) => (
            <div
              key={champion.id}
              className={`flex items-center gap-3 p-2 rounded-lg ${
                champion.isMe
                  ? "bg-red-100 border border-red-400"
                  : "bg-zinc-100 dark:bg-zinc-700"
              }`}
            >
              <div className="relative w-12 h-12 rounded-md bg-gray-200 flex items-center justify-center overflow-hidden">
                <Image
                  src={`${process.env.CHAMP_IMG_BASE_URL}/${
                    championIdMap[champion.id][1]
                  }.png`}
                  alt={champion.name}
                  width={48}
                  height={48}
                  className="rounded-md"
                  priority
                />
              </div>
              <div className="flex-1">
                <div className="font-medium flex items-center gap-2 text-sm">
                  {champion.name}
                  {champion.isMe && (
                    <span className="bg-red-400 text-white rounded px-2 py-0.5 text-xs font-semibold">
                      나
                    </span>
                  )}
                </div>
                {champion.type && (
                  <div className="text-xs text-red-500">
                    {typeToKorean[champion.type] || champion.type}
                  </div>
                )}
                <div className="text-xs text-gray-600">
                  {champion.summonerName}
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
