import { DocsThemeConfig } from "nextra-theme-docs";
import Giscus from "@giscus/react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useMounted } from "nextra/hooks";
import { useRouter } from "next/router";

function ICP() {
  const { locale } = useRouter();
  if (locale !== "zh-CN") return null;
  return (
    <a
      className="text-xs"
      href="https://beian.miit.gov.cn/"
      target="_blank"
      rel="noreferrer"
    >
      闽ICP备19020233号-1
    </a>
  );
}

function Main({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();
  const { locale } = useRouter();
  const isDark = resolvedTheme === "dark";
  return (
    <>
      {children}
      {locale !== "zh-CN" && (
        <Giscus
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

const config: DocsThemeConfig = {
  useNextSeoProps() {
    return {
      titleTemplate: "%s – ZotLit",
    };
  },
  i18n: [
    { locale: "en-US", text: "English" },
    { locale: "zh-CN", text: "简体中文" },
  ],
  logo: (
    <div className="flex gap-2 items-center">
      <Image alt="ZotLit logo" src="/img/logo.svg" width={32} height={32} />
      <b>Obsidian ZotLit</b>
    </div>
  ),
  sidebar: {
    defaultMenuCollapseLevel: 3,
  },
  // favicon
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      {/* <meta property="og:title" content="ZotLit" />
      <meta
        property="og:description"
        content="a third-party project that aims to facilitate the integration between Obsidian.md and Zotero"
      /> */}
      <link rel="icon" type="image/svg+xml" href="/img/favicon.svg" />
      <link rel="alternate icon" href="/img/favicon.ico" />
    </>
  ),
  project: {
    link: "https://github.com/PKM-er/obsidian-zotlit",
  },
  main: Main,
  docsRepositoryBase:
    "https://github.com/aidenlx/obsidian-zotero-docs/edit/main/",
  footer: {
    text: (
      <div className="flex w-full flex-col items-center sm:items-start">
        <p className="flex items-center gap-1 text-current">
          <b>Obsidian ZotLit</b>
        </p>
        <p className="mt-6 text-xs">© {new Date().getFullYear()} AidenLx</p>
        <ICP />
      </div>
      // <div className="flex gap-4 items-center">
      //   <span>Copyright © {new Date().getFullYear()} AidenLx.</span>
      //   <a href="https://beian.miit.gov.cn/" target="_blank" rel="noreferrer">
      //     闽ICP备19020233号-1
      //   </a>
      // </div>
    ),
  },
  primaryHue: {
    light: 344,
    dark: 334,
  },
};

export default config;
