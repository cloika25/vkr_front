<template>
  <b-list-group class="dd_menu loyout_cell">
    <b-list-group-item>
      {{ getName }}
    </b-list-group-item>
    <b-list-group-item>
      <router-link class="link" to="/cabinet">
        Личный кабинет
      </router-link>
    </b-list-group-item>
    <b-list-group-item>
      <router-link class="link" to="/my_events">
        Мои мероприятия
      </router-link>
    </b-list-group-item>
    <b-list-group-item @click="logout()">
      <router-link class="link" to="/">
        Выйти.
      </router-link>
    </b-list-group-item>
  </b-list-group>
</template>

<script>
export default {
  name: "dropdownMenu",
  props: {},
  data() {
    return {}
  },
  computed: {
    getName() {
      const fullName = this.$store.state.auth.firstName +
        ' ' + this.$store.state.auth.lastName
      return fullName
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logout');
      this.closeModal();
    },
    closeModal() {
      this.$emit('closeModal');
    },
    onClickOutside(event) {
      if (!this.$el.contains(event.target) && event.target.id != "username") {
        this.$emit('closeModal')
      }
    }
  },
  mounted() {
    document.addEventListener('click', this.onClickOutside);
    this.$on('hook:beforeDestroy', () =>
      document.removeEventListener('click', this.onClickOutside));
  }
}

</script>

<style scoped>
.dd_menu {
  position: absolute;
  display: block;
  background: white;
  border: 1px #9c9c9c solid;
  width: 200px;
  z-index: 100000;
}

.row {
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  display: flex;
  align-items: center;

  color: #000000;
  width: 137px;
  height: 28px;
  margin-left: 11px;
  margin-top: 8px;
}

.br {
  position: absolute;
  width: 177px;
  height: 1px;
  margin-left: 11px;
  margin-top: 5px;

  border: 1px solid #000000;
  transform: rotate(-0.28deg);
}

.username {
  color: black;
}
</style>
