import * as d3 from 'd3';



const height = 100
const url ="https://github.com/CarlaFloricel/Contrails/blob/master/src/data/test_input_output_param/statistics.csv"
export default class OutputParametersD3 {
   
    
        constructor(element, data){

            const width=100
            const height=100
            const svg = d3.select(element)
                        .append("svg")
                        .attr("width",300)
                        .attr("height",150)

            const group = svg.append('g')

            const d = data
            console.log(d[0])



    
      }

}

