import React from 'react';
import InputParameters from './input-parameters.component';
import OutputParameters from './output-parameters.component';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class ParametersPlot extends React.Component {
    constructor(){
        super();
        this.state = {

        }
    
    }


    render(){
        return(
            <Container fluid>
            <Row > 
                <Col xs={6}>
                <InputParameters/>
                </Col>
                {/* 2d view */}
                <Col xs={6}>
                <OutputParameters style={{marginTop:"100px"}}/>
                </Col>
            </Row>
            </Container>

        )
    }
}

export default ParametersPlot;