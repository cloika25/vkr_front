<template>
  <b-container>
    <div v-for="field in fields" :key="field.id" class="fields">
      <b-row>
        <b-col>
          <b-form-group
            label="Название поля"
            :label-for="field.id+ 'name'"
          >
            <b-form-input
              v-model="field.name"
              :id="field.id+ 'name' ">
            </b-form-input>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group
            label="Тип поля"
            :label-for="field.id+'type'"
          >
            <b-form-select
              v-model="field.type"
              :options="types"
              :id="field.id+ 'type'"
            ></b-form-select>
          </b-form-group>
        </b-col>
        <b-col class="fields__remove">
          <b-icon-x-circle
            @click="removeField(field.id)"
            scale="2"
          ></b-icon-x-circle>
        </b-col>
      </b-row>
      <b-form-row v-if="field.type =='selector'">
        <b-form-group
          label="Варианты ответа"
          :label-for="field.id + 'options'"
        >
          <b-form-tags
            :id="field.id + 'options'"
            v-model="field.options"
          ></b-form-tags>
        </b-form-group>
      </b-form-row>
    </div>
    <b-row>
      <b-icon-plus-circle
        scale="2"
        @click="addField"
        class="fields__add"
      ></b-icon-plus-circle>
    </b-row>
    <b-row>
      <b-button
        @click="submit()"
      >Сохранить
      </b-button>
    </b-row>
  </b-container>
</template>

<script>
import {parseFields, convertToJSON} from '@/js/common'
import getResourses from "@/js/axiosWrapper";

export default {
  name: "stageFields",
  props: {
    stage: Object,
    eventId: String,
  },
  data() {
    return {
      fields: [],
      types: [
{
        text: 'text',
        value: 'text'
      },
{
        text: 'textarea',
        value: 'textarea'
      },
{
        text: 'selector',
        value: 'selector'
      }
]
    }
  },
  computed: {},
  methods: {
    maxInd() {
      if (this.fields.length == 0) {
        return 0
      } else {
        return Math.max.apply(null, this.fields.map((elem) => elem.id))
      }
    },
    addField() {
      this.fields.push({id: this.maxInd() + 1, name: '', type: "text", options: []})
    },
    removeField(id) {
      this.fields = this.fields.filter(elem => elem.id != id)
    },
    submit() {
      let prepJson = convertToJSON(this.fields)
      let formData = new FormData()
      formData.append('StageId', this.stage.id);
      formData.append('Fields', prepJson);
      formData.append("EventId", this.eventId)
      getResourses('POST', 'api/updateFields', formData)
        .then(() => {
          this.$toast.success("Поля успешно изменены");
          this.$emit('close');
          this.$emit('updateStages');
        })
    }
  },
  created() {
    this.fields = parseFields(this.stage.Fields)
  }
}

</script>

<style lang="scss" scoped>

</style>
