import React, { useEffect, useState } from 'react';
import AuctionComponent from './components/AuctionComponent';
import Remarkable from './components/Remarkable';
import Category from './components/Category';
import { Col, Row, Cascader } from 'antd';
import { Link } from "react-router-dom";
import apis from '../../redux/apis';

import './HomePage.css'

function HomePage() {

    const [listOntime, setListOnTime] = useState()
    const [listAuction, setListAuction] = useState()
    const [listCategory, setListCategory] =useState()
    const [listCategoryFilter, setListCategoryFilter] = useState([])
    const [params, setParams] = useState([])

    useEffect( ()=>{
        apis.auction
        .listAuction(1,1,8, '', '', '') //1: đang diễn ra, 0 số trang, 4 limit
            .then((res) => {
                var data = res.data.data.auctions;
                setListOnTime(data);
            })

    }, [])

    useEffect(() => {
        apis.categories
            .listCategory()
            .then((res) => {
                let data = res.data.data;
                var cates = [];
                for (var i = 0; i < data.length; i++) {
                    var tmp = {
                        value: data[i].category_id,
                        label: data[i].name
                    }
                    cates.push(tmp);
                    
                }
                setListCategoryFilter(cates)
                setListCategory(data)
            })
    }, [])

    useEffect(() => {
        apis.auction
            .listAuction(0,1,8, '', '', '')
            .then((res) => {
                var data = res.data.data.auctions;
                setListAuction(data);
            })
    }, [])

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

    var mapParam = new Map()
      
    function onChangeStatus(value) {
        console.log(value)
        mapParam.set("statusId", value)
        setParams(mapParam)
        callApi()
    }

    function onChangeCategory(value) {
        mapParam.set("categoryId", value)
        setParams(mapParam)
        callApi()
    }

    function callApi() {
        const statusId = mapParam.get("statusId") === null ? 0 : mapParam.get("statusId")
        const categoryId = mapParam.get("categoryId") === null ? '' : mapParam.get("categoryId")
        const typeId = ''
        const userId = ''
        const page = 1
        const limit = 12
        getListAuction(statusId, page, limit, userId, typeId, categoryId)
    }

    function getListAuction(statusId, page, limit, userId, typeId, categoryId) {
        apis.auction
        .listAuction(statusId, page, limit, userId, typeId, categoryId)
        .then((res) => {
            var data = res.data.data.auctions;
            setListAuction(data);
        })
    }
    
    function jumpToHead() {
        window.scrollTo(0, 0);
    }

    return(
        <div>
            <Row align='middle' justify='center' >
                <Col style={{width: "1200px"}}>
                    
                    <Remarkable>
                    </Remarkable>

                    <Row style={{margin: '70px 0'}}>
                        <Row>
                            <h1>Đấu giá đang diễn ra</h1>
                        </Row>
                        <Row style={{width:'1200px'}}>
                            {
                                listOntime?.map((auction) => (
                                    <AuctionComponent auction={auction}></AuctionComponent>
                                ))
                            }
                        </Row>
                        <Row justify="center" style={{width:'1200px'}}>
                            <button className="button-load-more nft-header6">
                                Xem thêm
                            </button>
                        </Row>
                    </Row>

                    <Row>
                        <Row justify='center'>
                            <div>
                                <h1>Categories</h1>
                            </div>
                            
                        </Row>
                        <Row style={{width:'1200px'}} >
                            {
                                listCategory?.map((category) => (
                                    <Category name={category.name} image={category.image}></Category>
                                ))  
                            }
                                
                        </Row>
                    </Row>
                    
                    <Row style={{margin: '100px 0'}}>
                        <Row style={{width:'1200px'}}>
                            <h1>Các cuộc đấu giá</h1>
                        </Row>

                        <Row style={{width:'1200px'}}>
                            <Cascader 
                            size="large" 
                            options={optionAuctionStatus} 
                            onChange={onChangeStatus} 
                            placeholder="Trạng thái" 
                            dropdownMenuColumnStyle= {{width: "170px", borderRadius:'8px'}}
                            />

                            <Cascader 
                            size="large" 
                            options={listCategoryFilter} 
                            onChange={onChangeCategory} 
                            placeholder="Danh mục" 
                            dropdownMenuColumnStyle= {{width: "170px", borderRadius:'8px'}}
                            style={{marginLeft: "20px"}}
                            />
                        </Row>

                        <Row style={{width:'1200px'}}>
                            {
                                listAuction?.map((auction)=> (
                                    <AuctionComponent auction = {auction} />
                                ))
                            }
                        </Row>
                        <Row justify="center" style={{width:'1200px'}}>
                            <Link to={`/auctions`} onClick={jumpToHead}>
                                <button className="button-load-more nft-header6">
                                    Xem thêm
                                </button>
                            </Link>

                        </Row>
                    </Row>

                </Col>
            </Row>
            
        </div>
    );
}

export default HomePage;