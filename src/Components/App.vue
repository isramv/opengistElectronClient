<template>
    <div id="app">
        <p>
            <router-link to="/">login</router-link>
            <router-link to="/gistapp">App</router-link>
        </p>
        <router-view></router-view>
    </div>
</template>
<script>
    import router from './router'
    export default{
        data(){
            return{
                msg:'App container with router'
            }
        },
        router: router
    }
</script>
