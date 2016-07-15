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
            <edit-gist></edit-gist>
        </div>
    </div>
</template>
<style lang="sass">
    .table-container {
        background-color: #eaeaea;
        padding-top: 12px;
        padding-bottom: 12px;
        border-right: 1px solid #d2d2d2;
        border-bottom: 1px solid #d2d2d2;
    }
    .table-filter {
        margin-bottom: 12px;
    }
    table {
        border: 0;
        tr:nth-child(odd) {
            background: #f1f1f1;
        }tr:nth-child(even) {
             background: #fafafa;
         }
        tbody {
            > tr {
                > td {
                    border-top: 0!important;
                    a {
                        color: #464646;
                    }
                }
            }
        }
    }
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
            },
            'edit-gist': function(gistId) {
                this.editGist(gistId);
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
            },
            editGist(gistId) {
                // this one is different that show, we need to fetch an updated version of the gist from the server.
                this.$broadcast('edit-gist', gistId);
            }
        }
    }
</script>
