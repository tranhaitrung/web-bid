import React from 'react';
import { Carousel } from 'antd';

const contentStyle = {
  height: '450px',
  width:'100%',
  borderRadius: '16px',

};

export default function Remarkable() {
    return(
        <div>
            <Carousel autoplay>
                <div style={{height: '450px'}}>
                    <img style={contentStyle} src="https://png.pngtree.com/thumb_back/fw800/back_our/20190619/ourmid/pngtree-step-spring-cartoon-child-fun-anime-green-banner-image_141833.jpg" alt="" />
                </div>
                <div style={{height: '450px'}}>
                    <img style={contentStyle} src="https://png.pngtree.com/thumb_back/fw800/back_our/20190619/ourmid/pngtree-step-spring-cartoon-child-fun-anime-green-banner-image_141833.jpg" alt="" />
                </div>
                <div style={{height: '450px'}}>
                    <img style={contentStyle} src="https://png.pngtree.com/thumb_back/fw800/back_our/20190619/ourmid/pngtree-step-spring-cartoon-child-fun-anime-green-banner-image_141833.jpg" alt="" />
                </div>
                <div style={{height: '450px'}}>
                    <img style={contentStyle} src="https://png.pngtree.com/thumb_back/fw800/back_our/20190619/ourmid/pngtree-step-spring-cartoon-child-fun-anime-green-banner-image_141833.jpg" alt="" />
                </div>
            </Carousel>
        </div>
    );
}
