import apis from "../apis/index";
import { notification, message } from "antd";
import { LOGIN_FAIL_1001, BAD_REQUEST_1004 } from "../constants/ErrorCode";
import {CREATE_AUCTION, CREATE_AUCTION_SUCCESS, CREATE_AUCTION_FAILED} from "../constants/ActionType";

const createAuction = (data, history) => (dispatch) => {
    dispatch({ type: CREATE_AUCTION });
  
    apis.auction
      .createAuction(data)
      .then((res) => {
        if(res.data.code === 1000) {
            var data = res.data.data;
            dispatch({
              type: CREATE_AUCTION_SUCCESS,
            });
            const auctionId = data.auction_id;
            message.success('Tạo đấu giá thành công');
            history.push(`/auctions/detail/${auctionId}`);
        } else if (res.data.code === BAD_REQUEST_1004) {
            message.error('Bạn cần đăng nhập để sử dụng dịch vụ');
            dispatch({
                type: CREATE_AUCTION_FAILED,
            });
            history.push(`/login`);

        } else if (res.data.code === LOGIN_FAIL_1001) {
            message.error('Thông tin đấu giá không hợp lệ')
            dispatch({
                type: CREATE_AUCTION_FAILED,
              });
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
    
        notification.error({
          message: "Login Failed",
          description: "Username or Password is incorrect",
          duration: 2,
        });
      });
  };

  export {
    createAuction,
  }