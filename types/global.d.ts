import { ChampSelectInfo } from "./common";

export {};

declare global {
  interface Window {
    electronAPI: {
      getClientStatus: () => Promise<ChampSelectInfo>;
    };
  }
}
