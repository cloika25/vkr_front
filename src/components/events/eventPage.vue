<template>
  <div class="page__wrapper">
    <div class="page__innner" v-if="isLoaded">
      <div class="page__banner header_banner" :style="{backgroundImage: photoHeader}">
        <div >
          <div class="page__header">
            <div class="page__header__date">
              {{ formatedDate(event.DateStart) }}
            </div>
            <div class="page__header__author">
              <div class="author_avatar">
                <b-avatar :src="mediaLink(author.photo)"></b-avatar>
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
        <div class="event__description">
          <vue-markdown :source="event.Description"></vue-markdown>
        </div>
        <event-stages
          :stages="stages"
          v-if="stages.length != 0"
        >
        </event-stages>
      </div>
    </div>
  </div>
</template>

<script>
import {base_url} from "@/config";
import getResourses from "@/js/axiosWrapper";
import VueMarkdown from "vue-markdown"
import {formatedDate} from "@/js/common"
import {mediaLink} from "@/js/common";
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
      mediaLink,
    }
  },
  components: {EventStages, VueMarkdown},
  computed: {
    eventId() {
      return this.$route.params.id
    },
    photoHeader() {
      if (this.event.PhotoMain != undefined) {
        return "url(" + base_url + this.event.PhotoMain + ")";
      } else {
        return "url(" + base_url + "media/events/default_main.jpg)"
      }
    },
    authorName() {
      return this.author.lastName + " " + this.author.firstName;
    },

  },
  methods: {
    getEvent(eventId) {
      this.$store.dispatch('getEvent', eventId)
        .then(response => {
          this.event = response.data[0];
          this.getAuthor();
          this.getStages()
          this.isLoaded = true;
        })
        .catch(() => {
          this.$toast.error('Мероприятие не найдено')
        })
    },
    getAuthor() {
      let body = new FormData()
      body.append("id", this.event.AuthorUserId)
      getResourses('POST', 'api/getName', body)
        .then((response) => {
          this.author = response.data
        })
    },
    getStages() {
      let formData = new FormData()
      formData.append("EventId", this.eventId)
      getResourses('POST', 'api/stages', formData)
        .then((response)=>{
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
