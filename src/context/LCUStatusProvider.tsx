"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { ChampSelectInfo } from "../../types/common";

interface LCUStatusContextType {
  status: ChampSelectInfo | null;
  isConnected: boolean;
}

const defaultContext: LCUStatusContextType = {
  status: null,
  isConnected: false,
};

const LCUStatusContext = createContext<LCUStatusContextType>(defaultContext);

export function useLCUStatus() {
  return useContext(LCUStatusContext);
}

export function LCUStatusProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<ChampSelectInfo | null>(null);
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    if (window.electronAPI) {
      window.electronAPI.onLCUStatus((status) => {
        console.log("클라이언트 연결상태: " + status);
        setIsConnected(status);
      });

      window.electronAPI.onChampSelectUpdate((data) => {
        console.log("챔프 셀렉 업데이트:", data);
        setStatus(data);
      });
    }
  }, []);

  return (
    <LCUStatusContext.Provider value={{ status, isConnected }}>
      {children}
    </LCUStatusContext.Provider>
  );
}
