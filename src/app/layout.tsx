// app/layout.tsx
import "./globals.css";

export const metadata = {
  title: "롤 클라이언트 상태 모니터",
  description: "롤 클라이언트 실행 및 칼바람 나락 상태 실시간 모니터링",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="scroll-smooth">
      <head />
      <body className="bg-gray-900 text-gray-100 min-h-screen flex flex-col">
        <header className="bg-gray-800 border-b border-gray-700 p-4 text-white text-center font-bold text-xl">
          롤 클라이언트 상태 모니터
        </header>

        <main className="bg-gray-900 flex-grow mx-auto w-full p-6">
          {children}
        </main>

        <footer className="bg-gray-800 border-t border-gray-700 text-gray-400 text-center p-4 text-sm">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
