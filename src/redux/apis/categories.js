import axios from "axios";
import {URL_DOMAIN} from '../constants/URL';
let token = localStorage.getItem("token");

const configHeader = {
  headers: { Authorization: "Bearer " + token },
};

export default {
    listCategory: () => {
        return axios.get(`${URL_DOMAIN}/api/categories`);
    },
}