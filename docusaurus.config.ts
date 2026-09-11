import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const githubRepo = 'https://github.com/baxela-hq/baxela-docs';

const config: Config = {
  title: 'Baxela',
  tagline: 'Developer-first, modular, headless e-commerce platform',
  favicon: 'img/favicon.svg',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Production URL of the docs site.
  url: 'https://docs.baxela.com',
  baseUrl: '/',

  organizationName: 'baxela-hq',
  projectName: 'baxela-docs',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },
  themes: [
    '@docusaurus/theme-mermaid',
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        indexBlog: false,
        highlightSearchTermsOnTargetPage: true,
      },
    ],
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          editUrl: `${githubRepo}/edit/main/`,
          // Last-updated timestamps require at least one git commit;
          // set DOCS_SKIP_LAST_UPDATED=1 to build a repo that has none yet.
          showLastUpdateTime: process.env.DOCS_SKIP_LAST_UPDATED !== '1',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    mermaid: {
      theme: { light: 'neutral', dark: 'forest' },
    },
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Baxela',
      items: [
        {
          type: 'doc',
          docId: 'guide/installation',
          label: 'Guide',
          position: 'left',
        },
        {
          type: 'doc',
          docId: 'architecture/modular-monolith',
          label: 'Architecture',
          position: 'left',
        },
        {
          type: 'doc',
          docId: 'api/introduction',
          label: 'API',
          position: 'left',
        },
        {
          type: 'doc',
          docId: 'deployment/develop-stack',
          label: 'Deployment',
          position: 'left',
        },
        {
          type: 'doc',
          docId: 'contributing/commit-convention',
          label: 'Contributing',
          position: 'left',
        },
        {
          href: 'https://github.com/baxela-hq/baxela-docs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            { label: 'Introduction', to: '/introduction' },
            { label: 'Installation', to: '/guide/installation' },
            { label: 'API', to: '/api/introduction' },
          ],
        },
        {
          title: 'Apps',
          items: [
            {
              label: 'Monorepo',
              href: 'https://github.com/baxela-hq/baxela',
            },
            { label: 'Admin panel', to: '/admin/getting-started' },
            { label: 'Storefront', to: '/storefront/getting-started' },
          ],
        },
        {
          title: 'Project',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/baxela-hq/baxela',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Baxela. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['php', 'nginx', 'docker'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
