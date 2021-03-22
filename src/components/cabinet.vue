<template>
    <div>
        <b-navbar>
            <b-navbar-brand>
                Личный кабинет
            </b-navbar-brand>
        </b-navbar>
        <b-row>
            <b-col>
                <div class="left_column">
                    <div>
                        Email: {{user.email}}
                    </div>
                    <div>
                        Фамилия: {{user.firstName}}
                    </div>
                    <div>
                        Имя: {{user.lastName}}
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
</template>

<script>
import getResourses from "@/js/axiosWrapper";

export default {
    name: "cabinet",
    props:{
    
    },
    data(){
        return {
    
        }
    },
    computed: {
        user(){
            return this.$store.getters.getAccount;
        }
    },
    methods: {
        toEditPersonalDate(){
            this.$router.push({name:'personalDataEdit'})
        },
        getCabinet(){
            getResourses('GET', 'api/cabinet')
                .then((response)=>{
                    this.$store.dispatch('setCabinet', response.data)
                })
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
