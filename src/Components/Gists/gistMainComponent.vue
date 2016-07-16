<style lang="sass" xml:lang="scss">
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
<template>
    <div class="row">
        <div class="col-xs-4 col-sm-4 col-md-3 table-container">
            <table-gist></table-gist>
        </div>
        <div class="col-xs-8 col-sm-8 col-md-9 show-gist-container">
            <show-gist></show-gist>
            <edit-gist></edit-gist>
        </div>
    </div>
    Editing: {{ editing }}
</template>
<script>
    import store from '../store'
    import router from '../router'
    import showGistComponent from './showGist.vue'
    import editGistComponent from './editGist.vue'
    import tableGistComponent from './tableGist.vue'
    export default{
        components: {
            'table-gist': tableGistComponent,
            'show-gist': showGistComponent,
            'edit-gist': editGistComponent
        },
        data() {
            return store
        },
        beforeCompile() {
            if(localStorage.getItem('gists') !== null) {
                this.$set('gists', JSON.parse(localStorage.getItem('gists')));
            } else {
                this.fetchGists();
            }
        },
        events: {
            'logout-all': function() {
                var self = this;
                self.$set('gists', null);
                router.go('login');
            },
            'view-gist': function(gist) {
                this.showGist(gist);
            },
            'edit-gist': function(gistId) {
                this.editGist(gistId);
            }
        },
        methods: {
            fetchGists() {
                let self = this;
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
            showGist(gist) {
                this.$broadcast('view-gist', gist);
            },
            editGist(gistId) {
                // this one is different that show, we need to fetch an updated version of the gist from the server.
                this.$broadcast('edit-gist', gistId);
            }
        }
    }
</script>
