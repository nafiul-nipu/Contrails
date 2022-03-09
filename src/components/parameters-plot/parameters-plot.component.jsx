import React from 'react';
import InputParameters from './input-parameters.component';
import OutputParameters from './output-parameters.component';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './parameters-plot.styles.css'

class ParametersPlot extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }

    }


    render() {
        return (
            <Container fluid>
                <Row >
                    <Col xs={5} style={{ margin: "0px", overflowY: 'auto',overflowX: 'hidden', height: '100vh'}} className="airplane-container">
                        <InputParameters 
                            elements={this.props.elements}
                            shouldRender={this.props.shouldRender}
                            memberTop = {this.props.memberTop}
                            memberBottom = {this.props.memberBottom}
                        />
                    </Col>
                    <Col xs={7} style={{ margin: "0px" }}>
                        <OutputParameters style={{ margin: "0px" }} 
                            outputelements={this.props.elements} 
                            split_tendrils={this.props.split_tendrils}
                            memberTop = {this.props.memberTop}
                            memberBottom = {this.props.memberBottom}
                        />
                    </Col>
                </Row>
            </Container>

        )
    }
}

export default ParametersPlot;