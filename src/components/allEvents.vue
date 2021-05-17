<template>
  <div>
    <b-navbar>
      <b-navbar-brand class="Title">
        Мероприятия
      </b-navbar-brand>
    </b-navbar>
    <div class="content">
      <b-row cols="1" cols-md="2" cols-lg="3">
        <div v-for="event in events" :key="event.id">
          <b-col>
            <eventCard
              :item="event"
            />
          </b-col>
        </div>
      </b-row>
    </div>
  </div>
</template>

<script>
import eventCard from "@/components/events/eventCard";

export default {
  name: "events",
  components: {eventCard},
  data() {
    return {}
  },
  computed: {
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
.row {
  display: flex;
  justify-content: flex-start;
}
.all-events {
  display: flex;
  flex-wrap: wrap;
  border: 2px black solid;
  margin-bottom: 1em;
}
</style>
