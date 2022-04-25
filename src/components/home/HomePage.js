import React from 'react';
import OnAuction from './components/OnAuction';
import UpComing from './components/UpComing';
import Ending from './components/Ending';
import { Col, Row } from 'antd';

function HomePage() {
    return(
        <div>
            <Row align='middle' justify='center' >
                <Col style={{width: "1200px"}}>
                    <OnAuction>
                    </OnAuction>

                    <UpComing>
                    </UpComing>

                    <Ending>
                    </Ending>
                </Col>
            </Row>
            
        </div>
    );
}

export default HomePage;