import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './redux/store/index';
import { LOGIN_SUCCESS } from './redux/constants/ActionType';            

const token = localStorage.getItem("token");
const exp =    localStorage.getItem("exp");
const avatar = localStorage.getItem("avatar");
const role = localStorage.getItem("role_id");
const userId = localStorage.getItem("user_id");
const email = localStorage.getItem("email");
const phone = localStorage.getItem("phone");
const address = localStorage.getItem("address");
const name = localStorage.getItem("name");

const expMilisecond = exp*1000;

if (expMilisecond > Date.now()) {
  store.dispatch({
    type: LOGIN_SUCCESS,
    payload: {
      token,
      avatar,
      userId,
      email,
      phone,
      name,
      address,
      role
    },
  });
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
