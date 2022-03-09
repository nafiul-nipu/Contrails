import { faCommentsDollar } from '@fortawesome/free-solid-svg-icons';
import { getDefaultNormalizer } from '@testing-library/react';
import * as d3 from 'd3';
import $ from 'jquery'

import d3Tip from 'd3-tip'
import "./parameters-plot.styles.css"

import inputDomain from '../data-component/parameters.json'
import { ConeBufferGeometry } from 'three';

// const height = 900
const url = "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/2_TwoNum.csv"
export default class InputParametersD3 {


  constructor(element, data, first_time, top, bottom) {
    this.element = element
    this.data = data
    this.color = d3.scaleOrdinal()
    this.members = [top, bottom]
    this.boundaries = ["bypassInlet", "engine", "farfield", "inlet", "nozzle", "outlet", "turbine"]
    this.draw_inputs(element, data, first_time, this.members)
  }

  draw_inputs(element, new_data, first_time, hmembers) {
    const self = this;
    const data = new_data;
    const width = d3.select(element).node().parentNode.clientWidth
    const height = 180

    // console.log(data)
    // console.log('draw inputs')
    // console.log(d3.select(element).node().parentNode)
    function check_member_similarity(m1, m2) {
      const atr11_1 = m1['boundary-conditions']['T']
      const atr11_2 = m2['boundary-conditions']['T']
      const atr12_1 = m1['boundary-conditions']['U']
      const atr12_2 = m2['boundary-conditions']['U']
      const atr13_1 = m1['boundary-conditions']['p']
      const atr13_2 = m2['boundary-conditions']['p']
      const atr14_1 = m1['boundary-conditions']['k']
      const atr14_2 = m2['boundary-conditions']['k']
      const atr2_1 = m1['input']
      const atr2_2 = m2['input']
      var result = true
    
      result = result &&
        Object.keys(atr2_1).every(key => atr2_2.hasOwnProperty(key) && atr2_2[key] === atr2_1[key]) &&
        Object.keys(atr11_1).every(key => atr11_2.hasOwnProperty(key) && atr11_2[key] === atr11_1[key]) &&
        Object.keys(atr12_1).every(key => atr12_2.hasOwnProperty(key) && atr12_2[key] === atr12_1[key]) &&
        Object.keys(atr13_1).every(key => atr13_2.hasOwnProperty(key) && atr13_2[key] === atr13_1[key]) &&
        Object.keys(atr14_1).every(key => atr14_2.hasOwnProperty(key) && atr14_2[key] === atr14_1[key])
      return result;
    }

    function return_differences_member(members_list) {
      var result_member = members_list[0]
      if (members_list && result_member){
      const aircraft_engine = new Set(members_list.map(m => m['input']['aircraft-engine'])).size
      const geometry = new Set(members_list.map(m => m['input']['geometry'])).size
      const scope = new Set(members_list.map(m => m['input']['scope'])).size
      const grid = new Set(members_list.map(m => m['input']['grid'])).size
      const solution = new Set(members_list.map(m => m['input']['solution'])).size
      const turbulence = new Set(members_list.map(m => m['input']['turbulence'])).size
      

      const t_0 = new Set(members_list.map(m => m['boundary-conditions']['T'][0]).filter(el => el != 'N/A')).size
      const t_1 = new Set(members_list.map(m => m['boundary-conditions']['T'][1]).filter(el => el != 'N/A')).size
      const t_2 = new Set(members_list.map(m => m['boundary-conditions']['T'][2]).filter(el => el != 'N/A')).size
      const t_3 = new Set(members_list.map(m => m['boundary-conditions']['T'][3]).filter(el => el != 'N/A')).size
      const t_4 = new Set(members_list.map(m => m['boundary-conditions']['T'][4]).filter(el => el != 'N/A')).size
      const t_5 = new Set(members_list.map(m => m['boundary-conditions']['T'][5]).filter(el => el != 'N/A')).size
      const t_6 = new Set(members_list.map(m => m['boundary-conditions']['T'][6]).filter(el => el != 'N/A')).size

      const p_0 = new Set(members_list.map(m => m['boundary-conditions']['p'][0]).filter(el => el != 'N/A')).size
      const p_1 = new Set(members_list.map(m => m['boundary-conditions']['p'][1]).filter(el => el != 'N/A')).size
      const p_2 = new Set(members_list.map(m => m['boundary-conditions']['p'][2]).filter(el => el != 'N/A')).size
      const p_3 = new Set(members_list.map(m => m['boundary-conditions']['p'][3]).filter(el => el != 'N/A')).size
      const p_4 = new Set(members_list.map(m => m['boundary-conditions']['p'][4]).filter(el => el != 'N/A')).size
      const p_5 = new Set(members_list.map(m => m['boundary-conditions']['p'][5]).filter(el => el != 'N/A')).size
      const p_6 = new Set(members_list.map(m => m['boundary-conditions']['p'][6]).filter(el => el != 'N/A')).size

      const k_0 = new Set(members_list.map(m => m['boundary-conditions']['k'][0]).filter(el => el != 'N/A')).size
      const k_1 = new Set(members_list.map(m => m['boundary-conditions']['k'][1]).filter(el => el != 'N/A')).size
      const k_2 = new Set(members_list.map(m => m['boundary-conditions']['k'][2]).filter(el => el != 'N/A')).size
      const k_3 = new Set(members_list.map(m => m['boundary-conditions']['k'][3]).filter(el => el != 'N/A')).size
      const k_4 = new Set(members_list.map(m => m['boundary-conditions']['k'][4]).filter(el => el != 'N/A')).size
      const k_5 = new Set(members_list.map(m => m['boundary-conditions']['k'][5]).filter(el => el != 'N/A')).size
      const k_6 = new Set(members_list.map(m => m['boundary-conditions']['k'][6]).filter(el => el != 'N/A')).size

      const U_0 = new Set(members_list.map(m => m['boundary-conditions']['U'][0]).filter(el => el != 'N/A')).size
      const U_1 = new Set(members_list.map(m => m['boundary-conditions']['U'][1]).filter(el => el != 'N/A')).size
      const U_2 = new Set(members_list.map(m => m['boundary-conditions']['U'][2]).filter(el => el != 'N/A')).size
      const U_3 = new Set(members_list.map(m => m['boundary-conditions']['U'][3]).filter(el => el != 'N/A')).size
      const U_4 = new Set(members_list.map(m => m['boundary-conditions']['U'][4]).filter(el => el != 'N/A')).size
      const U_5 = new Set(members_list.map(m => m['boundary-conditions']['U'][5]).filter(el => el != 'N/A')).size
      const U_6 = new Set(members_list.map(m => m['boundary-conditions']['U'][6]).filter(el => el != 'N/A')).size

       result_member['input']['aircraft-engine'] = aircraft_engine < 2 ? false : true
       result_member['input']['geometry'] = geometry < 2 ? false : true
       result_member['input']['scope'] = scope < 2 ? false : true
       result_member['input']['solution'] = solution < 2 ? false : true
       result_member['input']['turbulence'] = turbulence < 2 ? false : true
       result_member['input']['grid'] = grid <2 ? false : true
       result_member['boundary-conditions']['T'][0] = t_0 < 2 ? false : true
       result_member['boundary-conditions']['T'][1] = t_1 < 2 ? false : true
       result_member['boundary-conditions']['T'][2] = t_2 < 2 ? false : true
       result_member['boundary-conditions']['T'][3] = t_3 < 2 ? false : true
       result_member['boundary-conditions']['T'][4] = t_4 < 2 ? false : true
       result_member['boundary-conditions']['T'][5] = t_5 < 2 ? false : true
       result_member['boundary-conditions']['T'][6] = t_6 < 2 ? false : true
       result_member['boundary-conditions']['p'][0] = p_0 < 2 ? false : true
       result_member['boundary-conditions']['p'][1] = p_1 < 2 ? false : true
       result_member['boundary-conditions']['p'][2] = p_2 < 2 ? false : true
       result_member['boundary-conditions']['p'][3] = p_3 < 2 ? false : true
       result_member['boundary-conditions']['p'][4] = p_4 < 2 ? false : true
       result_member['boundary-conditions']['p'][5] = p_5 < 2 ? false : true
       result_member['boundary-conditions']['p'][6] = p_6 < 2 ? false : true
       result_member['boundary-conditions']['k'][0] = k_0 < 2 ? false : true
       result_member['boundary-conditions']['k'][1] = k_1 < 2 ? false : true
       result_member['boundary-conditions']['k'][2] = k_2 < 2 ? false : true
       result_member['boundary-conditions']['k'][3] = k_3 < 2 ? false : true
       result_member['boundary-conditions']['k'][4] = k_4 < 2 ? false : true
       result_member['boundary-conditions']['k'][5] = k_5 < 2 ? false : true
       result_member['boundary-conditions']['k'][6] = k_6 < 2 ? false : true
       result_member['boundary-conditions']['U'][0] = U_0 < 2 ? false : true
       result_member['boundary-conditions']['U'][1] = U_1 < 2 ? false : true
       result_member['boundary-conditions']['U'][2] = U_2 < 2 ? false : true
       result_member['boundary-conditions']['U'][3] = U_3 < 2 ? false : true
       result_member['boundary-conditions']['U'][4] = U_4 < 2 ? false : true
       result_member['boundary-conditions']['U'][5] = U_5 < 2 ? false : true
       result_member['boundary-conditions']['U'][6] = U_6 < 2 ? false : true

      }

      return result_member
    }

    var ids = data.reduce((res,d) => {
      if(d['id'] !== 20){
        res.push(d['id'])
      }
      return res
    }, [])
    var members_dict = new Object()

    while (ids.length > 0) {
      const el1 = ids[0]
      var similar_members = []
      similar_members.push(el1)
      const member1 = data.filter(d => d['id'] == el1)[0]
      ids.shift()
      if (ids.length > 0) {


        for (var i = 0; i < ids.length; i++) {
          const member2 = data.filter(d => d['id'] == ids[i])[0]
          if (check_member_similarity(member1, member2)) {
            similar_members.push(ids[i])
          }
        }
      }
      members_dict[el1] = similar_members
      ids = ids.filter(d => !similar_members.includes(d))

    }

    const svg = d3.select(element)
      .append("svg")
      .attr("width", d3.select(element).node().parentNode.clientWidth)
      .attr("height", members_dict ? (Object.keys(members_dict).length) * (height + 42) : 10)

    svg.append("text").text("Members' Input Params")
      .attr('transform', `translate(0,20)`)
      .attr("fill", '#05ecec')

    const group = svg.append('g').attr('transform', `translate(0, 40)`)

    var i = 0

    var m = []
    Object.keys(members_dict).forEach(el => {
      var member = data.filter(d => d['id'] == el)[0]
      m.push(member)
    })
    const copy_m = JSON.parse(JSON.stringify(m));

    var dif_memeber = return_differences_member(copy_m)

    // console.log(members_dict)
    Object.keys(members_dict).forEach((el, index) => {
      // console.log(el, index)
      // console.log(typeof(members_dict[el][0]))

      var member = m[index]

      var highlight_class_name = ""
      for (var j = 0; j < members_dict[el].length; j++) {
        highlight_class_name = highlight_class_name + "highlight_" + members_dict[el][j] + " "
      }

      let inputValues = member["input"]

      let dif_input = dif_memeber['input']

      // console.log(members_dict[el])
      group.append("text").text( () => {
        if(index === 0){
          return `Members: 1 - 6`
        }else if(index === 2){
          return `Members: 7 - 9, 11 - 19`
        }else{
          return `Members: ${members_dict[el]} `
        }
        
      })
        .attr('transform', `translate(${width - 170}, ${(height + 40) * i + 20})`)
        .attr("fill", () => {
         
            return 'white'
        })
        .style('font-size', '0.75em')

      // HIGHLIGHTING THE CONTRAILS DATA ONLY
        // HARD CODED NOW WILL CHANGE LATER OR MAYBE NO NEED IN FUTURE
        if(members_dict[el].includes(hmembers[0])){
          // console.log("19")
          group.append('rect')
            .attr("x", 5)
            .attr("y", ((height + 40) * i) + 25)
            .attr("class", highlight_class_name)
            .attr('id', 'input-bar')
            .attr("width", width - 30)
            .attr("height", height - 20)
            .attr("fill", 'grey')
            .attr('opacity', 1)
            .attr('rx', '15')

        }else if(members_dict[el].includes(hmembers[1])){
          // console.log("19")
          group.append('rect')
            .attr("x", 5)
            .attr("y", ((height + 40) * i) + 25)
            .attr("class", highlight_class_name)
            .attr('id', 'input-bar')
            .attr("width", width - 30)
            .attr("height", height - 20)
            .attr("fill", 'grey')
            .attr('opacity', 1)
            .attr('rx', '15')

        }else{
          group.append('rect')
            .attr("x", 5)
            .attr("y", ((height + 40) * i) + 25)
            .attr("class", highlight_class_name)
            .attr('id', 'input-bar')
            .attr("width", width - 30)
            .attr("height", height - 20)
            .attr("fill", 'grey')
            .attr('opacity', 0)
            .attr('rx', '15')  

        }

            


      let keys = Object.keys(inputValues)
      const id = member['id']
      for (let k = 0; k < keys.length; k++) {
        let inputValueTip = d3Tip().attr().attr('class', 'd3-tip')
          .html(function () {
            let tip = `Member: ${members_dict[el]} <br>
                                    ${keys[k]} : ${inputValues[keys[k]]}`
            return tip
          })
          
        svg.call(inputValueTip)
        this.color.domain(inputDomain[keys[k]].domain)
          .range(inputDomain[keys[k]].range)
        group.append('rect')
          .attr("x", function () {
            return 10 + 21 * k
          })
          .attr('y', ((height + 40) * i) + 35 + 60)
          .attr('width', 20)
          .attr('height', 20)
          .style("stroke", "black")
          .style("stroke-width", 0.3)
          .attr('fill', () => {
            return Object.keys(members_dict).length == 1  || dif_input[keys[k]] ?  this.color(inputValues[keys[k]]) :'	#505050' })
          .on('mouseover', inputValueTip.show)
          .on('mouseout', inputValueTip.hide)
      }

      let boundaryValues = member["boundary-conditions"]
      let dif_boundary = dif_memeber['boundary-conditions']

      this.color.domain(inputDomain["boundary-conditions"].domain)
        .range(inputDomain["boundary-conditions"].range)
      let boundaryAttributeKeys = Object.keys(boundaryValues)
      for (let bak = 0; bak < boundaryAttributeKeys.length; bak++) {
        
        let singleAttributeValues = boundaryValues[boundaryAttributeKeys[bak]];
        let dif_boundary_atr = dif_boundary[boundaryAttributeKeys[bak]]
       
        for (let sav = 0; sav < singleAttributeValues.length; sav++) {
          let boundaryValueTip = d3Tip().attr().attr('class', 'd3-tip')
            .html(function () {
              let tip = `Member: ${members_dict[el]} <br>
                                    Boundary Attribute : ${boundaryAttributeKeys[bak]} <br>
                                    ${self.boundaries[sav]} : ${singleAttributeValues[sav]}
                                    `
              return tip
            })
          svg.call(boundaryValueTip)
          
          group.append('rect')
            .attr("x", function () {
              if (bak <= 1) {
                return 33 + 15 * bak
              } else {
                return 10 + 15 * bak
              }
            })
            .attr('y', function () {
              if (bak <= 1) {
                return ((height + 40) * i) + 27 + 9.5 * sav
              } else {
                return ((height + 40) * i) + 116 + 9.5 * sav
              }

            })
            .attr('width', 10)
            .attr('height', 10)
            .style("stroke", "black")
            .style("stroke-width", 0.5)
            .attr('fill', () => { return Object.keys(members_dict).length == 1 || dif_boundary_atr[sav] ? this.color(singleAttributeValues[sav]) : '	#505050' })

            .on('mouseover', boundaryValueTip.show)
            .on('mouseout', boundaryValueTip.hide)
        }
      }
      i = i + 1
    })

  }


  update(data, top, bottom) {
    let vis = this
    d3.select(vis.element).select('svg').remove()
    this.members = [top, bottom]
    this.draw_inputs(vis.element, data, false, this.members)

  }

}

