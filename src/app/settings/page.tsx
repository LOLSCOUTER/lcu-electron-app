"use client";

import { useState } from "react";

// import TabSwitcher from "./components/TabSwitcher";
import AppearanceSettings from "./components/AppearanceSettings";
import GameSettings from "./components/GameSettings";

// const tabs = ["일반", "알림", "계정"];
const languages = ["한국어", "English", "日本語"];
const pollingRates = ["1초", "3초", "5초"];

const Settings = () => {
  // const [activeTab, setActiveTab] = useState("일반");
  const [language, setLanguage] = useState("한국어");
  const [autoConnect, setAutoConnect] = useState(true);
  const [pollingRate, setPollingRate] = useState("1초");
  const [autoUpdate, setAutoUpdate] = useState(true);

  return (
    <div className="p-8 min-h-screen border-gray-200 text-black transition-colors duration-300 dark:bg-zinc-900 dark:border-gray-700 dark:text-white">
      <h1 className="text-2xl font-bold mb-2 text-black dark:text-white">
        설정
      </h1>
      <p className="text-sm mb-6 text-zinc-600 dark:text-zinc-400">
        LoLScouter 경험을 커스터마이징하세요
      </p>

      {/* <TabSwitcher
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      /> */}

      <div className="space-y-6">
        <AppearanceSettings
          language={language}
          setLanguage={setLanguage}
          languages={languages}
        />
        <GameSettings
          autoConnect={autoConnect}
          setAutoConnect={setAutoConnect}
          pollingRate={pollingRate}
          setPollingRate={setPollingRate}
          autoUpdate={autoUpdate}
          setAutoUpdate={setAutoUpdate}
          pollingRates={pollingRates}
        />
      </div>
    </div>
  );
};

export default Settings;
