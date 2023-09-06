import Giscus from "@giscus/react";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import { useMounted } from "nextra/hooks";
import { useEffect } from "react";

export default function Main({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();
  const { pathname, locale } = useRouter();
  const isDark = resolvedTheme === "dark";
  return (
    <>
      {children}
      {locale !== "zh-CN" && (
        <Giscus
          term={pathname}
          repo="PKM-er/obsidian-zotlit"
          repoId="R_kgDOGy2_uA"
          category="Docs Comments"
          categoryId="DIC_kwDOGy2_uM4CSEbI"
          mapping="pathname"
          strict="1"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="top"
          loading="lazy"
          theme={mounted && isDark ? "dark" : "light"}
          lang={locale === "en-US" ? "en" : locale}
        />
      )}
    </>
  );
}
