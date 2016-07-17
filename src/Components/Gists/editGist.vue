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
            <div class="form-group">
                <div id="js-editor" v-model="gistToEdit.body"></div>
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
        props: ['processing'],
        data() {
            return store
        },
        events: {
            'edit-gist': function(gistId) {
                let self = this;
                self.getUpdatedGist(gistId);
                this.$set('editing', true);
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
                    self.$set('gistToEdit', res);
                    self.$set('processing', false);
                    let editor = ace.edit('js-editor');
                    console.log(res.body);
                    editor.setValue(res.body, 1);
                    editor.getSession().setMode('ace/mode/markdown');
                    editor.setTheme('ace/theme/github');

                });
            }
        }

    }
</script>
