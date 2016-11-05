<template>
  <div class="bg-adminbar-container">
    <div class="row admin-bar" v-if="username">
      <div class="col-xs-8">
        <p class="salute"><i class="fa fa-user-circle-o" aria-hidden="true"></i> {{ username }}</p>
      </div>
      <div class="col-xs-4">
        <a v-on:click="logoutAction" class="logout-sm">Logout  <i class="fa fa-sign-out"></i></a>
      </div>
    </div>
    <div class="row bg-notifications" v-if="loading">
      <i class="fa fa-circle-o-notch fa-spin fa-2x fa-fw"></i>{{ loadingMessage }}
    </div>
  </div>
</template>
<style lang="sass" xml:lang="scss">
    .bg-adminbar-container {
      position: relative;
    }
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
    .bg-notifications {
      text-align: center;
      opacity: .9;
      width: 500px;
      margin: 0 auto;
      background: #76d089;
      border: 2px solid #4bad64;
      border-radius: 4px;
      padding: 3px 5px;
      color: #3c6e34;
      position: absolute;
      left: 25%;
      i {
        font-size: 15px;
      }
      .fa-circle-o-notch:before {
        color: #3c6e34;
      }
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
