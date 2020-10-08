import axios from 'axios';
import { URL_SERVER } from './config';

export default function request(method, route, data, methods = {}) {
    return new Promise((resolve, reject) => {
        const config = {
            method,
            url: `${URL_SERVER}/${route}`,
            data
        }

        return axios(config)
            .then(res =>{ 
                console.log('res', res)
                resolve(res.data);
                return methods.set(res.data.data);
            })
            .catch(err => {
                console.log('err', err.data)
                if (err.data) {
                    reject(err.data)
                }
            })
    });

}