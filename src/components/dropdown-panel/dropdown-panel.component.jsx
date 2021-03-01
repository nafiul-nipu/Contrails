import React from 'react';
import * as d3 from 'd3';
import $ from 'jquery'
import {sliderHorizontal} from 'd3-simple-slider'
import './dropdown-panel.style.css'

import dataRegistry from '../data-component/dataRegistry.json'


// let slider;
class DropdownPanel extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }

        this.firstDropdown = React.createRef()
        this.members = React.createRef()
    
    }

    componentDidMount(){
        // console.log(this.props.renderArea)
        if(this.props.renderArea === 'top'){
            d3.select(this.firstDropdown.current).attr("id", "top")
            this.createDropdown(1)
            
        }else if (this.props.renderArea === 'bottom'){
            d3.select(this.firstDropdown.current).attr("id", "bottom")
            this.createDropdown(6)
           
        }
        // console.log(this.props.dropdownUpdate())
        // console.log(this.props.sliderUpdate())

    }

    createDropdown = (memberNumber) =>{
        const self = this;
        let list = dataRegistry[(memberNumber - 1)].timeSteps;
        let id = `#${self.props.renderArea}`
        // console.log( id)
        d3.select(id).attr("class", "dropdownMenu")

        d3.select(id).append('select')
                        .attr('class', "members")
                        .attr("id", `member${this.props.renderArea}`)
                        .on('change', function(){
                            let folder = this.value
                            let list = dataRegistry[(folder - 1)].timeSteps
                            // console.log(folder)
                            // console.log(list)
                            // console.log(idName)
                            self.updateDropdown( folder, list)
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

        d3.select(id).append('button')
                        .attr('class', `btn${this.props.renderArea}`)
                        .attr('id', "play-pause-btn")
                        .attr('value', 'play')
                        .text('Play')

        this.createSlider(list, memberNumber)

    }

    createSlider = (list, memberNumber) =>{
        // console.log(list)
        const self = this
            let container = d3.select(this.firstDropdown.current).node().parentNode.clientWidth;
            let select = d3.select(`#member${self.props.renderArea}`).node().clientWidth;
            let button = d3.select('#play-pause-btn').node().clientWidth;
            let margin = select + button
            let width = container - margin * 1.75
            // console.log(container, select, button, width)
            // const height = d3.select(this.firstDropdown.current).node().clientHeight;
            // console.log(select * 1.25)
            let slider = sliderHorizontal()
                            .min(d3.min(list))
                            .max(d3.max(list))
                            .default(list[0])
                            .ticks(list.length)
                            .tickValues(list)
                            .step(list[1] - list[0])
                            .tickPadding(0)
                            .width(width - 50)
                            .on('onchange', function(){
                                let file = +(d3.format('.2f')(slider.value()));
                                let folder = +($(`#member${self.props.renderArea}`).val());
                                // console.log(file, folder)
                                setTimeout(() => {
                                    // console.log()
                                    // let container = new mainComponent()
                                    // after_data_loaded(object, threethis.firstDropdown.current, objectForScatter, divForScatter, file, folder) 
                                    // container.loaded()
                                    // animation(slider);    
                                    self.props.sliderUpdate(file, folder);
                                    self.animation(slider);             
                                }, 3000);
                                
                            })

            d3.select(`.btn${self.props.renderArea}`).on('click', function(d){
                    console.log(`.btn${self.props.renderArea}`)
                    if(this.value === 'play'){
                        d3.select(`.btn${self.props.renderArea}`).attr('value', 'pause')
                                            .text('Pause')
                        setTimeout(() => {
                            self.animation(slider);                
                        }, 3000);
                    //    self. animation(slider);
                    }else if(this.value === 'pause'){
                        d3.select(`.btn${self.props.renderArea}`).attr('value', 'play')
                                            .text('Play')
                    }
                    
                })

            d3.select(`#${self.props.renderArea}`).append('svg')
                                .attr('class', 'slider-svg')
                                .attr("id", `slider${this.props.renderArea}`)
                                .attr('width', width )
                                .attr('height', 70)
                                .append('g')
                                .attr('transform', 'translate(30, 30)')
                                .call(slider)

            setTimeout(() => {
                self.animation(slider);                
            }, 3000);
            
        
        }

    updateDropdown = ( folder, list) => {
        const self= this
            // console.log(folder, list)
            d3.select(`#slider${self.props.renderArea}`).remove()
            this.createSlider(list, folder)
            this.props.dropdownUpdate(folder, list)

            // setTimeout(() => {
            //     let container = new mainComponent();
            //     // object, threeDiv, objectForScatter, divForScatter, file, folder
            //     container.dataLoader(object, threethis.firstDropdown.current, objectForScatter, divForScatter, list[0], folder);    
            // }, 3000);            

        }

    animation = (slider) =>{
        const self = this
        // console.log('i am animaiton')
            // console.log(+(d3.format('.2f')(slider.value())))
            // console.log($(`.btn`).val())
            if( $(`.btn${self.props.renderArea}`).val() === 'pause'){
                // setTimeout(() => {
                    let currentValue = +(d3.format('.2f')(slider.value()))
                    let folder = +($(`#member${self.props.renderArea}`).val());
                    // console.log("file ", currentValue, " folder", folder)
                    // console.log("folder ", folder)
                    let list = dataRegistry[folder - 1].timeSteps;
                    let index = list.indexOf(currentValue)
                    // console.log(list)
                    let nextValue;
                    if(index + 1 === list.length){
                        nextValue = list[0]
                    }else{
                        nextValue = list[index + 1]
                    }
                    // console.log(currentValue, index, nextValue)
                    slider.value(nextValue)
                    // console.log("set time out")
                // }, 2500)
            }

        }


    render(){
        return(
        <div ref={this.firstDropdown} ></div>
        )
    }
    
}

export default DropdownPanel;
