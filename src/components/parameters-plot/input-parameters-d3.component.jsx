import * as d3 from 'd3';


const height = 100
const url ="https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/2_TwoNum.csv"
export default class InputParametersD3 {
   
    
        constructor(element, categParam1, categParam2, categParam3, categParam4, categParam5, categParam6, quantParam1, quantParam2, quantParam3, quantParam4){
            const width=100
            const height=100
            const svg = d3.select(element)
                        .append("svg")
                        .attr("width",300)
                        .attr("height",150)

            const group = svg.append('g')

            group.append('rect')
                .attr("x",0 )
                .attr("y", height/2 - 10)
                .attr("width", 20)
                .attr("height", 20)
                .attr("fill", 'red')
            group.append('rect')
                .attr("x",21 )
                .attr("y", height/2 - 10)
                .attr("width", 20)
                .attr("height", 20)
                .attr("fill", 'yellow')
            group.append('rect')
                .attr("x",42 )
                .attr("y", height/2 - 10)
                .attr("width", 20)
                .attr("height", 20)
                .attr("fill", 'green')
            group.append('rect')
                .attr("x",63 )
                .attr("y", height/2 - 10)
                .attr("width", 20)
                .attr("height", 20)
                .attr("fill", 'blue')
            group.append('rect')
                .attr("x",84 )
                .attr("y", height/2 - 10)
                .attr("width", 20)
                .attr("height", 20)
                .attr("fill", 'purple')
            group.append('rect')
                .attr("x",105 )
                .attr("y", height/2 - 10)
                .attr("width", 20)
                .attr("height", 20)
                .attr("fill", 'pink')


            group.append('rect')
                .attr("x",20 )
                .attr("y", height/2+10)
                .attr("width", 10)
                .attr("height", 50)
                .attr("fill", 'black')
            group.append('rect')
                .attr("x",40 )
                .attr("y", height/2 +10)
                .attr("width", 10)
                .attr("height", 20)
                .attr("fill", 'white')

            group.append('rect')
                .attr("x",20 )
                .attr("y", height/2 -10- 30)
                .attr("width", 10)
                .attr("height", 30)
                .attr("fill", 'orange')
            group.append('rect')
                .attr("x",40 )
                .attr("y", height/2 - 10 - 40)
                .attr("width", 10)
                .attr("height", 40)
                .attr("fill", 'brown')




                // .attrs({ x: 10, y: 10, width: 80, height: 80, fill: 'red' })
    
                        // d3.csv(url).then(data => {
    
                        //     // Add X axis
                        //     var x = d3.scaleLinear()
                        //       .domain([0, 4000])
                        //       .range([ 0, width ]);
                        //     svg.append("g")
                        //       .attr("transform", "translate(0," + height + ")")
                        //       .call(d3.axisBottom(x));
    
                        //     // Add Y axis
                        //     var y = d3.scaleLinear()
                        //       .domain([0, 500000])
                        //       .range([ height, 0]);
                        //     svg.append("g")
                        //       .call(d3.axisLeft(y));
    
                        //     // Add dots
                        //     svg.append('g')
                        //       .selectAll("dot")
                        //       .data(data)
                        //       .enter()
                        //       .append("circle")
                        //         .attr("cx", function (d) { return x(d.GrLivArea); } )
                        //         .attr("cy", function (d) { return y(d.SalePrice); } )
                        //         .attr("r", 1.5)
                        //         .style("fill", "#69b3a2")
    
                        //   })
    
      }

}

