import getResourses from "@/js/axiosWrapper";

class eventService {
  static getEvents() {
    return getResourses('GET', 'api/events')
  }

  static saveEvent(data) {
    let formData = new FormData()
    formData.append('Id', data.id)
    formData.append('FullName', data.FullName)
    formData.append('DateClose', data.DateClose)
    formData.append('DateStart', data.DateStart)
    formData.append('PhotoMain', data.PhotoMain)
    formData.append('PhotoPreview', data.PhotoPreview)
    formData.append('Description', data.Description)
    getResourses('PUT', 'api/update_event', formData)
  }

  static removeEvent(eventId) {
    getResourses('POST', 'api/remove_event', {id: eventId})
      .then(() =>
        setTimeout(this.$store.dispatch('dict/getEvents'), 1000))

  }
}

export default eventService;
