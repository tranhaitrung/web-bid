import React from 'react';
import { Table, Tag, Space } from 'antd';
import { Row, Button, Col, Input } from 'antd';
import {SearchOutlined, AppstoreAddOutlined} from '@ant-design/icons';

import '../bids/ManageBids.css';

export default function AcceptAuction() {
    return(
        <div>
            <Row>
                <span className='title-list-bids'>Danh sách đấu giá chờ duyệt</span>
            </Row>
            <Row>
                <Col span={24}>
                
                </Col>
            </Row>
        </div>
    );
}