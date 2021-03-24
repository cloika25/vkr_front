<template>
    <div>
        <b-navbar>
            <b-navbar-brand>
                Личный кабинет
            </b-navbar-brand>
        </b-navbar>
        <div class="content">
            <b-row class="personal_data">
                <b-col>
                    <div class="left_column">
                        <div>
                            Email: {{user.email}}
                        </div>
                        <div>
                            Фамилия: {{user.lastName}}
                        </div>
                        <div>
                            Имя: {{user.firstName}}
                        </div>
                        <div>
                            Пол: {{user.genderId == 0 ? "Не определено" : user.genderId == 1 ? 'Мужской' : 'Женский'}}
                        </div>
                        <div>
                            Дата рождения: {{user.birthDate}}
                        </div>
                    </div>
                    <div class="left_column" @click="toEditPersonalDate()">
                        <b-button class="left_side">
                            Редактировать
                        </b-button>
                    </div>
                </b-col>
                <b-col>
                    место под аватарку
                </b-col>
            </b-row>
        </div>
    </div>
</template>

<script>

export default {
    name: "cabinet",
    props:{
    
    },
    data(){
        return {
            loading: false
        }
    },
    computed: {
        user(){
            return this.$store.getters.getAccount;
        }
    },
    watch:{

    },
    methods: {
        toEditPersonalDate(){
            this.$router.push({name:'personalDataEdit'})
        },
        getCabinet(){
            this.$store.dispatch('getCabinet')
        }
    },
    created() {

    },
    mounted() {
        this.getCabinet();
    }
}

</script>

<style scoped>
    .left_column{
        display: flex;
        text-align: left;
        flex-direction: column;
    }
    .left_side{
        width: 150px;
    }
</style>
