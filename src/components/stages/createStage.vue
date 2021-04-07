<!--suppress XmlInvalidId -->
<template>
  <b-container>
    <b-row>
      <b-navbar>
        <b-navbar-brand class="Title">
          Новый этап
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
        <b-row >
          <b-col>
            <b-button @click="submit()">Добавить</b-button>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import getResourses from "@/js/axiosWrapper";
export default {
    name: "CreateStage",
    components: {VueMarkdown},
    props:{
      eventId: Object
    },
    data(){
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
    computed: {
    
    },
    methods: {
      getFormatOptions(){
          getResourses('GET', 'api/getFormats')
            .then((response) =>{
              this.FormatOptions = response.data.map((elem)=>{return {text: elem.name, value: elem.id}})
            })
      },
      submit(){
        let formData = new FormData()
        formData.append("StageName", this.StageName)
        formData.append("Description", this.Description)
        formData.append("FormatId", this.FormatId)
        formData.append("EventId", this.eventId)
        formData.append("DateStart", `${this.DateStart}T${this.TimeStart}`)
        formData.append("DateEnd", `${this.DateClose}T${this.TimeClose}`)
        getResourses('PUT', 'api/createStage', formData)
        .then(()=>{
          this.$toast.success("Этап успешно создан");
          this.$emit('close');
          this.$emit('updateStages');
        })
        .catch((error)=>{
          this.$toast.error(error.response.data);
        })
      }
    },
    mounted() {
      this.getFormatOptions()
    }
}

</script>

<style scoped>
  /*.content .row{*/
  /*  border: 1px #d4d3d3 solid;*/
  /*  padding: 5px;*/
  /*}*/
</style>
