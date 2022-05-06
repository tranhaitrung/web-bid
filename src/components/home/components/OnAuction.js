import { Row, Button, Col, Input, Image } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { HeartOutlined } from '@ant-design/icons';
import '../HomePage.css';

function OnAuction() {

    

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

    return (
        <Col className="item">
            <Link to={`auctions/detail/1`}>
                <Row className="avatar cursor">
                    <Image src="https://lh.rdcpix.com/ae7b9df917a3f48e35aa6bdecccc7b47l-f2430858230r.jpg" className="img" preview={false}/>
                </Row>
            </Link>

            <Row className="content">
                <Col span={24}>
                    <Row className="nft-body-small">
                        <Link to={`auctions/detail/1`}>
                            <div className="nft-header6 cursor">Nhà Biệt Thự</div> 
                        </Link>
                    </Row>
                    <Row className="nft-body-small price">
                        <div>
                            <span className="text-desc">Giá khởi điểm:</span>
                            <span className="text-price">10000000</span>
                        </div>
                    </Row>

                    <Row className="nft-body-small price">
                        <div>
                            <span className="text-desc">Chưa có người tham gia</span>
                        </div>
                    </Row>
                    <div className="line"></div>
                    
                    <Row justify="space-between">
                        <div className="text-hyperlink text-semibold cursor nft-header6">Đấu giá</div>
                        <div style={{fontSize:'18px'}}>
                            <HeartOutlined style={styleHeart} className='cursor' />
                            <span style={{marginLeft:'5px'}}>1</span>
                        </div>
                    </Row>
                </Col>
                
            </Row>
        </Col>
    );              
}

export default OnAuction;