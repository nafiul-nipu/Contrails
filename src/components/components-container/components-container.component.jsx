import React from 'react';
import * as d3 from 'd3'

import QueryPanel from '../query-panel/query-panel.component';
import ParametersPlot from '../parameters-plot/parameters-plot.component';
import Clusters from '../clusters/clusters.component';
import Projection2D from '../projection-2d/projection-2d.component';
import Projection3D from '../projection-3d/projection-3d.component';
import Projection from '../projection-3d/projection.component'
import DropdownPanel from '../dropdown-panel/dropdown-panel.component';

import particleData from '../data-component/particleData'

import './components-container.styles.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class ComponentsContainer extends React.Component {
    constructor(){
        super();
        this.state = {

        }
        this.data = []   
        this.firstCanvas = React.createRef(); 
        this.firstThree = React.createRef(); 
        this.firstDropdown = React.createRef();


        this.secondCanvas = React.createRef(); 
        this.secondThree = React.createRef(); 
        this.secondDropdown = React.createRef();
    }

    componentDidMount(){ 
        // console.log(dataForlder)
        //creating the first particlesystem
        let threeD = new Projection();
        //first container
        threeD.sceneSetup(this.firstThree.current, this.firstCanvas.current);
        //     this.sceneSetup(".firstContainer");
        const url = 'https://raw.githubusercontent.com/nafiul-nipu/High-Performance-Contrails-Visualization/master/particles/timestep_21.csv'
        // const url = "../../particles/timestep_21.csv"
        threeD.addCustomSceneObjects(url);        
        threeD.widnowResizeHandler(this.firstThree.current)

        // creating the first dropdown
        let dropdown1 = new DropdownPanel();
        dropdown1.createDropdown(this.firstDropdown.current)


        //creating the second particle system
        let threeD2 = new Projection();
        threeD2.sceneSetup(this.secondThree.current, this.secondCanvas.current);
        //     this.sceneSetup(".secondContainer");
        const url2 = 'https://raw.githubusercontent.com/nafiul-nipu/High-Performance-Contrails-Visualization/master/particles/timestep_12.csv'
        threeD2.addCustomSceneObjects(url2);        
        threeD2.widnowResizeHandler(this.secondThree.current)      
        
        //creating the second dropdown
        let dropdown2 = new DropdownPanel();
        dropdown1.createDropdown(this.secondDropdown.current)
        
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
                                    <Col xs={12} style={{height:'3vh'}}>
                                        {/* <DropdownPanel/> */}
                                        <div ref={this.firstDropdown}></div>
                                    </Col>
                                </Row>
                                <Row xs={10}>
                                    <Col xs={12} style={{height:'22vh'}} ref = {this.firstThree}>
                                    <div ref = {this.firstCanvas}></div>
                                        {/* <Projection/> */}
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
                                    <Col xs={12} style={{height:'3vh'}}>
                                        {/* <DropdownPanel/> */}
                                        <div ref={this.secondDropdown}></div>
                                    </Col>
                                </Row>
                                <Row xs={10}>
                                    <Col xs={12} style={{height:'22vh'}} ref={this.secondThree}>
                                        <div ref = {this.secondCanvas}></div>
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