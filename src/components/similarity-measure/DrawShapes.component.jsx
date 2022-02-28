import React from "react";
import * as d3 from 'd3'
// import ScatterD3 from "./scatter-d3";
import LineD3 from "./line-d3";

class DrawShapes extends React.Component{
    constructor(props){
        super(props);
        this.scatterId = React.createRef();

        this.state = {

        }
    }

    componentDidMount(){
        // console.log(this.props.folder, this.props.time)

        // if(this.props.time === 0.2){
            let url = `https://raw.githubusercontent.com/nafiul-nipu/Contrails/master/src/data/shpaeData/${this.props.folder}/${this.props.time}.json`

            let xDomain = {} ;
            let yDomain = {};

            // console.log(this.props.time)
            // const row = d => {
            //     d['X'] = +d['X'];
            //     d['Y'] = +d['Y'];

            //     xDomain.max = Math.max(xDomain.max || -Infinity, +d['X']);
            //     yDomain.max = Math.max(yDomain.max || -Infinity, +d['Y']);

            //     xDomain.min = Math.min(xDomain.min || Infinity, +d['X']);
            //     yDomain.min = Math.min(yDomain.min || Infinity, +d['Y']);

            //     return d

            // }

            d3.json(url).then(data => {
                
                // data.forEach(element => {
                //     row(element)
                // });

                // console.log(data)
                if(this.props.folder === 'newData'){
                    xDomain = {max: 60}
                    yDomain = {min: -5, max: 5}
                }else{
                    xDomain = {max: 16}
                    yDomain = {min: -2, max: 2}
                }
            
                new LineD3(this.scatterId.current, data, xDomain, yDomain, this.props.id, this.props.time, this.props.folder)
                
            })


        // }
    }

    render(){
        return(
            <div ref={this.scatterId}></div>
        )
    }
}

export default DrawShapes;