import React from 'react';
import * as d3 from 'd3';
import $, { data } from 'jquery'
import {sliderTop, sliderRight, sliderBottom,sliderHorizontal} from 'd3-simple-slider'
import './dropdown-panel.style.css'

import dataRegistry from '../data-component/dataRegistry.json'

import mainComponent from '../projection-container/projection-container.component'

class DropdownPanel extends React.Component {
    constructor(){
        super();
        this.state = {

        }
    
    }

    createDropdown = (object,threeDivname, memberNumber, divName, idName, objectForScatter, divForScatter) =>{
        let list = dataRegistry[(memberNumber - 1)].timeSteps;
        // console.log(divName.className)
        d3.select(divName).attr("class", "dropdownMenu")

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
                        .text((d) => {return "Member : "+d.ensembleMember})

        d3.select(divName).append('button')
                        .attr('id', 'play-pause-btn')
                        .text('Play')
                        

        // const child = d3.select(divName).node().clientWidth
        // console.log(child)
        // const parent = d3.select(divName).node().parentNode.clientWidth
        // console.log(parent)
        let container = d3.select(divName).node().parentNode.clientWidth;
        let select = d3.select(".members").node().clientWidth;
        let button = d3.select('#play-pause-btn').node().clientWidth;
        let margin = select + button
        let width = container - margin * 1.75
        console.log(container, select, button, width)
        // const height = d3.select(divName).node().clientHeight;
        // console.log(select * 1.25)
        let slider = sliderHorizontal()
                        .min(d3.min(list))
                        .max(d3.max(list))
                        .default(list[0])
                        // .ticks(list.length)
                        // .tickValues(function(d){ return d})
                        .step(.01)
                        .tickPadding(0)
                        .width(width - 50)
                        .on('onchange', value => console.log(d3.format('.2f')(value)))
       d3.select(divName).append('svg')
                        .attr('class', 'slider-svg')
                        .attr('width', width )
                        .attr('height', 70)
                        .append('g')
                        .attr('transform', 'translate(30, 30)')
                        .call(slider)


        

        // d3.select(divName).append('button')
        //                 .attr("id", "button")
        //                 .text("Previous")
        //                 .on("click", function(){
        //                     // console.log(idName)
        //                     let previousIndex;
        //                     let value = +($(`#timestep${idName}`).val());
        //                     // console.log(value)
        //                     let member = +($(`#member${idName}`).val());
        //                     // console.log(member)
        //                     let timeList = dataRegistry[(member - 1)].timeSteps
        //                     // console.log(timeList)
        //                     let index = timeList.indexOf(value);
        //                     let total = timeList.length - 1;
        //                     if(index != 0){
        //                         previousIndex = index - 1;
        //                     }else{
        //                         previousIndex = total;
        //                     }
        //                     let folder = member;
        //                     let file = timeList[previousIndex];
        //                     $(`#timestep${idName}`).val(file)
        //                     let container = new mainComponent()
        //                     container.dataLoader(object, folder, file, threeDivname, objectForScatter, divForScatter)
        //                     // console.log(list[nextIndex])
        //                     // console.log(folder, file)
                            
        //                 })

        // d3.select(divName).append('label')
        //                  .attr('for', 'timesteps')
        //                  .text("Time steps")

        // d3.select(divName).append('select')
        //                 .attr('class', 'timesteps')
        //                 .attr('id', `timestep${idName}`)
        //                 .on("change", function(){
        //                     // console.log(memberNumber)
        //                     let folder = +($(`#member${idName}`).val());;
        //                     let file = this.value;
        //                     // console.log(file)
        //                     let container = new mainComponent();
        //                     container.dataLoader(object, folder, file, threeDivname, objectForScatter, divForScatter)
        //                 })
        //                 .selectAll('option')
        //                 .data(dataRegistry[(memberNumber - 1)].timeSteps)
        //                 .enter()
        //                 .append('option')
        //                 .attr('id', function(d){ return d})
        //                 .attr('value', function(d){return d})
        //                 .text((d) => {return d})

        // d3.select(divName).append('button')
        //                 .attr('id', "button")
        //                 .text("Next")
        //                 .on("click", function(){
        //                     // console.log(idName)
        //                     let nextIndex;
        //                     let value = +($(`#timestep${idName}`).val());
        //                     // console.log(value)
        //                     let member = +($(`#member${idName}`).val());
        //                     // console.log(member)
        //                     let timeList = dataRegistry[(member - 1)].timeSteps
        //                     // console.log(timeList)
        //                     let index = timeList.indexOf(value);
        //                     let total = timeList.length - 1;
        //                     if(index != total){
        //                         nextIndex = (index % total) + 1;
        //                     }else{
        //                         nextIndex = 0;
        //                     }
        //                     let folder = member;
        //                     let file = timeList[nextIndex];
        //                     $(`#timestep${idName}`).val(file)
        //                     let container = new mainComponent()
        //                     container.dataLoader(object, folder, file, threeDivname, objectForScatter, divForScatter)                          
        //                 })


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
            container.dataLoader(object, folder, list[0], threeDivname, objectForScatter, divForScatter)

        }

    }
    
}

export default DropdownPanel;