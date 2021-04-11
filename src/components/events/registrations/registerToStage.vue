<!--suppress XmlInvalidId -->
<template>
  <b-container>
    <div v-if="isLoaded">
      <b-navbar>
        <b-navbar-brand>
          Регистрация на {{stage.StageName}}
        </b-navbar-brand>
      </b-navbar>
      <div class="content">
        <b-row>
          <b-col>
            <b-row>
              <b-col>
                <label for="fio">Фамилия имя:</label>
              </b-col>
              <b-col>
                <b-form-input
                  id="fio"
                  v-model="fio"
                ></b-form-input>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <label for="gender">Пол:</label>
              </b-col>
              <b-col>
                <label id="gender">{{gender}}</label>
              </b-col>
            </b-row>
          </b-col>
          <b-col>

          </b-col>
        </b-row>
      </div>
    </div>
    <div v-else>
      Сейчас, сечас, погоди
    </div>
  </b-container>
</template>

<script>
import getResourses from "@/js/axiosWrapper";

export default {
    name: "registerToStage",
    props:{
    
    },
    data(){
        return {
          isLoaded: false,
          event: [],
          stage: [],
          author: [],
          addingsFields: [],
        }
    },
    computed: {
      eventId(){
        return this.$route.params.id;
      },
      stageId(){
        return this.$route.params.stageId;
      },
      fio(){
        return this.$store.getters.getFIO;
      },
      gender(){
        return this.$store.getters.genderName;
      }
    },
    methods: {
      getEvent() {
        console.log("da nu na")
        this.$store.dispatch('getEvent', this.eventId)
          .then(response => {
            this.event = response.data[0];
            this.getAuthor();
            this.getStages()
            this.isLoaded = true;
          })
          .catch(() => {
            this.$toast.error('Мероприятие не найдено')
          })
      },
      getStages() {
        let formData = new FormData()
        formData.append("EventId", this.eventId)
        getResourses('POST', 'api/stages', formData)
          .then((response)=>{
            this.stage = response.data.filter((elem) => {return elem.id == this.stageId})[0];
          })
      },
      getAuthor() {
        let body = new FormData()
        body.append("id", this.event.AuthorUserId)
        getResourses('POST', 'api/getName', body)
          .then((response) => {
            this.author = response.data
          })
      },

    },
    created() {
      this.$store.dispatch('getCabinet')
      this.getEvent();
    }
}

</script>

<style scoped>

</style>
