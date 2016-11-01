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
      }
    },
    methods: {
      logoutAction: function () {
        console.log('logout action')
      }
    }
  }
</script>
