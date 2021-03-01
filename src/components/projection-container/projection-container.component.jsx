import React from 'react';
import * as d3 from 'd3'
import * as THREE from "three";

import Projection from '../projection-3d/projection.component'
import DropdownPanel from '../dropdown-panel/dropdown-panel.component';

import Scatter from '../projection-2d/projection-2d-d3.component'


import './projection-container.style.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import dataRegistry from '../data-component/dataRegistry.json'

//creating objects at the very first
let dropdownObject1 = new DropdownPanel();
let dropdownObject2 = new DropdownPanel();
let idName1 = 'firstDropdown'
let idName2 = 'secondDropdown'
let threeObject1 = new Projection();
let threeObject2 = new Projection();
let scatterObject1 = new Scatter();
let scatterObject2 = new Scatter();

class ProjectionContainer extends React.Component {
    constructor(props){
        super();

        this.state = {
            state_all_data : null,
            state_all_tempDomain : null,
            state_all_xDomain : null,
            state_all_yDomain : null,

            state_three_positions : null,
            state_colors : null
        }
    
    }



    componentDidMount(){ 
        // console.log(dataRegistry[1].timeSteps[0])
        // data registry is a json file manually added the member and data names
        // creating the dropdowns first
        // by default first and second member will be selected
        // console.log(this.test)
        const self = this;
        if(this.props.renderArea === "top"){
            this.forPromise(1, 2.31).then(function(){
                // <Projection id = {self.firstDropdown.current} data={self.state}/>
                console.log('done top')
            })
        }else if(this.props.renderArea === 'bottom'){
            this.forPromise(6, 0.1).then(function(){
                // <Projection id = {self.firstDropdown.current} data={self.state}/>
                console.log('done bottom')
            })
        }  
        
    }

    updateDropdown = (folder, list) =>{
        // this.ref.childCall.test_scatter()
        const self = this
        // console.log(folder, list)
        setTimeout(() => {
                self.forPromise(folder, list[0]).then(function(){
                // <Projection id = {self.firstDropdown.current} data={self.state}/>
                // console.log('done bottom')
                let list = dataRegistry[folder-1].timeSteps
                let index =  list.indexOf(list[0])
                self.updateSlider(list[0], folder);
                self.updateScatterPlot(index)
            })  
            }, 5000);  
        console.log("i am dropdown update")
        
    }

    updateScatterPlot = (index) => {
        this.scatterPlot.scatterplot(index)
    }
    updateSlider = (file, folder) =>{
        // console.log("I am slider update")
        // console.log(file, folder)
        let list = dataRegistry[folder-1].timeSteps
        let index =  list.indexOf(file)
        // console.log(index)
        // position data colors and member
        // this.scatterPlot.test()
        this.threePlot.addCustomSceneObjects(this.state.state_three_positions[index], this.state.state_colors[index], folder); 
        // this.scatterPlot.scatterplot(index)

    }

    forPromise = (folder, file) =>{
        return Promise.resolve(this.dataLoader(folder, file))

    }

    dataLoader = (folder, file) =>{
        // console.log(folder, file)
        const self = this;
        // console.log(this.state)
        let list = dataRegistry[folder-1].timeSteps
        
        // let url_checker = []
        let promises = []
        for(let i = 0; i< list.length; i++){
            let url_checker = `https://raw.githubusercontent.com/CarlaFloricel/Contrails/master/src/data/${folder}/${list[i]}.csv`
            promises.push(d3.csv(url_checker))
  
        }
        // console.log('promises')
        // console.log(promises)
        Promise.all(promises).then(function(files){
            // console.log(self.state)
            // let url = `https://raw.githubusercontent.com/CarlaFloricel/Contrails/master/src/data/${folder}/${file}.csv`
            let data = []
            let all_data = {}
            let all_tempDomain = {}
            let all_xDomain = {}
            let all_yDomain = {}

            let three_positions = {};
            let colors = {}
            let tempColor = ["#fff5f0","#67000d"]
            let tempscaling = d3.scaleLinear(/*d3.schemeReds[9]*/)
                            .range(tempColor);

            let tempDomain = {}
            let xDomain = {}
            let yDomain = {}
            // console.log(file, index)
            // let particle_limit = 0;

            files.forEach(function (value, i) {
                // console.log('%d: %s', i, value);
                all_data[i] = []
                all_tempDomain[i] = {}
                all_xDomain[i] = {}
                all_yDomain[i] = {}
                value.forEach(d => {
                    // particle_limit = particle_limit + 1;
                    // if(particle_limit % 10 == 0){
                        all_data[i].push({
                            x: parseFloat(d['Points:0']),
                            y: parseFloat(d['Points:1']),
                            z: parseFloat(d['Points:2']),
                            temp: parseFloat(d['T'])
                        });
    
                    // }
                    
                    all_tempDomain[i].min = Math.min(all_tempDomain[i].min || Infinity, parseFloat(d['T']));
                    all_tempDomain[i].max = Math.max(all_tempDomain[i].max || -Infinity, parseFloat(d['T']));
    
                    all_xDomain[i].min = Math.min(all_xDomain[i].min || Infinity, parseFloat(d['Points:0']));
                    all_xDomain[i].max = Math.max(all_xDomain[i].max || -Infinity, parseFloat(d['Points:0']));
    
                    all_yDomain[i].min = Math.min(all_yDomain[i].min || Infinity, parseFloat(d['Points:1']));
                    all_yDomain[i].max = Math.max(all_yDomain[i].max || -Infinity, parseFloat(d['Points:1']));
                })
            });
            // console.log(all_data)
            // console.log(all_tempDomain)
            // console.log(all_xDomain)
            // console.log(all_yDomain)

            files.forEach(function (value, i) {
                // console.log('%d: %s', i, value);
                three_positions[i] = []
                colors[i] = []
                tempscaling.domain([all_tempDomain[i].min, all_tempDomain[i].max])
                // console.log(value)
                value.forEach(d => {
                    three_positions[i].push(parseFloat(d['Points:0']), parseFloat(d['Points:1']), parseFloat(d['Points:2']))
                    //   geometry.vertices.push(new Float32Array([d.x, d.y, d.z]));                    
                    let rgb = tempscaling(parseFloat(d['T']));
                    let color = new THREE.Color(rgb);
                    // console.log(color)
                    colors[i].push(color.r, color.g, color.b);
                })
            });

            self.setState({
                state_all_data : all_data,
                state_all_tempDomain : all_tempDomain,
                state_all_xDomain : all_xDomain,
                state_all_yDomain : all_yDomain,

                state_three_positions : three_positions,
                state_colors : colors

            })

            // console.log(self.state)

            // files[index].forEach(d => {
            //     particle_limit = particle_limit + 1;
            //     if(particle_limit % 10 == 0){
            //         data.push({
            //             x: parseFloat(d['Points:0']),
            //             y: parseFloat(d['Points:1']),
            //             z: parseFloat(d['Points:2']),
            //             temp: parseFloat(d['T'])
            //         });

            //     }
                
            //     tempDomain.min = Math.min(tempDomain.min || Infinity, parseFloat(d['T']));
            //     tempDomain.max = Math.max(tempDomain.max || -Infinity, parseFloat(d['T']));

            //     xDomain.min = Math.min(xDomain.min || Infinity, parseFloat(d['Points:0']));
            //     xDomain.max = Math.max(xDomain.max || -Infinity, parseFloat(d['Points:0']));

            //     yDomain.min = Math.min(yDomain.min || Infinity, parseFloat(d['Points:1']));
            //     yDomain.max = Math.max(yDomain.max || -Infinity, parseFloat(d['Points:1']));
            // })
            console.log("data")
            // console.log(data)
            // console.log(tempDomain)
            // console.log(divName)
            // console.log(three)
            // three.addCustomSceneObjects(data, tempDomain);        
            // three.widnowResizeHandler(divName)
            // self.updateThreeScatter(object, divName, objectForScatter, divForScatter, file, folder)            
        })     
               

    }

    render(){
        // console.log(this.state.state_colors)
        if(!this.state.state_colors){
            return(
                <div>Loading ...</div>
            )
        }else{
            return(
                <Row xs={3}> 
                    {/* 3d view and the dropdown */}
                    <Col xs={6}>
                        <Row xs={2}>
                            <Col xs={12} style={{height:'5vh', backgroundColor:'#31393F'}} >
                                <DropdownPanel
                                    data={this.state}   
                                    renderArea={this.props.renderArea}
                                    dropdownUpdate = {this.updateDropdown}
                                    sliderUpdate = {this.updateSlider}
                                    />
                                {/* <div ref={this.firstDropdown} ></div> */}
                            </Col>
                        </Row>
                        <Row xs={10}>
                            <Col xs={12} style={{height:'22vh', backgroundColor:'#31393F'}} className={"threeContainer"}>
                            {/* <div ref = {this.firstCanvas}></div> */}
                                <Projection
                                    parentId={".threeContainer"} 
                                    data={this.state}
                                    ref={(cd) => this.threePlot = cd}
                                    />
                            </Col>                                    
                        </Row>
                    </Col>
                    {/* 2d view */}
                    <Col xs={6} style={{backgroundColor: '#636363',height:'25vh'}} className={"scatterContainer"}>
                        <Scatter 
                            parentId={".scatterContainer"} 
                            renderArea={this.props.renderArea}
                            data={this.state}
                            ref={(cd) => this.scatterPlot = cd}
                        />
                        {/* <div ref = {this.firstScatter}></div> */}
                    </Col>
                </Row>
            )

        }
    }
}

export default ProjectionContainer;