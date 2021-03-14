<template>
    <div>
        <b-table
            striped
            hover
            :fields="fields"
            :items="events"
        >
            <template #cell(actions)="row">
                <b-button @click="editEvent(row.item.id)">
                    редактировать
                </b-button>
                <b-button @click="removeEvent(row.item.id)">
                    удалить
                </b-button>
            </template>
        </b-table>
    </div>
</template>
<script>

export default {
    name: "EventsTable",
    components: {},
    props:{
        events:{
            type: Array,
            default: () => [],
        }
    },
    data(){
        return {
            fields: ["FullName", "DateStart", "DateClose", "Actions"]
        }
    },
    computed: {
    
    },
    methods: {
        removeEvent(id){
           this.$store.dispatch('removeEvent', id)
               .then(() =>
                   {setTimeout(() => {
                       this.$store.dispatch('getAllEvents')}
                       , 1000)}
               )
               .catch(error =>{
                   console.log(error)
               })
        },
        editEvent(id){
            this.$router.push({name: "eventEdit", params: {id: id}})
        }
    },
    created() {
    }
}

</script>

<style scoped>

</style>
