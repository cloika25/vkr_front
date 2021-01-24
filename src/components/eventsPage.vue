<template>
  <div>
    <b-navbar >
      <b-navbar-brand class="Title">
        Мои мероприятия
      </b-navbar-brand>
        <b-navbar-nav>
            <b-button @click="addEvent()">
                Добавить новое мероприятие
            </b-button>
        </b-navbar-nav>
    </b-navbar>
    <div class="page-body all-events">
        <events-table
            :events="events"
        />
    </div>
  </div>
</template>

<script>
import EventsTable from "@/components/events/EventsTable";

export default {
    name: "evetns",
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
        addEvent(){
            this.$router.push('createEvent');
        }
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
