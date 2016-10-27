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
    .rc-container {
        margin: 15px 0;
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
            <div class="rc-container">
                <a href="#" @click="fetchGists()">Update index</a>
                <router-link to="/gistapp/new" class="btn">New</router-link>
            </div>
            <table-gist></table-gist>
        </div>
        <div class="col-xs-8 col-sm-8 col-md-9 show-gist-container">
            <div class="rc-container">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script>
    import _ from 'lodash'
    import store from '../vuex_store'
    import tableGistComponent from './tableGist.vue'
    import keymaster from 'keymaster'
    export default{
        components: {
             'table-gist': tableGistComponent
        },
        store: store,
        computed: {
            username() {
                return this.$store.state.username
            },
            auth() {
                return this.$store.state.auth
            }
        },
        beforeCreate() {
            if(localStorage.username !== null) {
                this.$store.commit('USERNAME', localStorage.username)
            }
            if(localStorage.auth !== null) {
                this.$store.commit('AUTH', localStorage.auth)
            }
        },
        created() {
            let self = this
            // @todo if computed gist is empty trigger fetchGists
            keymaster('command+n', function() {
//                self.changeState('new')
            });
            keymaster('command+escape', function() {
//                self.changeState('view')
            });
            keymaster('command+e', function() {
                let gid = store.gist.id;
//                console.log(gid);
//                self.editGist(gid);
            });
        },
//        events: {
//            'logout-all': function() {
//                var self = this;
//                self.$set('gists', null);
//                self.$set('state', '');
//                self.$broadcast('logout-global');
//                router.go('login');
//            },
//            'view-gist': function(gist) {
//                this.showGist(gist);
//            },
//            'edit-gist': function(gistId) {
//                this.editGist(gistId);
//            },
//            'update-all': function() {
//                this.fetchGists();
//            },
//            'update-gist-on-index': function(gist) {
//                let gid = gist.id;
//                console.log(store.gists);
//                // todo is going to search the gist by id and update with the new one.
//                _.find(store.gists, function(g) {
//                    if(g.gist.id == gid) {
//                        g.gist = gist;
//                    }
//                });
//            }
//        },
        methods: {
            fetchGists() {
                let self = this;
                self.$store.dispatch('getGists')
            },
//            changeState(state) {
//                let self = this;
//                self.$set('state', state);
//                if(state === 'new') {
//                    self.$broadcast('new-gist');
//                }
//            },
//            showGist(gist) {
//                this.$set('state', 'view');
//                this.$broadcast('view-gist', gist);
//            },
//            editGist(gistId) {
//                this.$broadcast('edit-gist', gistId);
//            }
        }
    }
</script>
