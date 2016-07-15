<template>
    <div v-if="editing">
        <h1>Edit Gist.</h1>
        <div class="col-xs-4 col-xs-offset-8">
            <button class="btn btn-default" v-on:click="finishEditing">Done</button>
        </div>
    </div>
</template>
<style>

</style>
<script>
    import store from './store'
    export default{
        data() {
            return store
        },
        events: {
            'edit-gist': function() {
                let self = this;
                console.log(self.$get('salute'));
                console.log(self.$set('editing', true));

            }
        },
        methods: {
            finishEditing() {
                // TODO discard not made changes.
                this.$set('editing', false);
            }
        }

    }
</script>
