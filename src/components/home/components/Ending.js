import React from 'react';
import { Row, Button, Col, Input, Image } from "antd";
import '../HomePage.css';

function Ending() {
    return(
        <Col className="item">
            <Row className="avatar cursor">
                <Image src="https://lh.rdcpix.com/ae7b9df917a3f48e35aa6bdecccc7b47l-f2430858230r.jpg" className="img" preview={false}/>
            </Row>
            <Row className="content">
                <Col span={24}>
                    <Row className="nft-body-small">
                        <div className="nft-header6 cursor">Nhà Biệt Thự</div> 
                    </Row>
                    <Row className="nft-body-small price" align='middle' style={{height:"55px"}}>
                        <div>
                            <span className="text-desc">Thắng cuộc:</span>
                            <span className="text-price">Nguyễn Văn An</span>
                        </div>
                    </Row>

                    <div className="line"></div>
                    
                    <Row>
                        <div className="text-hyperlink text-semibold cursor nft-header6">Xem chi tiết</div>
                    </Row>
                </Col>
                
            </Row>
        </Col>
    );
}

export default Ending;