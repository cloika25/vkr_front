<template>
  <div>
    <b-navbar>
      <b-navbar-brand class="Title">
        Список участников
      </b-navbar-brand>
      <b-button
        @click="linkBack()"
      >
        Назад
      </b-button>
    </b-navbar>
    <div class="content all-events" v-if="isLoaded">
      <b-table
        :items="filteredParticipants"
        :fields="filteredHeaders"
      >
      </b-table>
    </div>
  </div>
</template>

<script>
import getResourses from "@/js/axiosWrapper";
import {parseFields} from "@/js/common";

export default {
  name: "eventParticipants",
  props: {},
  data() {
    return {
      isLoaded: false,
      participants: [],
    }
  },
  computed: {
    eventId() {
      return this.$route.params.id;
    },
    filteredHeaders() {
      let result = [
        {
          key: 'StageName',
          label: 'Название этапа'
        },
        {
          key: 'EventName',
          label: 'азвание мероприятия'
        }
      ]
      parseFields(this.participants[0].Fields).forEach((field) => {
        result.push({key: 'field' + field.name, label: field.name})
      })
      console.log(result)
      return result
    },
    filteredParticipants() {
      return this.participants.map((participant) => {
        let result = {}
        result['id'] = participant.id;
        result['StageName'] = participant.StageName;
        result['EventName'] = participant.EventName;
        let fields = parseFields(participant.Fields);
        fields.forEach((field) =>
          result['field' + field.name] = field.value)
        return result
      })
    }
  },
  methods: {
    linkBack(){
      this.$router.push({name: 'myStages', params: { id: this.eventId}})
    },
    getParticipants() {
      let formData = new FormData()
      formData.append("EventId", this.eventId);
      getResourses('POST', 'api/getParticipants', formData)
        .then((response) => {
          this.participants = response.data;
          this.isLoaded = true;
        })
    }
  },
  created() {
    this.getParticipants();
  }
}

</script>

<style scoped>

</style>
