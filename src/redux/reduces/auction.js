import { CREATE_AUCTION, CREATE_AUCTION_SUCCESS, CREATE_AUCTION_FAILED } from "../constants/ActionType";
var intialState = {
  isLoading: false,
  errMessage: "",
};

var auctionReducer = (state = intialState, action) => {
  switch (action.type) {
    case CREATE_AUCTION:
      return {
        ...state,
        isLoading: true,
      };
    case CREATE_AUCTION_SUCCESS:
    case CREATE_AUCTION_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default auctionReducer;
