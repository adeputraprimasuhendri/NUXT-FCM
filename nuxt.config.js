export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt-fcm',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/pwa'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/firebase',
  ],

  firebase: {
    lazy: false,
    config: {
      apiKey: "<apiKey>",
      authDomain: "<authDomain>",
      databaseURL: "<databaseURL>",
      projectId: "<projectId>",
      storageBucket: "<storageBucket>",
      messagingSenderId: "<messagingSenderId>",
      appId: "<appId>",
      measurementId: "<measurementId>"
    },
    onFirebaseHosting: false,
    services: {
      messaging: true,
    }
  },

  messaging: {
    createServiceWorker: true,
    actions: [
      {
        action: 'goHome',
        url: 'https://localhost:3000'
      }
    ],
    fcmPublicVapidKey: '<public-key>' // OPTIONAL : Sets vapid key for FCM after initialization
  }, 

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  pwa: {
    workbox: {
      importScripts: ['/firebase-auth-sw.js'],
      // by default the workbox module will not install the service worker in dev environment to avoid conflicts with HMR
      // only set this true for testing and remember to always clear your browser cache in development
      dev: false,
    },
  },
}
