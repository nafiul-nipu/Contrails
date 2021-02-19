import React from 'react';
import * as d3 from 'd3';
import { ReplaceStencilOp } from 'three';

const url ="https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/2_TwoNum.csv"
class Scatter extends React.Component {
  constructor(props){
      super(props);
      this.state = {

      }

      this.scatter = React.createRef()

  }

  componentDidMount(){
    // console.log(this.props.data)
    // index of timestep
    if(this.props.renderArea === 'top'){
      this.scatterplot(0)
    }else if(this.props.renderArea === 'bottom'){
      this.scatterplot(0)
    }
  }

  scatterplot = (timeStep) => {
    console.log(this.props.renderArea)
        d3.select(`#svg${this.props.renderArea}`).remove()
        const width = d3.select(this.props.parentId).node().clientWidth;
        // console.log(d3.select(this.props.parentId).node())
        // console.log(width)
        const height = d3.select(this.props.parentId).node().clientHeight;

        const margin = {left: 40, right: 10, top:20, bottom:20}
        // console.log(height)
        const svg = d3.select(this.scatter.current)
                    .append("svg")
                    .attr('id', `svg${this.props.renderArea}`)
                    .attr("width",width)
                    .attr("height",height)
        let tempColor = ["#fff5f0","#67000d"]
        // console.log(domainData)
        let color  = d3.scaleLinear(/*d3.schemeReds[9]*/)
                        .domain([this.props.data.state_all_tempDomain[timeStep].min, this.props.data.state_all_tempDomain[timeStep].max])
                        .range(tempColor);
        let x  = d3.scaleLinear(/*d3.schemeReds[9]*/)
                        .domain([this.props.data.state_all_xDomain[timeStep].min, this.props.data.state_all_xDomain[timeStep].max])
                        .range([ margin.left , width - margin.right ]);
        let xAxis = d3.axisBottom()
                      .scale(x)
                      // .ticks(5);

        let y  = d3.scaleLinear(/*d3.schemeReds[9]*/)
                        .domain([this.props.data.state_all_yDomain[timeStep].min, this.props.data.state_all_yDomain[timeStep].max])
                        .range([ height - margin.bottom, margin.top]);

        let yAxis = d3.axisLeft()
                      .scale(y)

        svg.append("g")
            .attr("transform", "translate(0," + (height -margin.top) + ")")
            .call(xAxis);
        
        svg.append("g")
            .attr("transform", `translate(${margin.left},0)`)
            .call(yAxis);
                      
        // Add dots
        svg.append('g')
          .selectAll("dot")
          .data(this.props.data.state_all_data[timeStep])
          .enter()
          .append("circle")
            .attr("cx", function (d) { return x(d.x); } )
            .attr("cy", function (d) { return y(d.y); } )
            .attr("r", 0.8)
            .style("fill", function(d){ return color(d.temp)})

  }  


  render(){
    return(
      <div ref={this.scatter}></div>
    )
    }
}

export default Scatter;

