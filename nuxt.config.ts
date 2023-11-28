import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'url'
import VueI18nVitePlugin from '@intlify/unplugin-vue-i18n/vite'

const locales = ["nob", "nno", "eng", "ukr"]
const pages =  ['', 'bm', 'nn', 'search', 'help', 'about', 'contact' ]
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
    preset: 'node-server',
    compressPublicAssets: true,
  },
  runtimeConfig: {
    public: {
      api: 'https://oda.uib.no/opal/prod/',
      apiFallback: 'https://odd.uib.no/opal/prod/',
      apiDev: 'https://oda.uib.no/opal/dev/',
      apiDevFallback:  'https://odd.uib.no/opal/dev/'
    }
  },
  build: {
		transpile: ["primevue", 'vue-i18n']
	},

  modules: [
      '@pinia/nuxt',
      '@pinia-plugin-persistedstate/nuxt',
      '@nuxtjs/tailwindcss',
      'nuxt-bootstrap-icons',
      '@nuxt/content',
      '@nuxtjs/html-validator',
      '@nuxtjs/plausible'
    ],

  htmlValidator: {
    usePrettier: false
  },     
  plausible: {
    domain: 'test.ordbokene.no',
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
