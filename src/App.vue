<template>
  <div id="app">
    <Page_header class="header"/>
    <router-view class="main-wrap" />
    <Page_footer class="footer" />
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
    created() {
        this.$store.dispatch('tryLogin')
    }
}
</script>

<style>
#app {
  text-align: center;
  color: #2c3e50;
}
.header{
    top: 0;
    z-index: 1000;
    position: sticky;
    box-shadow: 0 0 3px gray;
}
.main-wrap{
    margin-left: 10%;
    margin-right: 10%;
    min-height: calc(100vh - 160px);
}
.footer{
    z-index: 100000;
    width: 100%;
    height: 70px;
    bottom: 0;
    margin-bottom: 0;
    margin-top: 20px;
    background-color: white;
}
</style>
