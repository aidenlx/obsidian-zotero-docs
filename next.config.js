const withNextra = require("nextra")({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.tsx",
});

module.exports = withNextra({
  i18n: {
    // locales: ["en-US", "zh-CN"],
    locales: ["en-US"],
    defaultLocale: "en-US",
  },
});
