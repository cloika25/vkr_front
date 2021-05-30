<template>
  <div class="layout_body">
    <PageHeader class="header"/>
    <b-container class="main_wrapper">
      <router-view></router-view>
    </b-container>
    <PageFooter class="footer"/>
  </div>
</template>

<script>
import PageHeader from "@/components/pageHeader";
import PageFooter from "@/components/pageFooter";

export default {
  name: "MainLayout",
  components: {
    PageFooter,
    PageHeader
  },
  props: {},
  data() {
    return {}
  },
  computed: {},
  methods: {},
  created() {
    const token = localStorage.getItem('auth_token_fqw')
    if (!token) {
      this.$router.push({name: 'login'});
    } else {
      this.$store.dispatch('auth/getCabinet')
    }
  }
}

</script>

<style scoped>
.layout_body{
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.main_wrapper{
  flex: 1;
  height: calc(100vh - 160px);
}
.header{
  top: 0;
  z-index: 1000;
  position: sticky;
  box-shadow: 0 0 3px gray;
}
.footer{
  flex-shrink: 0;
  margin-top: 20px;
  z-index: 100000;
  height: 50px;
  background-color: white;
  margin-bottom: 0;
}
</style>
