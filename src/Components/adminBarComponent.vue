<template>
    <div class="row admin-bar" v-if="username">
        <div class="col-xs-8">
            <p class="salute">Welcome: {{ username }}</p>
        </div>
        <div class="col-xs-4">
            <a href="#" v-on:click="logoutAction">Logout</a>
        </div>
    </div>
</template>
<style>

</style>
<script>
    import store from './store'
    import router from './router'
    export default {
        data: function () {
            return store
        },
        beforeCompile: function() {
            var self = this;
            self.$set('username', localStorage.getItem('username'));
        },
        methods: {
            logoutAction: function() {
                var self = this;
                self.$set('username', null);
                localStorage.clear();
                router.go('login');
                self.$dispatch('logout');
            }
        }
    }
</script>
