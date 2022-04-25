import { Row, Button, Col, Input, Image } from "antd";
import React from "react";
import '../HomePage.css';

function OnAuction() {
    return (
        <div>
            <Col>
                <Row>
                    <h1>Đấu giá đang diễn ra</h1>
                </Row>
                <Row justify="space-between">
                    <Col className="item">
                        <Row className="avatar cursor">
                            <Image src="https://lh.rdcpix.com/ae7b9df917a3f48e35aa6bdecccc7b47l-f2430858230r.jpg" className="img" preview={false}/>
                        </Row>
                        <Row className="content">
                            <Col span={24}>
                                <Row className="nft-body-small">
                                    <div className="nft-header6 cursor">Nhà Biệt Thự</div> 
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
                                
                                <Row>
                                    <div className="text-hyperlink text-semibold cursor nft-header6">Đấu giá</div>
                                </Row>
                            </Col>
                            
                        </Row>
                    </Col>

                    <Col className="item">
                        <Row className="avatar cursor">
                            <Image src="https://lh.rdcpix.com/ae7b9df917a3f48e35aa6bdecccc7b47l-f2430858230r.jpg" className="img" preview={false}/>
                        </Row>
                        <Row className="content">
                            <Col span={24}>
                                <Row className="nft-body-small">
                                    <div className="nft-header6 cursor">Nhà Biệt Thự</div> 
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
                                
                                <Row>
                                    <div className="text-hyperlink text-semibold cursor nft-header6">Đấu giá</div>
                                </Row>
                            </Col>
                            
                        </Row>
                    </Col>

                    <Col className="item">
                        <Row className="avatar cursor">
                            <Image src="https://lh.rdcpix.com/ae7b9df917a3f48e35aa6bdecccc7b47l-f2430858230r.jpg" className="img" preview={false}/>
                        </Row>
                        <Row className="content">
                            <Col span={24}>
                                <Row className="nft-body-small">
                                    <div className="nft-header6 cursor">Nhà Biệt Thự</div> 
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
                                
                                <Row>
                                    <div className="text-hyperlink text-semibold cursor nft-header6">Đấu giá</div>
                                </Row>
                            </Col>
                            
                        </Row>
                    </Col>

                    <Col className="item">
                        <Row className="avatar cursor">
                            <Image src="http://lh.rdcpix.com/def0a899cd009e014a5aab4e053a8abfl-f1718479939r.jpg" className="img" preview={false}/>
                        </Row>
                        <Row className="content">
                            <Col span={24}>
                                <Row className="nft-body-small">
                                    <div className="nft-header6 cursor">Nhà Biệt Thự</div> 
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
                                
                                <Row>
                                    <div className="text-hyperlink text-semibold cursor nft-header6">Đấu giá</div>
                                </Row>
                            </Col>
                            
                        </Row>
                    </Col>
                    
                </Row>
                <Row justify="center">
                    <button className="button-load-more nft-header6">
                        Xem thêm
                    </button>
                </Row>
            </Col>
        </div>
    );
}

export default OnAuction;