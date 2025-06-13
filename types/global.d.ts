import { ChampSelectInfo } from "./common";

export {};

declare global {
  interface Window {
    electronAPI: {
      setupLCUWatcher: () => void;
      onChampSelectUpdate: (
        cb: (session: ChampSelectInfo | null) => void
      ) => void;
      onLCUStatus: (cb: (connected: boolean) => void) => void;
    };
  }
}
