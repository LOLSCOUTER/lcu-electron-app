"use client";

import { useEffect, useState } from "react";
import { ChampSelectInfo } from "../../types/common";
import { championIdMap } from "../../types/champion";

const HomePage = () => {
  const [status, setStatus] = useState<ChampSelectInfo>({
    champions: null,
    localCellId: null,
    benchChampionIds: null,
  });

  const [recommendation, setRecommendation] = useState<string[] | null>(null);

  useEffect(() => {
    if (!window.electronAPI) {
      console.log("electronAPI is undefined");
      return;
    }

    const fetchStatus = async () => {
      try {
        const clientStatus = await window.electronAPI.getClientStatus();
        setStatus(clientStatus);
        console.log("LCU 상태 가져오기 성공:", clientStatus);
      } catch (error) {
        console.error("LCU 상태 가져오기 실패:", error);
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const tryPrediction = async () => {
      const selectedNames =
        status.champions?.map((c) => championIdMap[c.championId]) || [];
      const benchNames =
        status.benchChampionIds?.map((id) => championIdMap[id]) || [];

      const allChampions = [...selectedNames, ...benchNames];

      if (allChampions.length >= 5) {
        try {
          const res = await fetch("http://localhost:5001/predict", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ champions: allChampions }),
          });

          const json = await res.json();
          console.log("추천 조합:", json);
          setRecommendation(json.recommendation);
        } catch (err) {
          console.error("추천 요청 실패:", err);
          setRecommendation(null);
        }
      } else {
        setRecommendation(null);
      }
    };

    tryPrediction();
  }, [status]);

  return (
    <div className="space-y-8 mt-6 max-w-md mx-auto bg-gray-900 p-6 rounded-lg shadow-lg">
      {/* 선택된 챔피언들 (셀) */}
      <section className="bg-gray-800 rounded-md p-4 shadow-inner">
        <h3 className="text-blue-400 text-xl font-bold mb-3 border-b border-blue-600 pb-1">
          선택된 챔피언들
        </h3>
        <ul className="list-disc list-inside text-gray-300 space-y-2 max-h-64 overflow-y-auto">
          {status.champions?.map((c, idx) => (
            <li
              key={`cell-${idx}`}
              className="hover:text-white transition-colors"
            >
              셀 <span className="font-semibold text-white">{c.cellId}</span>:
              챔피언{" "}
              <span className="font-bold text-indigo-400">
                {championIdMap[c.championId]}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* 내가 픽한 챔피언 */}
      <section className="bg-gray-800 rounded-md p-4 shadow-inner">
        <h3 className="text-green-400 text-xl font-bold mb-3 border-b border-green-600 pb-1">
          내가 픽한 챔피언
        </h3>
        {status.champions && (
          <p className="ml-2 text-gray-300 font-semibold text-lg">
            챔피언{" "}
            <span className="text-green-300 font-extrabold">
              {
                championIdMap[
                  status.champions.find((c) => c.cellId === status.localCellId)
                    ?.championId ?? 0
                ]
              }
            </span>
          </p>
        )}
      </section>

      {/* 벤치 챔피언들 */}
      <section className="bg-gray-800 rounded-md p-4 shadow-inner">
        <h3 className="text-purple-400 text-xl font-bold mb-3 border-b border-purple-600 pb-1">
          벤치 챔피언
        </h3>
        <ul className="list-disc list-inside text-gray-300 space-y-2 max-h-40 overflow-y-auto">
          {status.benchChampionIds?.map((id, idx) => (
            <li
              className="text-purple-300 font-semibold hover:text-purple-100 transition-colors"
              key={`bench-${idx}`}
            >
              챔피언 ID <span className="font-bold">{championIdMap[id]}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 추천 조합 */}
      <section className="bg-gray-800 rounded-md p-4 shadow-inner">
        <h3 className="text-yellow-300 text-xl font-bold mb-3 border-b border-yellow-400 pb-1">
          추천 조합
        </h3>
        {recommendation && recommendation.length > 0 ? (
          <ul className="list-disc list-inside text-gray-100 space-y-2">
            {recommendation.map((name, idx) => (
              <li key={`rec-${idx}`} className="text-white font-semibold">
                - {name}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400 italic">추천 조합을 계산 중입니다...</p>
        )}
      </section>
    </div>
  );
};

export default HomePage;
