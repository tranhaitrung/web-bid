import { combineReducers } from "redux";

import authReducer from "./auth";
import auctionReducer from './auction';

let reducersAll = combineReducers({
  auth: authReducer,
  auction: auctionReducer,
});

export default reducersAll;
