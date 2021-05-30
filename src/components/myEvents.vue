<template>
  <div>
    <b-navbar>
      <b-navbar-brand class="Title">
        Мои мероприятия
      </b-navbar-brand>
      <b-navbar-nav>
        <b-button @click="addEvent()">
          Добавить новое мероприятие
        </b-button>
      </b-navbar-nav>
    </b-navbar>
    <div class="content all-events">
      <events-table
        :events="events"
        :editable="true"
      />
    </div>
  </div>
</template>

<script>
import EventsTable from "@/components/events/EventsTable";
import getResourses from "@/js/axiosWrapper";
import {formatedDate} from "@/js/common";

export default {
  name: "myEvents",
  components: {EventsTable},
  props: {},
  data() {
    return {
      events: []
    }
  },
  computed: {},
  methods: {
    addEvent() {
      this.$router.push('createEvent');
    },
    getEvents() {
      getResourses('GET', 'api/my_events')
        .then((response) => {
          this.events = response.data
          this.events.forEach(event => {
            event.DateStart = formatedDate(event.DateStart);
            event.DateClose = formatedDate(event.DateClose)
          })
        })
    }
  },
  created() {
    this.getEvents();
  }
}

</script>

<style scoped>

</style>
