type TabSwitcherProps = {
  tabs: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const TabSwitcher = ({ tabs, activeTab, setActiveTab }: TabSwitcherProps) => {
  return (
    <div className="flex w-full max-w-[400px] gap-2 mb-6">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200
            ${
              activeTab === tab
                ? "bg-zinc-200 text-black dark:bg-zinc-700 dark:text-white shadow-sm"
                : "bg-transparent text-zinc-500 hover:text-black hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-800"
            }
          `}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default TabSwitcher;
