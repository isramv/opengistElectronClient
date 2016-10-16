<template>
    <div class="login-component" v-cloak>
        <div class="container-fluid">
            <div class="row header" v-if="logged">
                <div class="col-md-12">
                    <a href="#" v-on:click="logout">Logout</a>
                </div>
            </div>
            <div class="row form" v-if="!logged">
                <div class="form-container">
                    <form class="form login-form" @submit.prevent="authorize">
                        <div class="form-group">
                            <label for="username">Username:</label>
                            <input id="username" type="text" v-model="username" name="username" placeholder="user" class="form-control"/>
                        </div>
                        <div class="form-group">
                            <label for="password">Password:</label>
                            <input id="password" class="form-control" type="password" placeholder="password" v-model="password" name="password"/>
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
    import router from '../router'
    import fontAwesome from 'font-awesome-webpack';
    export default {
        data() {
            return {
                username: '',
                password: '',
                hash: '',
                logged: false,
                error: '',
                loading: false
            }
        },
        beforeCompile() {
            var authorization = localStorage.getItem('Authorization');
            var username = localStorage.getItem('username');
            if(authorization !== null) {
                this.logged = true;
                this.username = localStorage.getItem('username');
            }
        },
        methods: {
            authorize() {
                let self = this;
                self.loading = true;
                $.ajax({
                    // TODO put the url in a variable.
                    url: 'http://myapp.local/app_dev.php/api/login',
                    type: 'POST',
                    data: $('.login-form').serialize(),
                    timeout: 25000,
                    statusCode: {
                        401: function (data) {
                            self.error = data.responseText;
                            self.loading = false;
                        },
                        404: function (data) {
                            self.error = 'Service not found, check your internet connection.';
                            self.loading = false;
                        }
                    }
                }).done(function(res) {
                    self.hash = res.token;
                    self.password = '';
                    self.logged = true;
                    self.loading = false;
                    self.setLocalStorage(res.token, res.username);
                    self.$dispatch('just-logged', res.username);
                    router.go('app');
                }).fail(function(res) {
                    self.error = res.statusText;
                    self.loading = false;
                });
            },
            setLocalStorage: function(token, username) {
                localStorage.setItem('Authorization', token);
                localStorage.setItem('username', username);
            },
            logout: function() {
                localStorage.clear();
                store = {};
                var self = this;
                self.logged = false;
            }
        }
    }
</script>
