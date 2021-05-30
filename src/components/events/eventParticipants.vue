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
          key: 'UserName',
          label: 'Имя пользователя'
        },
        {
          key: 'StageName',
          label: 'Название этапа'
        },
        {
          key: 'EventName',
          label: 'Название мероприятия'
        },
      ]
      parseFields(this.participants[0].Fields).forEach((field) => {
        result.push({key: 'field' + field.name, label: field.name})
      })
      return result
    },
    filteredParticipants() {
      return this.participants.map((participant) => {
        let result = {}
        result['id'] = participant.id;
        result['UserName'] = participant.UserId.user.last_name + ' ' + participant.UserId.user.first_name;
        result['StageName'] = participant.StageId.StageName;
        result['EventName'] = participant.EventId.FullName;
        let fields = parseFields(participant.Fields);
        fields.forEach((field) =>
          result['field' + field.name] = field.value)
        return result
      })
    }
  },
  methods: {
    linkBack() {
      this.$router.push({name: 'myStages', params: {id: this.eventId}})
    },
    getParticipants() {
      getResourses('GET', 'api/participants?EventId=' + this.eventId)
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
