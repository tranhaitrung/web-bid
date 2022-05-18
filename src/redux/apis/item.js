import axios from "axios";

let token = localStorage.getItem("token");

const configHeader = {
  headers: { Authorization: "Bearer " + token },
};

export default {
    createItem: (auctionId, data) => {
        return axios.post(`/api/items/create/${auctionId}`, data);
    },
}