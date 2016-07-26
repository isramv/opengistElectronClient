<template>
    <div>
        <i class="fa fa-circle-o-notch fa-spin fa-2x fa-fw" v-if="processing"></i>
        <div v-show="!processing">
            <div class="form-group">
                <input class="title form-control" v-model="gistToEdit.title"></input>
            </div>
            <div class="form-group">
                <tags-input-component></tags-input-component>
            </div>
            <div class="form-group editor-container">
                <div id="js-editor"></div>
            </div>
            <br/>
            <div class="form-group">
                <button class="btn-sm btn btn-default btn-sm" v-on:click="cancelUpdateGist()">Cancel</button>
                <button class="btn-sm btn btn-default btn-sm" v-on:click="saveGistAction()">Save</button>
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
    #js-editor {
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
            'edit-gist': function(gistId) {
                let self = this;
                self.getUpdatedGist(gistId);
                this.$set('state', 'edit');
            },
            'logout-global': function() {
                let self = this;
                self.$set('editing', false);
                self.$set('processing', false);
                self.$set('gistToEdit', {});
                self.$set('gist', {});
            }
        },
        methods: {
            newGist() {
                let gistToEdit = {
                    title: '',
                    body: '',
                    tags: []
                };
                let self = this;
                self.$set('editing', true);
                self.$set('isnew', true);
                self.$set('gistToEdit', gistToEdit);
                setTimeout(function () {
                    let editor = ace.edit('js-editor');
                    editor.setValue('', 1);
                    editor.getSession().setMode('ace/mode/markdown');
                    editor.setTheme('ace/theme/github');
                    self.$set('editor', editor);
                }, 1000);

            },
            cancelUpdateGist() {
                let self = this;
                self.$set('state', 'view');
                self.$set('gistToEdit', {});
            },
            getUpdatedGist(gistId) {
                let self = this;
                self.$set('processing', true);
                $.ajax({
                    // TODO update the url and put.
                    url: 'http://myapp.local/app_dev.php/api/v1/gists/'+ gistId,
                    headers: { 'authorization': localStorage.getItem('Authorization') },
                    type: 'GET',
                    dataType: 'json'
                }).done(function(res) {
                    let editor = ace.edit('js-editor');
                    if(_.isNull(res.body)) {
                        res.body = '';
                    }
                    editor.setValue(res.body, 1);
                    editor.setOption("wrap", 80);
                    editor.getSession().setMode('ace/mode/markdown');
                    editor.setTheme('ace/theme/github');
                    self.$set('editor', editor);
                    self.$set('gistToEdit', res);
                    self.$set('processing', false);
                });
            },
            saveGistAction() {
                let self = this;
                let editor = self.$get('editor');
                // Setting the body.
                this.$set('gistToEdit.body', editor.getValue());
                $.ajax({
                    type: 'POST',
                    url: 'http://myapp.local/app_dev.php/api/v1/gists/'+ self.$get('gistToEdit.id'),
                    headers: { 'authorization': localStorage.getItem('Authorization') },
                    data: self.$get('gistToEdit'),
                }).done(function(res) {
                    self.$set('gistToEdit', {});
                    self.$dispatch('view-gist', res);
                    self.$dispatch('update-gist-on-index', res);
                    self.$set('editing', false);
                });
            }
        }
    }
</script>
