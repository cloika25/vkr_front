<template>
    <div class="dd_menu loyout_cell">
        <div class="row username">
            Тимур Рылов
        </div>
        <div class="br" />
        <div class="row">
            <router-link class="link" to="/cabinet">
                Личный кабинет
            </router-link>
        </div>
        <div class="row">
            <router-link class="link" to="/my_events">
                Мои мероприятия
            </router-link>
        </div>
        <div class="br" />
        <div class="row" @click="logout()">
            <router-link class="link" to="/">
                Выйти.
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: "dropdownMenu",
    props:{
    },
    data(){
        return {
    
        }
    },
    computed: {
    
    },
    methods: {
        logout(){
            this.$store.dispatch('logout');
            this.closeModal();
        },
        closeModal(){
            this.$emit('closeModal');
        },
        onClickOutside(event){
            if (!this.$el.contains(event.target) && event.target.id != "username"){
                this.$emit('closeModal')
            }
        }
    },
    mounted() {
        document.addEventListener('click', this.onClickOutside);
        this.$on('hook:beforeDestroy', () => document.removeEventListener('click', this.onClickOutside));
    }
}

</script>

<style scoped>
    .dd_menu{
        position: absolute;
        display: block;
        background: white;
        border: 2px grey solid;
        width: 200px;
        z-index: 100000;
    }
    .row{
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
    .br{
        position: absolute;
        width: 177px;
        height: 1px;
        margin-left: 11px;
        margin-top: 5px;

        border: 1px solid #000000;
        transform: rotate(-0.28deg);
    }
    .username{
        color: black;
    }
</style>
