"use client";

import { useEffect, useState } from "react";

interface Top5Request {
  pool: string[];
}

interface Top5Result {
  team: string[];
  winrate: number;
}

interface Top5Response {
  error?: string;
}

export const usePredictTop5 = (pool: string[]) => {
  const [results, setResults] = useState<Top5Result[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!pool || pool.length < 5 || pool.length > 15) {
      setError("챔피언 풀은 5~15개 사이여야 합니다.");
      setResults(null);
      return;
    }

    const fetchTop5 = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/predict/top5`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ pool }),
            cache: "no-store",
          }
        );

        const data: Top5Response & Top5Result[] = await res.json();

        if (!res.ok || (data as any).error) {
          setError((data as any).error || "예측 실패");
          setResults(null);
        } else if (Array.isArray(data)) {
          setResults(data);
        } else {
          setResults(null);
        }
      } catch {
        setError("네트워크 오류");
        setResults(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTop5();
  }, [pool]);

  return { results, loading, error };
};
