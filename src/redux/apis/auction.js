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

    deleteAuction: (auctionId) => {
        return axios.post(`${URL_DOMAIN}/api/auctions/deleteAuction/${auctionId}`,null, configHeader);
    },

    listAuction: (statusId,index, count, userId, typeId, categoryId) => {
        return axios.get(`${URL_DOMAIN}/api/auctions/${statusId}?index=${index}&count=${count}&user_id=${userId}&type=${typeId}&category_id=${categoryId}`, configHeader);
    },

    searchAuction: (type,key) => {
        return axios.get(`${URL_DOMAIN}/api/search?type=${type}&key=${key}`, configHeader);
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
        return axios.get(`${URL_DOMAIN}/api/auctions/detail/${auctionId}`, configHeader);
    },

    likeAuction: (auctionId)=> {
        return axios.post(`${URL_DOMAIN}/api/updateLike/${auctionId}`, '', configHeader);
    },

    totalLikeAuction: (auctionId) => {
        return axios.get(`${URL_DOMAIN}/api/totalLikes/${auctionId}`, configHeader);
    },

    listBid: (auctionId, index, count) => {
        return axios.get(`${URL_DOMAIN}/api/bids/${auctionId}?index=${index}&count=${count}`, configHeader);
    },

    bid: (auctionId, data) => {
        return axios.post(`${URL_DOMAIN}/api/bids/create/${auctionId}`, data, configHeader);
    },
    
    acceptHighestBid: (auctionId, data) => {
        return axios.post(`${URL_DOMAIN}/api/accept/${auctionId}`, data, configHeader);
    }
}