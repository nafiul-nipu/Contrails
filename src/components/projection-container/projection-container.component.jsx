import React from 'react';
import * as d3 from 'd3'

import VolumeRendering from '../threeD-plot/volume-rendering.componenet'

import './projection-container.style.css';
import Row from 'react-bootstrap/Row';

import dataRegistry from '../data-component/dataRegistry.json'


class ProjectionContainer extends React.Component {
    constructor(props){
        super();

        this.state = {
            density : null,
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
            })  
            }, 5000);  
        console.log("i am dropdown update")
        
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
        return Promise.resolve(this.testData(folder, file))

    }

    testData = (folder, file) =>{
        const self = this;
        let url = "https://raw.githubusercontent.com/CarlaFloricel/Contrails/nafiul-testing/src/data/volume_data/2.4_gaus_temp.csv";
        let dataBuffer = []
	    let positions = []
        d3.csv(url, data => {
            		
            positions.push((parseFloat(data['Density'])));
    
        }).then(function() {
            dataBuffer = new Uint8Array(positions)
            // console.log(dataBuffer)	
            self.setState({
                density : dataBuffer,

            })

        })

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
                        all_data[i].push({
                            x: parseFloat(d['Points:0']),
                            y: parseFloat(d['Points:1']),
                            z: parseFloat(d['Points:2']),
                            temp: parseFloat(d['T'])
                        });
                    
                    
                })
            });

            self.setState({
                density : all_data,

            })
            console.log("data")
                      
        })     
               

    }

    render(){
        // console.log(this.state.state_colors)
        if(!this.state.density){
            return(
                <div>Loading ...</div>
            )
        }else{
            return(
                <Row> 
                    <VolumeRendering 
                        area={this.props.renderArea}
                        data={this.state.density}
                    />
                </Row>
            )

        }
    }
}

export default ProjectionContainer;
