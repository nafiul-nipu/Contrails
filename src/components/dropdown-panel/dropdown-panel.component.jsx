import React from 'react';
import * as d3 from 'd3';
import $, { data } from 'jquery'

import dataRegistry from '../data-component/dataRegistry.json'

import mainComponent from '../components-container/components-container.component'

class DropdownPanel extends React.Component {
    constructor(){
        super();
        this.state = {

        }
    
    }

    createDropdown = (object,threeDivname, memberNumber, divName, idName) =>{
        let list = dataRegistry[(memberNumber - 1)].timeSteps;
        // console.log(divName.className)
        d3.select(divName).append('label')
                         .attr('for', 'members')
                         .text("Members: ")

        d3.select(divName).append('select')
                        .attr('class', "members")
                        .attr("id", `member${idName}`)
                        .on('change', function(){
                            let folder = this.value
                            let list = dataRegistry[(folder - 1)].timeSteps
                            // console.log(folder)
                            // console.log(list)
                            updateDropdown(folder, list, idName)
                        })
                        .selectAll('option')
                        .data(dataRegistry)
                        .enter()
                        .append('option')
                        .attr('id', function(d){ return d.ensembleMember})
                        .attr("value", function(d){return d.ensembleMember})
                        .property('selected', function(d){
                            // console.log(d.ensembleMember, "ensemble.....member", memberNumber)
                            if(d.ensembleMember === memberNumber){
                                return true;
                            }else{
                                return false;
                            }
                        })
                        .text((d) => {return d.ensembleMember})

        d3.select(divName).append('button')
                        // .attr("id", divName)
                        .text("Previous")
                        .on("click", function(){
                            // console.log(idName)
                            let previousIndex;
                            let value = +($(`#timestep${idName}`).val());
                            // console.log(value)
                            let member = +($(`#member${idName}`).val());
                            // console.log(member)
                            let timeList = dataRegistry[(member - 1)].timeSteps
                            // console.log(timeList)
                            let index = timeList.indexOf(value);
                            let total = timeList.length - 1;
                            if(index != 0){
                                previousIndex = index - 1;
                            }else{
                                previousIndex = total;
                            }
                            let folder = member;
                            let file = timeList[previousIndex];
                            $(`#timestep${idName}`).val(file)
                            let container = new mainComponent()
                            container.dataLoader(object, folder, file, threeDivname)
                            // console.log(list[nextIndex])
                            // console.log(folder, file)
                            
                        })

        d3.select(divName).append('label')
                         .attr('for', 'timesteps')
                         .text("Time steps")

        d3.select(divName).append('select')
                        .attr('class', 'timesteps')
                        .attr('id', `timestep${idName}`)
                        .on("change", function(){
                            // console.log(memberNumber)
                            let folder = +($(`#member${idName}`).val());;
                            let file = this.value;
                            // console.log(file)
                            let container = new mainComponent();
                            container.dataLoader(object, folder, file, threeDivname)
                        })
                        .selectAll('option')
                        .data(dataRegistry[(memberNumber - 1)].timeSteps)
                        .enter()
                        .append('option')
                        .attr('id', function(d){ return d})
                        .attr('value', function(d){return d})
                        .text((d) => {return d})

        d3.select(divName).append('button')
                        // .attr('id', divName)
                        .text("Next")
                        .on("click", function(){
                            // console.log(idName)
                            let nextIndex;
                            let value = +($(`#timestep${idName}`).val());
                            // console.log(value)
                            let member = +($(`#member${idName}`).val());
                            // console.log(member)
                            let timeList = dataRegistry[(member - 1)].timeSteps
                            // console.log(timeList)
                            let index = timeList.indexOf(value);
                            let total = timeList.length - 1;
                            if(index != total){
                                nextIndex = (index % total) + 1;
                            }else{
                                nextIndex = 0;
                            }
                            let folder = member;
                            let file = timeList[nextIndex];
                            $(`#timestep${idName}`).val(file)
                            let container = new mainComponent()
                            container.dataLoader(object, folder, file, threeDivname)                          
                        })


        function updateDropdown(folder, list, idName){
            d3.select(`#timestep${idName}`).selectAll('option').remove()

            d3.select(`#timestep${idName}`)
                        // .on("change", function(){
                        //     // console.log(memberNumber)
                        //     let folder = memberNumber;
                        //     let file = this.value;
                        //     // console.log(file)
                        //     let container = new mainComponent();
                        //     container.dataLoader(object, folder, file, threeDivname)
                        // })
                        .selectAll('option')
                        .data(list)
                        .enter()
                        .append('option')
                        .attr('id', function(d){ return d})
                        .attr('value', function(d){return d})
                        .text((d) => {return d})

            let container = new mainComponent();
            container.dataLoader(object, folder, list[0], threeDivname)

        }

    }
    
}

export default DropdownPanel;