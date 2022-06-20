import axios from "axios";
import {URL_DOMAIN} from '../constants/URL';

let token = localStorage.getItem("token");

const configHeader = {
  headers: { Authorization: "Bearer " + token },
};

export default {
    createItem: (auctionId, data) => {
        return axios.post(`${URL_DOMAIN}/api/items/create/${auctionId}`, data, configHeader);
    },
    editItem: (itemId, data) => {
      return axios.post(`${URL_DOMAIN}/api/items/edit/${itemId}`, data, configHeader);
    },
    infoItem: (itemId) => {
      return axios.get(`${URL_DOMAIN}/api/items/info/${itemId}`, configHeader);
    }
}