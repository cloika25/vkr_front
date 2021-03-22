<template>
    <div>
        <b-navbar>
            <b-navbar-brand>
                Редактирование персональных данных
            </b-navbar-brand>
            <b-navbar-nav>
                <b-button @click="$router.push({name:'cabinet'})">
                    Отменить
                </b-button>
            </b-navbar-nav>
        </b-navbar>
    </div>
</template>

<script>
export default {
    name: "personalDataEdit",
    props:{
    
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
