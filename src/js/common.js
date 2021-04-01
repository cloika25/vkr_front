import {base_url, base_url_media} from "@/config";

var months= ['янв', 'фев','марта',
    'апр','мая','июнь','июля',
    'авг','сен','окт','ноя','дек'];

export function formatedDate(date){
    let fDate = new Date(date)
    return fDate.getDay() + " " +  months[fDate.getMonth()] + " " + fDate.getFullYear()
}

export function mediaLink(rawLink){
    if (rawLink != null){
        if (rawLink.includes('media')){
            return base_url + rawLink;
        }else{
            return base_url_media + rawLink
        }
    }else{
        return ''
    }
}
