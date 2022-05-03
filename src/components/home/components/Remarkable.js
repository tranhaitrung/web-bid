import React from 'react';
import { Carousel } from 'antd';

const contentStyle = {
  height: '450px',
  color: '#fff',
  lineHeight: '450px',
  textAlign: 'center',
  background: '#364d79',
  borderRadius: '16px', 
};

export default function Remarkable() {
    return(
        <div>
            <Carousel autoplay>
                <div>
                <h3 style={contentStyle}>1</h3>
                </div>
                <div>
                <h3 style={contentStyle}>2</h3>
                </div>
                <div>
                <h3 style={contentStyle}>3</h3>
                </div>
                <div>
                <h3 style={contentStyle}>4</h3>
                </div>
            </Carousel>
        </div>
    );
}
