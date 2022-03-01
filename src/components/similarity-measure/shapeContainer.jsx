import React from 'react';
// import * as d3 from 'd3'
import './shapeContainer.css'

import Container from 'react-bootstrap/Container'
import { Col, Row, Form} from 'react-bootstrap';

import GenerateSimilarShapes from './generateSimilarShapes';




class ShapeContainerComponent extends React.Component{
    constructor(){
        super();
        this.state = {
            value: '210', 
            similarity: 'shape', 
            folder: 'newData'
        }
        // this.dataTime = {
        //     contrails1: [0.1,0.11,0.12,0.13,0.14,0.15,0.16,0.17,0.18,0.19,0.2],
        //     contrails2: [0.1,0.11,0.12,0.13,0.14,0.15,0.16,0.17,0.18,0.19,0.2],
        //     contrails3: [0.1,0.11,0.12,0.13,0.14,0.15,0.16,0.17,0.18,0.19,0.2],
        //     newData:[210,211,212,213,214,215,216,217,218,219]
        // }
        this.simulation = [210,211,212,213,214,215,216,217,218,219]
        this.handleOnChange = this.handleOnChange.bind(this)
        this.handleRadioChange = this.handleRadioChange.bind(this)
    }

    componentDidMount(){
        // let up = parseInt(this.divs / 2)
        // this.setState({
        //     upper: up,
        //     lower: parseInt(this.divs - up)
        // })

    }
    handleOnChange(){
        var val = document.getElementById("selection").value;
        this.setState({value: val});
        // console.log(val)

    }

    handleRadioChange(event){
        // console.log(event.target.value)
        this.setState({similarity: event.target.value})
    }



    render(){
        // console.log(this.state)
        if(this.state.value){
            console.log('shape-container')
            // console.log(this.state)
            return(
                <Container fluid>
                    <Row xs={12} style={{height: '5vh'}}>
                    <Col xs={6}>
                    <Form>
                    <Form.Group >
                        <Form.Label id='space'>Simiarity based on : </Form.Label>
                        <Form.Check
                        inline
                        label="Shape"
                        name="TGroup"
                        type="radio"
                        id={`inline-radio-3`}
                        value="shape"
                        className="radin"
                        defaultChecked
                        onChange={this.handleRadioChange}
                        />

                        <Form.Check
                        inline
                        label="I/O"
                        name="TGroup"
                        type="radio"
                        id={`inline-radio-4`}
                        value="io"
                        onChange={this.handleRadioChange}
                        
                        />
                    </Form.Group>
                    </Form>
                        </Col>
                        <Col xs={6}>
                            <select id='selection' onChange={this.handleOnChange}>
                                {/* <option value='contrails1'>contrails1</option> */}
                                {
                                    this.simulation.map((el, i) =>{
                                        return <option value={`${el}`} key={i}>{el}</option>
                                    })
                                }
                            </select>
                        </Col>
                    </Row>

                    <GenerateSimilarShapes 
                        value = {this.state.value}
                        folder = {this.state.folder}
                        similarity = {this.state.similarity}
                    />

                </Container>
            )
            
        }
        
    }
}

export default ShapeContainerComponent ;