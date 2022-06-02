import axios from "axios";
import {URL_DOMAIN} from '../constants/URL';
let token = localStorage.getItem("token");

const configHeader = {
  headers: {    
    Authorization: "Bearer " + token },
};

export default {
    upfile: (data) => {
        return axios.post(`${URL_DOMAIN}/api/uploadFiles`, data, configHeader);
    },
}