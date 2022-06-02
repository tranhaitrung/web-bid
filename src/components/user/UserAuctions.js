import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { Form, Input, Cascader, DatePicker } from 'antd';
import { UserOutlined } from '@ant-design/icons';
// import { Link } from 'react-router-dom';
import moment from 'moment';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import apis from '../../redux/apis';
import {createAuction} from '../../redux/actions/auction';

import '../FormInput.css';
import './Style.css';

const {RangePicker} = DatePicker;

function UserAuctions() {

    const dispacth = useDispatch();
    const history = useHistory();
    const { isLoading } = useSelector((state) => state.auction);

    const [listCategory, setListCategory] = useState([]);
    
    useEffect(() => {
        var tmp = [];
        apis.categories
            .listCategory()
            .then((res) => {
                var data = res.data.data;
                for (var i = 0; i < data.length; i++) {
                   tmp.push({
                       value: data[i].category_id,
                       label: data[i].name
                   })
                }
                setListCategory(tmp);
            })
    }, [])

    function onChange(dates, dateStrings) {
        console.log('From: ', dates[0], ', to: ', dates[1]);
        console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
      }

    
    const onFinish = (values) => {
        const body = {
            category_id : values.category[0],
            title_ni: values.auction_name,
            start_date: values.startAt,
            end_date: values.endAt
        }
        dispacth(createAuction(body, history));

    };

    return (
        <Col style={{width:'100%'}}>
            <Row justify="center">
                <h1>Tạo cuộc đấu giá</h1>
            </Row>
            <Row justify="center"  style={{display:"flex", justifyContent:"center", marginTop:"1em"}}>
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
                        name="auction_name"
                        rules={[{ required: true, message: 'Hãy nhập tên đấu giá' }]}
                        label="Tên đấu giá"
                    >
                        <Input
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder="Tên đấu giá"
                        className='el-input'
                        size="large"
                        />
                    </Form.Item>
                    <Form.Item
                        name="category"
                        label="Danh mục"
                        rules={[{ required: true, message: 'Chọn danh mục' }]}
                    >
                        <Cascader 
                        size="large" 
                        options={listCategory} 
                        placeholder="Chọn danh mục"
                        dropdownMenuColumnStyle={{width:'520px', height:'42px', fontSize:'17px'}}
                        />
                    </Form.Item>
                    <Row justify="space-between">
                        <Form.Item
                            name="startAt"
                            label="Bắt đầu"
                            style={{width:"46%"}}
                            rules={[{ required: true, message: 'Chọn thời gian bắt đầu' }]}
                        >
                            <DatePicker
                            ranges={{
                                Today: [moment(), moment()],
                                'This Month': [moment().startOf('month'), moment().endOf('month')],
                            }}
                            showTime
                            format="YYYY/MM/DD HH:mm:ss"
                            onChange={onChange}
                            style={{width:'100%'}}
                            size='large'
                            placeholder="Start time"
                            />
                        </Form.Item>
                        <Form.Item
                            name="endAt"
                            label="Kết thúc"
                            style={{width:"46%"}}
                            rules={[{ required: true, message: 'Chọn thời gian kết thúc' }]}
                        >
                            <DatePicker
                            ranges={{
                                Today: [moment(), moment()],
                                'This Month': [moment().startOf('month'), moment().endOf('month')],
                            }}
                            size='large'
                            showTime
                            format="YYYY/MM/DD HH:mm:ss"
                            onChange={onChange}
                            style={{width:'100%'}}
                            placeholder="End time"
                            />
                        </Form.Item>

                    </Row>

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
    );
}

export default UserAuctions;