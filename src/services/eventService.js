import getResourses from "@/js/axiosWrapper";
import moment from 'moment'
class eventService {
  static getEvents() {
    return getResourses('GET', 'api/events')
  }

  static saveEvent(data) {
    let formData = new FormData()
    formData.append('Id', data.id)
    formData.append('FullName', data.FullName)
    formData.append('DateClose', moment(data.DateClose).format('YYYY-MM-DD') + 'T00:00Z')
    formData.append('DateStart', moment(data.DateStart).format('YYYY-MM-DD') + 'T00:00Z')
    formData.append('PhotoMain', data.PhotoMain ? data.PhotoMain : '')
    formData.append('PhotoPreview', data.PhotoPreview ? data.PhotoPreview : '')
    formData.append('Description', data.Description)
    getResourses('PUT', 'api/event/' + data.id, formData)
  }

  static removeEvent(eventId) {
    getResourses('POST', 'api/remove_event', {id: eventId})
      .then(() =>
        setTimeout(this.$store.dispatch('dict/getEvents'), 1000))

  }
}

export default eventService;
