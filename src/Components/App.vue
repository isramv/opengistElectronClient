<template>
    <div class="layout" id="app" v-cloak>
        <router-link to="/">login</router-link>
        <router-link to="/gistapp">main</router-link>
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import bootstrap from 'bootstrap-webpack'
    import fontawesome from 'font-awesome-webpack'
</script>