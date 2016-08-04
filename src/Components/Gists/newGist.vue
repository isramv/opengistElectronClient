<template>
    <div>
        <div class="row actions">
            <div class="col-xs-4 col-xs-offset-8">
                <!-- todo fix the cancel button. -->
                <button class="btn-sm btn btn-default btn-sm" v-on:click="cancelAction">Cancel</button>
                <button class="btn-sm btn btn-default btn-sm" v-on:click="createAction">Save</button>
            </div>
        </div>
        <i class="fa fa-circle-o-notch fa-spin fa-2x fa-fw" v-if="processing"></i>
        <div>
            <div class="form-group">
                <input class="title form-control" v-model="gistToEdit.title"></input>
            </div>
            <div class="form-group">
                <tags-input-component></tags-input-component>
            </div>
            <div class="form-group editor-container" v-if="!processing">
                <div id="editor"></div>
            </div>
            <br/>
            <div class="form-group">
                <button class="btn btn-default" @click="createAction()">Save</button>
            </div>
        </div>
    </div>
</template>
<style lang="sass" xml:lang="scss" scoped>
    input {
        &.title.form-control {
            max-width: 300px;
        }
    }
    .editor-container {
        min-height: 600px;
    }
    #editor {
        position: absolute;
        width: 90%;
        height: 600px;
        padding-right: 40px;
        border: 1px solid #d4d4d4;
    }
    .select2-select {

    }
</style>
<script>
    import store from '../store'
    import 'jquery'
    import _ from 'lodash'
    import ace from 'brace'
    require('brace/mode/markdown');
    require('brace/theme/github');
    import tagsInputComponent from './tagsInputComponent.vue';
    export default{
        props: ['processing', 'editor'],
        data() {
            return store
        },
        components: {
            'tags-input-component': tagsInputComponent
        },
        events: {
            'new-gist': function() {
                let self = this;
                self.newGist();
            }
        },
        methods: {
            newGist() {

                let self = this;
                let newGist = {
                    title: '',
                    body: '',
                    tags: []
                };
                self.$set('gistToEdit', newGist);
                setTimeout(function() {
                    let editor = ace.edit('editor');
                    editor.setValue('',1);
                    editor.setOption("wrap", 80);
                    editor.getSession().setMode('ace/mode/markdown');
                    editor.setTheme('ace/theme/github');
                    editor.commands.addCommand({
                        name: 'savegist',
                        bindKey: {win: 'Ctrl-S',  mac: 'Command-S'},
                        exec: function(editor) {
                            self.createAction();
                        }
                    });
                    editor.commands.addCommand({
                        name: 'cancel',
                        bindKey: {win: 'Ctrl-P',  mac: 'Command-P'},
                        exec: function(editor) {
                            self.cancelAction();
                        }
                    });
                    self.$set('editornew', editor);
                }, 1000);

            },
            cancelAction() {
                this.$set('editornew', {});
                this.$set('gistToEdit', {});
                this.$set('state', 'view');
            },
            createAction() {
                let self = this;
                // data.
                let editor = self.$get('editornew');
                self.$set('gistToEdit.body', editor.getValue());
                let gte = self.$get('gistToEdit');
                $.ajax({
                    url: 'http://myapp.local/app_dev.php/api/v1/gists',
                    headers: { 'authorization': localStorage.getItem('Authorization') },
                    type: 'POST',
                    data: gte,
                }).done(function(res) {
                    self.$set('gistToEdit', res);
                    self.$dispatch('view-gist', res);
                    self.$set('state', 'view');
                    self.$dispatch('update-all');
                    self.$set('editing', false);
                });
            }
            // Todo save method.
        }
    }
</script>
