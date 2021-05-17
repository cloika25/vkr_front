<!--suppress XmlInvalidId -->
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
        <div class="content personal_data">
            <b-row>
                <b-col>
                    <div>
                        <b-row>
                            <b-col>
                                <label for="lastName">Фамилия</label>
                            </b-col>
                            <b-col>
                                <b-form-input id="lastName" v-model="user.lastName"></b-form-input>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                                <label for="firstName">Имя</label>
                            </b-col>
                            <b-col>
                                <b-form-input id="firstName" v-model="user.firstName"></b-form-input>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                                <label for="email">Email</label>
                            </b-col>
                            <b-col>
                                <b-form-input id="email" v-model="user.email"></b-form-input>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                                <label for="gender">Пол</label>
                            </b-col>
                            <b-col>
                                <b-radio-group id="gender" v-model="user.genderId">
                                    <b-radio value="1">Мужской</b-radio>
                                    <b-radio value="2">Женский</b-radio>
                                </b-radio-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                                <label for="birthDate">Дата рождения</label>
                            </b-col>
                            <b-col>
                                <b-form-datepicker v-model="user.birthDate"></b-form-datepicker>
                            </b-col>
                        </b-row>
                    </div>
                </b-col>
                <b-col>
                    {{user}}
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-button @click="saveChanges()">
                        Сохранить изменения
                    </b-button>
                </b-col>
            </b-row>
        </div>
    </div>
</template>

<script>
import getResourses from "@/js/axiosWrapper";

export default {
    name: "personalDataEdit",
    props:{
    
    },
    data(){
        return {
            user:{
                firstName: '',
                lastName: '',
                email: '',
                genderId: 0,
                birthDate: null,
            }
        }
    },
    computed: {
    },
    methods: {
        saveChanges(){
            getResourses('POST', 'api/editPersonalData', {body: this.user})
                .then(()=>{
                    this.$toast.success('Изменения успешно сохранены');
                    this.$router.push({name: 'cabinet'});
                })
            .catch((error)=>{
                this.$toast.error(error.response);
            })
        },
        copyUser(){
            this.user = this.$store.getters["auth/getAccount"];
        }
    },
    mounted(){
        if(!this.$store.state.auth.isAuth){
            this.$store.dispatch('auth/getCabinet')
                .then(()=>{
                    this.copyUser()
                })
        }else{
            this.copyUser()
        }
    },
    created() {
    }
}

</script>

<style scoped>

</style>
