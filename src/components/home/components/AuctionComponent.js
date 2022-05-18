import { Row, Button, Col, Input, Image, Statistic } from "antd";
import React, { useEffect, useState }  from "react";
import { Link } from "react-router-dom";
import { HeartOutlined } from '@ant-design/icons';
import apis from '../../../redux/apis';
import '../HomePage.css';

const { Countdown } = Statistic;

function AuctionComponent(props) {

    const [totalLike, setTotalLike] =useState();

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

    return (
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
                        <span className="text-desc">Bắt đầu sau:</span>
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
                            <HeartOutlined style={styleHeart} className='cursor' />
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
                        <div>
                            <span className="text-desc">Thắng cuộc:</span>
                            <span className="text-price">Nguyễn Văn An</span>
                        </div>
                    </Row>

                    <div className="line"></div>
                    
                    <Row justify="space-between">
                        <Link to={`auctions/detail/${auctionId}`}>
                            <div className="text-hyperlink text-semibold cursor nft-header6">Xem chi tiết</div>
                        </Link>
                        <div style={{fontSize:'18px'}}>
                            <HeartOutlined style={styleHeart} className='cursor' />
                            <span style={{marginLeft:'5px'}}> { totalLike } </span>
                        </div>
                    </Row>
                </Col>
                
            </Row>
            }
        </Col>
    );              
}

export default AuctionComponent;