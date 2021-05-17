<template>
    <b-container>
        <b-row class="justify-content-md-center">
            <b-avatar :src="mediaLink(photoLink)" size="12rem"></b-avatar>
        </b-row>
        <b-row class="justify-content-md-center">
            <b-button-group>
                <b-button @click="uploadHandle" id="button_uploader">Загрузить</b-button>
                <b-form-file @change="hiddenUploadHandle" ref="hidden_uploader" class="sr-only"></b-form-file>
                <b-button :disabled="!hasAvatar" @click="confirmRemove">Удалить</b-button>
            </b-button-group>
        </b-row>
    </b-container>
</template>

<script>
import {mediaLink} from "@/js/common";

export default {
    name: "avatarEdit",
    props:{
        photoLink: String,
    },
    data(){
        return {
            mediaLink,
        }
    },
    computed: {
        hasAvatar(){
            return this.$store.state.photo == null? false : true;
        }
    },
    methods: {
        uploadHandle(){
            this.$refs['hidden_uploader'].$refs['input'].click()
        },
        confirmRemove(){
            this.$bvModal.msgBoxConfirm('Вы точно хотите удалить иозабражение?')
                .then(() => {
                    this.removeAvatar()
                })
        },
        hiddenUploadHandle(event){
            let newFile = event.target.files
            if (newFile.length > 0){
                this.$store.dispatch('auth/updateAvatar', newFile[0])
            }
        },
        removeAvatar(){
            this.$store.dispatch('auth/removeAvatar')
        }
    },
    mounted() {

    },
    created() {
    }
}

</script>

<style scoped>

</style>
