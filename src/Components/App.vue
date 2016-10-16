<template>
    <div id="app">
        <a @click="goTo">goTo</a>
        <router-view></router-view>
    </div>
</template>
<script>
    import router from './router'
    export default{
        router: router,
        methods: {
            goTo() {
                console.log(router)
                console.log(this._router)
            }
        }
    }
</script>
