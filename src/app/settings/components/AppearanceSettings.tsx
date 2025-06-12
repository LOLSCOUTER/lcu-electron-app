import { useTheme } from "next-themes";

type Props = {
  language: string;
  setLanguage: (lang: string) => void;
  languages: string[];
};

const AppearanceSettings = ({ language, setLanguage, languages }: Props) => {
  const { theme, setTheme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";

  const toggleDarkMode = () => setTheme(isDark ? "light" : "dark");

  return (
    <section className="bg-zinc-100 dark:bg-zinc-800 rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-4">외관</h2>

      {/* 다크모드 */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm font-medium">다크 모드</p>
          <p className="text-xs text-zinc-600 dark:text-zinc-400">
            라이트 모드와 다크 모드 간 전환
          </p>
        </div>
        <button
          onClick={toggleDarkMode}
          className={`w-12 h-6 rounded-full flex items-center px-1 cursor-pointer transition-colors duration-300 ${
            isDark ? "bg-red-500 justify-end" : "bg-zinc-600 justify-start"
          }`}
          aria-label="Toggle Dark Mode"
        >
          <div className="w-4 h-4 bg-white rounded-full shadow-md" />
        </button>
      </div>

      {/* 언어 선택 */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium">언어</p>
          <p className="text-xs text-zinc-600 dark:text-zinc-400">
            선호하는 언어 선택
          </p>
        </div>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-zinc-200 dark:bg-zinc-700 text-sm rounded-md px-2 py-1 text-black dark:text-white"
        >
          {languages.map((lang) => (
            <option key={lang}>{lang}</option>
          ))}
        </select>
      </div>
    </section>
  );
};

export default AppearanceSettings;
