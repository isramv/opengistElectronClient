<template>
    <input class="form-control table-filter" type="text" v-model="searchTitle" placeholder="Filter table">
    {{ title }}
    <table class="table table-condensed">
        <tr v-for="gist in gists | filterBy searchTitle">
            <td><a class="table-component_link" v-on:click="showGist(gist.gist)">{{ gist.gist.title }}</a></td>
        </tr>
    </table>
</template>
<style>
</style>
<script>
    import store from '../store'
    export default{
        data(){
            return store
        },
        methods: {
            showGist(gist) {
                this.$dispatch('view-gist', gist);
            }
        }
    }
</script>
