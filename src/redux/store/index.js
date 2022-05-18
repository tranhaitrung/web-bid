import { applyMiddleware } from "redux";
import {createStore} from "redux";
import thunk from "redux-thunk";

import { composeWithDevTools } from "redux-devtools-extension";

import reducers from "../reduces/index";

var store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

export default store;