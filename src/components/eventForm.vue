<template>
  <div>
    <b-navbar class="page-header">
      <b-navbar-brand>
        Создание нового мероприятия
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
    name: "eventForm",
    components: {
    },
    data(){
        return {
          name_event: '',
          date_start: '',
          date_close: '',
        }
    },
    computed: {
    
    },
    methods: {
      createEvent(){
        let body= {
          FullName: this.name_event,
          DateStart: this.date_start,
          DateClose: this.date_close,
        }
        this.$store.dispatch('createEvent', body)
      },
    },
    created() {
    }
}

</script>

<style scoped>

</style>
