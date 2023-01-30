export default defineNuxtConfig({
    css: ['~/assets/fonts/fonts.css'],
    nitro: {
      compressPublicAssets: true,
    },
    runtimeConfig: {
      public: {
        endpointEnv: process.env.ENDPOINT_ENV || 'dev',
        versionWatermark: process.env.WATERMARK || 'test'
      }
    },
    modules: [
        '@pinia/nuxt',
        '@nuxtjs/i18n',
        '@pinia-plugin-persistedstate/nuxt',
        'nuxt-windicss',
        'nuxt-icon'
      ],
      i18n: {
        locales: [
          { code: 'nb', iso: 'nb-NO', file: 'nob.json' },
          { code: 'nn', iso: 'nn-NO', file: 'nno.json' },
          { code: 'en', iso: 'en-GB', file: 'eng.json' },
        ],
        langDir: '~/locales/',
        defaultLocale: 'nb',
        lazy: false,
        detectBrowserLanguage: {
          useCookie: true,
          cookieKey: 'i18n_redirected',
          redirectOn: 'root',
        }
      },
      piniaPersistedstate: {
        cookieOptions: {
          sameSite: 'strict',
        }
      }

})
