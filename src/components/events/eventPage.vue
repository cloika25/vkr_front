<template>
  <div class="page__wrapper">
    <div class="page__innner" v-if="isLoaded">
      <div class="page__banner header_banner" :style="{backgroundImage: photoHeader}">
        <div>
          <div class="page__header">
            <div class="page__header__date">
              {{ formatedDate(event.DateStart) }} - {{formatedDate(event.DateClose)}}
            </div>
            <div class="page__header__author">
              <div class="author_avatar">
                <b-avatar :src="author.photo"></b-avatar>
              </div>
              <div class="author_name">
                {{ authorName }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="page__content content">
        <div class="event__title">
          <div>{{ event.FullName }}</div>
        </div>
        <b-card class="event__description">
          <vue-markdown :source="event.Description"></vue-markdown>
        </b-card>
        <event-stages
          :stages="stages"
          v-if="stages.length != 0"
        >
        </event-stages>
        <b-card v-else>
          <span>На данное мероприятие вход свободный</span>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import {base_url} from "@/config";
import getResourses from "@/js/axiosWrapper";
import VueMarkdown from "vue-markdown"
import {formatedDate} from "@/js/common"
import EventStages from "@/components/events/blocks/eventStages";

export default {
  name: "eventPage",
  props: {},
  data() {
    return {
      event: [],
      author: [],
      stages: [],
      isLoaded: false,
      formatedDate,
    }
  },
  components: {EventStages, VueMarkdown},
  computed: {
    isActive() {
      return new Date() < this.item.DateClose
    },
    eventId() {
      return this.$route.params.id
    },
    photoHeader() {
      if (this.event.PhotoMain != undefined) {
        return "url(" + this.event.PhotoMain + ")";
      } else {
        return 'url(' + base_url + 'events/default_main.jpg)';
      }
    },
    authorName() {
      return this.author.user.last_name + " " + this.author.user.first_name;
    },

  },
  methods: {
    getEvent(eventId) {
      this.$store.dispatch('getEvent', eventId)
        .then(response => {
          this.event = response.data;
          this.author = response.data.AuthorUserId
          this.getStages()
          this.isLoaded = true;
        })
        .catch(() => {
          this.$toast.error('Мероприятие не найдено')
        })
    },
    getStages() {
      getResourses('GET', 'api/stages?EventId='+this.eventId)
        .then((response) => {
          this.stages = response.data;
        })
    }

  },
  mounted() {
    this.getEvent(this.eventId);
  },
  created() {
  }
}

</script>

<style scoped>
.author_name {
  margin-left: 5px;
}

.header_banner {
  width: 100%;
  height: 40vh;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.header_line {
  display: flex;
  justify-content: space-between;
  height: 7vh;
}

</style>
