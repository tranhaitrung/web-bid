import { Row, Col, Input, Cascader, Select, Pagination  } from "antd";
import React from "react";
import Ending from "../home/components/Ending";
import OnAuction from "../home/components/OnAuction";
import UpComing from "../home/components/UpComing";
import { SearchOutlined } from '@ant-design/icons';

import './Filter.css';

const { Option } = Select;

export default function ListAuction() {
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

    function listAuction() {
        var auctions = [];
        for (var i = 0; i < 16 ; i++) {
            auctions.push(<OnAuction/>)
        }
        return auctions;
    }

    return(
        <Row justify='center'>
            <Col style={{width:'1200px'}}>
                <Row>
                    <div 
                    style={{
                        fontWeight:'600',
                        fontSize: '48px',
                        margin: '15px 0'
                        }}>
                            Danh sách các cuộc đấu giá
                    </div>
                </Row>
                <Row >
                    <Input 
                    placeholder="Nhập tên đấu giá" 
                    size="large" 
                    prefix={<SearchOutlined style={{color:'#a19f9d'}}/>} 
                    style={{
                        width:'300px', 
                        paddingRight: '36px',
                        marginRight: '20px'
                    }}/>

                    <Cascader 
                    size="large" 
                    options={optionAuctionStatus} 
                    onChange={onChange} 
                    placeholder="Trạng thái" 
                    style={{ 
                        marginRight: '20px',
                    }}
                    className='form-filter'
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
                <Row justify="end" style={{margin:'30px 15px'}}>
                    <Pagination
                    showSizeChanger
                    //onShowSizeChange={onShowSizeChange}
                    defaultCurrent={1}
                    total={400}
                    
                    />
                </Row>
            </Col>
        </Row>
    );
}