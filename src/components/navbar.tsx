"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GearIcon, HomeIcon } from "@radix-ui/react-icons";
import { AlertCircle, BarChart, PieChart, RefreshCw } from "lucide-react";
import clsx from "clsx";
import { useState } from "react";

const Navbar = () => {
  const pathname = usePathname();

  const [isConnected, setIsConnected] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card h-16">
      <div className="container flex h-full items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/home" className="flex items-center gap-2">
            <div className="rounded-md bg-salmon-500 p-1">
              <BarChart className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold">LoLScouter</span>
          </Link>
          <nav className="flex gap-6">
            <Link
              href="/home"
              className={clsx(
                "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary",
                pathname.startsWith("/home")
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              <HomeIcon className="h-4 w-4" />홈
            </Link>
            <Link
              href="/analysis"
              className={clsx(
                "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary",
                pathname.startsWith("/analysis")
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              <BarChart className="h-4 w-4" />
              분석
            </Link>
            <Link
              href="/statistics"
              className={clsx(
                "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary",
                pathname.startsWith("/statistics")
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              <PieChart className="h-4 w-4" />
              통계
            </Link>
            <Link
              href="/settings"
              className={clsx(
                "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary",
                pathname.startsWith("/settings")
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              <GearIcon className="h-4 w-4" />
              설정
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          {isConnected ? (
            <div className="bg-green-600 hover:bg-green-700 flex gap-2 items-center px-3 py-1 rounded text-white text-sm font-semibold">
              <div className="h-2 w-2 rounded-full bg-green-300 animate-pulse"></div>
              연결됨
            </div>
          ) : (
            <div className="bg-red-600 flex gap-2 items-center px-3 py-1 rounded text-white text-sm font-semibold">
              <div className="h-2 w-2 rounded-full bg-red-300 animate-pulse"></div>
              연결 끊김
            </div>
          )}
          <button
            type="button"
            className="inline-flex items-center gap-2 px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 text-sm"
            onClick={() => {
              // 새로고침 동작 (예: 데이터 재요청)
              console.log("새로고침 클릭됨");
            }}
          >
            <RefreshCw className="h-4 w-4" />
            새로고침
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
