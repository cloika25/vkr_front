import {base_url} from "@/config";
import axios from 'axios';

function getResourses(method = 'GET', url = '', data = {}) {
  let configuration = {
    url: base_url + url,
    method: method,
    data: data,
    headers: {}
  }
  let token = localStorage.getItem('auth_token_fqw')
  if (token !== null) {
    configuration['headers']['Authorization'] = 'Token ' + token;
  }
  return axios(configuration)
}

export default getResourses;
