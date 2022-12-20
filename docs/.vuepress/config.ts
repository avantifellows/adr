import { ThemeConfig } from "vuepress-theme-vt";
import { defineConfig4CustomTheme } from "vuepress/config";

export default defineConfig4CustomTheme<ThemeConfig>((ctx) => ({
  theme: "vt",
  title: " AF ADR",
  themeConfig: {
    enableDarkMode: true,
    repo: "https://github.com/ulivz/vuepress-theme-vt",
    logo: "/logo.jpeg",
    nav: [
      { text: "ADRs", link: "/guide/" },
      // { text: "API", link: "/api/" },
      // {
      //   text: "Nav Links on the left",
      //   link: "/guide/navbar.html#nav-links-on-the-left",
      //   position: "left"
      // },
    ],
    sidebar: [
      {
        title: "Introduction",
        collapsable: false,
        children: [
          "/guide/",
          "/guide/create-new-adr",
          ["/guide/adr-template", "ADR Template"]
        ],
      },
      {
        title: "ADRs",
        collapsable: false,
        children: [
          "/adrs/ADR-1"
        ]
      }
    ],
    codeSwitcher: {
      groups: {
        default: { ts: 'TypeScript', js: 'JavaScript' },
        'plugin-usage': { tuple: 'Tuple', object: 'Object' },
      }
    }
  },
}));
