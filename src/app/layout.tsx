import Navbar from "@/components/navbar";

import "../styles/globals.css";
import { ThemeProvider } from "next-themes";

export const metadata = {
  title: "롤 클라이언트 상태 모니터",
  description: "롤 클라이언트 실행 및 칼바람 나락 상태 실시간 모니터링",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head></head>
      <body className="font-pretendard bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
