import React, { useEffect, useState } from "react";
import { Col, Row, List, Comment, Avatar, Form, Button, Input, Empty, Modal, Cascader, DatePicker, InputNumber, message, Upload } from "antd";
import { HeartOutlined, MoreOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';
import moment from 'moment';
import NumberFormat from 'react-number-format';
import { Route, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
// import { Link } from 'react-router-dom';

import apis from "../../redux/apis";
import { currencyFormat } from "../../common/Format"

import './Detail.css'
import { END_LOADING, START_LOADING } from "../../redux/constants/ActionType";

const onFinish = (values) => {
  console.log('Received values of form: ', values);
};

function onChange(dates, dateStrings) {
  console.log('From: ', dates[0], ', to: ', dates[1]);
  console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
}

const { TextArea } = Input;


const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        Bình luận
      </Button>
    </Form.Item>
  </>
);

function AuctionDetail() {

  const dispatch = useDispatch();
  const history = useHistory();

  const [tabActive, setTabActive] = useState("BIDS");
  const [menuDisplay, setMenuDisplay] = useState(false);
  const [auction, setAuction] = useState([]);
  const [category, setCategory] = useState([]);
  const [item, setItem] = useState([]);
  const [itemEdit, setItemEdit] = useState([]);
  const [seller, setSeller] = useState([]);
  const [maxBid, setMaxBid] = useState();
  const [totalLikeAuction, setTotalLikeAuction] = useState();
  const [listCategory, setListCategory] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [comment, setComment] = useState([]);
  const [popUpBid, setPopUpBid] = useState(false);
  const [popUpEditAuction, setPopUpEditAuction] = useState(false);
  const [popUpAcceptBid, setPopUpAcceptBid] = useState(false);
  const [popUpEditItem, setPopUpEditItem] = useState(false);
  const [comments, setComments] = useState([]);
  const [totalComments, setTotalComment] = useState();
  const userId = useSelector((state) => state.auth.userId);
  const avatar = useSelector((state) => state.auth.avatar);
  const isLogin = useSelector((state) => state.auth.isLoggedIn);
  const [listBid, setListBid] = useState([]);
  const [yourPrice, setYourBid] = useState();
  const [sellingInfo, setSellingInfo] = useState();
  const [lastCommentId, setLastCommentId] = useState();
  const isLoading = useSelector((state) => state.loading.isLoading);
  const [fileList, setFileList] = useState([])
  const [lisImg, setListImg] = useState([])
  const [listBrand, setListBrand] = useState([])

  var imageArray = []

  const { auctionId } = useParams();

  useEffect(() => {
    initData()
    console.log("id:"+userId)
  }, [])

  function initData() {
    auctionDetail()
    totalLike()
    apis.categories
      .listCategory()
      .then(res => {
        var data = res.data.data;
        const ctgs = [];
        for (var i = 0; i < data.length; i++) {
          var ctg = {
            value: data[i].category_id,
            label: data[i].name,
          }
          setLastCommentId(data[i].comment_id)
          ctgs.push(ctg);
        }
        setListCategory(ctgs);
      }
      )

    getListComment()
    getListBid()
    getBranch()
  }

  const onChangeImg = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const upfile = ({file, onSuccess}) => {
      const body = new FormData();
      body.append("file", file);
      apis.file
          .upfile(body)
          .then(res => {
              imageArray = lisImg
              onSuccess(res.data[0])
              imageArray.push(res.data[0])
              setListImg(imageArray)
          })
          .catch(()=>{
              message.error("UPFILE FAIL")
          })
  }

  const getBranch = () => {
    apis.brand
        .getListBrands()
        .then(res => {
            var data = res.data.data.brand
            var listTmp = []
            for(var i = 0; i < data.length; i++) {
                const tmp = {
                    value: data[i].brand_id,
                    label: data[i].name
                }
                listTmp.push(tmp)
            }
            setListBrand(listTmp)
        })
  }
  
  const getListComment = () => {
    apis.comment
    .listComment(auctionId, 0, 100)
    .then(res => {
      var data = res.data.data;
      setTotalComment(data.total)
      setComments(data.comments)
    })
  }

  function auctionDetail() {
    apis.auction
      .auctionDetail(auctionId)
      .then((res) => {
        var data = res.data.data;
        var auction = data.auctions;
        var category = data.category;
        var item = data.items;
        var sellerRes = data.selling_user;
        var maxBid = data.max_bid;

        setAuction(auction);
        setCategory(category);
        setItem(item);
        setSeller(sellerRes);
        setMaxBid(maxBid);
        if (isLogin) {
          getItemInfo(item.item_id)
        }
      })
  }

  const totalLike = () => {
    apis.auction.totalLikeAuction(auctionId)
    .then((res) => {
      var data = res.data.data.total_liked;
      setTotalLikeAuction(data);
    })
  }

  function getListBid() {
    apis.auction
      .listBid(auctionId, 1, 10)
      .then(res => {
        var data = res.data.data
        setListBid(data.bids)
      })
  }

  const getItemInfo = (itemId) => {
    apis.item
        .infoItem(itemId)
        .then(res => {
          var data = res.data;
          if (data.code === 1000) {
            setItemEdit(data.data)
          }
          if (data.code === 1004) {
            message.error("BẠN CẦN ĐĂNG NHẬP")
            history.push(`/login`)
          }
        })
  }

  function showModalBid() {
    setMenuDisplay(false);
    setPopUpBid(true);
  };

  function hideModalBid() {
    setPopUpBid(false);
  };

  function showEditAuction() {
    setMenuDisplay(false);
    setPopUpEditAuction(true);
  };

  function hideEditAuction() {
    setMenuDisplay(false);
    setPopUpEditAuction(false);
  };

  function showModalAcceptBid () {
    setPopUpAcceptBid(true)
  }

  function hideModalAcceptBid () {
    setPopUpAcceptBid(false)
  }

  const showEditItem = () => {
    setMenuDisplay(false);
    setPopUpEditItem(true)
  }

  const hideEditItem = () => {
    setPopUpEditItem(false)
  }

  function changeTab(text) {
    setTabActive(text)
  }

  function handleSubmitComment() {
    if (!comment) {
      return;
    }
    setSubmitting(true)
    var body = {
      content: comment,
      comment_last_id: lastCommentId
    }

    apis.comment
        .createComment(auctionId, body)
        .then(res => {
          var data = res.data;
          if (data.code === 1000) {
            getListComment()
          }
          else if (data.code === 1004) {
            message.error("BẠN CẦN ĐĂNG NHẬP ĐỂ THỰC HIỆN CHỨC NĂNG NÀY")
            history.push(`/login`)
          }
          else if (data.code === 1008) {
            message.error("KHÔNG THỂ BÌNH LUẬN CHO ĐẤU GIÁ NÀY")
          }
          setComment('')
          setSubmitting(false)
        })
        .catch(err => {
          if (err.response.status === 401) {
            message.error("BẠN CẦN ĐĂNG NHẬP ĐỂ THỰC HIỆN CHỨC NĂNG NÀY")
            history.push(`/login`)
          }
          else if (err.response.status === 500) {
            message.error("INTERNAL SERVER")
          }
          setSubmitting(false)
        })
    
  };

  function handleChange(e) {
    setComment(e.target.value)
  };

  function placeABid() {
    dispatch({ type: START_LOADING });
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
          auctionDetail()
          getListBid()
          hideModalBid()
        }

        if (res.data.code === 1008) {
          message.error("Dấu giá đã kết thúc")
        }

        if (res.data.code === 1001) {
          if (res.data.message === 'price: 7014') {
            message.error("Giá phải cao hơn giá hiện tại")
          } else {
            message.error(res.data.message)
          }
          
        }
        if (res.data.code === 1004) {
          message.error("Bạn cần phải đăng nhập để sử dụng tính năng này")
          history.push("/login")
        }
        dispatch({ type: END_LOADING });

      })
      .catch(e => {
        if (e.response.status === 401) {
          message.error("Bạn cần phải đăng nhập để sử dụng tính năng này")
          history.push("/login")
        }
        if (e.response.status >= 500) {
          message.error("INTERNAL SERVER")
        }
        dispatch({ type: END_LOADING });
      })

  }

  const deleteAuction = () => {
    apis.auction
        .deleteAuction(auctionId)
        .then(res => {
          var statusCode = res.data.code
          if (statusCode === 1000) {
            message.success("Xóa đấu giá thành công")
            history.push(`/my-auctions`)
          }
          if (statusCode === 9994) {
            message.error("Không thể xóa. Đấu giá đã được duyệt")
          }
          if (statusCode === 1006) {
            message.error("Bạn không phải người bán")
          }
          if (statusCode === 1004) {
            message.error("Bạn cần đăng nhập để sử dụng chức năng này")
            history.push(`/login`)
          }
        })
        .catch(err => {
          if (err.response.status === 401) {
            message.error("Bạn cần đăng nhập để sử dụng chức năng này")
            history.push(`/login`)
          }
          if (err.response.status === 500) {
            message.error("INTERNAL SERVER")
          }
        })
  }

  const confirmDeleteAuction = () => {
    Modal.confirm({
      title: 'Cảnh báo',
      icon: <ExclamationCircleOutlined />,
      content: 'Sau khi xóa, cuộc đấu giá sẽ không thể khôi phục',
      okText: <div onClick={deleteAuction}>Xác nhận</div>,
      cancelText: 'Hủy',
    });
  };

  const setReason = (value) => {
    console.log()
  }

  const favourite = () => {
    apis.auction
        .likeAuction(auctionId)
        .then(res => {
          var data = res.data;
          if (data.code === 1000) {
            auctionDetail()
            totalLike()
          }
          if (data.code === 1004) {
            message.error("BẠN CẦN ĐĂNG NHẬP ĐỂ SỬ DỤNG TÍNH NĂNG NÀY")
            history.push(`/login`)
          }
        })
        .catch(err => {
          if (err.response.status === 401) {
            message.error("BẠN CẦN ĐĂNG NHẬP ĐỂ SỬ DỤNG TÍNH NĂNG NÀY")
            history.push(`/login`)
          }
          if (err.response.status === 500) {
            message.error("INTERNAL SERVER")
          }
        })
  }

  const acceptBid = () => {
    var body = {
      selling_info: document.getElementById('reason').value
    }
    apis.auction
        .acceptHighestBid(auctionId, body)
        .then(res => {
          var data = res.data;
          if (data.code === 1000) {
            message.success("CHẤP NHẬN ĐẤU GIÁ THÀNH CÔNG")
          }
          else if (data.code === 1001) {
            message.error("CHƯA NHẬP LÝ DO CHẤP NHẬN")
          }
          else if (data.code === 1004) {
            message.error("Bạn cần đăng nhập để thực hiện chức năng này")
            history.push(`/login`)
          }
          else if (data.code === 1006) {
            message.error("BẠN KHÔNG PHẢI NGƯỜI BÁN")
          }
          else if (data.code === 1009) {
            message.error("ĐẤU GIÁ CHƯA KẾT THÚC")
          }
          else if (data.code === 1010) {
            message.error("VẬT PHẨM ĐÃ ĐƯỢC BÁN")
          }
          else if (data.code === 1011) {
            message.error("KHÔNG CÓ NGƯỜI TRẢ GIÁ")
          }
          hideModalAcceptBid()
        })
        .catch(err => {
          hideModalAcceptBid()
        })
        
  }

  const editAuction = (value) => {
    dispatch({ type: START_LOADING });

    var auctionName = value.auction_name;
    var categoryId = value.category;
    var startDate = value.endAt;
    var endDate = value.endAt;
    var body = {
      category_id: categoryId,
      start_date: startDate,
      end_date: endDate,
      title_ni: auctionName
    }

    apis.auction
        .editAuction(auctionId, body)
        .then(res => {
            var data = res.data;
            if (data.code === 1000) {
              message.success("SỬA ĐẤU GIÁ THÀNH CÔNG.")
              auctionDetail()
              hideEditAuction()
            }
            else if (data.code === 1001) {
              message.error("LỖI DỮ LIỆU")
            }
            else if (data.code === 1004) {
              message.error("VUI LÒNG ĐĂNG NHẬP.")
              history.push(`/login`)
              hideEditAuction()
            }
            else if (data.code === 1005) {
              message.error("ĐẤU GIÁ ĐÃ ĐƯỢC DUYỆT. KHÔNG THỂ CHỈNH SỬA.")
            }
            else if (data.code === 1006) {
              message.error("KHÔNG CÓ QUYỂN SỬA.")
            }
            dispatch({ type: END_LOADING });
        })
        .catch(err => {
          if (err.response.code === 401) {
            message.error("Bạn cần đăng nhập để thực hiện tính năng này.")
            history.push(`/login`)
          }
          if (err.response.code >= 500) {
            message.error("INTERNAL SERVER")
          }
          dispatch({ type: END_LOADING });
        })

  }

  const editItem = (values) => {
    const name = values.itemName;
        const starting_price = values.priceFrom
        const brand_id = values.branch[0]
        const description = values.description
        const series = values.series
        const images = lisImg

        const bodyData = {
            name: name,
            starting_price: starting_price,
            brand_id: brand_id,
            description: description,
            series: series,
            images: images
        }

        const itemId = item.item_id;
        apis.item
            .editItem(itemId, bodyData)
            .then(res => {
                console.log(res.data)
                var data = res.data
                if (data.code === 1000) {
                  message.success("Bạn đã sửa vật phẩm thành công")
                  auctionDetail()
                }
                else if (data.code === 1005) {
                  message.error("Không thể chỉnh sửa")
                } else {
                  message.error(data.message)
                }
            })
            .catch(e =>{
               var status = e.response.status
               if (status === 401) {
                   message.error("Bạn cần đăng nhập để sử dụng tính năng này")
                   history.push(`/login`)
               }
               if (status === 500) {
                   message.error("INTERNAL SERVER")
               }
            })
  }

  return (
    <Row justify="center">
      <Col className="detail">
        <Row>
          <div className="detail-left">
            <div className="main-image">
              <div className="content-media">
                <img src={item.mainImage} alt="ảnh detail" />
              </div>
            </div>
            <div>
              <List
                grid={{ gutter: 10 }}
                dataSource={item.images}
                renderItem={item => (
                  <List.Item>
                    <img src={item} style={{ width: "100px", height: '100px', borderRadius: '5px' }} />
                  </List.Item>
                )}
              />
            </div>
          </div>
          <div className="detail-right m1-auto">
            <Row className="detail-heading" justify='space-between'>
              <div className="auction-title">{auction.title}</div>

              <Row className="pro-flex">
                <div className="btn-action-detail border-left d-flex aign-center pro-flex favourite" style={{ fontSize: '20px' }}>
                  <HeartOutlined className='cursor' onClick={favourite}/>
                  <span style={{ marginLeft: '5px' }} className='align-center pro-flex'>{totalLikeAuction}</span>
                </div>
                <div
                  className="btn-action-detail border-right d-flex aign-center pro-flex cursor"
                  onClick={() => {
                    setMenuDisplay(true)
                  }}
                  style={{ fontSize: '20px' }}>
                  <MoreOutlined />
                </div>
                <div>
                </div>
              </Row>
            </Row>
            <div className="item-title">
              {item.name}
            </div>
            <div className="detail-des">
              {item.description}
            </div>

            <div className="sack">
              <div className="sack-seller">
                <div className="sack-seller-title">Danh mục</div>
                <div className="sack-seller-detail">
                  <div>
                    <div className="wrap-media">
                      <div className="content-media">
                        <img src={category.image} alt="ảnh danh mục" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <span>{category.name}</span>
                  </div>
                </div>
              </div>
              <div className="sack-seller">
                <div className="sack-seller-title">Người bán</div>
                <div className="sack-seller-detail">
                  <div>
                    <div className="wrap-media">
                      <div className="content-media">
                        <img src={seller.selling_user_avatar} alt="ảnh đại diện người bán" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <span> {seller.selling_user_name} </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="list-item">
              <div className="item-i">Thông Tin</div>
            </div>
            <div className="content-about">
              <div className="content-about1" style={{ marginTop: '20px' }}>
                <div className="content-about1-title">Giá khởi điểm</div>
                <div className="content-about1-code">
                  <NumberFormat value={item.starting_price} displayType={'text'} thousandSeparator={true} />
                </div>
              </div>
              <div className="content-about1">
                <div className="content-about1-title">Bắt đầu</div>
                <div className="content-about1-code"> {auction.start_date} </div>
              </div>
              <div className="content-about1">
                <div className="content-about1-title">Kết thúc</div>
                <div className="content-about1-code">{auction.end_date}</div>
              </div>

            </div>

            <div className="highest-bid" style={{ width: '100%' }}>
              {
                maxBid === null
                  ?
                  <div className="highest-bid_title nft-body-base">Chưa có người tham gia</div>
                  :
                  <div style={{ width: '100%' }}>
                    <Row justify="space-between">
                      <div className="highest-bid_title nft-body-base" >Giá cao nhất</div>
                      <div className="highest-bid_price">
                        <NumberFormat value={maxBid} displayType={'text'} thousandSeparator={true} />
                      </div>
                    </Row>

                  </div>

              }
            </div>

            <div className="detail-button">
              <div className="w-100">
                {
                  Number(seller.selling_user_id) === Number(userId)
                    ?
                    auction.statusId === 1
                    ?
                    <button className="el-button-custom" >
                        <span>Đấu giá đang diễn ra</span>
                      </button>
                    : auction.statusId === 3 
                      ?
                      <button className="el-button-custom" onClick={showModalAcceptBid}>
                        <span>Chấp nhận giá cao nhất</span>
                      </button>
                      :
                      auction.statusId === 2 
                        ?
                        <button className="el-button-custom" disabled>
                          <span>Đấu giá sắp diễn ra</span>
                        </button>
                        :
                        auction.statusId === 4
                          ?
                          <button className="el-button-custom" onClick={showEditAuction}>
                            <span>Sửa đấu giá</span>
                          </button>
                          :
                          <button className="el-button-custom" disabled>
                            <span>Đấu giá bị từ chối</span>
                          </button>
                    :
                    auction.statusId === 1
                      ?
                      <button className="el-button-custom" onClick={showModalBid}>
                        <span>Đấu Giá</span>
                      </button>
                      :
                      auction.statusId === 2 
                        ?
                        <button className="el-button-custom" disabled>
                          <span>Đấu giá sắp diễn ra</span>
                        </button>
                        :
                        <button className="el-button-custom" disabled={true}>
                          <span>Không bán</span>
                        </button>
                }

              </div>
            </div>
          </div>
        </Row>
        <Row className="tabs pro-flex">
          <div
            className={
              tabActive === 'BIDS'
                ? "tab-active text-desc cursor tab-item nft-body-base"
                : "text-desc cursor tab-item nft-body-base"
            }
            onClick={() => {
              setTabActive("BIDS")
            }}
          > Danh sách đấu giá</div>

          <div
            className={
              tabActive === 'COMMENTS'
                ? "tab-active text-desc cursor tab-item nft-body-base"
                : " text-desc cursor tab-item nft-body-base"
            }

            onClick={() => {
              setTabActive("COMMENTS")
            }}
          >Bình luận</div>

        </Row>
        {
          tabActive === 'BIDS' ?

            <Row className="list-bid" justify="center">
              <table className="table w-100">
                <tr className="w-100 row ">
                  <th className="col1 title-head" >Người đấu giá</th>
                  <th className="col2 title-head">Giá</th>
                </tr>

                {
                  listBid.length > 0
                    ?
                    listBid?.map((bid) => (
                      <tr className="w-100 row">
                        <td className="col1">
                          <div className="wrap-media">
                            <div className="content-media">
                              <img src={bid.user_avatar} alt="avatar bidder" />
                            </div>
                          </div>
                          <div><span>{bid.user_name}</span></div>
                        </td>
                        <td className="col2">
                          <div>
                            <span><NumberFormat value={bid.price} displayType={'text'} thousandSeparator={true} /></span>
                          </div>
                        </td>
                      </tr>
                    ))

                    :
                    <Row justify="center" style={{ width: '100%' }}>
                      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                    </Row>
                }

              </table>
            </Row>
            :
            <Row style={{ width: "100%" }}>
              {/* {comments.length > 0 && <CommentList comments={comments} />} */}
              <Row style={{ width: "100%" }}>
                <Comment
                  avatar={<Avatar src={avatar} alt="Han Solo" />}
                  content={
                    <Editor
                      onChange={handleChange}
                      onSubmit={handleSubmitComment}
                      submitting={submitting}
                      value={comment}
                    />
                  }
                  style={{ width: '600px' }}
                />
              </Row>


              <List
                className="comment-list"
                header={`${totalComments} replies`}
                itemLayout="horizontal"
                dataSource={comments}
                renderItem={item => (
                  <li>
                    <Comment
                      author={item.user_name}
                      avatar={item.user_avatar}
                      content={item.content}
                      datetime={item.updated_at}
                    />
                  </li>
                )}
              />
            </Row>
        }
        <Row style={{ margin: '50px 0' }}></Row>
      </Col>
      <div style={{ fontSize: '35px' }}>
        <Modal
          title="Đấu Giá"
          centered
          visible={popUpBid}
          onCancel={hideModalBid}
          width={500}
          footer={[
            <button
              className="btn-bid-cancel"
              onClick={hideModalBid}
            >
              Hủy
            </button>,
            <Button
              loading={isLoading}
              className="btn-bid"
              style={{height: '100%'}}
              onClick={placeABid}
            >
              Đặt Giá
            </Button>,
          ]}
        >
          <div style={{ padding: '0 0' }}>
            <div style={{ marginBottom: '10px' }}>
              <div className="text-detail-bid ">
                Bạn sắp trả giá cho <b>{item.name}</b>
              </div>
            </div>
            <InputNumber type="text" placeholder="Đặt giá" className="el-input-bid" controls={false} keyboard={false} value={yourPrice} onChange={setYourBid} />

          </div>
        </Modal>
      </div>

      <div>
      <Modal
          title="CHẤP THUẬN ĐÂU GIÁ"
          centered
          visible={popUpAcceptBid}
          onCancel={hideModalAcceptBid}
          width={600}
          footer={[
            <button
              className="btn-bid-cancel"
              onClick={hideModalAcceptBid}
            >
              Hủy
            </button>,
            <button
              className="btn-bid"
              onClick={acceptBid}
            >
              Chấp thuận
            </button>,
          ]}
        >
          <div>
            <div>
              <h1>Chấp thuận giá cao nhất</h1>
            </div>
            <Form
              name="accept_highest_bid"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              layout='vertical'
              size='middle'
              style={{ width: '100%' }}
            >
              <Form.Item
                name="selling_info"
                rules={[{ required: true, message: 'Nhập lý do' }]}
                label="Lý do chấp thuận"
              >
                <Input
                  placeholder="Lý do chấp thuận"
                  className='el-input'
                  size="large"
                  id='reason'
                />
              </Form.Item>
            </Form>
          </div>

        </Modal>
      </div>

      <div style={{ fontSize: '35px' }}>
        <Modal
          title="Sửa Đấu Giá"
          centered
          visible={popUpEditAuction}
          onCancel={hideEditAuction}
          width={600}
          footer={false}
        >
          <div style={{ padding: '0 0' }}>
            <Col style={{ width: '100%' }}>
              <Row justify="center" 
              style={{ display: "flex", justifyContent: "center", marginTop: "1em" }}>
                <Col style={{ width: '100%' }}>
                  <Form
                    name="create_auction_form"
                    className="signup-form"
                    initialValues={{ remember: true }}
                    onFinish={editAuction}
                    layout='vertical'
                    size='middle'
                    style={{ width: '100%' }}
                  >
                    <Form.Item
                      name="auction_name"
                      rules={[{ required: true, message: 'Hãy nhập tên đấu giá' }]}
                      label="Tên đấu giá"
                      initialValue={auction.title}
                    >
                      <Input
                        placeholder="Tên cuộc đấu giá"
                        className='el-input'
                        size="large"
                      />
                    </Form.Item>
                    <Form.Item
                      name="category"
                      label="Danh mục"
                      initialValue={category.type}
                      rules={[{ required: true, message: 'Chọn loại danh mục' }]}
                    >
                      <Cascader
                        size="large"
                        options={listCategory}
                        onChange={(key) => { console.log(key) }}
                        placeholder="Chọn danh mục"
                        placement="bottomRight"
                        dropdownMenuColumnStyle={{ width: '535px', height: '42px', fontSize: '17px' }}
                      />
                    </Form.Item>
                    <Row justify="space-between">
                      <Form.Item
                        name="startAt"
                        label="Bắt đầu"
                        style={{ width: "45%" }}
                        rules={[{ required: true, message: 'Chọn ngày bắt đầu' }]}
                      >
                        <DatePicker
                          ranges={{
                            Today: [moment(), moment()],
                            'This Month': [moment().startOf('month'), moment().endOf('month')],
                          }}
                          showTime
                          format="YYYY/MM/DD HH:mm:ss"
                          onChange={onChange}
                          style={{ width: '100%' }}
                          size='large'
                          placeholder="Start time"
                        />
                      </Form.Item>
                      <Form.Item
                        name="endAt"
                        label="Kết thúc"
                        style={{ width: "45%" }}
                        rules={[{ required: true, message: 'Chọn ngày kết thúc' }]}
                      >
                        <DatePicker
                          ranges={{
                            Today: [moment(), moment()],
                            'This Month': [moment().startOf('month'), moment().endOf('month')],
                          }}
                          size='large'
                          showTime
                          format="YYYY/MM/DD HH:mm:ss"
                          onChange={onChange}
                          style={{ width: '100%' }}
                          placeholder="End time"
                        />
                      </Form.Item>
                      <Row justify="end" style={{width:'100%'}}>
                          <Col>
                            <button
                              className="btn-bid-cancel"
                              onClick={hideEditAuction}
                            >
                              Hủy
                            </button>
                          </Col>
                          <Col>
                            <button className="btn-bid" loading={isLoading} >
                              Sửa
                            </button>
                          </Col>
                      </Row>
                    </Row>
                  </Form>
                </Col>
              </Row>
            </Col>

          </div>
        </Modal>

        <Modal
          title="SỬA VẬT PHẨM ĐẤU GIÁ"
          centered
          visible={popUpEditItem}
          onCancel={hideEditItem}
          width={600}
          footer={false}
        >
          <div style={{ padding: '0 0' }}>
            <Col style={{ width: '100%' }}>
              <Row justify="center" 
              style={{ display: "flex", justifyContent: "center", marginTop: "1em" }}>
                <Col style={{ width: '100%' }}>
                  <Form
                    name="create_auction_form"
                    className="signup-form"
                    initialValues={{ remember: true }}
                    onFinish={editItem}
                    layout='vertical'
                    size='middle'
                    style={{width:'540px'}}
                    >
                    <Form.Item
                        name="itemName"
                        rules={[{ required: true, message: 'Hãy nhập tên vật phẩm' }]}
                        label="Tên vật phẩm"
                        initialValue={itemEdit.name}
                    >
                        <Input
                        placeholder="Tên vật phẩm"
                        className='el-input'
                        size="large"
                        />
                    </Form.Item>
                    <Form.Item
                        name="priceFrom"
                        label="Giá khởi điểm"
                        initialValue={itemEdit.starting_price}
                        rules={[{ required: true, message: 'Nhập giá khởi điểm' }]}
                    >
                        <InputNumber
                        placeholder="Giá khởi điểm"
                        className='el-input'
                        size="large"
                        controls={false}
                        style={{width:'540px'}}
                        />
                    </Form.Item>
                    <Form.Item
                        name="branch"
                        label="Thương hiệu"
                        initialValue={itemEdit.brand_id}
                        rules={[{ required: true, message: 'Hãy nhập thương hiệu' }]}
                    >
                        <Cascader 
                        size="large" 
                        options={listBrand} 
                        placeholder="Chọn thương hiệu"
                        dropdownMenuColumnStyle={{width:'520px', height:'42px', fontSize:'17px'}}
                        />
                    </Form.Item>
                    <Form.Item
                        name="series"
                        label="Series sản phẩm"
                        initialValue={itemEdit.series}
                    >
                        <Input
                        placeholder="Series sản phẩm"
                        className='el-input'
                        size="large"
                        />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="Mô tả saen phẩm"
                        rules={[{ required: true, message: 'Hãy nhập mô tả sản phẩm' }]}
                        initialValue={itemEdit.description}
                    >
                        <TextArea
                        placeholder="Series sản phẩm"
                        className='el-input'
                        size="large"
                        />
                    </Form.Item>

                    <Form.Item
                        name="images"
                        label="Ảnh"
                    >
                        <ImgCrop rotate>
                        <Upload
                            customRequest={upfile}
                            listType="picture-card"
                            fileList={fileList}
                            onChange={onChangeImg}
                        >
                            {fileList.length < 5 && '+ Upload'}
                        </Upload>
                        </ImgCrop>
                    </Form.Item>

                    <Form.Item style={{marginTop:'20px'}}>
                        <Row>
                            <button className="btn-bid-cancel" onClick={hideEditItem}>Hủy</button>
                            <button className="btn-bid" isLoading={isLoading}>Cập nhật</button>
                        </Row>
                    </Form.Item>
                  </Form>
                </Col>
              </Row>
            </Col>

          </div>
        </Modal>
      </div>
      <ul className="el-dropdown-menu el-popper dropdown-dot-nft"
        style={menuDisplay ? {
          transformOrigin: "center top",
          zIndex: "2008",
          position: "absolute",
          top: "168px",
          left: "1155px",
        } : { display: 'none' }}>
        {
          Number(seller.selling_user_id) === Number(userId)
            ?
            <>
              <li tabIndex={-1} className='el-dropdown-menu__item text-drop-nft' style={{ fontSize: '16px' }} onClick={showEditAuction}>
                <span>Sửa đấu giá</span>
              </li>
              <li tabIndex={-1} className='el-dropdown-menu__item text-drop-nft' style={{ fontSize: '16px' }} onClick={showEditItem}>
                <span>Sửa vật phẩm</span>
              </li>
              <li tabIndex={-1} className='el-dropdown-menu__item text-drop-nft' style={{ fontSize: '16px' }} onClick={confirmDeleteAuction}>
                <span>Xóa đấu giá</span>
              </li>
            </>
            :
            <>
            </>
        }

        <li tabIndex={-1} className='el-dropdown-menu__item text-drop-nft' style={{ fontSize: '16px' }} onClick={hideEditAuction}>
          <span>Thoát</span>
        </li>
      </ul>
    </Row>

  );

}

export default AuctionDetail;
