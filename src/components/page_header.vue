<template>
  <div class="loyout">
    <div class="loyout_cell">
      <div class="cell">
        <div class="cabinet" v-if="!$store.state.isAuth">
          <router-link class="link" to="login">
            Войти
          </router-link>
          <router-link class="link" to="registration">
            Регистрация
          </router-link>
        </div>
        <div class="cabinet" v-else>
          <span class="link">
            {{$store.state.username}}
          </span>
        </div>
      </div>
      <div class="cell">
        <div class="nav_bar">
          <router-link class="link" to="main_page">
            Домой
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
name: "page_header"
}
</script>

<style scoped>
.loyout{
  width:100%;
  background-color: #282828;
  height: 70px;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.loyout_cell{
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  margin-left: 10%;
  margin-right: 10%;
}

.cell{
  display: flex;
  justify-content: center;
  vertical-align: center;
}

.nav_bar{
  font-size: 2em;
}

.link
{
  color: white;
  text-decoration: none;
  margin-right: 10px;
}

.cabinet{
  cursor: pointer;
  font-size: 1.2em;
  margin: auto;
}


</style>