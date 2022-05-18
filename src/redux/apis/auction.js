import axios from "axios";
import {URL_DOMAIN} from "../constants/URL"
let token = localStorage.getItem("token");

const configHeader = {
  headers: { Authorization: "Bearer " + token },
};

export default {
    createAuction: (data) => {
        return axios.post(`${URL_DOMAIN}/api/auctions/create`, data, configHeader);
    },

    editAuction: (auctionId, data) => {
        return axios.post(`${URL_DOMAIN}/api/auctions/edit/${auctionId}`, data, configHeader);
    },

    listAuction: (index, count) => {
        return axios.get(`${URL_DOMAIN}/api/auctions?index=${index}&count=${count}`, configHeader);
    },

    listAuctionByStatus: (statusId,index, count) => {
        return axios.get(`${URL_DOMAIN}/api/auctions/listAuctionsByStatus/${statusId}?index=${index}&count=${count}`);
    },

    listAcutionByUser: (statusId, index, count) => {
        return axios.get(`${URL_DOMAIN}/api/auctions/listAuctionsByUser/${statusId}?index=${index}&count=${count}`, configHeader);
    },

    listAuctionByCategory: (categoryId, index, count) => {
        return axios.get(`${URL_DOMAIN}/api/auctions/listAuctions/${categoryId}?index=${index}&count=${count}`);
    },

    listAuctionUserLiked: (index, count) => {
        return axios.get(`${URL_DOMAIN}/api/likes?index=${index}&count=${count}`, configHeader);
    },

    auctionDetail: (auctionId) => {
        return axios.get(`${URL_DOMAIN}/api/auctions/detail/${auctionId}`);
    },

    likeAuction: (auctionId)=> {
        return axios.get(`${URL_DOMAIN}/api/updateLike/${auctionId}`, configHeader);
    },

    totalLikeAuction: (auctionId) => {
        return axios.get(`${URL_DOMAIN}/api/totalLikes/${auctionId}`, configHeader);
    },

    listBid: (auctionId, index, count) => {
        return axios.get(`${URL_DOMAIN}/api/bids/${auctionId}?index=${index}&count=${count}`, configHeader);
    }
}