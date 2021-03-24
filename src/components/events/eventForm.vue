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
                <b-row>
                  <b-col>
                      <label for="fullName">Название мероприятия</label>
                  </b-col>
                  <b-col>
                      <b-form-input
                          placeholder="введите название мероприятия"
                          id="fullName"
                          v-model="name_event" />
                  </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <label for="dateStart">Дата начала мероприятия</label>
                    </b-col>
                    <b-col>
                        <b-form-datepicker
                          placeholder="введите дату начала мероприятия"
                          id="dateStart"
                          v-model="date_start" />
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <label for="dateClose">Дата окончания мероприятия</label>
                    </b-col>
                    <b-col>
                        <b-form-datepicker
                          placeholder="введите дату окончания мероприятия"
                          id="dateClose"
                          v-model="date_close" />
                    </b-col>
                </b-row>
            </b-col>
            <b-col>

            </b-col>
        </b-row>
        <b-form-group>
            <b-button @click="createEvent()">Создать мероприятие</b-button>
        </b-form-group>
    </div>
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
                this.$router.push({name: 'myEvents'})
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
.content{
    padding: 40px 20px
}
.row{
    margin-bottom: 10px;
}
</style>
