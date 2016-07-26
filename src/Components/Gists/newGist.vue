<template>
    <div>
        <div class="row actions">
            <div class="col-xs-4 col-xs-offset-8">
                <!-- todo fix the cancel button. -->
                <button class="btn-sm btn btn-default btn-sm" v-on:click="cancelUpdateGist()">Cancel</button>
                <button class="btn-sm btn btn-default btn-sm" v-on:click="saveGistAction()">Save</button>
            </div>
        </div>
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
                <button class="btn btn-default" @click="saveGistAction()">Save</button>
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
            'new-gist': function() {
                console.log('new gist notified');
            }
        },
        beforeCompile() {
            this.newGist();
        },
        methods: {
            newGist() {
                let gistToEdit = {
                    title: '',
                    body: '',
                    tags: []
                };
                let self = this;
                self.$set('gistToEdit', gistToEdit);
                setTimeout(function () {
                    let editor = ace.edit('js-editor');
                    editor.setValue('', 1);
                    editor.getSession().setMode('ace/mode/markdown');
                    editor.setTheme('ace/theme/github');
                    self.$set('editor', editor);
                }, 2000);

            }
            // Todo save method.
        }
    }
</script>
