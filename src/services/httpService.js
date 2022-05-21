
import axios from 'axios';

import * as c from '../constants';

export async function post(url,data){
    try{
        const options = this.getHeaders();
        console.log("data:" + JSON.stringify(data));
        console.log("options:" + JSON.stringify(options));
        console.log("url:" + url);
        let res = await axios.post(url, data, options);

        return res.data;
    }catch (e) {
        console.log("error:" + JSON.stringify(e));
       // throw handler(e);
    }
}


export async function updateProfile(userId, data){
    try{
        const options = {
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data"
            }
        };

        const form_data = new FormData();
        for ( let key in data )
            form_data.append(key, data[key]);

        let res = await axios.put(`${c.UPDATE_PROFILE}/${userId}`, form_data, options);
        return res.data;
    }catch (e) {
        throw handler(e);
    }
}

export function getHeaders(){

    let options = {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin" : '*'
        }
    };
    var token = localStorage.getItem('token');
    if(token!=null && token!=''){   
        let auth = { 'Authorization': 'Bearer '+ token };
        options.headers.append(auth);
    }
    return options;
}

export function handler(err) {
    let error = err;

    if (err.response && err.response.data.hasOwnProperty("message"))
        error = err.response.data;
    else if (!err.hasOwnProperty("message")) error = err.toJSON();

    return new Error(error.message);
}
