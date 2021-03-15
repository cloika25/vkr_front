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
        <b-button @click="createEvent()">Создать мероприятие</b-button>
      </b-form-group>
    </b-form>
  </div>
</template>

<script>

export default {
    name: "eventForm",
    components: {
    },
    props:{

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
            .then(()=>{
                this.$router.push('my_events')
                this.$toast.success('Мероприятие успешно создано')
            }).catch(()=>{
                this.$toast.error('Произошла ошибка при создании')
            })
      },
      linkBack(){
          this.$router.push({name: "events"})
      },
    },
    created() {
    }
}

</script>

<style scoped>

</style>
