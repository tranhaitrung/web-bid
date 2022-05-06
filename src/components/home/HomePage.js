import React from 'react';
import OnAuction from './components/OnAuction';
import UpComing from './components/UpComing';
import Ending from './components/Ending';
import Remarkable from './components/Remarkable';
import Category from './components/Category';
import { Col, Row, Cascader } from 'antd';
import { Link } from "react-router-dom";

import './HomePage.css'

function HomePage() {

    function listAuctionOnTime() {
        var listAuctionEnded = [];
        for(var i = 1; i <= 4; i++) {
            listAuctionEnded.push(<OnAuction></OnAuction>);
        }

        return listAuctionEnded;
    }

    function listAuctionComming() {
        var listAuctionEnded = [];
        for(var i = 1; i <= 3; i++) {
            listAuctionEnded.push(<UpComing></UpComing>);
        }

        return listAuctionEnded;
    }

    function listAuction() {
        var listAuctionEnded = [];
        for(var i = 1; i <= 8; i++) {
            listAuctionEnded.push(<Ending></Ending>);
        }

        return listAuctionEnded;
    }

    function listCategory() {
        var categories = [];
        for(var i = 1; i <= 4; i++) {
            categories.push(<Category></Category>);
        }
        return (
            categories
        );
    }

    const optionAuctionStatus = [
        {
            value: '1',
            label: 'Đang diễn ra',
        },
        {
            value: '2',
            label: 'Sắp diễn ra',
        },
        {
            value: '3',
            label: 'Đã kết thúc',
        },
        {
            value: '4',
            label: 'Đang chờ duyệt',
        },
        {
            value: '5',
            label: 'Đã bị từ chối',
        },
        {
            value: '6',
            label: 'Đã bán thành công',
        },
      ];
      
      function onChange(value) {
        console.log(value);
      }

      const optionCategories = [
        {
            value: '1',
            label: 'Nhà đất',
        },
        {
            value: '2',
            label: 'Ô tô - Xe máy',
        },
      ];
    
    function jumpToHead() {
        window.scrollTo(0, 0);
    }

    return(
        <div>
            <Row align='middle' justify='center' >
                <Col style={{width: "1200px"}}>
                    
                    <Remarkable>
                    </Remarkable>

                    <Row style={{margin: '70px 0'}}>
                        <Row>
                            <h1>Đấu giá đang diễn ra</h1>
                        </Row>
                        <Row style={{width:'1200px'}}>
                            {
                                listAuctionOnTime()
                            }
                        </Row>
                        <Row justify="center" style={{width:'1200px'}}>
                            <button className="button-load-more nft-header6">
                                Xem thêm
                            </button>
                        </Row>
                    </Row>

                    {/* <Row>
                        <Row>
                            <h1>Đấu giá sắp tới</h1>
                        </Row>
                        <Row style={{width:'1200px'}}>
                            {
                                listAuctionComming()
                            }
                        </Row>
                        <Row justify="center" style={{width:'1200px'}}>
                            <button className="button-load-more nft-header6">
                                Xem thêm
                            </button>
                        </Row>
                    </Row>

                    <Row>
                        <Row>
                            <h1>Đấu giá đã kết thúc</h1>
                        </Row>
                        <Row style={{width:'1200px'}}>
                            {
                                listAuctionEnded()
                            }
                        </Row>
                        <Row justify="center" style={{width:'1200px'}}>
                            <button className="button-load-more nft-header6">
                                Xem thêm
                            </button>
                        </Row>
                    </Row> */}

                    <Row>
                        <Row justify='center'>
                            <div>
                                <h1>Categories</h1>
                            </div>
                            
                        </Row>
                        <Row style={{width:'1200px'}} >
                            {
                                listCategory()
                            }
                                
                        </Row>
                    </Row>
                    
                    <Row style={{margin: '100px 0'}}>
                        <Row style={{width:'1200px'}}>
                            <h1>Các cuộc đấu giá</h1>
                        </Row>

                        <Row style={{width:'1200px'}}>
                            <Cascader 
                            size="large" 
                            options={optionAuctionStatus} 
                            onChange={onChange} 
                            placeholder="Trạng thái" 
                            style={{borderRadius:'10px', marginRight: '20px'}}
                            />


                            <Cascader 
                            size="large" 
                            options={optionCategories} 
                            onChange={onChange} 
                            placeholder="Danh mục" 
                            style={{borderRadius:'8px'}}
                            />
                        </Row>

                        <Row style={{width:'1200px'}}>
                            {
                                listAuction()
                            }
                        </Row>
                        <Row justify="center" style={{width:'1200px'}}>
                            <Link to={`/auctions`} onClick={jumpToHead}>
                                <button className="button-load-more nft-header6">
                                    Xem thêm
                                </button>
                            </Link>

                        </Row>
                    </Row>

                </Col>
            </Row>
            
        </div>
    );
}

export default HomePage;