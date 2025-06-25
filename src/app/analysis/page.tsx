"use client";

import TeamComposition from "./components/TeamComposition";
import BenchChampions from "./components/BenchChampions";
import { AlertCircle } from "lucide-react";
import { useLCUStatus } from "@/context/LCUStatusProvider";
import { usePredictTop1 } from "./hooks/usePredictTop1";
import { usePredictTop5 } from "./hooks/usePredictTop5";
import { championIdMap } from "../../../types/champion";
import { useEffect, useState } from "react";
import { ChampSelectInfo } from "../../../types/common";

// const status: ChampSelectInfo = {
//   benchChampionIds: [221, 56, 28],
//   champions: [
//     { championId: 161, cellId: 0 },
//     { championId: 143, cellId: 1 },
//     { championId: 68, cellId: 2 },
//     { championId: 157, cellId: 3 },
//     { championId: 6, cellId: 4 },
//   ],
//   localCellId: 3,
// };

const Analysis = () => {
  const { status, isConnected } = useLCUStatus();

  const [fixed, setFixed] = useState<string[]>([]);
  const [candidates, setCandidates] = useState<string[]>([]);
  const [pool, setPool] = useState<string[]>([]);

  console.log(status);

  useEffect(() => {
    if (status && status.champions) {
      const localCellId = status.localCellId;
      const fixedIds = status.champions
        .filter((c) => c.cellId !== localCellId)
        .map((c) => c.championId);

      const benchIds = status.benchChampionIds ?? [];
      const candidateIds =
        status.benchChampionIds ??
        []
          .filter((b) => b !== localCellId && !benchIds.includes(b))
          .map((b) => b);

      const poolIds = [...new Set([...fixedIds, ...candidateIds, ...benchIds])];

      setFixed(
        fixedIds
          .map((id) => championIdMap[id]?.[1])
          .filter((name): name is string => !!name)
          .map((n) => n.toLowerCase())
      );
      setCandidates(
        candidateIds
          .map((id) => championIdMap[id]?.[1])
          .filter((name): name is string => !!name)
          .map((n) => n.toLowerCase())
      );
      setPool(
        poolIds
          .map((id) => championIdMap[id]?.[1])
          .filter((name): name is string => !!name)
          .map((n) => n.toLowerCase())
      );
    }
  }, [status]);

  const {
    result,
    loading: loading1,
    error: error1,
  } = usePredictTop1(fixed, candidates);
  const { results, loading: loading5, error: error5 } = usePredictTop5(pool);

  return (
    <div className="container py-4">
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
          <TeamComposition status={status} />
          <BenchChampions status={status} result={result ?? []} />
        </div>
      </div>
    </div>
  );
};

export default Analysis;
