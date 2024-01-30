// "use client";

import { ThemeProvider } from "@/components/app/theme-provider";
import { AppStateProvider } from "@/components/app/state-provider";
import { LanguageProvider } from "@/components/app/language-provider";

const Providers = ({ children }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <LanguageProvider defaultValue="ru">
        <AppStateProvider>{children}</AppStateProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export { Providers };
