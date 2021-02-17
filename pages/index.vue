<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">
        nuxt-fcm
      </h1>
      <div class="links">
        <a href="https://nuxtjs.org/" target="_blank" rel="noopener noreferrer" class="button--green">
          Documentation
        </a>
        <a href="https://github.com/nuxt/nuxt.js" target="_blank" rel="noopener noreferrer" class="button--grey">
          GitHub
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  var axios = require('axios');
  export default {
    async fetch() {
      this.startListener();
      this.requestPermission()
      this.getIdToken();
    },
    methods: {
      showdata() {
        this.$fetch()
      },
      async startListener() {
        try {
          this.$fire.messaging.onMessage((payload) => {
            console.info('Message received. ', payload)
          })
          this.$fire.messaging.onTokenRefresh(async () => {
            try {
              const refreshedToken = await this.$fire.messaging.getToken()
            } catch (e) {
              console.error('Unable to retrieve refreshed token ', e)
            }
          })
        } catch (e) {
          console.error(e)
        }
      },
      async requestPermission() {
        try {
          await Notification.requestPermission()
        } catch (e) {
          console.error(e)
        }
      },
      async getIdToken() {
        try {
          var currentToken = await this.$fire.messaging.getToken()
          this.subscribe(currentToken, 'your-topic')
        } catch (e) {
          console.error('An error occurred while retrieving token. ', e)
        }
      },
      async subscribe(token, topic) {
        var data = { "to": "/topics/" + topic, "registration_tokens": [token] };
        var config = {
          method: 'post',
          url: 'https://iid.googleapis.com/iid/v1:batchAdd',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'key=<Your-Key>'
          },
          data: data
        };
        await axios(config);
      }
    },
  }
</script>

<style>
  .container {
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .title {
    font-family:
      'Quicksand',
      'Source Sans Pro',
      -apple-system,
      BlinkMacSystemFont,
      'Segoe UI',
      Roboto,
      'Helvetica Neue',
      Arial,
      sans-serif;
    display: block;
    font-weight: 300;
    font-size: 100px;
    color: #35495e;
    letter-spacing: 1px;
  }

  .subtitle {
    font-weight: 300;
    font-size: 42px;
    color: #526488;
    word-spacing: 5px;
    padding-bottom: 15px;
  }

  .links {
    padding-top: 15px;
  }
</style>