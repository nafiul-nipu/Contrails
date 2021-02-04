import React from 'react';
import * as d3 from 'd3'

import Projection from '../projection-3d/projection.component'
import DropdownPanel from '../dropdown-panel/dropdown-panel.component';

import Scatter from '../projection-2d/projection-2d-d3.component'


import './projection-container.style.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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

        }
        // this.props.renderArea = renderArea;

        this.firstCanvas = React.createRef(); 
        this.firstThree = React.createRef(); 
        this.firstDropdown = React.createRef();
        this.firstScatter = React.createRef();


        // this.secondCanvas = React.createRef(); 
        // this.secondThree = React.createRef(); 
        // this.secondDropdown = React.createRef();
        // this.secondScatter = React.createRef();
    
    }

    componentDidMount(){ 
        // console.log(dataRegistry[1].timeSteps[0])
        //data registry is a json file manually added the member and data names
        // creating the dropdowns first
        // by default first and second member will be selected

        if(this.props.renderArea === "top"){
            this.dropdownCreator(threeObject1, this.firstThree.current, dropdownObject1, 1, this.firstDropdown.current, idName1,scatterObject1, this.firstScatter.current)
            //creating the first particlesystem
            //we want the scene loaded 
            //then the particle system will change.. no need to render the scene everytime?
            this.createScene(threeObject1, this.firstThree.current, this.firstCanvas.current)
            //now we want to load the data particle system and the scatter plot
            this.forPromise(threeObject1, 1, 2.31, this.firstThree.current, scatterObject1, this.firstScatter.current).then(function(){
                console.log("first 3D loaded")
            })
        }else if (this.props.renderArea === 'bottom'){
            this.dropdownCreator(threeObject2, this.firstThree.current, dropdownObject2, 5, this.firstDropdown.current, idName2,scatterObject1, this.firstScatter.current)     
            this.createScene(threeObject2, this.firstThree.current, this.firstCanvas.current)   
            this.forPromise(threeObject2, 5, 0.1, this.firstThree.current, scatterObject2, this.firstScatter.current).then(function(){
                console.log("second 3D loaded")
            })
        }      
        
    }


    dropdownCreator = (object, threeDivname, dropdown, memberNumber, divName, idName, objectForScatter, divForScatter) =>{        
        dropdown.createDropdown(object,threeDivname, memberNumber, divName, idName, objectForScatter, divForScatter)
    }

    createScene = (object, threediv, canvas) =>{
        object.sceneSetup(threediv, canvas)
        // console.log("createScene")
        // console.log(three)
    }

    forPromise = (object, folder, file, div, objectForScatter, divForScatter) =>{
        return Promise.resolve(this.dataLoader(object, folder, file, div, objectForScatter, divForScatter))

    }

    dataLoader = (object, folder, file, divName, objectForScatter, divForScatter) =>{
        let url = `https://raw.githubusercontent.com/CarlaFloricel/Contrails/master/src/data/${folder}/${file}.csv`
        let data = []
        let tempDomain = {}
        let xDomain = {}
        let yDomain = {}
        let index = 0;
        d3.csv(url, d => {
            index = index + 1;

                data.push({
                    x: parseFloat(d['Points:0']),
                    y: parseFloat(d['Points:1']),
                    z: parseFloat(d['Points:2']),
                    temp: parseFloat(d['T'])
                });
            
        tempDomain.min = Math.min(tempDomain.min || Infinity, parseFloat(d['T']));
        tempDomain.max = Math.max(tempDomain.max || -Infinity, parseFloat(d['T']));

        xDomain.min = Math.min(xDomain.min || Infinity, parseFloat(d['Points:0']));
        xDomain.max = Math.max(xDomain.max || -Infinity, parseFloat(d['Points:0']));

        yDomain.min = Math.min(yDomain.min || Infinity, parseFloat(d['Points:1']));
        yDomain.max = Math.max(yDomain.max || -Infinity, parseFloat(d['Points:1']));
        }).then(function(){
            console.log("data")
            // console.log(data)
            // console.log(tempDomain)
            // console.log(divName)
            // console.log(three)
            // three.addCustomSceneObjects(data, tempDomain);        
            // three.widnowResizeHandler(divName)
            updateThreeScatter(object, data, tempDomain, divName, objectForScatter, divForScatter, folder)
        })

        function updateThreeScatter(object, particleData, tempDomain, threeDiv, objectForScatter, divForScatter, member){
            object.addCustomSceneObjects(particleData, tempDomain, member);        
            object.widnowResizeHandler(threeDiv)
            // console.log(tempDomain, xDomain, yDomain)
            objectForScatter.scatterplot(particleData, tempDomain, xDomain, yDomain, divForScatter)

            console.log("updated")

        }

    }


    render(){
        return(
            <Row xs={3}> 
                {/* 3d view and the dropdown */}
                <Col xs={6}>
                    <Row xs={2}>
                        <Col xs={12} style={{height:'5vh', backgroundColor:'#31393F'}} >
                            {/* <DropdownPanel/> */}
                            <div ref={this.firstDropdown} ></div>
                        </Col>
                    </Row>
                    <Row xs={10}>
                        <Col xs={12} style={{height:'22vh', backgroundColor:'#31393F'}} ref = {this.firstThree}>
                        <div ref = {this.firstCanvas}></div>
                            {/* <Projection/> */}
                        </Col>                                    
                    </Row>
                </Col>
                {/* 2d view */}
                <Col xs={6} style={{backgroundColor: '#636363',height:'25vh'}} ref = {this.firstScatter}>
                    {/* <Projection2D/> */}
                    {/* <div ref = {this.firstScatter}></div> */}
                </Col>
            </Row>
        )
    }
}

export default ProjectionContainer;