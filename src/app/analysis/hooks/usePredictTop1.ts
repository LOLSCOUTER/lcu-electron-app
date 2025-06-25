"use client";

import { useEffect, useState } from "react";

interface Top1Request {
  fixed: string[];
  candidates: string[];
}

export interface Top1Result {
  champion: string;
  winrate: number;
}

interface Top1Response {
  error?: string;
}

export const usePredictTop1 = (fixed: string[], candidates: string[]) => {
  const [result, setResult] = useState<Top1Result[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!fixed || !candidates) return;
    if (fixed.length >= 5 || candidates.length === 0) {
      setError("고정 챔피언은 5미만, 후보는 최소 1개 이상이어야 합니다.");
      setResult(null);
      return;
    }

    const fetchTop1 = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/predict/top1`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fixed, candidates }),
            cache: "no-store",
          }
        );

        const data: Top1Response & Top1Result[] = await res.json();

        if (!res.ok || (data as any).error) {
          setError((data as any).error || "예측 실패");
          setResult(null);
        } else if (Array.isArray(data) && data.length > 0) {
          setResult(data);
        } else {
          setResult(null);
        }
      } catch {
        setError("네트워크 오류");
        setResult(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTop1();
  }, [fixed, candidates]);

  return { result, loading, error };
};
