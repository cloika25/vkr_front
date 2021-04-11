<template>
  <div>
    <b-navbar>
      <b-navbar-brand class="Title">
        Мероприятия
      </b-navbar-brand>
    </b-navbar>
    <div class="content all-events">
        <div v-for="event in events" :key="event.id">
            <eventCard
                :item="event"
            />
        </div>
    </div>
  </div>
</template>

<script>
import eventCard from "@/components/events/eventCard";

export default {
    name: "events",
    components: {eventCard},
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
  flex-wrap: wrap;
  border: 2px black solid;
  margin-bottom: 1em;
}
</style>
