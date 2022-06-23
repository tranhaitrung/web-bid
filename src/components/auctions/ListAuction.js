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
    const [paramSearch, setParamSearch] = useState('');
    const [paramStatus, setParamStatus] = useState(0);
    const [paramCategory, setParamCategory] = useState('');
    const [pageSize, setPageSize] = useState(12);


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
            value: '6',
            label: 'Đã bán thành công',
        },
      ];
    

    function onChangeSearch(value) {
        setParamSearch(value)
        getListAuction(paramStatus, paramCategory)
    }

    function onChangeStatus (value) {
        var statusId = (value === undefined || value === null) ? 0 : value
        setParamStatus(statusId)
        getListAuction(statusId, paramCategory)
    }

    function onChangeCategory(value) {
        var categoryId = (value === undefined || value === null) ? '' : value
        setParamCategory(categoryId)
        getListAuction(paramStatus, categoryId)
    }

    function onChangePage(value) {
        apis.auction
        .listAuction(paramStatus,value,pageSize, '', '', paramCategory)
        .then((res) => {
            var data = res.data.data;
            setListAuction(data.auctions);
            setTotalAuction(data.total);
        })
    }


    function onChangePageSize(value) {
        setPageSize(value)
        apis.auction
        .listAuction(paramStatus,0,value, '', '', paramCategory)
        .then((res) => {
            var data = res.data.data;
            setListAuction(data.auctions);
            setTotalAuction(data.total);
        })
    }

    function getListAuction(statusId, categoryId) {
        statusId = (statusId === undefined || statusId === null || statusId === '') ? 0 : statusId
        categoryId = (categoryId === undefined || categoryId === null) ? '' :categoryId
        apis.auction
            .listAuction(statusId,0,pageSize, '', '', categoryId)
            .then((res) => {
                var data = res.data.data;
                setListAuction(data.auctions);
                setTotalAuction(data.total);
            })
    }

    useEffect(() => {
        apis.auction
            .listAuction(0,0,pageSize, '', '', '')
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
                    onChange={onChangeSearch}
                    prefix={<SearchOutlined style={{color:'#a19f9d'}}/>} 
                    id= 'paramSearch'
                    onWaiting={1000}
                    style={{
                        width:'300px', 
                        paddingRight: '36px',
                        marginRight: '20px'
                    }}/>

                    <Cascader 
                    size="large" 
                    options={optionAuctionStatus}
                    onChange={onChangeStatus} 
                    value = { paramStatus }
                    id = 'paramStatus'
                    defaultValue={0}
                    placeholder="Trạng thái" 
                    style={{ 
                        marginRight: '20px',
                    }}
                    dropdownMenuColumnStyle= {{width: "170px"}}
                    />


                    <Cascader 
                    size="large" 
                    options={listCategory} 
                    onChange={onChangeCategory} 
                    value={paramCategory}
                    id = 'paramCategory'
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
                    onChange={onChangePage}
                    onShowSizeChange={onChangePageSize}
                    defaultPageSize={pageSize}
                    defaultCurrent={1}
                    total={totalAuction}              
                    pageSizeOptions={[12, 24, 48, 56]}
                    />
                </Row>
            </Col>
        </Row>
    );
}