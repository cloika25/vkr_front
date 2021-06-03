<!--suppress XmlInvalidId -->
<template>
  <div>
    <b-navbar class="page-header">
      <b-navbar-brand>
        Создание нового мероприятия
      </b-navbar-brand>
      <b-button
        @click="linkBack()"
      >
        Назад
      </b-button>
    </b-navbar>
    <div class="content">
        <b-row>
          <b-col>
            <label for="fullName">Название мероприятия</label>
            <b-form-input
              placeholder="введите название мероприятия"
              id="fullName"
              v-model="name_event"/>
          </b-col>
          <b-col></b-col>
        </b-row>
        <b-row>
          <b-col>
            <label for="dateStart">Дата начала мероприятия</label>
            <b-form-datepicker
              placeholder="введите дату начала мероприятия"
              id="dateStart"
              v-model="date_start"/>
          </b-col>
          <b-col></b-col>
        </b-row>
        <b-row>
          <b-col>
            <label for="dateClose">Дата окончания мероприятия</label>
            <b-form-datepicker
              placeholder="введите дату окончания мероприятия"
              id="dateClose"
              v-model="date_close"/>
          </b-col>
          <b-col></b-col>
        </b-row>
      <b-row>
        <b-col>
          <label for="description">Описание мероприятия</label>
          <b-textarea
            placeholder="введите описание"
            id="description"
            v-model="description"/>
        </b-col>
        <b-col>
          <b-row>
            <span>Результат:</span>
          </b-row>
          <b-row>
            <vue-markdown :source="description"></vue-markdown>
          </b-row>
        </b-col>
      </b-row>
      <b-form-group>
        <b-button @click="createEvent()">Создать мероприятие</b-button>
      </b-form-group>
    </div>
  </div>
</template>

<script>

import VueMarkdown from "vue-markdown"

export default {
  name: "eventForm",
  components: {
    VueMarkdown},
  props: {},
  data() {
    return {
      name_event: '',
      date_start: '',
      date_close: '',
      description: '',
    }
  },
  computed: {},
  methods: {
    createEvent() {
      let body = {
        AuthorUserId: this.$store.state.auth.id,
        FullName: this.name_event,
        DateStart: new Date(this.date_start),
        DateClose: new Date(this.date_close),
        Description: this.description,
      }
      console.log('body for create', body)
      this.$store.dispatch('createEvent', body)
        .then(() => {
          this.$router.push({name: 'myEvents'})
          this.$toast.success('Мероприятие успешно создано')
        }).catch(() => {
        this.$toast.error('Произошла ошибка при создании')
      })
    },
    linkBack() {
      this.$router.back();
    },
  },
  created() {
  }
}

</script>

<style scoped>
.content {
  padding: 40px 20px
}

.row {
  margin-bottom: 10px;
}
</style>
