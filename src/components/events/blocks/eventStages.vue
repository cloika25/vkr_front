<template>
  <b-card>
    <b-tabs>
      <b-tab v-for="stage in stages" :key="stage.id" :title="stage.StageName">
        <b-row>
          <b-col>
            {{formatedShortDate(stage.DateStart)}} {{formatedTime(stage.DateStart)}} - {{formatedShortDate(stage.DateEnd)}} {{formatedTime(stage.DateEnd)}}
          </b-col>
          <b-col>
            {{formats.filter(elem => elem.id == stage.FormatId)[0].name}}
          </b-col>
        </b-row>
        <b-row>
          <vue-markdown :source="stage.Description"></vue-markdown>
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

    },
    created() {
      this.$store.dispatch('dict/getFormats')
    }
}

</script>

<style scoped>
.row{
  text-align: start;
}
</style>
