<template>
  <div class="login-component" v-cloak>
    <div class="container-fluid">
      <div class="row form">
        <div class="form-container">
          <form class="form login-form" @submit.prevent="login">
            <div class="form-group">
              <label for="username">Username:</label>
              <input required id="username" type="text" v-model="username" name="username" placeholder="user"
                     class="form-control"/>
            </div>
            <div class="form-group">
              <label for="password">Password:</label>
              <input required id="password" class="form-control" type="password" placeholder="password" v-model="password"
                     name="password"/>
            </div>
            <div class="form-group">
              <input class="submit btn btn-default btn-primary" type="submit" value="login">
            </div>
            <i class="fa fa-circle-o-notch fa-spin fa-2x fa-fw" v-if="loading"></i>
            <div class="rc-block alert alert-danger" v-if="error">
              {{ error }}
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="sass" xml:lang="scss">
  .login-component {
    .form-container {
      width: 350px;
      padding-top: 50px;
      margin: 0 auto;
      background: #ececec;
      border: 2px solid #c3c3c3;
      padding: 20px;
      border-radius: 5px;
    }
  }
  .row.form {
    padding-top: 50px;
  }
  input[type="text"],
  input[type="password"] {
    &:focus {
      border: 2px solid #a8a6ff;
    }
  }
</style>
<script>
  import $ from 'jquery';
  import store from '../vuex_store'
  import fontAwesome from 'font-awesome-webpack'
  export default {
    data() {
      return {
        username: '',
        password: '',
        error: '',
        loading: false
      }
    },
    store: store,
    methods: {
      clearForm() {
        this.username = ''
        this.password = ''
      },
      login () {
        let self = this
        self.loading = true
        this.$store.dispatch('loginAction', $('.login-form').serialize()).then((e) => {
          self.error = e.responseText
          self.clearForm()
          self.loading = false
          self.$router.push({ name: 'main'})
        }).catch((e) => {
          console.log(e)
          self.error = e.statusText
          self.loading = false
        })
      }
    }
  }
</script>
