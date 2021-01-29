<template>
    <div>
        <b-navbar class="page-header">
            <b-navbar-brand>
                Редактирование мероприятия
            </b-navbar-brand>
        </b-navbar>
        <b-form>
            <b-form-group>
                <div>
                    <b-form-input
                        placeholder="Название мероприятия"
                        v-model="name_event" />
                </div>
                <div>
                    <b-form-datepicker
                        placeholder="дата начала мероприятия"
                        v-model="date_start" />
                </div>
                <div>
                    <b-form-datepicker
                        placeholder="дата окончания мероприятия"
                        v-model="date_close" />
                </div>
            </b-form-group>
            <b-form-group>
                <b-button @click="createEvent()">Кликни меня </b-button>
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
