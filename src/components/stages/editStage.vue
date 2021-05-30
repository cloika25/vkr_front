<template>
  <b-container>
    <b-row>
      <b-navbar>
        <b-navbar-brand class="Title">
          Редактирование этапа
        </b-navbar-brand>
      </b-navbar>
    </b-row>
    <b-row>
      <b-col class="content">
        <b-row>
          <b-col>
            <b-form-group
              label="Название этапа"
              label-for="StageName"
            >
              <b-form-input
                id="StageName"
                v-model="StageName"
              >
              </b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group
              label="Формат этапа"
              label-for="FormatId"
            >
              <b-form-select
                id="FormatId"
                v-model="FormatId"
                :options="FormatOptions"
              >
              </b-form-select>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-group
              label="Описание этапа"
              label-for="Desription"
            >
              <b-form-textarea
                id="Desription"
                v-model="Description"
              ></b-form-textarea>
            </b-form-group>
          </b-col>
          <b-col>
            <vue-markdown :source="Description"></vue-markdown>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-group
              label="Дата начала"
              label-for="DateStart"
            >
              <b-form-datepicker
                v-model="DateStart"
                id="DateStart"
                placeholder="Дата не выбрана"
              ></b-form-datepicker>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group
              label="Время начала"
              label-for="TimeStart"
            >
              <b-form-timepicker
                v-model="TimeStart"
                id="TimeStart"
                placeholder="Дата не выбрана"
              ></b-form-timepicker>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-group
              label="Дата окончания"
              label-for="DateClose"
            >
              <b-form-datepicker
                v-model="DateClose"
                id="DateClose"
                placeholder="Дата не выбрана"
              ></b-form-datepicker>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group
              label="Время окончания"
              label-for="TimeClose"
            >
              <b-form-timepicker
                v-model="TimeClose"
                id="TimeClose"
                placeholder="Дата не выбрана"
              ></b-form-timepicker>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-button @click="submit()">Сохранить</b-button>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>

import getResourses from "@/js/axiosWrapper";
import VueMarkdown from "vue-markdown";

export default {
  name: "editStage",
  components: {VueMarkdown},
  props: {
    eventId: String,
    stage: Object,
  },
  data() {
    return {
      StageName: '',
      Description: '',
      DateStart: null,
      TimeStart: null,
      DateClose: null,
      TimeClose: null,
      FormatId: null,
      FormatOptions: [],
    }
  },
  computed: {},
  methods: {
    getFormatOptions() {
      getResourses('GET', 'api/getFormats')
        .then((response) => {
          this.FormatOptions = response.data.map((elem) => ({text: elem.name, value: elem.id}))
        })
    },
    copyProp() {
      this.StageName = this.stage.StageName
      this.Description = this.stage.Description
      this.FormatId = this.stage.FormatId
      this.DateStart = this.stage.DateStart.slice(0, this.stage.DateStart.indexOf('T'));
      this.TimeStart = this.stage.DateStart.slice(this.stage.DateStart.indexOf('T') + 1, -1);
      this.DateClose = this.stage.DateEnd.slice(0, this.stage.DateEnd.indexOf('T'));
      this.TimeClose = this.stage.DateEnd.slice(this.stage.DateEnd.indexOf('T') + 1, -1);
    },
    submit() {
      let formData = new FormData()
      formData.append("StageId", this.stage.id)
      formData.append("StageName", this.StageName)
      formData.append("Description", this.Description)
      formData.append("FormatId", this.FormatId)
      formData.append("EventId", this.eventId)
      formData.append("DateStart", `${this.DateStart}T${this.TimeStart}`)
      formData.append("DateEnd", `${this.DateClose}T${this.TimeClose}`)
      getResourses('POST', 'api/updateStage', formData)
        .then(() => {
          this.$toast.success("Этап успешно изменен");
          this.$emit('close');
          this.$emit('updateStages');
        })
        .catch((error) => {
          this.$toast.error(error.response.data);
        })
    }
  },
  mounted() {
    this.getFormatOptions();
    this.copyProp();
  },
  created() {
  }
}

</script>

<style scoped>

</style>
