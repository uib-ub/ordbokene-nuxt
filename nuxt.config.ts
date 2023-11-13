import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'url'
import VueI18nVitePlugin from '@intlify/unplugin-vue-i18n/vite'

const locales = ["nob", "nno", "eng", "ukr"]
const optionalLocale = "/:locale(" + locales.join("|") + ")?"

export default defineNuxtConfig({
  css: [
    '~/assets/fonts/fonts.css',
  ],
  components: [
    {path: "~/vue-inflection", pathPrefix: false},
    "~/components"

  ],
  nitro: {
    preset: 'vercel',
    compressPublicAssets: true
  },
  runtimeConfig: {
    public: {
      api: 'https://oda.uib.no/opal/prod/',
      apiFallback: 'https://odd.uib.no/opal/prod/',
      apiDev: 'https://oda.uib.no/opal/dev/',
      apiDevFallback:  'https://odd.uib.no/opal/dev/',
      env: process.env.VERCEL_ENV || 'local',
      commit: process.env.VERCEL_GIT_COMMIT_SHA
    }
  },
  sitemap: {
    sitemaps: true,
    cacheMaxAgeSeconds: 360,
    defaultSitemapsChunkSize: 20000,
    urls: async () => {
      return await Promise.all([
        fetch('https://ord.uib.no/bm/fil/lemma.json').then(response => response.json()),
        fetch('https://ord.uib.no/nn/fil/lemma.json').then(response => response.json())
      ]).then(responses => {

        const [bm, nn] = responses
        const pages = ['', 'bm', 'nn', 'search', 'help', 'about', 'contact' ]
        const static_pages = locales.map(locale => locale + "/").concat([""]).reduce((acc, current) => acc.concat(pages.map(page => "/" + current + page)), [])

        // bm,nn searches
        const bm_searches = bm.map(item => item[0])
        const nn_searches = new Set(nn.map(item => item[0]))
        const searches = bm_searches.filter(item => nn_searches.has(item)).map(word => "/bm,nn/" + word)

        // bm articles
        const bm_ids = bm.map(item => item[1])
        const bm_articles = bm_ids.map(item => "/bm/" + item)

        // nn articles
        const nn_ids = nn.map(item => item[1])
        const nn_articles = nn_ids.map(item => "/nn/" + item)
        
        return [...static_pages, ...searches, ...new Set(bm_articles), ...new Set(nn_articles)]

      })
    }
  },

  build: {
		transpile: ["primevue", 'vue-i18n']
	},

  modules: [
      '@pinia/nuxt',
      '@pinia-plugin-persistedstate/nuxt',
      '@nuxtjs/tailwindcss',
      'nuxt-icon',
      '@nuxt/content',
      '@nuxtjs/html-validator',
      '@nuxtjs/plausible',
      'nuxt-simple-sitemap'
    ],

  htmlValidator: {
    usePrettier: false
  },     
  plausible: {
    domain: 'test.ordbokene.no',
  },
  content: {
    sources: {
      github: {
        driver: "github",
        repo: "uib-ub/ordbokene-content",
        prefix: "/",
        dir: "content",
      },
    },
    markdown: {
      anchorLinks: false
    }

  },

  piniaPersistedstate: {
    cookieOptions: {
      sameSite: 'strict',
    }
  },
  hooks: {
    'pages:extend' (pages) {
      pages.pop()
      pages.push({
        path: optionalLocale + '/',
        file: '~/pages/index.vue',
        children: [
          {
            name: 'index',
            path: '',
            file: '~/components/custom-pages/welcome-view.vue'
          }
        ]
      })

      pages.push({
            path: optionalLocale + '/:dict(bm|nn|bm,nn)',
            file: '~/pages/index.vue',
            children: [
              {
                name: 'article',
                path: ':article_id(\\d+)/:lemma?',
                file: '~/components/custom-pages/article-view.vue'
              },
              {
                name: 'word',
                path: ':q',
                file: '~/components/custom-pages/word-view.vue'
              },
              {
                name: 'welcome',
                path: '',
                alias: 'search', //legacy
                file: '~/components/custom-pages/welcome-view.vue'
              }

            ]
          })
      pages.push(
      {
        name: 'about',
        path: optionalLocale + '/about',
        file: '~/components/custom-pages/content-container.vue',
        children: [
          {
            name: 'about-slug',
            path: ':slug',
            file: '~/components/custom-pages/content-subpage.vue'
          },
          {
            name: 'about',
            path: '',
            file: '~/components/custom-pages/content-accordions.vue'
          }
          

        ]
      })
      pages.push({
        name: 'help',
        path: optionalLocale + '/help',
        file: '~/components/custom-pages/content-container.vue',
        children: [
          {
            name: 'help-slug',
            path: ':slug',
            file: '~/components/custom-pages/content-subpage.vue'
          },
          {
            name: 'help',
            path: '',
            file: '~/components/custom-pages/content-accordions.vue'
          }
        ]
        })

        pages.push({
          name: 'contact',
          path: optionalLocale + '/contact',
          file: '~/components/custom-pages/content-container.vue',
          children: [
            {
              name: 'contact',
              path: '',
              file: '~/components/custom-pages/contact-view.vue'
            }
          ]
      })

      pages.push(
      {
        name: 'settings',
        path: optionalLocale + '/settings',
        file: '~/components/custom-pages/settings-view.vue',
      })

      pages.push({
        name: 'search',
        path: optionalLocale +'/search',
        file: '~/components/custom-pages/search-view.vue',
      })

      pages.push({
        path: optionalLocale,
        file: '~/pages/index.vue',
      })      
    }
  },

  vite: {
    server: {
      fs: {
          allow: ["../vue-inflection/src/components"]
      }
    },
    resolve: {
      alias: {
        'vue-i18n': 'vue-i18n/dist/vue-i18n.runtime.esm-bundler.js'
      }
    },
    plugins: [
      VueI18nVitePlugin({
        include: [
          resolve(dirname(fileURLToPath(import.meta.url)), './locales/*.json')
        ]
      })

    ],
  },
  devtools: false
})
