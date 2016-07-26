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
            <a href="#" @click="fetchGists()">update index</a>
            <table-gist></table-gist>
        </div>
        <div class="col-xs-8 col-sm-8 col-md-9 show-gist-container">
            <a href="#" class="btn btn-default btn-sm" @click="changeState('new')">New</a>
            <div v-show="state == 'view'">
                <show-gist></show-gist>
            </div>
            <div v-show="state == 'edit'">
                <edit-gist></edit-gist>
            </div>
            <div v-show="state == 'new'">
                <new-gist></new-gist>
            </div>
        </div>
    </div>
</template>
<script>
    import _ from 'lodash'
    import store from '../store'
    import router from '../router'
    import showGistComponent from './showGist.vue'
    import editGistComponent from './editGist.vue'
    import tableGistComponent from './tableGist.vue'
    import newGistComponent from './newGist.vue'
    export default{
        components: {
            'table-gist': tableGistComponent,
            'show-gist': showGistComponent,
            'edit-gist': editGistComponent,
            'new-gist': newGistComponent
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
                self.$set('state', '');
                self.$broadcast('logout-global');
                router.go('login');
            },
            'view-gist': function(gist) {
                this.showGist(gist);
            },
            'edit-gist': function(gistId) {
                this.editGist(gistId);
            },
            'update-all': function() {

            },
            'update-gist-on-index': function(gist) {
                let gid = gist.id;
                console.log(store.gists);
                // todo is going to search the gist by id and update with the new one.
                _.find(store.gists, function(g) {
                    if(g.gist.id == gid) {
                        g.gist = gist;
                    }
                });
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
                });
            },
            changeState(state) {
                let self = this;
                self.$set('state', state);
                if(state === 'new') {
                    self.$broadcast('new-gist');
                }
            },
            showGist(gist) {
                this.$set('state', 'view');
                this.$broadcast('view-gist', gist);
            },
            editGist(gistId) {
                this.$broadcast('edit-gist', gistId);
            }
        }
    }
</script>
