import axios from "axios";
import {URL_DOMAIN} from "../constants/URL"

let token = localStorage.getItem("token");

const configHeader = {
  headers: { Authorization: "Bearer " + token },
};

export default {
    editAccount: (data) => {
        return axios.post(`${URL_DOMAIN}/api/edit`, data, configHeader);
    },

    signUp: (data) => {
        return axios.post(`${URL_DOMAIN}/api/signup`, data);
    },
    
    changePass: (data) => {
        return axios.post(`${URL_DOMAIN}/api/changepass`, data, configHeader);
    }
}