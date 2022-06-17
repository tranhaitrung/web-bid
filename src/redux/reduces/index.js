import { combineReducers } from "redux";

import authReducer from "./auth";
import auctionReducer from './auction';
import loadingReducer from './loading';

let reducersAll = combineReducers({
  auth: authReducer,
  auction: auctionReducer,
  loading: loadingReducer,
});

export default reducersAll;
