import axios from "axios";
import {URL_DOMAIN} from '../constants/URL';

let token = localStorage.getItem("token");

const configHeader = {
  headers: { Authorization: "Bearer " + token },
};

export default {
    createComment: (auctionId, data) => {
        return axios.post(`${URL_DOMAIN}/api/comments/create/${auctionId}`, data, configHeader);
    },

    listComment: (auctionId, index, count) => {
        return axios.get(`${URL_DOMAIN}/api/comments/${auctionId}?index=${index}&count=${count}`, configHeader);
    },
    
    deleteComment: (commentId)=> {
        return axios.post(`${URL_DOMAIN}/api/comments/${commentId}`, configHeader);
    }
}