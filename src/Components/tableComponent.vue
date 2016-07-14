<template>
    <div class="row">
        <div class="col-xs-4 col-sm-4 col-md-3 table-container">
            <input class="form-control table-filter" type="text" v-model="searchTitle" placeholder="Filter table">
            {{ title }}
            <table class="table table-condensed">
                <tr v-for="gist in gists | filterBy searchTitle">
                    <td><a class="table-component_link" v-on:click="showGist(gist.gist)">{{ gist.gist.title }}</a></td>
                </tr>
            </table>
        </div>
        <div class="col-xs-8 col-sm-8 col-md-9 show-gist-container">
            <show-gist></show-gist>
        </div>
    </div>
</template>
<style>

</style>
<script>
    import store from './store'
    import router from './router'
    import showGistComponent from './showGist.vue'
    export default{
        components: {
            'show-gist': showGistComponent
        },
        props: {
            searchTitle: ''
        },
        data: function() {
            return store
        },
        beforeCompile: function() {
            if(localStorage.getItem('gists') !== null) {
                this.$set('gists', JSON.parse(localStorage.getItem('gists')));
            } else {
                console.log('retrieving gists');
                this.fetchGists();
            }
        },
        events: {
            'logout-all': function() {
                var self = this;
                self.$set('gists', null);
                router.go('login');
            }
        },
        methods: {
            fetchGists: function() {
                console.log('fetch gists');
                var self = this;
                $.ajax({
                    url: 'http://myapp.local/app_dev.php/api/v1/gists',
                    headers: { 'authorization': localStorage.getItem('Authorization') },
                    type: 'GET'
                }).done(function(res) {
                    self.$set('gists', res);
                    self.$get('gists');
                    localStorage.setItem('gists', JSON.stringify(res));
                    console.log('Ajax call finished');
                });
            },
            showGist: function(gist) {
                var self = this;
                self.$broadcast('view-gist', gist);
            }
        }
    }
</script>
