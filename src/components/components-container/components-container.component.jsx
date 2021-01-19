import React from 'react';

import QueryPanel from '../query-panel/query-panel.component';
import ParametersPlot from '../parameters-plot/parameters-plot.component';
import Clusters from '../clusters/clusters.component';
import Projection2D from '../projection-2d/projection-2d.component';
import Projection3D from '../projection-3d/projection-3d.component';
import DropdownPanel from '../dropdown-panel/dropdown-panel.component';

import './components-container.styles.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class ComponentsContainer extends React.Component {
    constructor(){
        super();
        this.state = {

        }
    
    }


    render(){
        return(
            <Container fluid >
                <Row xs={12}>
                    <Col xs={2} style={{backgroundColor: '#b2182b',height:'100vh'}}>
                        <QueryPanel/>
                    </Col>
                    <Col xs={6}style={{height:'100vh'}}>
                    <Row xs={3}> 
                            {/* 3d view and the dropdown */}
                            <Col xs={6}>
                                <Row xs={2}>
                                    <Col xs={12}>
                                        <DropdownPanel/>
                                    </Col>
                                </Row>
                                <Row xs={10}>
                                    <Col xs={12}>
                                        <Projection3D/>
                                    </Col>                                    
                                </Row>
                            </Col>
                            {/* 2d view */}
                            <Col xs={6} style={{backgroundColor: '#d1e5f0',height:'25vh'}}>
                                <Projection2D/>
                            </Col>
                        </Row>
                        <Row xs={3}> 
                            {/* 3d view and the dropdown */}
                            <Col xs={6}>
                                <Row xs={2}>
                                    <Col xs={12}>
                                        <DropdownPanel/>
                                    </Col>
                                </Row>
                                <Row xs={10}>
                                    <Col xs={12}>
                                        <Projection3D/>
                                    </Col>                                    
                                </Row>
                            </Col>
                            {/* 2d view */}
                            <Col xs={6} style={{backgroundColor: '#d1e5f0',height:'25vh'}}>
                                <Projection2D/>
                            </Col>
                        </Row>
                        <Row xs={6}>
                            <Col xs={12}style={{backgroundColor: '#67a9cf',height:'50vh'}}>
                                <Clusters/>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={4}style={{backgroundColor: '#2166ac',height:'100vh'}}>
                        <ParametersPlot/>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default ComponentsContainer;