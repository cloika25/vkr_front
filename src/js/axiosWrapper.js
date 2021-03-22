import {base_url} from "@/config";
import store from "@/store/index"
import axios from 'axios';

function getResourses(method = 'GET', url = '', config = {}){
    var configuration = {
        url: base_url + url,
        method: method,
        data: config,
    }
    // console.log(url, store.state.token)
    if (store.state.token != ''){
        configuration['headers'] = {'Authorization': 'Token ' + store.state.token};
    }
    return axios(configuration)
}

export default getResourses;

// const fetchResource = (path, customOptions = {}, resource = '/web/?url=') => {
//     const DNSID = new URL(window.location).searchParams.get('DNSID');
//
//     const options = {
//         method: 'GET',
//         credentials: 'same-origin',
//         headers: {
//             'X-Requested-With': 'XMLHttpRequest',
//             'Content-Type': customOptions.method === 'POST' ? 'application/json' : undefined,
//         },
//         ...customOptions,
//         body: JSON.stringify(customOptions.body),
//     };
//
//     return fetch(`${resource}${path}&DNSID=${DNSID}`, options)
//         .then(async (response) => {
//             if (response.status < 200 || response.status >= 300) {
//                 console.error('Ошибка:', response);
//                 return;
//             }
//
//             const {
//                 state,
//                 data,
//                 errors,
//             } = await response.json();
//
//             if (state) {
//                 return data;
//             }
//
//             if (!state && data) {
//                 return data;
//             }
//
//             console.error('Ошибка:', errors);
//             throw errors;
//         });
// };
//
// export default fetchResource;
