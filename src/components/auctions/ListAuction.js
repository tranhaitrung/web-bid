import { Row, Col, Input, Cascader, Select, Pagination  } from "antd";
import React, {useEffect, useState} from "react";
import OnAuction from "../home/components/OnAuction";
import AuctionComponent from "../home/components/AuctionComponent";
import { SearchOutlined } from '@ant-design/icons';
import apis from "../../redux/apis";

import './Filter.css';

const { Option } = Select;

export default function ListAuction() {
    const [listAuction, setListAuction] = useState();
    const [totalAuction, setTotalAuction] = useState();
    const [listCategory, setListCategory] = useState();

    const optionAuctionStatus = [
        {
            value: '0',
            label: 'Tất cả đấu giá',
        },
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

    // function listAuction() {
    //     var auctions = [];
    //     for (var i = 0; i < 16 ; i++) {
    //         auctions.push(<OnAuction/>)
    //     }
    //     return auctions;
    // }

    useEffect(() => {
        apis.auction
            .listAuction(0,1,8, '', '', '')
            .then((res) => {
                var data = res.data.data;
                setListAuction(data.auctions);
                setTotalAuction(data.total);
            });
        
        apis.categories
            .listCategory()
            .then(res => {
                let data = res.data.data;
                var cates = [];
                for (var i = 0; i < data.length; i++) {
                    var tmp = {
                        value: data[i].category_id,
                        label: data[i].name
                    }
                    cates.push(tmp);
                    
                }
                setListCategory(cates);
            })
    }, []);

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
                    dropdownMenuColumnStyle= {{width: "170px"}}
                    />


                    <Cascader 
                    size="large" 
                    options={listCategory} 
                    onChange={onChange} 
                    placeholder="Danh mục" 
                    style={{borderRadius:'8px'}}
                    dropdownMenuColumnStyle= {{width: "170px"}}
                    />
                </Row>

                <Row style={{width:'1200px'}}>
                    {
                        listAuction?.map((auction) => (
                            <AuctionComponent auction={auction}></AuctionComponent>
                        ))
                    }
                </Row>
                <Row justify="end" style={{margin:'30px 15px'}}>
                    <Pagination
                    showSizeChanger
                    //onShowSizeChange={onShowSizeChange}
                    defaultPageSize={12}
                    defaultCurrent={1}
                    total={totalAuction}
                    pageSizeOptions={[12, 24, 48, 56]}
                    />
                </Row>
            </Col>
        </Row>
    );
}