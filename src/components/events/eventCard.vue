<template>
    <div class="card_wrapper">
        <div class="card_body" :style="{backgroundImage: preview}">
            <div class="card_inner">
                <div class="card_header">
                    <span>{{item.FullName}}</span>
                </div>
                <div class="card_footer">

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {base_url_media} from "@/config";

export default {
    name: "eventCard",
    props:{
        item: Object,
    },
    data(){
        return {
            base_url_media,
        }
    },
    computed: {
        preview(){
            let url
            if (this.item.PhotoPreview != null){
                url = 'url('+ base_url_media + this.item.PhotoPreview + ')'
            }else{
                url = 'url('+ base_url_media + 'media/events/default.jpg)'
            }
            return url
        }
    },
    methods: {

    },
    created() {

    }
}

</script>

<style scoped>
    .card_wrapper{
        padding: 20px;
    }
    .card_body{
        width: 100%;
        max-width: 100%;
        position: relative;
        padding: 22px 24px 24px 24px;
        min-height: 200px;
        min-width: 250px;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        color: #ffffff;
        margin: 5px 0;
    }
    .card_body::before{
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background-image: linear-gradient(-45deg, #1e1820 0%, #1d1c26 100%);
        opacity: 0.6;
        z-index: 10;
    }
    .card_body:hover::before{
        background-image: linear-gradient(-45deg, #1e1820 0%, #1d1c26 100%);
        opacity: 0.8;
        z-index: 10;
        cursor: pointer;
    }
    .card_inner{
        position: relative;
        z-index: 12;
    }
</style>
