import { Row, Col, Input, Cascader, Select, Pagination, Empty, message  } from "antd";
import React from "react";
import AuctionComponent from "../home/components/AuctionComponent";
import { SearchOutlined } from '@ant-design/icons';
import apis from "../../redux/apis";
import { useHistory } from "react-router";

import './Filter.css';
import './UserAuction.css';

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

class UserAuction extends React.Component {

    constructor(props){
        super(props);
        this.state= {
            tabActive: 'MINE'
        };
        this.initData();
    }

    activeStyle = 'tab-item nft-header6 cursor text-desc tab-active';
    inactiveStyle = 'tab-item nft-header6 cursor text-desc';
      
    onChange(value) {
    console.log(value);
    }

    initData() {

        this.listAuctionOfUser();
        
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
                this.setState({
                    listCategory: cates
                });
            })
    }

    listAuctionOfUser = () => {
        this.setState({tabActive:'MINE'});
        apis.auction
            .listAcutionByUser(1,1,12)
            .then((res) => {
                let data = res.data.data;
                if (res.data.code === 1000) {
                    this.setState({
                        listAuction: data.auctions,
                        totalAuction: data.total
                    })
                } 
                else if (res.data.code === 1004) {
                    message.error("Bạn cần đăng nhập")
                }
                
            })
    }

    listAcutionUserLiked = () => {
        this.setState({tabActive:'LIKE'});

        apis.auction
            .listAuctionUserLiked(1,12)
            .then((res) => {
                let data = res.data.data;
                
                if (res.data.code === 1000) {
                    this.setState({
                        listAuction: data.auctions,
                        totalAuction: data.total
                    })
                } 
                else if (res.data.code === 1004) {
                    message.error("Bạn cần đăng nhập")
                }
            })
    }



    render(){
        return(
        <Row justify='center'>
            <Col style={{width:'1200px'}}>
                <Row style={{marginBottom: '30px'}}>
                    <div className="header-auction-user">
                        <div className="banner">
                            <div className="wrap-media banner-img">
                                <div className="content-media">
                                    <img 
                                    src="https://png.pngtree.com/thumb_back/fw800/back_our/20190619/ourmid/pngtree-step-spring-cartoon-child-fun-anime-green-banner-image_141833.jpg" 
                                    alt=""
                                    className="d-block wrap-media"
                                    style={{borderRadius: '8px'}} />
                                </div>
                            </div>
                            <div className="banner-avatar">
                                <div className="wrap-media">
                                    <div className="content-media">
                                        <img 
                                        src="https://s3.ap-southeast-1.amazonaws.com/cleverme-production/blockchain/AVATAR/AVATAR_cake_584494726_1650685683493.jpg" 
                                        alt=""
                                        className="d-block" />
                                    </div>

                                </div>
                            </div>

                        </div>
                        <Row justify="center">
                            <div>
                                <span className="text-bold600 nft-header3">Trần Hải Trung</span>
                            </div>
                        </Row>
                        
                    </div>
                </Row>

                <Row className="tabs" style={{width:'100%', marginBottom:"40px"}} justify='center'>
                    <div className={this.state.tabActive ==='MINE' ? this.activeStyle : this.inactiveStyle}>
                        <span
                            onClick={this.listAuctionOfUser}
                        >Đấu giá của tôi</span>
                    </div>
                    <div className={this.state.tabActive ==='LIKE' ? this.activeStyle : this.inactiveStyle}>
                        <span
                            onClick={this.listAcutionUserLiked}
                        >Đấu giá đã thích</span>
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
                    onChange={this.onChange} 
                    placeholder="Trạng thái" 
                    style={{ 
                        marginRight: '20px',
                    }}
                    dropdownMenuColumnStyle= {{width: "170px"}}
                    />


                    <Cascader 
                    size="large" 
                    options={this.state.listCategory} 
                    onChange={this.onChange} 
                    placeholder="Danh mục" 
                    style={{borderRadius:'8px'}}
                    dropdownMenuColumnStyle= {{width: "170px"}}
                    
                    />
                </Row>

                
                <Row style={{width:'1200px'}}>
                    {
                        this.state.totalAuction > 0 
                        ?
                        this.state.listAuction?.map((auction) => (
                            <AuctionComponent auction={auction}></AuctionComponent>
                        ))
                        :
                        <Row justify="center" style={{width: '100%'}}>
                           <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> 
                        </Row>
                        
                    }
                </Row>
                <Row justify="end" style={{margin:'30px 15px'}}>
                    <Pagination
                    showSizeChanger
                    onShowSizeChange={(current, pageSize)=>{console.log(pageSize)}}
                    onChange={(page, limit)=> {console.log(page+","+limit)}}
                    defaultCurrent={1}
                    pageSizeOptions={[12,24,48,96]}
                    total={this.state.totalAuction}
                    defaultPageSize={12}
                    
                    />
                </Row>
            </Col>
        </Row>
        );
    }
}

export default UserAuction;