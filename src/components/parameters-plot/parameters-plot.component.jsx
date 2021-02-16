import React from 'react';
import InputParameters from './input-parameters.component';
import OutputParameters from './output-parameters.component';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
                    <Col xs={6} style={{ margin: "0px" }}>
                        <InputParameters />
                    </Col>
                    <Col xs={5} style={{ margin: "0px" }}>
                        <OutputParameters style={{ margin: "0px" }} elements={this.props.elements} />
                    </Col>
                </Row>
            </Container>

        )
    }
}

export default ParametersPlot;