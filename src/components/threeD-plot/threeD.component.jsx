import React from 'react';
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import dataRegistry from '../data-component/dataRegistry.json'
import Stats from 'stats.js';
import * as d3 from 'd3'

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import DropDowns from './dropdowns.component'
import VolumeRendering from './volume-rendering.componenet'


class ThreeDComponent extends React.Component {
    constructor(){
        super();
    }  
    
    componentDidMount(){
      
    }

      render(){
        return(
            <Col xs={12}>
                <Row>
                    <Col xs={12} style={{height:'10vh', backgroundColor:'#31393F'}} >
                        <DropDowns/>                    
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} style={{height:'55vh', backgroundColor:'#31393F'}} className={"threeContainer"}>                    
                        <VolumeRendering 
                            parentId=".threeContainer"
                            area={this.props.area}
                        />
                    </Col>                                    
                </Row>
            </Col>
        )
      }

    }

    

export default ThreeDComponent;
