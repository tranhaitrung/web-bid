import apis from "../apis/index";
import { notification, message } from "antd";
import '../constants/ErrorCode';
import { LOGIN_FAIL_1001, LOGIN, LOGIN_FAIL_1002 } from "../constants/ErrorCode";
import {LOGIN_SUCCESS, UPDATE_ACCOUNT, UPDATE_ACCOUNT_SUCCESS, UPDATE_ACCOUNT_FAILED, CHANGE_PASS, CHANGE_PASS_SUCCESS, CHANGE_PASS_FAILED, LOGIN_FAILED, LOGOUT, LOGIN_END} from "../constants/ActionType";

// const redirectPage = (permission, history) => {
//     permission === "ROLE_ADMIN"
//       ? history.replace("/admin")
//       : permission === "ROLE_TEACHER"
//       ? history.push("/teacher")
//       : history.push("/student");
//   };

  const loginAction = (data, history) => (dispatch) => {
    dispatch({ type: LOGIN });
  
    apis.auth
      .login(data)
      .then((res) => {
        if(res.data.code === 1000) {
            var data = res.data.data;
            var token = data.access_token;
            var exp = data.exp;
            var avatar = data.user.avatar;
            var role = data.user.role;
            var userId = data.user.user_id;
            var email = data.user.email;
            var phone = data.user.phone;
            var address = data.user.address;
            var name = data.user.name;
            dispatch({
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

            localStorage.setItem("token", data.access_token);
            localStorage.setItem("exp", exp);
            localStorage.setItem("avatar", data.user.avatar);
            localStorage.setItem("role_id", data.user.role);
            localStorage.setItem("user_id", data.user.user_id);
            localStorage.setItem("email", data.user.email);
            localStorage.setItem("phone", phone)
            localStorage.setItem("address", data.user.address);
            localStorage.setItem("name", data.user.name);
            message.success('????ng nh???p th??nh c??ng');
            history.push("");
            window.location.replace("");
      
        } else if (res.data.code === LOGIN_FAIL_1002) {
            dispatch({
              type: LOGIN_FAILED,
            });
            message.error('Email ho???c M???t kh???u kh??ng ????ng');
        } else if (res.data.code === LOGIN_FAIL_1001) {
            dispatch({
              type: LOGIN_FAILED,
            });
            message.error('Email ho???c m???t kh???u kh??ng ????ng ?????nh d???ng')
        }
  
        // dispatch({
        //   type: LOGIN_SUCCESS,
        //   payload: {
        //     token,
        //     username,
        //     permission,
        //     id,
        //   },
        // });
        // localStorage.setItem("token", token);
        // notification.success({
        //   message: "Login sucessfully",
        //   duration: 1.5,
        // });
  
        // redirectPage(permission, history);
      })
      .catch((error) => {
        message.error('Email ho???c M???t kh???u kh??ng ????ng');
      });

      dispatch({
        type: LOGIN_END,
      });
  };

  const updateAccountInfo = (data, history) => (dispatch) => {
    dispatch({ type: UPDATE_ACCOUNT });

    apis.account
      .editAccount(data)
      .then((res) => {
        console.log(res)
        if (res.data.code === 1000) {
          const name = res.data.data.name;
          const avatar = res.data.data.avatar;
          const email = res.data.data.email;
          const phone = res.data.data.phone;
          const address = res.data.data.address;

          localStorage.setItem("avatar", avatar);
          localStorage.setItem("email", email);
          localStorage.setItem("phone", phone)
          localStorage.setItem("address", address);
          localStorage.setItem("name", name);
          
          dispatch({
            type: UPDATE_ACCOUNT_SUCCESS,
            payload: {
              avatar,
              email,
              phone,
              name,
              address,
            },
          });

          message.success("C???p nh???t th??ng tin th??nh c??ng");

        }

        if (res.code === 1001) {
          message.error("Th??ng tin nh???p kh??ng h???p l???")
        }
      })
      .catch((e) => {
        console.log(e);
        if (e.status === 401) {
          message.error("B???n c???n ????ng nh???p ????? th???c hi???n ch???c n??ng n??y")
        } else if (e.status === 500) {
          message.error("INTERNAL SERVER")
        } else
          message.error("C???p nh???t th??ng tin th???t b???i")
      })
  }

  const changePass = (data, history) => (dispatch) => {
    dispatch({ type: CHANGE_PASS });

    apis.account
      .changePass(data)
      .then((res) => {
        console.log(res)
        if (res.data.code === 1000) {
          dispatch({
            type: CHANGE_PASS_SUCCESS,
          });

          message.success("?????i m???t kh???u th??nh c??ng");

        } else {
          dispatch({
            type: CHANGE_PASS_FAILED,
          });
        }

        if (res.data.code === 1001) {
          message.error("M???t kh???u kh??ng h???p l???");
        }

        if (res.data.code === 9997) {
          message.error("M???t kh???u kh??ng ????ng");
        }

      })
      .catch((e) => {
        console.log(e);
        if (e.status === 401) {
          message.error("B???n c???n ????ng nh???p ????? th???c hi???n ch???c n??ng n??y")
        } else if (e.status === 500) {
          message.error("INTERNAL SERVER")
        } else
          message.error("?????i m???t kh???u th???t b???i")

        dispatch({
          type: CHANGE_PASS_FAILED,
        });
      })
  }

  const logOut = (history) => (dispatch) => {

    apis.auth
    .logOut()
    .then(res => {
      dispatch({
        type: LOGOUT,
      });
      localStorage.removeItem("token")
      localStorage.removeItem("exp")
      localStorage.removeItem("avatar")
      localStorage.removeItem("role_id")
      localStorage.removeItem("user_id")
      localStorage.removeItem("email")
      localStorage.removeItem("phone")
      localStorage.removeItem("address")
      localStorage.removeItem("name")
      history.push("/login")
      window.location.replace("/login");
    })
  }


export {
    loginAction,
    updateAccountInfo,
    changePass, 
    logOut
}