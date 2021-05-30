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
              Email: {{ user.email }}
            </div>
            <div>
              Фамилия: {{ user.lastName }}
            </div>
            <div>
              Имя: {{ user.firstName }}
            </div>
            <div>
              Пол: {{ user.genderId == 0 ? "Не определено" : user.genderId == 1 ? 'Мужской' : 'Женский' }}
            </div>
            <div>
              Дата рождения: {{ user.birthDate }}
            </div>
          </div>
          <div class="left_column" @click="toEditPersonalDate()">
            <b-button class="left_side">
              Редактировать
            </b-button>
          </div>
        </b-col>
        <b-col>
          <avatar-edit :photoLink="user.photo"></avatar-edit>
        </b-col>
      </b-row>
      <b-row class="my_registrations">
        <b-col>
          <div>
            <span>Мои регистрации</span>
          </div>
          <div v-if="eventsAfter.length">
            <span>Уже скоро</span>
          </div>
          <b-row v-if="eventsAfter.length">
            <b-table :items="eventsAfter" :fields="headers"></b-table>
          </b-row>
          <div v-if="eventsBefore.length">
            <span>Уже прошли</span>
          </div>
          <b-row v-if="eventsBefore.length" >
            <b-table :items="eventsBefore" :fields="headers"></b-table>
          </b-row>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import AvatarEdit from "@/components/cabinet/avatarEdit";
import getResourses from "@/js/axiosWrapper";
import {formatedDate} from "@/js/common";
import moment from 'moment'
export default {
  name: "cabinet",
  components: {AvatarEdit},
  props: {},
  data() {
    return {
      loading: false,
      events: [],
      eventsAfter: [],
      eventsBefore: [],
      headers: [
        {key: 'EventName', label: 'Мероприятие'},
        {key: 'StageName', label: 'Этап'},
        {key: 'DateStart', label: 'Начало'},
        {key: 'DateEnd', label: 'Конец'},
        {key: 'FormatName', label: 'Формат'},
      ]
    }
  },
  computed: {
    user() {
      return this.$store.getters["auth/getAccount"];
    },
  },
  watch: {},
  methods: {
    refreshEvents() {
      this.eventsBefore = this.events.filter(event => moment(event.DateEnd).isBefore(moment.now()));
      this.eventsAfter = this.events.filter(event => moment(event.DateStart).isAfter(moment.now()));
      this.eventsAfter.forEach(event => {
        event.DateEnd = formatedDate(event.DateEnd)
        event.DateStart = formatedDate(event.DateStart)
      })
      this.eventsBefore.forEach(event => {
        event.DateEnd = formatedDate(event.DateEnd)
        event.DateStart = formatedDate(event.DateStart)
      })
    },
    toEditPersonalDate() {
      this.$router.push({name: 'personalDataEdit'})
    },
    getCabinet() {
      this.$store.dispatch('auth/getCabinet')
    },
    getMyRegistrations() {
      getResourses('GET', 'api/myRegistrations')
        .then((response) => {
            this.events = response.data.map(element => ({EventName: element.EventId.FullName, StageName: element.StageId.StageName,
              DateStart: element.StageId.DateStart,
              DateEnd: element.StageId.DateEnd,
              EventId: element.EventId.id, FormatName: element.StageId.FormatId.name}))
          this.refreshEvents()
          }
        )
    }
  },
  created() {
    this.getMyRegistrations()
    console.log('created')
  },
  mounted() {
    this.getCabinet();
    console.log('mounted')
  }
}

</script>

<style scoped>
.left_column {
  display: flex;
  text-align: left;
  flex-direction: column;
}

.left_side {
  width: 150px;
}
</style>
