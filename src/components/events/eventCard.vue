<template>
  <div class="card_wrapper">
    <div class="card_body" :style="{backgroundImage: preview}" @click="aboutEvent()">
      <div class="card_inner">
        <div class="card_header">
          <span>{{ item.FullName }}</span>
        </div>
        <div class="card_footer">
          <div class="organizator">
            <b-avatar :src="item.AuthorUserId.photo"></b-avatar><span>{{ authorName }}</span>
          </div>
          <div class="date" v-if="dayStart != dayEnd">
            {{dayStart}} - {{dayEnd}}
          </div>
          <div class="date" v-else>
            {{dayStart}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {base_url} from "@/config";
import {formatedDate} from "@/js/common";

export default {
  name: "eventCard",
  props: {
    item: Object,
  },
  data() {
    return {
      base_url,
    }
  },
  computed: {
    dayStart() { return formatedDate(this.item.DateStart) },
    dayEnd() { return formatedDate(this.item.DateClose) },
    preview() {
      let url
      if (this.item.PhotoPreview != null) {
        url = 'url(' + this.item.PhotoPreview + ')'
      } else {
        url = 'url(' + base_url + 'media/events/default.jpg)'
      }
      return url
    },
    authorName() {
      return this.item.AuthorUserId.user.last_name + " " + this.item.AuthorUserId.user.first_name;
    }
  },
  methods: {
    aboutEvent() {
      this.$router.push({name: "eventPage", params: {id: this.item.id}});
    },
  },
  mounted() {
  }
}

</script>

<style scoped>
.card_wrapper {
  padding: 20px;
}

.card_body {
  max-width: 100%;
  position: relative;
  padding: 22px 24px 24px 24px;
  height: 250px;
  width: 300px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  color: #ffffff;
  margin: 5px 0;
}

.card_body::before {
  content: '';
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-image: linear-gradient(-45deg, #1e1820 0%, #1d1c26 100%);
  opacity: 0.6;
  z-index: 10;
}

.card_body:hover::before {
  background-image: linear-gradient(-45deg, #1e1820 0%, #1d1c26 100%);
  opacity: 0.8;
  z-index: 10;
  cursor: pointer;
}

.card_inner {
  cursor: pointer;
  position: relative;
  z-index: 12;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card_footer, .card_header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

</style>
