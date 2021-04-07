<template>
  <b-container>
    <b-row>
      <b-navbar>
        <b-navbar-brand class="Title">
          Этапы мероприятия
        </b-navbar-brand>
        <b-navbar-nav>
          <b-button @click="addStage()">
            Добавить новый этап
          </b-button>
          <b-button @click="goBack()">
            Назад
          </b-button>
        </b-navbar-nav>
      </b-navbar>
    </b-row>
    <b-row class="content" v-if="isLoaded">
      <div v-if="stages.length == 0">Этапы еще не созданы</div>
      <b-table
        v-else
        striped
        hover
        :fields="headers"
        :items="stages"
      >
        <template #cell(Actions)="row">
          <b-button-group>
            <b-button
              v-b-tooltip.hover title="Дополнительные поля для регистрации"
              @click="addFieldsForRegister(row.item.id)">
              Доп. поля
            </b-button>
            <b-button @click="editStage(row.item.id)">
              Изменить
            </b-button>
            <b-button @click="removeStage(row.item.id)">
              Удалить
            </b-button>
          </b-button-group>
        </template>
      </b-table>
    </b-row>
    <b-modal id="editStage" hide-footer>
      <edit-stage
        :eventId = eventId
        :stage = editingStage
        @close="closeModal"
        @updateStages="getStages"
      >

      </edit-stage>
    </b-modal>
    <b-modal id="createStage" hide-footer>
      <create-stage
        :eventId = eventId
        @close="closeModal"
        @updateStages="getStages"
      >
      </create-stage>
    </b-modal>
  </b-container>
</template>

<script>
import getResourses from "@/js/axiosWrapper";
import CreateStage from "@/components/stages/createStage";
import EditStage from "@/components/stages/editStage";
export default {
  name: "allStages",
  components: {EditStage, CreateStage, },
  props: {},
  data() {
    return {
      stages: [],
      isLoaded: false,
      modal: false,
      editingStageId: null,
      headers: [{
        key: "id",
        label: "Id"
      },{
        key: "StageName",
        label: "Название",
      },{
        key: "DateStart",
        label: "Дата начала",
      },{
        key: "DateEnd",
        label: "Дата окончания",
      },{
        key: "Actions",
        label: "Действия"
      }],
    }
  },
  computed: {
    eventId(){
      return this.$route.params.id
    },
    editingStage(){
      return this.stages.filter((elem)=> elem.id == this.editingStageId)[0]
    }
  },
  methods: {
    getStages(){
      let formData = new FormData()
      formData.append("EventId", this.eventId)
      getResourses('POST', 'api/stages', formData)
        .then((response)=>{
          this.stages = response.data;
          this.isLoaded = true;
        })
    },
    addStage(){
      this.$bvModal.show('createStage');
    },
    closeModal(){
      this.$bvModal.hide('editStage');
      this.$bvModal.hide('createStage');
    },
    goBack(){
      this.$router.push({name: 'myEvents'});
    },
    addFieldsForRegister(id){
      return id;
    },
    editStage(id){
      this.editingStageId = id;
      this.$bvModal.show('editStage');
    },
    removeStage(id){
      this.$bvModal.msgBoxConfirm("Вы точно хотите удалить этап?")
      .then(()=>{
        let formData = new FormData()
        formData.append("EventId", this.eventId)
        formData.append("StageId", id)
        getResourses('POST', 'api/removeStage', formData)
        .then(()=>{
          this.getStages();
          this.$toast.success('Этап успешно удален');
        })
        .catch((error)=>{
          this.$toast.error(error.response.data)
        })
      })
    }
  },
  created() {
    this.getStages()
  }
}

</script>

<style scoped>

</style>
