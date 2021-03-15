<template>
    <div class="navBar">
        <div class="loyout_cell">

            <div v-if="username != ''" class="cell">
                <nav-bar-item
                    class="link username"
                    :name = username
                />

                <div @click="logout()">
                    <nav-bar-item
                        class="link"
                        name="Выйти"
                        @click_link="logout"
                    />
                </div>
            </div>
            <div v-else class="cell">
                <nav-bar-item
                    class="link"
                    name="Войти"
                    link="login"
                />
                <nav-bar-item
                    class="link"
                    name = "Регистрация"
                    link = "registration"
                />
            </div>
            <div class="cell">
                <nav-bar-item
                    class="link"
                    name="Домой"
                    link="/"
                />
                <nav-bar-item
                    class="link"
                    name="Мероприятия"
                    link="my_events"
                />

            </div>
        </div>
    </div>
</template>

<script>
import NavBarItem from "@/components/nav-bar/NavBarItem";
export default {
    name: "NavBar",
    components: {NavBarItem},
    data(){
        return {
        }
    },
    computed: {
        username(){
            return this.$store.state.username
        }
    },
    methods: {
        logout(){
            this.$store.dispatch('logout');
        }
    },
    created() {
    }
}

</script>

<style scoped>

</style>
