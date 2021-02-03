import * as d3 from 'd3';
import React from 'react';


const height = 100
const url ="https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/2_TwoNum.csv"
export default class OutputParametersD3 {
   
    
        constructor(element, T_lagr, rho_lagr , Ygas_lagr ,k_eul, rho_eul, T_eul, P_eul){
            console.log(T_lagr)
            const width=100
            const height=100
            const svg = d3.select(element)
                        .append("svg")
                        .attr("width",300)
                        .attr("height",150)

            const group = svg.append('g')


            // d3.csv("C://Users//carla//Desktop//Contrails_app//contrails-app//src//data//test_input_output_param//statistics.csv", function(data) {
            //     for (var i = 0; i < data.length; i++) {
            //         console.log("i got the deta")
            //         console.log(data[i]);
            //     }
            // });



    
      }

}

