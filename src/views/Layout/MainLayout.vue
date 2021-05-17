<template>
  <div>
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
    if (!this.$store.getters["auth/isAuth"]){
      this.$router.push("/login")
    }
  }
}

</script>

<style scoped>
.main_wrapper{
  height: calc(100vh - 160px);
}
.header{
  top: 0;
  z-index: 1000;
  position: sticky;
  box-shadow: 0 0 3px gray;
}
.footer{
  z-index: 100000;
  height: 70px;
  bottom: 0;
  margin-bottom: 0;
  margin-top: 20px;
  background-color: white;
}
</style>
