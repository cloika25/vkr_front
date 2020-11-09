<template>
  <div>
    <div class="auth_form">
      <label class="auth row">
        <span class="field_name">Login</span>
        <input class="field_input" v-model="login">
      </label>
      <label class="auth row">
        <span class="field_name">Password</span>
        <input class="field_input" v-model="password">
      </label>
      <label id="comment" hidden>
      </label>
    </div>
    <div class="auth_form">
      <div class="auth row auth_button" @click="authorize_user">
        <span>push me</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
name: "login",
  data(){
    return {
      login: '',
      password: '',
    }
  },
  computed: {

  },
  methods: {
    close_comment(){
      var form_reg = document.getElementById("comment");
      form_reg.hidden = true;
    },
    show_comment(text){
      var form_reg = document.getElementById("comment");
      form_reg.hidden = false;
      form_reg.innerText = text;
    },
    authorize_user(){
      let body = {
        login: this.login,
        password: this.password
      }
      axios.post('http://127.0.0.1:8000/api/login', body)
          .then( response => {
            console.log(response);
            this.$store.commit('auth_user', response.data.username)
          })
          .catch(error =>{
            this.show_comment(error.data)
          })
    }
  },
}
</script>

<style scoped>
.auth_form{
  display: flex;
  align-content: center;
  flex-direction: column;
}
.auth{
  display: flex;
  justify-content: center;
}
.row{
  margin-top: 15px;
  margin-bottom: 15px;
}
.field_name{
  width: 10%;
  text-align: start;
}
.auth_button{
  background-color: darkgray;
  max-width: 150px;
  padding: 15px;
  margin-left: auto;
  margin-right: auto;
  border: 6px solid darkgrey;
  border-radius: 30px;
  cursor: pointer;
}
</style>