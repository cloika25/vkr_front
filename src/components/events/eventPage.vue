<template>
    <div class="page_wrapper">
        <div class="page_inner" v-if="event!=[]">
            <div class="content">
                <div class="header_line">
                    <div class="event_date">
                        {{ formatedDate(event.DateStart) }}
                    </div>
                    <div class="author">
                        {{ authorName }}
                    </div>
                </div>
            </div>
            <div class="header_banner" :style="{backgroundImage: photoHeader}">

            </div>
            <div class="content">
                <div class="event_title">
                    <div>{{event.FullName}}</div>
                </div>
                <div class="discription">
                    <vue-markdown :source="event.Description"></vue-markdown>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {base_url_media} from "@/config";
import getResourses from "@/js/axiosWrapper";
import VueMarkdown from "vue-markdown"

export default {
    name: "eventPage",
    props:{
    },
    data(){
        return {
            event: [],
            author: [],
            months: ['янв', 'фев','марта',
                'апр','мая','июнь','июля',
                'авг','сен','окт','ноя','дек']
        }
    },
    components:{VueMarkdown},
    computed: {
        eventId(){
            return this.$route.params.id
        },
        photoHeader(){
            if(this.event.PhotoMain != undefined){
                return "url(" + base_url_media+ this.event.PhotoMain + ")";
            }else{
                return "url(" + base_url_media + "media/events/default_main.jpg)"
            }
        },
        authorName(){
            return this.author.lastName + " " + this.author.firstName;
        },

    },
    methods: {
        getEvent(eventId){
            this.$store.dispatch('getEvent', eventId)
                .then( response =>{
                    this.event = response.data[0];
                    this.getAuthor();
                })
                .catch(()=>{
                    this.$toast.error('Мероприятие не найдено')
                })
        },
        getAuthor(){
            let body = new FormData()
            body.append("id", this.event.AuthorUserId)
            getResourses('POST', 'api/getName', body)
                .then((response)=>{
                    this.author = response.data
                })
        },
        formatedDate(date){
            let fDate = new Date(date)
            return fDate.getDay() + " " +  this.months[fDate.getMonth()] + " " + fDate.getFullYear()
        }
    },
    mounted(){
        this.getEvent(this.eventId);
    }
}

</script>

<style scoped>
    .header_banner{
        width: 100%;
        height: 40vh;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
    }
    .event_title{
        display: flex;
        font-size: 1.875rem;
        padding-left: 2rem;
        margin: 0 0 1.875rem 0;
        text-transform: uppercase;
        font-weight: 900;
        word-wrap: break-word;
        letter-spacing: 1.6px;
    }
    .header_line{
        display: flex;
        justify-content: space-between;
        height: 7vh;
    }
    .event_date{
        display: flex;
        align-items: center;
        width: 30%;
        padding: 5px 10px;
        background-color: #cdcccc;
    }
    .author{
        display: flex;
        align-items: center;
        justify-content: flex-end;
        width: 30%;
        padding: 5px 10px;
        background-color: #cdcccc;
    }
    .discription{
        padding-left: 2rem;
        padding-bottom: 2rem;
        text-align: start;
    }
</style>
