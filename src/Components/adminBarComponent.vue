<template>
    <div class="admin-bar" v-if="username">
        <p class="salute">{{ username }}<a href="#" v-on:click="logoutAction"><i class="fa fa-sign-out"></i></a></p>
    </div>
</template>
<style lang="sass" xml:lang="scss">
    .admin-bar {
        position: fixed;
        top: 0;
        right: 0;
        padding: 10px 25px 0 0;
        a {
        }
        strong {
        }
        div:nth-child(2) {
            text-align: right;
        }
        i {
            color: #27456F;
            font-size: 18px;
        }
    }
    .salute {
        margin: 0;
        color: #27456F;
        i {
            margin-left: 10px;
            position: relative;
            top: 1px;
        }
    }
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
