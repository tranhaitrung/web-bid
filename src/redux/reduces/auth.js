import { LOGIN, LOGIN_SUCCESS, LOGIN_FAILED, UPDATE_ACCOUNT, UPDATE_ACCOUNT_SUCCESS, UPDATE_ACCOUNT_FAILED, CHANGE_PASS, CHANGE_PASS_SUCCESS, CHANGE_PASS_FAILED, LOGOUT, LOGIN_END } from "../constants/ActionType";
var intialState = {
  isLoading: false,
  isLoggedIn: false,
  errMessage: "",
  permission: "",
  id: 0,
  token: "",
  avatar: "",
  userId: "",
  email: "",
  name: "",
  role: ""
};

var authReducer = (state = intialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLoading: true,
        isLoggedIn: false,
      };
    case LOGIN_SUCCESS: 
    case UPDATE_ACCOUNT_SUCCESS:
      const {         
        token,
        avatar,
        userId,
        email,
        phone,
        name,
        address,
        role } = action.payload;

        console.log(action.payload)

      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        token,
        avatar,
        userId,
        email,
        phone,
        name,
        address,
        role
      };
    case LOGIN_FAILED:
      return {
        ...state,
        isLoggedIn: false,
        isLoading: false,
        errMessage: action.payload.message,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false
      };
    case UPDATE_ACCOUNT:
    case CHANGE_PASS:
      return {
        ...state,
        isLoading: true,
      };
    
    case UPDATE_ACCOUNT_FAILED:
    case CHANGE_PASS_SUCCESS:
    case CHANGE_PASS_FAILED:
      return {
        ...state,
        isLoading: true,
      };
    case LOGIN_END:
      return {
        ...state,
        isLoading: false,
      };
    
    default:
      return state;
  }
};

export default authReducer;
