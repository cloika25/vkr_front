<template>
  <div>
    <div class="reg_form">
      <label class="registration row">
        <span class="field_name">Login</span>
        <input class="field_input" v-model="login">
      </label>
      <label class="registration row">
        <span class="field_name">Password</span>
        <input class="field_input" v-model="password">
      </label>
      <label class="registration row">
        <span class="field_name">Repeat password</span>
        <input class="field_input" v-model="confirm_password">
      </label>
      <label id="comment" hidden>
      </label>
    </div>
    <div class="reg_form">
      <div class="registration row reg_button" @click="register_new_user">
        <span>push me</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
name: "registration",
  data(){
    return{
      login: '',
      password: '',
      confirm_password: '',
    }
  },
  computed:{
    isValid() {
        if(this.login == '' || this.password == '' || this.confirm_password == ''){
          return false
        }
        else{
          if( this.password === this.confirm_password){
            return true
          }
          else{
            return false
          }
        }

    }
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
    register_new_user(){
      this.close_comment()
      if(this.isValid){
        let body = {
          login: this.login,
          password: this.password
        }
        axios.post('http://127.0.0.1:8000/api/registration', body)
        .then( response => {
          this.show_comment(response.data);
          console.log(response.data);
        })
        .catch(error =>{
          console.log(error.data)
        })
      }
    }
  }
}
</script>

<style scoped>
  .reg_form{
    display: flex;
    align-content: center;
    flex-direction: column;
  }
  .registration{
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
  .reg_button{
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