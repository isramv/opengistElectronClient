<template>
    <div v-if="editing">
        <div class="row actions">
            <div class="col-xs-4 col-xs-offset-8">
                <button class="btn btn-default btn-sm" v-on:click="finishEditing">Done</button>
            </div>
        </div>
        <i class="fa fa-circle-o-notch fa-spin fa-2x fa-fw" v-if="processing"></i>
        <form v-show="!processing">
            <div class="form-group">
                <input class="title form-control" v-model="gistToEdit.title"></input>
            </div>
            <div class="form-group editor-container">
                <div id="js-editor"></div>
            </div>
            <br/>
            <div class="form-group">
                <button class="btn btn-default" v-on:click="saveGistAction()">Save</button>
            </div>
        </form>
    </div>
</template>
<style lang="sass" xml:lang="scss">
    input {
        &.title.form-control {
            max-width: 40%;
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
</style>
<script>
    import store from '../store'
    import $ from 'jquery'
    import ace from 'brace'
    require('brace/mode/markdown');
    require('brace/theme/github');
    export default{
        props: ['processing', 'editor'],
        data() {
            return store
        },
        events: {
            'edit-gist': function(gistId) {
                let self = this;
                self.getUpdatedGist(gistId);
                this.$set('editing', true);
            },
            'logout-global': function() {
                let self = this;
                console.log('children notified');
                self.$set('editing', false);
                self.$set('processing', false);
                self.$set('gistToEdit', {});
                self.$set('gist', {});
            }
        },
        methods: {
            finishEditing() {
                // TODO discard not made changes.
                this.$set('editing', false);
            },
            getUpdatedGist(gistId) {
                let self = this;
                self.$set('processing', true);
                $.ajax({
                    // TODO update the url and put.
                    url: 'http://myapp.local/app_dev.php/api/v1/gists/'+ gistId,
                    headers: { 'authorization': localStorage.getItem('Authorization') },
                    type: 'GET'
                }).done(function(res) {
                    let editor = ace.edit('js-editor');
                    editor.setValue(res.body, 1);
                    editor.getSession().setMode('ace/mode/markdown');
                    editor.setTheme('ace/theme/github');
                    self.$set('editor', editor);
                    self.$set('gistToEdit', res);
                    self.$set('processing', false);
                });
            },
            saveGistAction() {
                let self = this;
                let editor = this.$get('editor');
                // Setting the body.
                this.$set('gistToEdit.body', editor.getValue());
                // todo create the tags field.
                $.ajax({
                    type: 'POST',
                    url: 'http://myapp.local/app_dev.php/api/v1/gists/'+ self.$get('gistToEdit.id'),
                    headers: { 'authorization': localStorage.getItem('Authorization') },
                    data: self.$get('gistToEdit'),
                });
            }
        }

    }
</script>
