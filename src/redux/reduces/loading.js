import { START_LOADING, END_LOADING} from "../constants/ActionType";
var intialState = {
  isLoading: false,
  errMessage: "",
};

var loadingReducer = (state = intialState, action) => {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case END_LOADING:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default loadingReducer;
