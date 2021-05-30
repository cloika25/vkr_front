<template>
  <div>
    <b-table
      striped
      hover
      :fields="fields"
      :items="events"
    >
      <template #cell(actions)="row" v-if="editable">
        <b-button-group>
          <b-button @click="goToParticipants(row.item.id)">
            участники
          </b-button>
          <b-button @click="goToStages(row.item.id)">
            этапы
          </b-button>
          <b-button @click="editEvent(row.item.id)">
            редактировать
          </b-button>
          <b-button @click="removeEvent(row.item.id)">
            удалить
          </b-button>
        </b-button-group>
      </template>
    </b-table>
  </div>
</template>
<script>
import eventService from '@/services/eventService'
export default {
  name: "EventsTable",
  components: {},
  props: {
    events: {
      type: Array,
      default: () => [],
    },
    editable: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      fields: [],
    }
  },
  computed: {},
  methods: {
    removeEvent(id) {
      eventService.removeEvent(id);
    },
    editEvent(id) {
      this.$router.push({name: "eventEdit", params: {id: id}})
    },
    goToStages(id){
      this.$router.push({name: "myStages", params: {id: id}})
    },
    goToParticipants(id){
      this.$router.push({name: "eventParticipants", params: {id: id}})
    }
  },
  created() {
    this.fields = [
      {key: "FullName", label: 'Название мероприятия'},
      {key: "DateStart", label: 'Начало'},
      {key: "DateClose", label: 'Конец'},
]
    if (this.editable) {
      this.fields.push({key: "Actions", label: 'Действия'})
    }
  }
}

</script>

<style scoped>

</style>
