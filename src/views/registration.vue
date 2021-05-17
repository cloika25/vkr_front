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
    </div>
    <div class="reg_form">
      <div class="registration row reg_button" @click="register_new_user">
        <span>register</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "registration",
  data() {
    return {
      login: '',
      password: '',
      confirm_password: '',
    }
  },
  computed: {
    isValid() {
      if (this.login == '' || this.password == '' || this.confirm_password == '') {
        return false
      } else {
        return this.password === this.confirm_password;
      }
    }
  },
  methods: {
    register_new_user() {
      if (this.isValid) {
        this.$store.dispatch('auth/registration',
          {
            username: this.login,
            password: this.password
          })
      }
    }
  }
}
</script>

<style scoped>
.reg_form {
  display: flex;
  align-content: center;
  flex-direction: column;
}

.registration {
  display: flex;
  justify-content: center;
}

.row {
  margin-top: 15px;
  margin-bottom: 15px;
}

.field_name {
  width: 10%;
  text-align: start;
}

.reg_button {
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
