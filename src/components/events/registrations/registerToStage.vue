<!--suppress XmlInvalidId -->
<template>
  <b-container>
    <div v-if="isLoaded">
      <b-navbar>
        <b-navbar-brand>
          Регистрация на {{ stage.StageName }}
        </b-navbar-brand>
      </b-navbar>
      <div class="reg content">
        <b-row class="reg__form">
          <b-col>
            <b-row>
              <b-col>
                <label for="fio">Фамилия имя:</label>
              </b-col>
              <b-col>
                <label id="fio">{{ fio }}</label>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <label for="gender">Пол:</label>
              </b-col>
              <b-col>
                <label id="gender">{{ gender }}</label>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <label for="birthDate">Дата рождения: </label>
              </b-col>
              <b-col>
                <label id="birthDate">{{ formatedDate(birthDate) }}</label>
              </b-col>
            </b-row>
            <b-row v-for="field in addingsFields" :key="field.name">
              <b-col>
                <label>{{ field.name }}</label>
              </b-col>
              <b-col>
                <b-form-input
                  v-if="field.type == 'text'"
                  required
                  :id="field.id"
                  v-model="field.value"
                ></b-form-input>
                <b-form-textarea
                  v-else-if="field.type == 'textarea'"
                  required
                  :id="field.id"
                  v-model="field.value"
                ></b-form-textarea>
                <b-form-select
                  v-else
                  :id="field.id"
                  required
                  :options="field.options"
                  v-model="field.value"
                ></b-form-select>
              </b-col>
            </b-row>
          </b-col>
          <b-col>

          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-button
              class="reg__submit"
              @click="submit()"
            >Зарегистрироваться
            </b-button>
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
import {formatedDate, parseFields, convertToJSON} from "@/js/common";

export default {
  name: "registerToStage",
  props: {},
  data() {
    return {
      isLoaded: false,
      event: [],
      stage: [],
      author: [],
      addingsFields: [],
      formatedDate,
      convertToJSON,
    }
  },
  computed: {
    eventId() {
      return this.$route.params.id;
    },
    stageId() {
      return this.$route.params.stageId;
    },
    fio() {
      return this.$store.getters.getFIO;
    },
    gender() {
      return this.$store.getters.genderName;
    },
    birthDate() {
      return this.$store.getters.birthDate;
    }
  },
  methods: {
    getEvent() {
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
        .then((response) => {
          this.stage = response.data.filter((elem) => elem.id == this.stageId)[0];
          this.parseFieldsComp(this.stage)
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
    parseFieldsComp(stage) {
      this.addingsFields = parseFields(stage.Fields)
    },
    submit() {
      let formData = new FormData();
      formData.append("EventId", this.eventId);
      formData.append("StageId", this.stageId);
      formData.append("Fields", this.convertToJSON(this.addingsFields));
      getResourses('POST', 'api/registrationUser', formData)
        .then((response) => {
          this.$toast.success(response.data);
          this.$router.push({name: 'main_page'})
        })
        .catch((error) => {
          this.$toast.error(error.response.data)
        })
    }
  },
  created() {
    this.$store.dispatch('getCabinet')
    this.getEvent();
  }
}

</script>

<style scoped>

</style>
