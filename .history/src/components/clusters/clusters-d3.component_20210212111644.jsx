
import * as d3 from 'd3';
import './clusters.style.css';
const url ="https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/2_TwoNum.csv"
export default class ClustersD3 {
    constructor (element, data) {


        
        d3.select(element).select('svg').remove()

        const width = 400;
        const height = 400

        const svg = d3.select(element)
                    .append("svg")
                    .attr('id', 'svg')
                    .attr("width",width)
                    .attr("height",height)
                    
        const g = svg.append('g')
        
            let valuesX  = data.map(function(d) {
             
              return d['x'];
            });
            var minX = Math.min.apply( null, valuesX );
            var maxX = Math.max.apply( null, valuesX );
            let valuesY  = data.map(function(d) {
             
              return d['y'];
            });
            var minY = Math.min.apply( null, valuesY );
            var maxY = Math.max.apply( null, valuesY );
            
            var x = d3.scaleLinear()
              .domain([minX, maxX])
              .range([ 10, width-10 ]);

            var y = d3.scaleLinear()
              .domain([minY, maxY])
              .range([ height-10, 10]);



          // svg.append('g')
          // .selectAll("dot")
          // .data(data)
          // .enter()
          // .append("circle")
          //   .attr("cx", function (d) {return x(d['x']); } )
          //   .attr("cy", function (d) { return y(d['y']); } )
          //   .attr("r", 5.5)
          //   .style("fill", "#69b3a2")
          //   .on('mouseover', tipMouseover)
            
       
           data.forEach(element => {
            
            g.append('circle')
            .attr('cx', x(element['x']))
            .attr('cy',  y(element['y']))
            .attr('r',5.5)
            .style("fill", "#69b3a2")
            .on('mouseover', function(){
              d3.select(this)
              .append("title")
              .text("Member " + element['id'])
            })
           });

        
  

}
}

