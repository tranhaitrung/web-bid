import React, { useEffect, useState }  from "react";
import { Col, Row, List, Comment, Avatar, Form, Button, Input, Tooltip, Modal, Cascader, DatePicker } from "antd";
import { HeartOutlined, MoreOutlined } from '@ant-design/icons';
import moment from 'moment';
import NumberFormat from 'react-number-format';
import { Route, useParams } from "react-router-dom";
// import { Link } from 'react-router-dom';

import apis from "../../redux/apis";
import {currencyFormat} from "../../common/Format"

import './Detail.css'

const onFinish = (values) => {
  console.log('Received values of form: ', values);
};

function onChange(dates, dateStrings) {
  console.log('From: ', dates[0], ', to: ', dates[1]);
  console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
}

const data = [
    {
      image: 'http://lh.rdcpix.com/c6a31b4713ea02f6e8d695329dcffaeel-f1004866407r.jpg',
    },
    {
      image: 'https://lh.rdcpix.com/e3f1ae362359073740b51f1c8453b5f4l-f31556016r.jpg',
    },
    {
      image: 'https://lh.rdcpix.com/8cacec82343becb9851d61f4f30ebaabl-f3217572169r.jpg',
    },
    {
      image: 'https://lh.rdcpix.com/f49423148aa4f4f5d9f5f3a626d10562l-f3854755438r.jpg',
    },
  ];

  const dataComments = [
    {
      author: 'Han Solo',
      avatar: 'https://joeschmoe.io/api/v1/random',
      content: (
        <p>
          We supply a series of design principles, practical patterns and high quality design
          resources (Sketch and Axure), to help people create their product prototypes beautifully and
          efficiently.
        </p>
      ),
      datetime: (
        <Tooltip title={moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')}>
          <span>{moment().subtract(1, 'days').fromNow()}</span>
        </Tooltip>
      ),
    },
    {
      author: 'Han Solo',
      avatar: 'https://joeschmoe.io/api/v1/random',
      content: (
        <p>
          We supply a series of design principles, practical patterns and high quality design
          resources (Sketch and Axure), to help people create their product prototypes beautifully and
          efficiently.
        </p>
      ),
      datetime: (
        <Tooltip title={moment().subtract(2, 'days').format('YYYY-MM-DD HH:mm:ss')}>
          <span>{moment().subtract(2, 'days').fromNow()}</span>
        </Tooltip>
      ),
    },
  ];
  
  const { TextArea } = Input;
  
  const CommentList = ({ comments }) => (
    <List
      dataSource={comments}
      header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
      itemLayout="horizontal"
      renderItem={props => <Comment {...props} />}
    />
  );
  
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

  const [tabActive, setTabActive] = useState("BIDS");
  const [menuDisplay, setMenuDisplay] = useState(false);
  const [auction, setAuction] = useState([]);
  const [category, setCategory] = useState([]);
  const [item, setItem] = useState([]);
  const [seller, setSeller] = useState([]);
  const [maxBid, setMaxBid] = useState();
  const [totalLikeAuction, setTotalLikeAuction] = useState();
  const [listCategory, setListCategory] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState([]);
  const [popUpBid, setPopUpBid] = useState(false);
  const [popUpEditAuction, setPopUpEditAuction] = useState(false);
  const [comments, setComments] = useState([]);
  const [totalComments, setTotalComment] = useState();

  const {auctionId} = useParams();

  useEffect(()=>{
    initData()
  }, [])
      
  function initData () {

      apis.auction
      .auctionDetail(auctionId)
      .then((res) => {
        var data = res.data.data;
        var auction = data.auctions;
        var category = data.category;
        var item = data.items;
        var seller = data.selling_user;
        var maxBid = data.max_bid;

        setAuction(auction);
        setCategory(category);
        setItem(item);
        setSeller(seller);
        setMaxBid(maxBid);

      })

      apis.auction.totalLikeAuction(auctionId)
      .then((res) => {
          var data = res.data.data.total_liked;
          setTotalLikeAuction(data);
      })

      apis.categories
        .listCategory()
        .then(res => {
          var data = res.data.data;
          setListCategory(data);
        }
      )

      apis.comment
      .listComment(auctionId, 0, 100)
      .then(res => {
        var data = res.data.data;
        setTotalComment(data.total);
        setComments(data.comments)
      })
    }

    function showModalBid () {
      setPopUpBid(true); 
    };
    
    function hideModalBid () {
      setPopUpBid(false);
      };

    function showEditAuction () {
        setMenuDisplay(false);
        setPopUpEditAuction(true);
      };

    function hideEditAuction () {
        setMenuDisplay(false);
        setPopUpEditAuction(false);
      };
    

    
    function changeTab (text) {
      setTabActive(text)
    }
    
    function handleSubmit () {
      if (!value) {
        return;
      }
    
      setSubmitting(true)
    
      setTimeout(() => {
        this.setState({
          submitting: false,
          value: '',
          comments: [
            ...comments,
            {
              author: 'Han Solo',
              avatar: 'https://joeschmoe.io/api/v1/random',
              content: <p>{value}</p>,
              datetime: moment().fromNow(),
            },
          ],
        });
        }, 1000);
      };
    
      function handleChange(e) {
        setValue(e.target.value)
      };

    return(
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
                          <img src={item} style={{width: "100px", height:'100px', borderRadius:'5px'}}/>
                      </List.Item>
                      )}
                  />
                    </div>
                </div>
                <div className="detail-right m1-auto">
                    <Row className="detail-heading" justify='space-between'>
                        <div className="auction-title">{ auction.title }</div>

                        <Row className="pro-flex">
                          <div className="btn-action border-left d-flex aign-center pro-flex favourite" style={{fontSize:'20px'}}>
                            <HeartOutlined className='cursor' />
                            <span style={{marginLeft:'5px'}} className='align-center pro-flex'>{ totalLikeAuction }</span>
                          </div>
                          <div 
                          className="btn-action border-right d-flex aign-center pro-flex cursor" 
                          onClick={() => {
                            setMenuDisplay(true)
                          }}
                          style={{fontSize:'20px'}}>
                              <MoreOutlined />
                          </div>
                          <div>
                          </div>
                        </Row>
                    </Row>
                    <div className="item-title">
                        { item.name }
                    </div>
                    <div className="detail-des">
                        { item.description }
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
                                            <img src={ seller.selling_user_avatar } alt="ảnh đại diện người bán" />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <span> { seller.selling_user_name } </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="list-item">
                        <div className="item-i">Thông Tin</div>
                    </div>
                    <div className="content-about">
                        <div className="content-about1" style={{marginTop:'20px'}}>
                            <div className="content-about1-title">Giá khởi điểm</div>
                            <div className="content-about1-code">
                              <NumberFormat value={item.starting_price} displayType={'text'} thousandSeparator={true} />
                            </div>
                        </div>
                        <div className="content-about1">
                            <div className="content-about1-title">Bắt đầu</div>
                            <div className="content-about1-code"> { auction.start_date } </div>
                        </div>
                        <div className="content-about1">
                            <div className="content-about1-title">Kết thúc</div>
                            <div className="content-about1-code">{ auction.end_date }</div>
                        </div>

                    </div>

                    <div className="highest-bid">
                      {
                        maxBid === null 
                        ?
                        <div className="highest-bid_title nft-body-base">Chưa có người tham gia</div>
                        :
                        <div>
                          <div className="highest-bid_title nft-body-base">Giá cao nhất</div>
                          <div className="highest-bid_price"> 
                            <NumberFormat value={maxBid} displayType={'text'} thousandSeparator={true} />
                          </div>
                        </div>

                      }
                    </div>

                    <div className="detail-button">
                        <div className="w-100">
                            <button className="el-button-custom" onClick={showModalBid}>
                                <span>Đấu Giá</span>
                            </button>
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
                onClick={()=>{
                    setTabActive("BIDS")
                }}
                > Danh sách đấu giá</div>

                <div 
                className={ 
                    tabActive === 'COMMENTS' 
                    ? "tab-active text-desc cursor tab-item nft-body-base" 
                    : " text-desc cursor tab-item nft-body-base"
                } 
    
                onClick={()=>{
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
                        <tr className="w-100 row">
                            <td className="col1">
                                <div className="wrap-media">
                                    <div className="content-media">
                                        <img src="https://s3.cloud.cmctelecom.vn/bework-production/blockchain/AVATAR/AVATAR_chup-anh-dep-anh-sang-min_500647789_1650107731398.jpeg" alt="avatar bidder" />
                                    </div>
                                </div>
                                <div><span>Nguyễn Ngọc Ngạn</span></div>
                            </td>
                            <td className="col2">
                                <div>
                                    <span>1,000,000</span>
                                </div>
                            </td>
                        </tr>
                        <tr className="w-100 row">
                            <td className="col1">
                                <div className="wrap-media">
                                    <div className="content-media">
                                        <img src="https://s3.cloud.cmctelecom.vn/bework-production/blockchain/AVATAR/AVATAR_chup-anh-dep-anh-sang-min_500647789_1650107731398.jpeg" alt="avatar bidder" />
                                    </div>
                                </div>
                                <div><span>Nguyễn Ngọc Ngạn</span></div>
                            </td>
                            <td className="col2">
                                <div>
                                    <span>1,000,000</span>
                                </div>
                            </td>
                        </tr>
                        <tr className="w-100 row">
                            <td className="col1">
                                <div className="wrap-media">
                                    <div className="content-media">
                                        <img src="https://s3.cloud.cmctelecom.vn/bework-production/blockchain/AVATAR/AVATAR_chup-anh-dep-anh-sang-min_500647789_1650107731398.jpeg" alt="avatar bidder" />
                                    </div>
                                </div>
                                <div><span>Nguyễn Ngọc Ngạn</span></div>
                            </td>
                            <td className="col2">
                                <div>
                                    <span>1,000,000</span>
                                </div>
                            </td>
                        </tr>
    
                    </table>
                </Row>
                :
                <Row style={{width: "100%"}}>
                    {/* {comments.length > 0 && <CommentList comments={comments} />} */}
                    <Row style={{width: "100%"}}>
                      <Comment
                      avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
                      content={
                          <Editor
                          onChange={handleChange}
                          onSubmit={handleSubmit}
                          submitting={submitting}
                          value={value}
                          />
                      }
                      style={{width:'600px'}}
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
            <Row style={{margin:'50px 0'}}></Row>
        </Col>
        <div style={{fontSize:'35px'}}>
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
                onClick={ hideModalBid}
              >
                Đặt Giá
              </button>,
            ]}
          >
            <div style={{padding:'0 0'}}>
              <div style={{marginBottom:'10px'}}>
                <div className="text-detail-bid ">
                  Bạn săp trả giặt đặt cho cái nhà ABCD này
                </div>  
              </div>
              <input type="text" placeholder="Đặt giá" className="el-input-bid" />

            </div>
          </Modal>
        </div>

        <div style={{fontSize:'35px'}}>
          <Modal
            title="Sửa Đấu Giá"
            centered
            visible={popUpEditAuction}
            onCancel={ hideEditAuction}
            width={600}
            footer={[
              <button 
                className="btn-bid-cancel"
                onClick={hideEditAuction}
              >
                Hủy
              </button>,
              <button
                className="btn-bid"
                onClick={ hideEditAuction}
              >
                Sửa
              </button>,
            ]}
          >
            <div style={{padding:'0 0'}}>
            <Col style={{width:'100%'}}>
              <Row justify="center"  style={{display:"flex", justifyContent:"center", marginTop:"1em"}}>
                  <Col style={{width:'100%'}}>
                      <Form
                      name="create_auction_form"
                      className="signup-form"
                      initialValues={{ remember: true }}
                      onFinish={onFinish}
                      layout='vertical'
                      size='middle'
                      style={{width:'100%'}}
                      >
                      <Form.Item
                          name="auction_name"
                          rules={[{ required: true, message: 'Hãy nhập tên đấu giá' }]}
                          label="Tên đấu giá"
                          initialValue={ auction.title }
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
                      >
                          <Cascader 
                            size="large" 
                            options={listCategory} 
                            onChange={(key)=>{console.log(key)}}
                            placeholder="Chọn danh mục" 
                            placement="bottomRight"
                            dropdownMenuColumnStyle={{width:'550px', height:'42px', fontSize:'17px'}}
                            />
                      </Form.Item>
                      <Row justify="space-between">
                          <Form.Item
                              name="startAt"
                              label="Bắt đầu"
                              style={{width:"45%"}}
                              
                          >
                              <DatePicker
                              ranges={{
                                  Today: [moment(), moment()],
                                  'This Month': [moment().startOf('month'), moment().endOf('month')],
                              }}
                              showTime
                              format="YYYY/MM/DD HH:mm:ss"
                              onChange={onChange}
                              style={{width:'100%'}}
                              size='large'
                              placeholder="Start time"
                              />
                          </Form.Item>
                          <Form.Item
                              name="endAt"
                              label="Kết thúc"
                              style={{width:"45%"}}
                              
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
                              style={{width:'100%'}}
                              placeholder="End time"
                              />
                          </Form.Item>
                      </Row>
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
          left: "1158px",
        } : {display:'none'}}>
          <li tabIndex={-1} className='el-dropdown-menu__item text-drop-nft' style={{fontSize:'16px'}} onClick={showEditAuction}>
            <span>Sửa đấu giá</span>
          </li>
        </ul>
      </Row>

    );
   
}

export default AuctionDetail;
