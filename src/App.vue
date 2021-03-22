<template>
  <div id="app">
    <Page_header />
    <router-view class="main-wrap" />
    <Page_footer />
  </div>
</template>

<script>
import Page_header from "@/components/pageHeader";
import Page_footer from "@/components/pageFooter";
export default {
  name: 'App',
  components: {
    Page_footer,
    Page_header
  },
    mounted() {
        this.$store.dispatch('tryLogin')
    }
}
</script>

<style>
#app {
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
.main-wrap{
  margin-left: 10%;
  margin-right: 10%;
}
</style>
