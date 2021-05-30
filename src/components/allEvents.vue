<template>
  <div>
    <b-navbar>
      <b-navbar-brand class="Title">
        Мероприятия
      </b-navbar-brand>
    </b-navbar>
    <b-container>
      <div class="block"><span class="block_title" v-if="comingSoon.length">Скоро начнутся</span></div>
      <div class="content" v-if="comingSoon.length">
        <b-row cols="1" cols-md="2" cols-lg="3">
          <div v-for="event in comingSoon" :key="event.id">
            <b-col>
              <eventCard
                :item="event"
              />
            </b-col>
          </div>
        </b-row>
      </div>

      <div class="block"><span class="block_title" v-if="activeEvents.length">Сейчас проходят</span></div>
      <div class="content" v-if="activeEvents.length">
        <b-row cols="1" cols-md="2" cols-lg="3">
          <div v-for="event in activeEvents" :key="event.id">
            <b-col>
              <eventCard
                :item="event"
              />
            </b-col>
          </div>
        </b-row>
      </div>

      <div class="block"><span class="block_title" v-if="archiv">Уже завершились</span></div>
      <div class="content" v-if="archiv">
        <b-row cols="1" cols-md="2" cols-lg="3">
          <div v-for="event in archiv" :key="event.id">
            <b-col>
              <eventCard
                :item="event"
              />
            </b-col>
          </div>
        </b-row>
      </div>
    </b-container>
  </div>
</template>

<script>
import eventCard from "@/components/events/eventCard";
import moment from "moment";

export default {
  name: "events",
  components: {eventCard},
  data() {
    return {}
  },
  computed: {
    comingSoon() {
      return this.events.filter(event => moment(event.DateStart).isAfter(moment.now()))
    },
    activeEvents() {
      return this.events.filter(event => (moment(event.DateClose).isAfter(moment.now()) && moment(event.DateStart).isBefore(moment.now())))
    },
    archiv() {
      return this.events.filter(event => moment(event.DateClose).isBefore(moment.now()))
    },
    events() {
      return this.$store.getters["dict/events"]
    }
  },
  methods: {},
  created() {
    this.$store.dispatch('dict/getEvents');
  }
}

</script>

<style scoped>
.block {
  display: flex;
}
.block_title {
  margin-top: 10px;
  margin-bottom: 10px;
  left: 20px
}

.row {
  display: flex;
  justify-content: flex-start;
}

.content {
  position: relative;
}

.all-events {
  display: flex;
  flex-wrap: wrap;
  border: 2px black solid;
  margin-bottom: 1em;
}
</style>
