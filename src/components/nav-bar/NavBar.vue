<template>
    <div>
        <div class="navBar">
            <div class="loyout_cell">
                <div v-if="isAuth" class="cell">
                    <div @click="showModal()">
                        <nav-bar-item
                            id="username"
                            class="link username"
                            :name = username
                        />
                    </div>
                </div>
                <div v-else class="cell">
                    <nav-bar-item
                        class="link"
                        name="Войти"
                        link="/login"
                    />
                    <nav-bar-item
                        class="link"
                        name = "Регистрация"
                        link = "/registration"
                    />
                </div>
                <div class="cell">
                    <div>
                        <i class="fa fa-home" aria-hidden="true"></i>
                        <nav-bar-item
                            class="link"
                            name="Домой"
                            link="/"
                        />
                    </div>
                    <div>
                        <i class="fa fa-calendar" aria-hidden="true"></i>
                        <nav-bar-item
                            class="link"
                            name="Мероприятия"
                            link="/all_events"
                        />
                    </div>
                </div>
            </div>
        </div>
        <dropdown-menu
            id="dropdownMenu"
            v-if="showMenu"
            @closeModal="showModal"
        />
    </div>
</template>

<script>
import NavBarItem from "@/components/nav-bar/NavBarItem";
import dropdownMenu from "@/components/dropdownMenu";
export default {
    name: "NavBar",
    components: {NavBarItem, dropdownMenu},
    data(){
        return {
            showMenu: false,
            botton: {},
            ddMenu: {},
        }
    },
    computed: {
        username(){
            return this.$store.state.username
        },
        isAuth(){
            return this.$store.state.isAuth
        }
    },
    methods: {
        showModal(){
            this.showMenu = this.showMenu !== true;
        },
    },
    mounted(){
    },
    created() {

    }
}

</script>

<style scoped>

</style>
