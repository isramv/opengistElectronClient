<template>
  <div>
    <div class="row admin-bar" v-if="username">
      <div class="col-xs-8">
        <p class="salute"><i class="fa fa-rocket" aria-hidden="true"></i> {{ username }}</p>
      </div>
      <div class="col-xs-4">
        <a v-on:click="logoutAction" class="logout-sm">Logout  <i class="fa fa-sign-out"></i></a>
      </div>
    </div>
    <div class="row">
      <i class="fa fa-circle-o-notch fa-spin fa-2x fa-fw" v-if="loading"></i>{{ loadingMessage }}
    </div>
  </div>
</template>
<style lang="sass" xml:lang="scss">
    .admin-bar {
        a {
            color: #33b5ff;
        }
        strong {
            color: #fbfbfb;
        }
        div:nth-child(2) {
            text-align: right;
        }
        .logout-sm {
          font-size: 14px;
        }
    }
    .salute {
        margin: 0;
        color: black;
    }
</style>
<script>
  export default {
    computed: {
      username() {
        return this.$store.state.username
      },
      loading() {
        return this.$store.state.loading.status
      },
      loadingMessage() {
        return this.$store.state.loading.message
      }
    },
    beforeCreate() {
      if(localStorage.getItem('username') !== null) {
        this.$store.commit('USERNAME', localStorage.getItem('username'))
      }
    },
    methods: {
      logoutAction: function () {
        console.log('login out...')
        localStorage.clear()
        this.$store.commit('USERNAME', '')
        this.$store.commit('AUTH', '')
        this.$store.commit('ISAUTH', false)
        this.$store.commit('GISTS', {})
        this.$router.push({ name: 'login'})
      }
    }
  }
</script>
