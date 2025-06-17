"use client";

import { AlertCircle, BarChart, PieChart } from "lucide-react";
import Card from "./components/Card";
import Step from "./components/Step";
import { useLCUStatus } from "@/context/LCUStatusProvider";

const Home: React.FC = () => {
  const { isConnected } = useLCUStatus();

  return (
    <main className="container py-4 min-h-[calc(100vh-4rem)] flex flex-col">
      <section className="mb-8 grid gap-4">
        <header className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight">
            LoLScouter에 오신 것을 환영합니다
          </h1>
          <p className="text-sm text-muted-foreground">
            리그 오브 레전드 칼바람나락 실시간 챔피언 픽 분석
          </p>
        </header>

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

        <div className="grid gap-4 md:grid-cols-3">
          <Card
            title="챔피언 분석"
            description="팀 구성에 기반한 실시간 추천을 받아보세요"
            icon={<BarChart className="h-16 w-16 text-salmon-500" />}
            href="/analysis"
          />
          <Card
            title="통계 보기"
            description="챔피언 승률과 추천 조합을 확인하세요"
            icon={<PieChart className="h-16 w-16 text-salmon-500" />}
            href="/statistics"
          />
          <Card
            title="설정"
            description="경험과 환경설정을 커스터마이징하세요"
            icon={<div className="text-5xl">⚙️</div>}
            href="/settings"
          />
        </div>
      </section>

      <section className="grid gap-3">
        <header className="flex flex-col gap-1">
          <h2 className="text-xl font-bold tracking-tight">
            칼바람나락 분석기 작동 방식
          </h2>
          <p className="text-sm text-muted-foreground">
            LoLScouter는 실시간으로 팀 구성을 분석하고 챔피언 추천을 제공합니다
          </p>
        </header>

        <div className="grid gap-4 md:grid-cols-3">
          <Step
            number={1}
            title="연결"
            description="LoLScouter는 리그 클라이언트가 실행 중일 때 자동으로 연결됩니다"
          />
          <Step
            number={2}
            title="분석"
            description="챔피언 선택 단계에서 실시간으로 팀의 챔피언 픽을 분석합니다"
          />
          <Step
            number={3}
            title="추천"
            description="짬통에 있는 챔피언 중 팀 구성에 가장 적합한 챔피언을 추천해 드립니다"
          />
        </div>
      </section>
    </main>
  );
};

export default Home;
