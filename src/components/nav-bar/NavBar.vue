<template>
  <div>
    <div class="navBar">
      <div class="loyout_cell">
        <div v-if="isAuth" class="cell">
          <div @click="showModal()">
            <b-avatar :src="mediaLink(avatar)"></b-avatar>
            <nav-bar-item
              id="username"
              class="link username"
              :name=username
            />
          </div>
        </div>
        <div v-else class="cell">
          <nav-bar-item
            class="link"
            name="Войти"
            link="/login"
          />
          <nav-bar-item
            class="link"
            name="Регистрация"
            link="/registration"
          />
        </div>
        <div class="cell">
          <div>
            <i class="fa fa-home" aria-hidden="true"></i>
            <nav-bar-item
              class="link"
              name="Домой"
              link="/"
            />
          </div>
          <div>
            <i class="fa fa-calendar" aria-hidden="true"></i>
            <nav-bar-item
              class="link"
              name="Мероприятия"
              link="/all_events"
            />
          </div>
        </div>
      </div>
    </div>
    <dropdown-menu
      id="dropdownMenu"
      v-if="showMenu"
      @closeModal="showModal"
    />
  </div>
</template>

<script>
import NavBarItem from "@/components/nav-bar/NavBarItem";
import dropdownMenu from "@/components/dropdownMenu";
import {mediaLink} from '@/js/common';

export default {
  name: "NavBar",
  components: {NavBarItem, dropdownMenu},
  data() {
    return {
      showMenu: false,
      botton: {},
      ddMenu: {},
      mediaLink,
    }
  },
  computed: {
    avatar() {
      return this.$store.state.photo;
    },
    username() {
      return this.$store.state.username;
    },
    isAuth() {
      return this.$store.state.auth.isAuth;
    }
  },
  methods: {
    showModal() {
      this.showMenu = this.showMenu !== true;
    },
  },
  mounted() {
  },
  created() {

  }
}

</script>

<style scoped>

</style>
