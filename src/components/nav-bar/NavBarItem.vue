<template>
    <router-link :to="link">{{name}}</router-link>
</template>

<script>
export default {
    name: "NavBarItem",
    props:{
        name:{
            type: String,
            default: 'nav-bar-item'
        },
        link:{
            type: String,
            default: '',
        },
    },
    data(){
        return {
    
        }
    },
    computed: {
    
    },
    methods: {

    },
    created() {
    }
}

</script>

<style scoped>

</style>
