<template>
  <b-card>
    <b-tabs>
      <b-tab v-for="stage in stages" :key="stage.id" :title="stage.StageName">
        <b-row class="event__stage__description">
          <vue-markdown :source="stage.Description"></vue-markdown>
        </b-row>
        <b-row class="event__stage__footer">
          <b-col>
            формат: {{formats.filter(elem => elem.id == stage.FormatId)[0].name}}
          </b-col>
          <b-col>
           Дата и время: {{formatedShortDate(stage.DateStart)}} {{formatedTime(stage.DateStart)}} - {{formatedShortDate(stage.DateEnd)}} {{formatedTime(stage.DateEnd)}}
          </b-col>
          <b-col>
            <b-button @click="toRegistration(stage.id)">
              Зарегистрироваться
            </b-button>
          </b-col>
        </b-row>
      </b-tab>
    </b-tabs>
  </b-card>
</template>

<script>
import VueMarkdown from "vue-markdown"
import {formatedShortDate, formatedTime} from "@/js/common";

export default {
    name: "eventStages",
    components: {VueMarkdown},
    props:{
      stages: Array,
    },
    data(){
        return {
          formatedShortDate,
          formatedTime,
        }
    },
    computed: {
      formats(){
        return this.$store.getters["dict/formats"];
      }
    },
    methods: {
      toRegistration(stageId){
        this.$router.push({name: 'registerToStage', params: {id: this.$route.params.id, stageId: stageId}})
      }
    },
    created() {
      this.$store.dispatch('dict/getFormats')
    }
}

</script>

<style scoped>
</style>
