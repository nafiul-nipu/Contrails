import * as d3 from 'd3';
import { ReplaceStencilOp } from 'three';

const url ="https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_IC.csv"
export default class ProjeProjection2DD3 {
    constructor(element,members){
        const width=300
        const height=200
        // console.log(members)
        const svg = d3.select(element)
                    .append("svg")
                    .attr("width",300)
                    .attr("height",340)


                    var x = d3.scaleLinear()
                    .domain([1,100])
                    .range([ 0, width ]);
                  svg.append("g")
                    .attr("transform", "translate(0," + height + ")")
                    .call(d3.axisBottom(x));
                
                  // Add Y axis
                  var y = d3.scaleLinear()
                    .domain([0, 13])
                    .range([ height, 0 ]);
                  svg.append("g")
                    .call(d3.axisLeft(y));

                    
                    d3.csv(url).then(data => {

                    

                      // Add the line
                      svg
                        .append("path")
                        .datum(data)
                        .attr("fill", "none")
                        .attr("stroke", "steelblue")
                        .attr("stroke-width", 1.5)
                        .attr("d", d3.line()
                          .x(function(d) { return x(d.x) })
                          .y(function(d) { return y(d.y) })
                          )
                    
                      // Create a rect on top of the svg area: this rectangle recovers mouse position
                      svg
                        .append('rect')
                        .style("fill", "none")
                        .style("pointer-events", "all")
                        .attr('width', width)
                        .attr('height', height)
                    })

  }
}