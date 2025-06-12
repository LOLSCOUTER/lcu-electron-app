type Props = {
  autoConnect: boolean;
  setAutoConnect: (v: boolean) => void;
  pollingRate: string;
  setPollingRate: (v: string) => void;
  autoUpdate: boolean;
  setAutoUpdate: (v: boolean) => void;
  pollingRates: string[];
};

const GameSettings = ({
  autoConnect,
  setAutoConnect,
  pollingRate,
  setPollingRate,
  autoUpdate,
  setAutoUpdate,
  pollingRates,
}: Props) => {
  return (
    <section className="bg-zinc-100 dark:bg-zinc-800 rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-4">게임 연동</h2>

      {[
        {
          label: "자동 연결",
          desc: "리그 클라이언트가 실행될 때 자동으로 연결",
          value: autoConnect,
          toggle: () => setAutoConnect(!autoConnect),
        },
        {
          label: "모델 자동 업데이트",
          desc: "추천 모델 자동 업데이트",
          value: autoUpdate,
          toggle: () => setAutoUpdate(!autoUpdate),
        },
      ].map(({ label, desc, value, toggle }) => (
        <div key={label} className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm font-medium">{label}</p>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">{desc}</p>
          </div>
          <button
            onClick={toggle}
            className={`w-12 h-6 rounded-full flex items-center px-1 cursor-pointer ${
              value ? "bg-red-500 justify-end" : "bg-zinc-600 justify-start"
            }`}
          >
            <div className="w-4 h-4 bg-white rounded-full shadow-md" />
          </button>
        </div>
      ))}

      {/* 필링 속도 */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium">필링 속도</p>
          <p className="text-xs text-zinc-600 dark:text-zinc-400">
            챔피언 업데이트를 확인하는 빈도 (초)
          </p>
        </div>
        <select
          value={pollingRate}
          onChange={(e) => setPollingRate(e.target.value)}
          className="bg-zinc-200 dark:bg-zinc-700 text-sm rounded-md px-2 py-1 text-black dark:text-white"
        >
          {pollingRates.map((rate) => (
            <option key={rate}>{rate}</option>
          ))}
        </select>
      </div>
    </section>
  );
};

export default GameSettings;
