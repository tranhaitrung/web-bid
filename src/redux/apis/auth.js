import axios from "axios";
import {URL_DOMAIN} from '../constants/URL';
let token = localStorage.getItem("token");

const configHeader = {
  headers: { Authorization: "Bearer " + token },
};

export default {
    login: (data) => {
        return axios.post(`${URL_DOMAIN}/api/login`, data);
    },
    signUp: (data) => {
        return axios.post(`${URL_DOMAIN}/api/signup`, data);
    },
    logOut: ()=> {
        return axios.post(`${URL_DOMAIN}/api/logout`,null, configHeader);
    },
    changePass: (data) => {
        return axios.post(`${URL_DOMAIN}/api/changepass`, data, configHeader);
    }
}