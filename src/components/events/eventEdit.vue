<template>
    <div>
        <b-navbar class="page-header">
            <b-navbar-brand>
                Редактирование мероприятия
            </b-navbar-brand>
            <b-button @click="goBack()">
                Назад
            </b-button>
        </b-navbar>
        <b-form v-if="event != []">
            <b-form-group>
                <div>
                    <b-form-input
                        placeholder="Название мероприятия"
                        v-model="event.FullName" />
                </div>
                <div>
                    <b-form-datepicker
                        placeholder="дата начала мероприятия"
                        v-model="event.DateStart" />
                </div>
                <div>
                    <b-form-datepicker
                        placeholder="дата окончания мероприятия"
                        v-model="event.DateClose" />
                </div>
            </b-form-group>
            <b-form-group>
                <b-button @click="updateEvent()">Сохранить изменения</b-button>
            </b-form-group>
        </b-form>
    </div>
</template>

<script>

export default {
    name: "eventEdit",
    props:{
    },
    data(){
        return {
            event: []
        }
    },
    computed: {
        eventId(){
            return this.$route.params.id
        },
    },
    methods: {
        goBack(){
            this.$router.push({name: "events"});
        },
        getEvent(){
            this.$store.dispatch('getEvent', this.eventId)
                .then( response =>{
                    this.event = response.data[0];
                })
        },
        updateEvent(){
            let data = {
                eventId: this.eventId,
                body: this.event
            }
            this.$store.dispatch('updateEvent', data)
                .then( () => {
                    this.goBack();
                })
                .catch((error)=>{
                    console.error(error.response);
                    this.$toast.error(error.response);
                })
        },
    },
    created() {
        this.getEvent()
    }
}

</script>

<style scoped>

</style>
