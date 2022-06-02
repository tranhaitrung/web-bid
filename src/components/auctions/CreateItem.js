import React, { useEffect, useState }  from "react";
import { Col, Row, List, Comment, Avatar, Form, Button, Input, Empty, Modal, Cascader, InputNumber, message  } from "antd";
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import moment from 'moment';
import NumberFormat from 'react-number-format';
import { Route, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
// import { Link } from 'react-router-dom';

import apis from "../../redux/apis";
import {currencyFormat} from "../../common/Format"

import './CreateItem.css';
  
  const { TextArea } = Input;
 
function CreateItem() {
    const history = useHistory();
    const dispacth = useDispatch();
    const [auction, setAuction] = useState([])
    const {auctionId} = useParams()

    const { isLoading } = useSelector((state) => state.auction);

    const [listBrand, setListBrand] = useState([])

    const [fileList, setFileList] = useState([])
    const [lisImg, setListImg] = useState([])
    var imageArray = []
    
    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };
    
    const upfile = ({file, onSuccess}) => {
        const body = new FormData();
        body.append("file", file);
        apis.file
            .upfile(body)
            .then(res => {
                imageArray = lisImg
                onSuccess(res.data[0])
                imageArray.push(res.data[0])
                console.log(imageArray)
                setListImg(imageArray)
            })
            .catch(()=>{
                message.error("UPFILE FAIL")
            })

    }

    useEffect(()=>{
        apis.auction
            .auctionDetail(auctionId)
            .then(res => {
                var data = res.data.data;
                var auction = data.auctions;
                var category = data.category;
                var item = data.items;
                var seller = data.selling_user;
                var maxBid = data.max_bid;

                setAuction(auction);
            })

        apis.brand
            .getListBrands()
            .then(res => {
                var data = res.data.data.brand
                var listTmp = []
                for(var i = 0; i < data.length; i++) {
                    const tmp = {
                        value: data[i].brand_id,
                        label: data[i].name
                    }
                    listTmp.push(tmp)
                }
                setListBrand(listTmp)
            })
    }, [])

    function onFinish(values) {
        const name = values.itemName;
        const starting_price = values.priceFrom
        const brand_id = values.branch[0]
        const description = values.description
        const series = values.series
        const images = lisImg

        const bodyData = {
            name: name,
            starting_price: starting_price,
            brand_id: brand_id,
            description: description,
            series: series,
            images: images
        }

        console.log(bodyData)
        apis.item
            .createItem(auctionId, bodyData)
            .then(res => {
                console.log(res.data)
                var data = res.data
                if (data.code === 1000) {
                    message.success("Bạn đã tạo vật phẩm thành công")
                    history.push(`/auctions/detail/${auctionId}`)
                }
            })
            .catch(e =>{
               var status = e.response.status
               if (status === 401) {
                   message.error("Bạn cần đăng nhập để sử dụng tính năng này")
                   history.push(`/login`)
               }
               if (status === 500) {
                   message.error("INTERNAL SERVER")
               }
            })
    }

    return(
        <div>
            <Row align='middle' justify='center' >
                <Col style={{width: "1200px"}}>
                    <Row align='middle' justify='center' style={{width: "100%"}}>
                        <h1>TẠO VẬT PHẨM ĐẤU GIÁ</h1>
                    </Row>
                    <Row align='middle' justify='center' style={{width: "100%", margin:"20px 10px"}}>
                        <Col span={11} style={{fontSize:"25px"}}>
                            <span>Tên đấu giá: </span>
                            <span style={{fontWeight:"600"}}>{auction.title}</span>
                        </Col>
                    </Row>
                    <Row align='middle' justify='center' style={{width: "100%"}}>
                        <Col>
                            <Form
                            name="create_auction_form"
                            className="signup-form"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            layout='vertical'
                            size='middle'
                            style={{width:'540px'}}
                            >
                            <Form.Item
                                name="itemName"
                                rules={[{ required: true, message: 'Hãy nhập tên vật phẩm' }]}
                                label="Tên vật phẩm"
                            >
                                <Input
                                placeholder="Tên vật phẩm"
                                className='el-input'
                                size="large"
                                />
                            </Form.Item>
                            <Form.Item
                                name="priceFrom"
                                label="Giá khởi điểm"
                                rules={[{ required: true, message: 'Nhập giá khởi điểm' }]}
                            >
                                <InputNumber
                                placeholder="Giá khởi điểm"
                                className='el-input'
                                size="large"
                                controls={false}
                                style={{width:'540px'}}
                                />
                            </Form.Item>
                            <Form.Item
                                name="branch"
                                label="Thương hiệu"
                                rules={[{ required: true, message: 'Hãy nhập thương hiệu' }]}
                            >
                                <Cascader 
                                size="large" 
                                options={listBrand} 
                                placeholder="Chọn thương hiệu"
                                dropdownMenuColumnStyle={{width:'520px', height:'42px', fontSize:'17px'}}
                                />
                            </Form.Item>
                            <Form.Item
                                name="series"
                                label="Series sản phẩm"
                            >
                                <Input
                                placeholder="Series sản phẩm"
                                className='el-input'
                                size="large"
                                />
                            </Form.Item>

                            <Form.Item
                                name="description"
                                label="Mô tả saen phẩm"
                                rules={[{ required: true, message: 'Hãy nhập mô tả sản phẩm' }]}
                            >
                                <TextArea
                                placeholder="Series sản phẩm"
                                className='el-input'
                                size="large"
                                />
                            </Form.Item>

                            <Form.Item
                                name="images"
                                label="Ảnh"
                            >
                                <ImgCrop rotate>
                                <Upload
                                    customRequest={upfile}
                                    listType="picture-card"
                                    fileList={fileList}
                                    onChange={onChange}
                                >
                                    {fileList.length < 5 && '+ Upload'}
                                </Upload>
                                </ImgCrop>
                            </Form.Item>

                            <Form.Item style={{marginTop:'20px'}}>
                                <Row>
                                    <div className="btn-action btn-cancel">Hủy</div>
                                    <button className="btn-save btn-action " isLoading={isLoading}>Tạo mới</button>
                                </Row>
                            </Form.Item>
                            </Form>
                        </Col>
                    </Row>
                </Col>
            </Row>
   
        </div>
        
    );
   
}

export default CreateItem;
