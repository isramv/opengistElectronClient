<style lang="sass" xml:lang="scss">
    html, body {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
    }
    body {
        width: 100%;
        overflow-y: visible;
        font-family: Ubuntu;
        font-weight: normal;
        font-style: normal;
        background: #F8F6F6;
    }
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
    .app-container {
        display:flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-content: stretch;
        align-items: stretch;
        .menu-container {
            width: 320px;
            height: 100%;
            position: absolute;
            display:flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: flex-start;
            align-content: stretch;
            align-items: stretch;
            .main-menu {
                width: 60px;
            }
            .menu-show-container {
                overflow-y: scroll;
                background: rgba(230,230,230,1);
                -webkit-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.35);
                -moz-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.35);
                box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.35);
                padding: 10px;
                width: 260px;
                flex-grow: 1;
                flex-shrink: 0;
                flex-basis: 1;
            }
        }
        .show-gist-container {
            flex-grow: 1;
            flex-shrink: 0;
            flex-basis: 1;
            padding-left: 380px;
        }
        .account-configuration {
        }
    }
    .main-menu {
        background: #27456F;
        height: 100%;
    }
    .plain-list {
        padding: 20px 18px;
        li {
            list-style: none;
            margin-bottom: 10px;
            a {
                color: #70A2E7;
                &:hover {
                    color: #fff;
                }
            }
        }
    }
    ::-webkit-scrollbar {
        width: 12px;
    }
    ::-webkit-scrollbar-track {
        background-color: rgba(230, 230, 230, 1);
        /*border-left: 1px solid #ccc;*/
    }
    ::-webkit-scrollbar-thumb {
        background-color: rgba(200, 200, 200, .5);
    }
    ::-webkit-scrollbar-thumb:hover {
        background-color: #aaa;
    }
</style>
<template>
    <div class="app-container">
        <div class="menu-container">
            <div class="main-menu">
                <ul class="plain-list">
                    <li><a @click="fetchGists()"><i class="fa fa-refresh fa-2x"></i></a></li>
                    <li><a @click="changeState('new')"><i class="fa fa-plus-square fa-2x"></i></a></li>
                </ul>
            </div>
            <div class="menu-show-container">
                <table-gist></table-gist>
            </div>
        </div>
        <!--<a href="#" @click="fetchGists()">update index</a>-->
        <div class="show-gist-container">
            <admin-bar-component></admin-bar-component>
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
    import '../../scss/ubuntu.scss'
    import _ from 'lodash'
    import store from '../store'
    import router from '../router'
    import showGistComponent from './showGist.vue'
    import editGistComponent from './editGist.vue'
    import tableGistComponent from './tableGist.vue'
    import newGistComponent from './newGist.vue'
    import adminBarComponent from '../adminBarComponent.vue'
    import keymaster from 'keymaster'

    export default{
        components: {
            'admin-bar-component': adminBarComponent,
            'table-gist': tableGistComponent,
            'show-gist': showGistComponent,
            'edit-gist': editGistComponent,
            'new-gist': newGistComponent
        },
        data() {
            return store
        },
        beforeCompile() {
            let self = this;
            if(localStorage.getItem('gists') !== null) {
                this.$set('gists', JSON.parse(localStorage.getItem('gists')));
            } else {
                this.fetchGists();
            }
            keymaster('command+n', function() {
                self.changeState('new');
            });
            keymaster('command+escape', function() {
                self.changeState('view');
            });
            keymaster('command+e', function() {
                let gid = store.gist.id;
                self.editGist(gid);
            });
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
                this.fetchGists();
            },
            'update-gist-on-index': function(gist) {
                let gid = gist.id;
                _.find(store.gists, function(g) {
                    if(g.gist.id == gid) {
                        g.gist = gist;
                        return;
                    }
                });
                this.$dispatch('update-all');
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
                resizedw();
            },
            editGist(gistId) {
                this.$broadcast('edit-gist', gistId);

            }
        },
        ready: function() {
            var doit;
            window.onresize = function(){
                clearTimeout(doit);
                doit = setTimeout(resizedw, 100);
            };
            resizedw();
        }
    }
    function resizedw(){
        $('.app-container').css('height', window.innerHeight);
    }
</script>
