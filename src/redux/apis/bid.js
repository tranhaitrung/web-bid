import axios from "axios";
import {URL_DOMAIN} from '../constants/URL';
let token = localStorage.getItem("token");

const configHeader = {
  headers: { Authorization: "Bearer " + token },
};

export default {
    bid: (auctionId, data) => {
        return axios.post(`${URL_DOMAIN}/api/bids/create/${auctionId}`, data);
    },

    listBid: (auctionId) => {
        return axios.get(`${URL_DOMAIN}/api/bids/${auctionId}`);
    }

}