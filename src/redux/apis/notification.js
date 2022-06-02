import axios from "axios";
import {URL_DOMAIN} from '../constants/URL';

let token = localStorage.getItem("token");

const configHeader = {
  headers: { Authorization: "Bearer " + token },
};

export default {
    getNews: (page, limit) => {
        return axios.get(`${URL_DOMAIN}/api/news?index=${page}&count=${limit}`, configHeader)
    },
    readNews: (newsId) => {
        return axios.get(`${URL_DOMAIN}/api/news/read/${newsId}`, configHeader)
    },

    getNotifications: (isNotRead, page, limit) => {
        return axios.get(`${URL_DOMAIN}/api/notifications?is_not_read=${isNotRead}&index=${page}&count=${limit}`, configHeader)
    },
    readNotification: (auctionDenyId) => {
        return axios.get(`${URL_DOMAIN}/api/notifications/read/${auctionDenyId}`, configHeader)
    },
    deleteNofitication: (auctionDenyId) => {
        return axios.post(`${URL_DOMAIN}/api/notifications/delete/${auctionDenyId}`, configHeader)
    }
}