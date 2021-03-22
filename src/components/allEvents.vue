<template>
  <div>
    <b-navbar >
      <b-navbar-brand class="Title">
        Мероприятия
      </b-navbar-brand>
    </b-navbar>
    <div class="page-body all-events">
        <events-table
            :events="events"
            :editable="false"
        />
    </div>
  </div>
</template>

<script>
import EventsTable from "@/components/events/EventsTable";

export default {
    name: "events",
    components: {EventsTable},
  data(){
        return {
        }
    },
    computed: {
        events(){
            return this.$store.state.events
        }
    },
    methods: {

    },
    created() {
      this.$store.dispatch('getAllEvents');
    }
}

</script>

<style scoped>
.all-events{
  display: flex;
  flex-direction: column;
  border: 2px black solid;
  margin-bottom: 1em;
}
</style>
