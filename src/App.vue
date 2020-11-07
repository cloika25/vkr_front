<template>
  <div id="app">
<!--    <img alt="Vue logo" src="./assets/logo.png">-->
    <Page_header></Page_header>
    <router-view></router-view>
    <Page_footer></Page_footer>
  </div>
</template>

<script>

import Page_header from "@/components/page_header";
import Page_footer from "@/components/page_footer";
import "@/css/app.css";
export default {
  name: 'App',
  components: {
    Page_footer,
    Page_header
  }
}
</script>

<style>
#app {
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

</style>
