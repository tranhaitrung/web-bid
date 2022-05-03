import React from "react";
import { Col, Row, List } from "antd";

import './Detail.css'

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

class AuctionDetail extends React.Component {
    constructor(props) {
        super(props);
        //Chỉ định một state
        this.state = { tabActive: "COMMENTS" };
      }


    
    changeTab = (text) => {
        console.log(text);
        this.setState({tabActive: text});
    }

    render() {    
    
        return(
            <Row justify="center">
            <Col className="detail">
                <Row>
                    <div className="detail-left">
                        <div className="content-media">
                            <img src="http://lh.rdcpix.com/c6a31b4713ea02f6e8d695329dcffaeel-f1004866407r.jpg" alt="ảnh detail" />
                        </div>
                        <div>
                        <List
                            grid={{ gutter: 10 }}
                            dataSource={data}
                            renderItem={item => (
                            <List.Item>
                                <img src={item.image} style={{width: "100px", height:'100px', borderRadius:'5px'}}/>
                            </List.Item>
                            )}
                        />
                        </div>
                    </div>
                    <div className="detail-right m1-auto">
                        <div className="detail-heading">
                            <div className="auction-title">Cuộc đấu giá số 009</div>
                        </div>
                        <div className="item-title">
                            Xe máy Wave alpha
                        </div>
                        <div className="detail-des">
                        The Providence Groups Newest Townhouse-Mayfield II. Gorgeous Brownstone Collection! Amazing mixed-use development, live/work/play Community in the heart of Alpharetta! Just steps away from Maxwell retail, on Alpha loop and 1/2 mile from Alpharetta Square. 4 Bd/3.5 Bath Open Concept Townhome, main floor boasts Beautiful Chef's Kitchen w/large island overlooking roomy family room with study, including to 3 covered decks, covered porch and backyard! Expansive Owners bedroom features elegant ensuite & covered porch. Community Features: Pool, Cabana, Bocce Ball, Firepit, Alpha loop and Maxwell Retail (Features Fairway Social, Poncho Chicken, Lily's Sushi and BodyBar). In early construction phase, come chose your personal touches and Make Space for Life! $5k in Closing Costs with Preferred Lender!
                        </div>
    
                        <div className="sack">
                            <div className="sack-seller">
                                <div className="sack-seller-title">Danh mục</div>
                                <div className="sack-seller-detail">
                                    <div>
                                        <div className="wrap-media">
                                            <div className="content-media">
                                                <img src="http://lh.rdcpix.com/c6a31b4713ea02f6e8d695329dcffaeel-f1004866407r.jpg" alt="ảnh đại diện người bán" />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <span>Bất động sản</span>
                                    </div>
                                </div>
                            </div>
                            <div className="sack-seller">
                                <div className="sack-seller-title">Người bán</div>
                                <div className="sack-seller-detail">
                                    <div>
                                        <div className="wrap-media">
                                            <div className="content-media">
                                                <img src="https://s3.cloud.cmctelecom.vn/bework-production/blockchain/AVATAR/AVATAR_chup-anh-dep-anh-sang-min_500647789_1650107731398.jpeg" alt="ảnh đại diện người bán" />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <span>Nguyễn Văn An</span>
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
                                <div className="content-about1-code">1200000</div>
                            </div>
                            <div className="content-about1">
                                <div className="content-about1-title">Bắt đầu</div>
                                <div className="content-about1-code">2022-12-03 12:00:00</div>
                            </div>
                            <div className="content-about1">
                                <div className="content-about1-title">Kết thúc</div>
                                <div className="content-about1-code">2022-12-03 12:00:00</div>
                            </div>
    
                        </div>
    
                        <div className="highest-bid">
                            <div className="highest-bid_title nft-body-base">Giá cao nhất</div>
                            <div className="highest-bid_price">50000000</div>
                        </div>
    
                        <div className="detail-button">
                            <div className="w-100">
                                <button className="el-button-custom">
                                    <span>Đấu Giá</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </Row>
                <Row className="tabs pro-flex">
                    <div 
                    className={ 
                        this.state.tabActive === 'BIDS' 
                        ? "tab-active text-desc cursor tab-item nft-body-base" 
                        : "text-desc cursor tab-item nft-body-base"
                    }
                    onClick={()=>{
                        this.setState({tabActive: 'BIDS'})
                    }}
                    > Danh sách đấu giá</div>

                    <div 
                    className={ 
                        this.state.tabActive === 'COMMENTS' 
                        ? "tab-active text-desc cursor tab-item nft-body-base" 
                        : " text-desc cursor tab-item nft-body-base"
                    } 
        
                    onClick={()=>{
                        this.setState({tabActive: 'COMMENTS'})
                    }}
                    >Bình luận</div>
    
                </Row>
                {
                    this.state.tabActive === 'BIDS' ?
                    
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
                    <Row>
                        abfbf
                    </Row>
                }
            </Col>
            </Row>
    
        );
    }
}

export default AuctionDetail;
