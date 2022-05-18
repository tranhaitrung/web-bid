import { Row, Button, Col, Input, Image } from "antd";
import React from "react";
import '../HomePage.css';

function Category(props) {
    return (
        <Col className="item-category ">
            <Row className="avatar cursor">
                <Image src={props.image} className="img" preview={false}/>
            </Row>
            <Row className="content-category">
                <Col span={24}>
                    <Row className="nft-body-small" justify="center">
                        <div className="nft-header6 cursor">{props.name}</div> 
                    </Row>
                </Col>
                
            </Row>
        </Col>

                    
    );
}

export default Category;