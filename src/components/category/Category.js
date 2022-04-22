import React from "react";
import {Col, Row} from 'antd'
function Category() {
    return (
        <Col style={{background:"#0a9d9c"}}>
            <Row align="middle" >
                <Col span={3} > Trang chủ </Col>
                <Col span={2} > Điện thoại</Col>
                <Col span={2} > Laptop</Col>
                <Col span={2} > Thời trang</Col>
                <Col span={2} > Ô tô - Xe máy</Col>
                <Col span={2} > Tổng hợp</Col>
            </Row>

        </Col>
    );
}

export default Category;