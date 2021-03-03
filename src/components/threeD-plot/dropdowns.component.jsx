import React from 'react';
import * as d3 from 'd3';
import $ from 'jquery'
import {sliderHorizontal} from 'd3-simple-slider'
import './dropdown-panel.style.css'

import Col from 'react-bootstrap/Col'

import dataRegistry from '../data-component/dataRegistry.json'


class DropDowns extends React.Component {

    constructor(){
        super();

        this.filter = ["temp", 'water_vapor', "contrails"]
    }  
    
    componentDidMount(){
      this.createDropDown(1)
      
    }

    createDropDown = (member) =>{
      // console.log(dataRegistry)
      const self = this;
      let timesteps = dataRegistry[(member - 1)].timeSteps;
      let id = `#${self.props.area}`

      d3.select(id).append("div")
                    .attr("class", "row")
                    .attr("id", `upper${self.props.area}`)

      d3.select(id).append("div")
                    .attr("class", "row")
                    .attr("id", `lower${self.props.area}`)

      let upperID = `#upper${self.props.area}`

      let lowerID = `#lower${self.props.area}`

      d3.select(upperID).append('select')
                        .attr('class', "members")
                        .attr("id", `member${this.props.area}`)
                        .on('change', function(){
                            // let folder = this.value
                            // let list = dataRegistry[(folder - 1)].timeSteps
                            // self.updateDropdown( folder, list)
                        })
                        .selectAll('option')
                        .data(dataRegistry)
                        .enter()
                        .append('option')
                        .attr('id', function(d){ return d.ensembleMember})
                        .attr("value", function(d){return d.ensembleMember})
                        .property('selected', function(d){
                            if(d.ensembleMember === member){
                                return true;
                            }else{
                                return false;
                            }
                        })
                        .text((d) => {return "Member : "+d.ensembleMember})

      d3.select(upperID).append('button')
                        .attr('class', `btn${this.props.area}`)
                        .attr('id', "play-pause-btn")
                        .attr('value', 'play')
                        .text('Play')

      self.createSlider(member)

      d3.select(lowerID).append('select')
                    .attr('class', "members")
                    .attr("id", `filter${this.props.area}`)
                    .on('change', function(){
                        // let folder = this.value
                        // let list = dataRegistry[(folder - 1)].timeSteps
                        // self.updateDropdown( folder, list)
                    })
                    .selectAll('option')
                    .data(this.filter)
                    .enter()
                    .append('option')
                    .attr('id', function(d){ return d})
                    .attr("value", function(d){return d})
                    .text((d) => {return d})

      // Range
      let sliderRange = sliderHorizontal()
                      .min(200)
                      .max(400)
                      .width(150)
                      .tickFormat(d3.format('0.2f'))
                      .ticks(5)
                      .default([200, 400])
                      .fill('#2196f3')
                      .on('onchange', val => {
                        // d3.select('p#value-range').text(val.map(d3.format('.2%')).join('-'));
                      });

      d3.select(lowerID).append('svg')
                      .attr('class', 'slider-svg')
                      .attr("id", `rangeslider${this.props.area}`)
                      .attr('width', 200 )
                      .attr('height', 70)
                      .append('g')
                      .attr('transform', 'translate(30, 30)')
                      .call(sliderRange)

      let keys = Object.keys(this.props.colormaps)
      d3.select(lowerID).append('select')
                      .attr('class', "members")
                      .attr("id", `color${this.props.area}`)
                      .on('change', function(d){
                        // console.log(this.value)
                        // console.log(self.props.selectColormap)
                        self.props.selectColormap(this.value)
                          
                      })
                      .selectAll('option')
                      .data(keys)
                      .enter()
                      .append('option')
                      .attr('id', function(d){ return d})
                      .attr("value", function(d){return d})
                      .text((d) => {return d})
    }

    createSlider = (member) =>{

      const self = this
      let container = d3.select(`#${this.props.area}`).node().parentNode.clientWidth;
      let select = d3.select(`#member${self.props.area}`).node().clientWidth;
      let button = d3.select('#play-pause-btn').node().clientWidth;
      let margin = select + button
      let width = container - margin * 1.75

      let list = dataRegistry[(member - 1)].timeSteps;

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
                          // let file = +(d3.format('.2f')(slider.value()));
                          // let folder = +($(`#member${self.props.renderArea}`).val());
                          // // console.log(file, folder)
                          // setTimeout(() => {  
                          //     self.props.sliderUpdate(file, folder);
                          //     self.animation(slider);             
                          // }, 3000);
                          
                      })

      d3.select(`.btn${self.props.area}`).on('click', function(d){
              if(this.value === 'play'){
                  d3.select(`.btn${self.props.area}`).attr('value', 'pause')
                                      .text('Pause')
                  setTimeout(() => {
                      self.animation(slider);                
                  }, 3000);
              }else if(this.value === 'pause'){
                  d3.select(`.btn${self.props.area}`).attr('value', 'play')
                                      .text('Play')
              }
              
          })

      d3.select(`#upper${self.props.area}`).append('svg')
                          .attr('class', 'slider-svg')
                          .attr("id", `slider${this.props.area}`)
                          .attr('width', width )
                          .attr('height', 70)
                          .append('g')
                          .attr('transform', 'translate(30, 30)')
                          .call(slider)

      setTimeout(() => {
          self.animation(slider);                
      }, 3000);
          
      
      }

  updateDropdown = ( member) => {
      const self= this
      // console.log(folder, list)
      d3.select(`#slider${self.props.area}`).remove()
      this.createSlider(member)

  }

  animation = (slider) =>{
      const self = this
      if( $(`.btn${self.props.area}`).val() === 'pause'){
          // setTimeout(() => {
              let currentValue = +(d3.format('.2f')(slider.value()))
              let folder = +($(`#member${self.props.area}`).val());
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
          <Col xs={12} style={{height:'20vh', backgroundColor:'#31393F'}} id={`${this.props.area}`} >
                             
          </Col>
        )
      }

    }

    

export default DropDowns;