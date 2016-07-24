<template>
    <input class="tags-input form-control" v-model="newTag" @keyup.enter="addTag()" placeholder="Add new tags..."/>
    <ul class="tags-list list-inline">
        <li class="btn btn-default" v-for="tag in gistToEdit.tags">{{ tag.name }} <a @click="removeTag(tag.name)"><i class="fa fa-close"></i></a></li>
    </ul>
</template>
<style lang="sass" xml:lang="scss" scoped>
    ul {
        li {
            margin-right: 4px;
        }
    }
    .tags-list {
        margin: 0;
    }
    .tags-input {
        width: 240px;
        margin: 10px 0;
    }
</style>
<script>
    import store from '../store';
    export default{
        props: ['newTag'],
        data() {
            return store;
        },
        methods: {
            addTag() {
                store.gistToEdit.tags.push({ id: 0, name: this.$get('newTag') });
                this.$set('newTag', '');
            },
            removeTag(name) {
                let array_index = _.findKey(store.gistToEdit.tags, { 'name': name });
                store.gistToEdit.tags.splice(array_index,1);
            }
        }
    }
</script>
