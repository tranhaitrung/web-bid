import React, { useEffect, useState } from 'react';
import { Carousel } from 'antd';
import apis from "../../../redux/apis/index"
import { notification, message } from "antd";

const contentStyle = {
  height: '450px',
  width:'100%',
  borderRadius: '16px',

};


export default function Remarkable() {

    const [list, setList] = useState([]);

    // const slider = props;
    var slider = [];

    useEffect(() => {
        apis.slider
            .listSlide()
            .then((res) => {
                var data = res.data.data;
                for(var i = 0; i < data.length; i++) {
                    slider.push(
                        <div style={{height: '450px'}}>
                            <img style={contentStyle} src={data[i].image} alt="" />
                        </div>
                    );
                }
                setList(slider);
            })
            .catch((e)=> {
                message.error("INTERNAL SERVER")
            })

    }, []);

    // const remarkabel = () => {
    //     if (slider != null) {
    //         for (var i = 0; i < slider.size(); i++) {
    //             remark.push(
    //                 <div style={{height: '450px'}}>
    //                     <img style={contentStyle} src={slider[i].image} alt="" />
    //                 </div>
    //             );
    //         }
    //     }
    //     return remark;

    // };

    return(
        <div>
            <Carousel autoplay>
                {list}
            </Carousel>
        </div>
    );
}
