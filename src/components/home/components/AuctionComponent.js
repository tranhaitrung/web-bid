import { Row, Button, Col, Input, Image, Statistic, Modal, message, InputNumber } from "antd";
import React, { useEffect, useState }  from "react";
import { Link, useHistory } from "react-router-dom";
import { HeartOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import apis from '../../../redux/apis';
import '../HomePage.css';

const { Countdown } = Statistic;

function AuctionComponent(props) {

    const history = useHistory();

    const [totalLike, setTotalLike] =useState();
    const [popUpBid, setPopUpBid] = useState(false);
    const [yourPrice, setYourBid] = useState();
    const isLogin = useSelector((state) => state.auth.isLoggedIn);

    const image = props.auction.category.image;
    const title = props.auction.title;
    const statusId = props.auction.statusId;
    const status = props.auction.status;
    const auctionId = props.auction.auction_id;
    const startDate = props.auction.start_date;
    const endDate = props.auction.end_date;



    var unLike = {
        // fontSize:"20px", 
        // color:'#fff',
        // border: '1px solid #5b616e'
    }

    var like = {
        fontSize:"20px", 
        color:'#f36'
    }

    var styleHeart = unLike;

    function like() {
    
    }

    useEffect(() => {
        apis.auction.totalLikeAuction(auctionId)
        .then((res) => {
            var data = res.data.data.total_liked;
            setTotalLike(data);
        })
    }, []);

    function placeABid() {
        const body = { 
          "price": yourPrice,
          "bid_last_id": null
        }
  
        apis.auction
        .bid(auctionId, body)
        .then(res => {
          var data = res.data.data;
          if (res.data.code === 1000) {
            message.success("Đấu giá thành công")
            history.push(`/auctions/detail/${auctionId}`)
          }
  
          if (res.data.code === 1008) {
            message.error("Dấu giá đã kết thúc")
          }
  
          if (res.data.code === 1001) {
            message.error(res.data.message)
          }
          if (res.data.code === 1004) {
            message.error("Bạn cần phải đăng nhập để sử dụng tính năng này")
            history.push("/login")
          }
  
        })
        .catch(e=>{
          if (e.response.status === 401) {
            message.error("Bạn cần phải đăng nhập để sử dụng tính năng này")
            history.push("/login")
          }
          if (e.response.status >= 500) {
            message.error("INTERNAL SERVER")
          }
          
        })
  
      }

      function showModalBid () {
        if (!isLogin) {
          message.error("Bạn cần đăng nhập để sử dụng tính năng này")
          history.push("/login")
        }
        setPopUpBid(true); 
      };
      
      function hideModalBid () {
        setPopUpBid(false);
        };

    const favourite = () => {
      console.log("API favourite")
      apis.auction
          .likeAuction(auctionId)
          .then(res => {
            var data = res.data;
            if (data.code === 1004) {
              message.error("BẠN CẦN ĐĂNG NHẬP ĐỂ SỬ DỤNG TÍNH NĂNG NÀY")
              history.push(`/login`)
            }
          })
          .catch (err => {
            if (err.response.status === 401) {
              message.error("BẠN CẦN ĐĂNG NHẬP ĐỂ SỬ DỤNG TÍNH NĂNG NÀY")
              history.push(`/login`)
            }
            if (err.response.status === 500) {
              message.error("INTERNAL SERVER")
            }
          })
    }

    return (
        <>
        <Col className="item">
            <Link to={`auctions/detail/${auctionId}`}>
                <Row className="avatar cursor">
                    <Image src= {image} className="img" preview={false}/>
                </Row>
            </Link>
            {
                statusId === 1
                ?
                <Row className="content">
                <Col span={24}>
                    <Row className="nft-body-small">
                        <Link to={`auctions/detail/${auctionId}`}>
                            <div className="nft-header6 cursor hide"> {title} </div> 
                        </Link>
                    </Row>
                    {/* <Row className="nft-body-small price">
                        <div>
                            <span className="text-desc-component">Thời gian kết thúc</span>
                            <span className="text-price"></span>
                        </div>
                    </Row> */}

                    <Row className="nft-body-small price">
                        <span className="ttext-desc-component">Đóng đấu giá sau</span>
                        <Countdown 
                        value={endDate} 
                        format="D Ngày H Giờ m Phút s Giây" 
                        valueStyle={{fontSize:'15px'}}
                        />
                    </Row>
                    <div className="line"></div>
                    
                    <Row justify="space-between">
                        <div className="text-hyperlink text-semibold cursor nft-header6" onClick={showModalBid}>Đấu giá</div>
                        <div style={{fontSize:'18px'}}>
                            <HeartOutlined style={styleHeart} className='cursor' />
                            <span style={{marginLeft:'5px'}}>{ totalLike }</span>
                        </div>
                    </Row>
                </Col>
                
            </Row>
            :
            statusId === 2
            ?
            <Row className="content">
                <Col span={24}>
                    <Row className="nft-body-small">
                        <Link to={`auctions/detail/${auctionId}`}>
                            <div className="nft-header6 cursor hide"> { title }</div> 
                        </Link>
                    </Row>
                    {/* <Row className="nft-body-small price">
                        <div>
                            <span className="text-desc">Giá khởi điểm:</span>
                            <span className="text-price">10000000</span>
                        </div>
                    </Row> */}

                    <Row className="nft-body-small price">
                        <span className="ttext-desc-component">Bắt đầu sau:</span>
                        <Countdown 
                        value={startDate} 
                        format="D Ngày H Giờ m Phút s Giây" 
                        valueStyle={{fontSize:'15px'}}
                        />
                    </Row>
                    <div className="line"></div>
                    
                    <Row justify="space-between">
                        <Link to={`auctions/detail/${auctionId}`}>
                            <div className="text-hyperlink text-semibold cursor nft-header6">Xem chi tiết</div>
                        </Link>
                        <div style={{fontSize:'18px'}}>
                            <HeartOutlined style={styleHeart} className='cursor'  />
                            <span style={{marginLeft:'5px'}}> { totalLike } </span>
                        </div>
                    </Row>
                </Col>
                
            </Row>
            :
            <Row className="content">
                <Col span={24}>
                    <Row className="nft-body-small">
                        <Link to={`auctions/detail/${auctionId}`}>
                            <div className="nft-header6 cursor hide"> { title }</div> 
                        </Link>
                    </Row>
                    <Row className="nft-body-small price" align='middle' style={{height:"55px"}}>
                      {
                        statusId === 4 
                        ?
                        <div>
                            <span className="text-desc">Đấu giá đang chờ duyệt</span>
                            {/* <span className="text-price">Nguyễn Văn An</span> */}
                        </div>
                        :
                        statusId === 6 
                        ?
                        <div>
                            <span className="text-desc">Đấu giá đã bán thành công</span>
                            {/* <span className="text-price">Nguyễn Văn An</span> */}
                        </div>
                        :
                        statusId === 3 
                        ?
                        <div>
                            <span className="text-desc">Đấu giá đã kết thúc</span>
                            {/* <span className="text-price">Nguyễn Văn An</span> */}
                        </div>
                        :
                        <div>
                            <span className="text-desc">Đấu giá đã bị từ chối</span>
                            {/* <span className="text-price">Nguyễn Văn An</span> */}
                        </div>
                        
                      }
                    </Row>

                    <div className="line"></div>
                    
                    <Row justify="space-between">
                        <Link to={`auctions/detail/${auctionId}`}>
                            <div className="text-hyperlink text-semibold cursor nft-header6">Xem chi tiết</div>
                        </Link>
                        <div style={{fontSize:'18px'}}>
                            <HeartOutlined style={styleHeart} className='cursor' onClick={favourite} />
                            <span style={{marginLeft:'5px'}}> { totalLike } </span>
                        </div>
                    </Row>
                </Col>
                
            </Row>
            }

        </Col>
        <div>
        <Modal
            title="Đấu Giá"
            centered
            visible={popUpBid}
            onCancel={ hideModalBid}
            width={500}
            footer={[
              <button 
                className="btn-bid-cancel"
                onClick={hideModalBid}
              >
                Hủy
              </button>,
              <button
                className="btn-bid"
                onClick={ placeABid }
              >
                Đặt Giá
              </button>,
            ]}
          >
            <div style={{padding:'0 0'}}>
              <div style={{marginBottom:'10px'}}>
                <div className="text-detail-bid ">
                  Bạn săp trả giá cho <b>{ title }</b>
                </div>  
              </div> 
              <InputNumber  type="text" placeholder="Đặt giá" className="el-input-bid" controls={false} keyboard={false} value={yourPrice} onChange={setYourBid} />

            </div>
          </Modal>
        </div>
        </>
    );              
}

export default AuctionComponent;