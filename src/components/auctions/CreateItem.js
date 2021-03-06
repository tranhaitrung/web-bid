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
                    message.success("B???n ???? t???o v???t ph???m th??nh c??ng")
                    history.push(`/auctions/detail/${auctionId}`)
                }
            })
            .catch(e =>{
               var status = e.response.status
               if (status === 401) {
                   message.error("B???n c???n ????ng nh???p ????? s??? d???ng t??nh n??ng n??y")
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
                        <h1>T???O V???T PH???M ?????U GI??</h1>
                    </Row>
                    <Row align='middle' justify='center' style={{width: "100%", margin:"20px 10px"}}>
                        <Col span={11} style={{fontSize:"25px"}}>
                            <span>T??n ?????u gi??: </span>
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
                                rules={[{ required: true, message: 'H??y nh???p t??n v???t ph???m' }]}
                                label="T??n v???t ph???m"
                            >
                                <Input
                                placeholder="T??n v???t ph???m"
                                className='el-input'
                                size="large"
                                />
                            </Form.Item>
                            <Form.Item
                                name="priceFrom"
                                label="Gi?? kh???i ??i???m"
                                rules={[{ required: true, message: 'Nh???p gi?? kh???i ??i???m' }]}
                            >
                                <InputNumber
                                placeholder="Gi?? kh???i ??i???m"
                                className='el-input'
                                size="large"
                                controls={false}
                                style={{width:'540px'}}
                                />
                            </Form.Item>
                            <Form.Item
                                name="branch"
                                label="Th????ng hi???u"
                                rules={[{ required: true, message: 'H??y nh???p th????ng hi???u' }]}
                            >
                                <Cascader 
                                size="large" 
                                options={listBrand} 
                                placeholder="Ch???n th????ng hi???u"
                                dropdownMenuColumnStyle={{width:'520px', height:'42px', fontSize:'17px'}}
                                />
                            </Form.Item>
                            <Form.Item
                                name="series"
                                label="Series s???n ph???m"
                            >
                                <Input
                                placeholder="Series s???n ph???m"
                                className='el-input'
                                size="large"
                                />
                            </Form.Item>

                            <Form.Item
                                name="description"
                                label="M?? t??? saen ph???m"
                                rules={[{ required: true, message: 'H??y nh???p m?? t??? s???n ph???m' }]}
                            >
                                <TextArea
                                placeholder="Series s???n ph???m"
                                className='el-input'
                                size="large"
                                />
                            </Form.Item>

                            <Form.Item
                                name="images"
                                label="???nh"
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
                                    <div className="btn-action btn-cancel">H???y</div>
                                    <button className="btn-save btn-action " isLoading={isLoading}>T???o m???i</button>
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
