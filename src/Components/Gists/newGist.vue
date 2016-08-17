<template>
    <div>
        <i class="fa fa-circle-o-notch fa-spin fa-2x fa-fw" v-if="processing"></i>
        <div>
            <i class="fa fa-circle-o-notch fa-spin fa-2x fa-fw" v-if="saving"></i>
            <div class="form-group">
                <input class="title form-control" v-model="gistToEdit.title"></input>
            </div>
            <div class="form-group">
                <tags-input-component></tags-input-component>
            </div>
            <div class="form-group editor-container" v-if="!processing">
                <div id="new-editor"></div>
            </div>
            <br/>
            <div class="form-group">
                <button class="btn btn-default btn-sm" @click="cancelAction()">Cancel</button>
                <button class="btn btn-default btn-sm" @click="createAction()">Save</button>
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
    #new-editor {
        width: 650px;
        height: 600px;
        padding-right: 40px;
        border: 1px solid #d4d4d4;
    }
    .select2-select {

    }
</style>
<script>
    import store from '../store'
    import $ from 'jquery'
    import _ from 'lodash'
    import ace from 'brace'
    require('brace/mode/markdown');
    require('brace/theme/github');
    import tagsInputComponent from './tagsInputComponent.vue';
    export default{
        props: ['processing', 'editor', 'saving'],
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
                    let editor = ace.edit('new-editor');
                    editor.setValue('',1);
                    editor.setOption("wrap", 80);
                    editor.getSession().setMode('ace/mode/markdown');
                    editor.setTheme('ace/theme/github');
                    editor.commands.addCommand({
                        name: 'savegist',
                        bindKey: {win: 'Ctrl-S',  mac: 'Command-S'},
                        exec: function(editor) {
                            self.saveWhileEditing(editor);
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
                this.saveWhileEditing(this.$get('editornew'));
                this.$dispatch('view-gist', this.$get('gistToEdit'));
                self.$dispatch('update-gist-on-index', self.$get('gistToEdit'));
            },
            saveWhileEditing(editor) {
                let self = this;
                if(self.$get('saving') === false) {
                    self.$set('saving', true);
                    let url = 'http://myapp.local/app_dev.php/api/v1/gists';
                    if(!_.isUndefined(self.$get('gistToEdit.id'))) {
                        // this is the update URL.
                        url = 'http://myapp.local/app_dev.php/api/v1/gists/'+ self.$get('gistToEdit.id');
                    }
                    let body_value = editor.getValue();
                    let gte = self.$get('gistToEdit');
                    gte.body = body_value;
                    $.ajax({
                        url: url,
                        headers: { 'authorization': localStorage.getItem('Authorization') },
                        type: 'POST',
                        data: gte,
                    }).done(function(res) {
                        self.$set('gistToEdit.id',res.id);
                        self.$set('saving', false);
                        self.$dispatch('update-gist-on-index', self.$get('gistToEdit'));
                    });
                }
            }
        },
        ready: function() {
            this.$set('saving', false);
        }
    }
</script>
