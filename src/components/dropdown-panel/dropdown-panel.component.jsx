import React from 'react';
import * as d3 from 'd3'

class DropdownPanel extends React.Component {
    constructor(){
        super();
        this.state = {

        }
        this.memberList = [1,2,3,4]
        this.list = [1,2,3,4]
    
    }

    createDropdown = (divName) =>{
        d3.select(divName).append('label')
                         .attr('for', 'members')
                         .text("Members")

        d3.select(divName).append('select')
                        .attr('id', 'members')
                        .selectAll('option')
                        .data(this.memberList)
                        .enter()
                        .append('option')
                        .text((d) => {return d})

        d3.select(divName).append('button')
                        // .attr("type", "button")
                        .text("Previous")

        d3.select(divName).append('label')
                         .attr('for', 'timesteps')
                         .text("Time steps")

        d3.select(divName).append('select')
                        .attr('id', 'timesteps')
                        .selectAll('option')
                        .data(this.list)
                        .enter()
                        .append('option')
                        .text((d) => {return d})

        d3.select(divName).append('button')
                        .text("Next")

    }


    // render(){
    //     return(
    //         <div>
    //             <button type="button">Previous</button>
    //             <select >
    //             </select>
    //             <button type="button">Next</button>

    //         </div>
    //     )
    // }
}

export default DropdownPanel;