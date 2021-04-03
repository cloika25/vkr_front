<!--suppress XmlInvalidId -->
<template>
  <div v-if="isLoaded">
    <b-navbar class="page-header">
      <b-navbar-brand>
        Редактирование мероприятия
      </b-navbar-brand>
      <b-button @click="goBack()">
        Назад
      </b-button>
    </b-navbar>
    <div class="content">
      <div v-if="event != []">
        <b-row>
          <b-col>
            <b-row class="new_row">
              <b-col>
                <label for="fullName">Название мероприятия</label>
              </b-col>
              <b-col>
                <b-form-input
                  placeholder="введите название мероприятия"
                  id="fullName"
                  v-model="event.FullName"/>
              </b-col>
              <b-col></b-col>
              <b-col></b-col>
            </b-row>
            <b-row class="new_row">
              <b-col>
                <label for="dateStart">Дата начала мероприятия</label>
              </b-col>
              <b-col>
                <b-form-datepicker
                  placeholder="введите дату начала мероприятия"
                  id="dateStart"
                  v-model="event.DateStart"/>
              </b-col>
              <b-col></b-col>
              <b-col></b-col>
            </b-row>
            <b-row class="new_row">
              <b-col>
                <label for="dateClose">Дата окончания мероприятия</label>
              </b-col>
              <b-col>
                <b-form-datepicker
                  placeholder="введите дату окончания мероприятия"
                  id="dateClose"
                  v-model="event.DateClose"/>
              </b-col>
              <b-col></b-col>
              <b-col></b-col>
            </b-row>
            <b-row class="new_row">
              <b-col>
                <b-row>
                  <b-col>
                    <label for="photoPreview">Фото обложки</label>
                  </b-col>
                  <b-col>
                    <b-form-file @change="changePreviewImg"
                                 accept="image/png, image/jpg, image/jpeg"
                                 id="photoPreview"></b-form-file>
                  </b-col>
                </b-row>
              </b-col>
              <b-col>
                <b-row>
                  <span>Результат:</span>
                </b-row>
                <b-row>
                  <img v-if="event.PhotoPreview != null" class="image_preview"
                       :src="base_url+event.PhotoPreview">
                </b-row>
              </b-col>
            </b-row>
            <b-row class="new_row">
              <b-col>
                <b-row>
                  <b-col>
                    <label for="photoMain">Фото мероприятия</label>
                  </b-col>
                  <b-col>
                    <b-form-file @change="changeMainImg" accept="image/png, image/jpg, image/jpeg"
                                 id="photoMain"></b-form-file>
                  </b-col>
                </b-row>
              </b-col>
              <b-col>
                <b-row>
                  <span>Результат:</span>
                </b-row>
                <b-row>
                  <img v-if="event.PhotoMain != null" class="image_preview"
                       :src="base_url+event.PhotoMain">
                </b-row>
              </b-col>
            </b-row>
            <b-row class="new_row">
              <b-col>
                <b-row>
                  <b-col>
                    Описание мероприятия
                  </b-col>
                  <b-col>
                    <b-textarea v-model="event.Description"></b-textarea>
                  </b-col>
                </b-row>
              </b-col>
              <b-col>
                <b-row>
                  <span>Результат:</span>
                </b-row>
                <b-row>
                  <vue-markdown :source="event.Description"></vue-markdown>
                </b-row>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-button @click="updateEvent()">Сохранить изменения</b-button>
          </b-col>
        </b-row>
      </div>
    </div>
  </div>
</template>

<script>
import {base_url} from "@/config";
import VueMarkdown from "vue-markdown"

export default {
  name: "eventEdit",
  props: {},
  components: {
    VueMarkdown
  },
  data() {
    return {
      event: [],
      base_url,
      isLoaded: false,
    }
  },
  computed: {
    eventId() {
      return this.$route.params.id
    },
  },
  methods: {
    goBack() {
      this.$router.push({name: "myEvents"});
    },
    getEvent() {
      this.$store.dispatch('getEventForEdit', this.eventId)
        .then(response => {
          this.event = response.data[0];
          this.isLoaded = true;
        })
        .catch((error) => {
          this.$toast.error(error.response.data)
        })
    },
    updateEvent() {
      this.$store.dispatch('updateEvent', this.event)
        .then(() => {
          this.goBack();
        })
        .catch((error) => {
          console.error(error.response);
          this.$toast.error(error.response);
        })
    },
    changePreviewImg($event) {
      console.log($event.target.files[0])
      this.event.PhotoPreview = $event.target.files[0]
      console.log("photoPreview", this.event.PhotoPreview)
    },
    changeMainImg($event) {
      console.log($event.target.files[0])
      this.event.PhotoMain = $event.target.files[0]
      console.log("photoMain", this.event.PhotoMain)
    }
  },
  created() {
    this.getEvent()
  }
}

</script>

<style scoped>
.image_preview {
  max-width: 300px;
  max-height: 250px;
}
</style>
