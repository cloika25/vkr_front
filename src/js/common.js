import {base_url, base_url_media} from "@/config";

var months = [
'янв',
'фев',
'марта',
  'апр',
'мая',
'июнь',
'июля',
  'авг',
'сен',
'окт',
'ноя',
'дек'
];
import moment from "moment";
export function formatedDate(date) {
  let fDate = new Date(date)
  return moment(fDate).format('DD.MM.YYYY')
}

export function formatedShortDate(date) {
  let fDate = new Date(date)
  return moment(fDate).format('DD ') + months[fDate.getMonth()];
}

export function formatedTime(date) {
  let fDate = moment(date)
  return fDate.utc().format('HH:mm');
}

export function mediaLink(rawLink) {
  if (rawLink != null) {
    if (rawLink.includes('media')) {
      return base_url + rawLink;
    } 
      return base_url_media + rawLink
    
  } 
    return ''
  
}

export function parseFields(rawFields) {
  if (rawFields != undefined) {
    return JSON.parse(rawFields)
  } 
    return []
  

}

export function convertToJSON(allFields) {
  return JSON.stringify(allFields)
}
