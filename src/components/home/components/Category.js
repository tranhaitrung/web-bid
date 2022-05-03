import { Row, Button, Col, Input, Image } from "antd";
import React from "react";
import '../HomePage.css';

function Category() {
    return (

        <Col className="item-category ">
            <Row className="avatar cursor">
                <Image src="https://lh.rdcpix.com/ae7b9df917a3f48e35aa6bdecccc7b47l-f2430858230r.jpg" className="img" preview={false}/>
            </Row>
            <Row className="content-category">
                <Col span={24}>
                    <Row className="nft-body-small" justify="center">
                        <div className="nft-header6 cursor">Nhà Biệt Thự</div> 
                    </Row>
                </Col>
                
            </Row>
        </Col>

                    
    );
}

export default Category;