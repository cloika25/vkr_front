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

import axios from "axios";
import {base_url} from "@/config";

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
            axios.post(base_url + '/remove_event', {id: id} )
                .then(
                    this.$store.dispatch('getAllEvents')
                )
                .catch(error =>{
                    console.log(error)
                })
        },
        editEvent(id){
            console.log(id);
        }
    },
    created() {
    }
}

</script>

<style scoped>

</style>
