import React from 'react';
import * as d3 from 'd3'

import dataRegistryjson from '../data-component/dataRegistry.json'
import QueryPanel from '../query-panel/query-panel.component';
import ParametersPlot from '../parameters-plot/parameters-plot.component';
import Clusters from '../clusters/clusters.component';
import ThreeDView from '../threeD-plot/three-d-view.component';


import { loader, getMin, getMax, getData, getRawData, getRangeData } from '../threeD-plot/dataHandler';


import './components-container.styles.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form'
import {EvolutionContainer} from '../contrailsEvolution/EvolutionContainer';
import ShapeContainerComponent from '../similarity-measure/shapeContainer';

class ComponentsContainer extends React.Component {
    constructor() {
        super();
        this.state = {
            clusteringParams: [],
            inputFilters: null,
            filtered_data: dataRegistryjson,
            outputFilters: null,
            split_tendrils: false,
            all_members: dataRegistryjson,
            parameterDisplay: 'block',
            shapeDisplay:'none',
            newData: '210'
            // volumeDataTop:null,
            // memberTop:17,
            // timeTop: 0.06,
            // attributeTop: 'temp',
            // volumeDataBottom:null,
            // memberBottom:19,
            // timeBottom: 0.06,
            // attributeBottom:'temp'

        }

        this.volumeDataTop = null
        this.memberTop = 17
        this.timeTop =  0.10
        this.attributeTop =  'temp'

        this.volumeDataBottom = null
        this.memberBottom = 19
        this.timeBottom =  0.10
        this.attributeBottom = 'temp'



        this.handleClusteringChange = this.handleClusteringChange.bind(this)
        this.handleInputFilters = this.handleInputFilters.bind(this)
        this.handleOutputFilters = this.handleOutputFilters.bind(this)
        this.handleInputAndOuputFilters = this.handleInputAndOuputFilters.bind(this)
        this.handle_split_tendrils = this.handle_split_tendrils.bind(this)
        
        this.handleVolumeDataTop = this.handleVolumeDataTop.bind(this)
        this.handleFilteringTop = this.handleFilteringTop.bind(this)

        this.handleVolumeDataBottom = this.handleVolumeDataBottom.bind(this)
        this.handleFilteringBottom = this.handleFilteringBottom.bind(this)

        this.handleRadioViewChange = this.handleRadioViewChange.bind(this)
    }

    componentDidMount() {
        console.log("component container component did mount")
        const self = this
        // console.log(this.memberTop, this.timeTop, this.attributeTop)
        loader(this.memberTop, this.timeTop, this.attributeTop).then(function(){
            // console.log(getData())
            self.setState({volumeDataTop : getData(), memberTop: self.memberTop})

        })
        loader(this.memberBottom, this.timeBottom, this.attributeBottom).then(function(){
            self.setState({volumeDataBottom: getData(), memberBottom: self.memberBottom})
        })

    }

    handleVolumeDataTop(member, timestep, attribute){
        const self = this
        loader(member, timestep, attribute).then(function(){
            // console.log(getData())
            self.memberTop = member;
            self.timeTop = timestep;
            self.attributeTop = attribute;
            self.setState({volumeDataTop : getData(), memberTop: self.memberTop})
            if(member === 17){
                // console.log("hello")
                // d3.select(`#borderc1${timestep}`).style('fill', '#cccecf')
                d3.selectAll('.evolutionRectc1').style('fill', '#818385')
                    .style('opacity', 0.5)
                document.getElementById(`borderc1${timestep}`).style.fill = '#cccecf'
                document.getElementById(`borderc1${timestep}`).style.opacity = '0.5'
            }else if(member === 18){
                // console.log("hello")
                // d3.select(`#borderc1${timestep}`).style('fill', '#cccecf')
                d3.selectAll('.evolutionRectc2').style('fill', '#818385')
                .style('opacity', 0.5)
                document.getElementById(`borderc2${timestep}`).style.fill = '#cccecf'
                document.getElementById(`borderc2${timestep}`).style.opacity = '0.5'
                
            }else if(member === 19){
                // console.log("hello")
                // d3.select(`#borderc1${timestep}`).style('fill', '#cccecf')
                d3.selectAll('.evolutionRectc3').style('fill', '#818385')
                .style('opacity', 0.5)
                document.getElementById(`borderc3${timestep}`).style.fill = '#cccecf'
                document.getElementById(`borderc3${timestep}`).style.opacity = '0.5'
                
            }
            if(member == 20 && self.state.shapeDisplay == 'block'){
                self.setState({newData: timestep})
            }

        })
    }

    handleFilteringTop(member, timestep, attribute, dataRange, range){
        // console.log("filtering top")

        const self = this
        loader(member, timestep, attribute).then(function(){
            let rawData = getData()
            let rawFilteredData = []
            let create8bit = d3.scaleLinear()
                            .range([0,255])
    
    
            if(attribute === 'cluster'){
                create8bit.domain([0, dataRange[1]])
            }else{
                create8bit.domain(dataRange)
            }
    
            rawData.forEach(d =>{
            // console.log(d)
                if(d >= create8bit(range[0]) && d <= create8bit(range[1])){
                    // console.log(d)
                    rawFilteredData.push(d)
                    // count++
                }else{
                    rawFilteredData.push(0)
                }
            })
            let filteredData = new Uint8Array(rawFilteredData)
    
            self.memberTop = member;
            self.timeTop = timestep;
            self.attributeTop = attribute;
            self.setState({volumeDataTop : filteredData})

        })
    }


    handleVolumeDataBottom(member, timestep, attribute){
        const self = this
        loader(member, timestep, attribute).then(function(){
            self.memberBottom = member;
            self.timeBottom = timestep;
            self.attributeBottom = attribute;
            self.setState({volumeDataBottom: getData(), memberBottom: self.memberBottom})
            if(member === 17){
                // console.log("hello")
                // d3.select(`#borderc1${timestep}`).style('fill', '#cccecf')
                d3.selectAll('.evolutionRectc1').style('fill', '#818385')
                    .style('opacity', 0.5)
                document.getElementById(`borderc1${timestep}`).style.fill = '#cccecf'
                document.getElementById(`borderc1${timestep}`).style.opacity = '0.5'
            }else if(member === 18){
                // console.log("hello")
                // d3.select(`#borderc1${timestep}`).style('fill', '#cccecf')
                d3.selectAll('.evolutionRectc2').style('fill', '#818385')
                .style('opacity', 0.5)
                document.getElementById(`borderc2${timestep}`).style.fill = '#cccecf'
                document.getElementById(`borderc2${timestep}`).style.opacity = '0.5'
                
            }else if(member === 19){
                // console.log("hello")
                // d3.select(`#borderc1${timestep}`).style('fill', '#cccecf')
                d3.selectAll('.evolutionRectc3').style('fill', '#818385')
                .style('opacity', 0.5)
                document.getElementById(`borderc3${timestep}`).style.fill = '#cccecf'
                document.getElementById(`borderc3${timestep}`).style.opacity = '0.5'
                
            }

            // if(member !== 20){
            //     // console.log(self.memberTop)
            //     // d3.selectAll('#input-bar').style('opacity', 0)
            //     // d3.select(`.highlight_${self.memberTop}`).style('opacity', 1)
            //     // d3.select(`.highlight_${self.memberBottom}`).style('opacity', 1)

            //     // d3.selectAll('.output-circle').style('fill', '#FF6F61')
            //     // d3.selectAll(`#circles_${self.memberTop}_`).style('fill', "#42A5B3")
            //     // d3.selectAll(`#circles_${self.memberBottom}_`).style('fill', "#42A5B3")

            //     // d3.selectAll('.tendrils').style('stroke', '#FF6F61')
            //     // d3.selectAll(`#path_${self.memberTop}_`).style('stroke', "#42A5B3")
            //     // d3.selectAll(`#path_${self.memberBottom}_`).style('stroke', "#42A5B3")
            // }
        })
    }

    handleFilteringBottom(member, timestep, attribute, dataRange, range){

        const self = this
        loader(member, timestep, attribute).then(function(){
            let rawData = getData()
            let rawFilteredData = []
            let create8bit = d3.scaleLinear()
                            .range([0,255])
    
    
            if(attribute === 'cluster'){
                create8bit.domain([0, dataRange[1]])
            }else{
                create8bit.domain(dataRange)
            }
    
            rawData.forEach(d =>{
            // console.log(d)
                if(d >= create8bit(range[0]) && d <= create8bit(range[1])){
                    // console.log(d)
                    rawFilteredData.push(d)
                    // count++
                }else{
                    rawFilteredData.push(0)
                }
            })
            let filteredData = new Uint8Array(rawFilteredData)
    
            self.memberBottom = member;
            self.timeBottom = timestep;
            self.attributeBottom = attribute;
            self.setState({volumeDataBottom : filteredData})

        })
    }

    handleRadioViewChange(event){
        console.log(event.target.value)
        if(event.target.value === 'parameterView'){
            this.setState({
                parameterDisplay: 'block',
                shapeDisplay:'none'
            })
            // document.getElementById('parameterView').style.display = 'block';
            // document.getElementById('parameter2View').style.display = 'block';
            // document.getElementById('shapeView').style.display = 'none';
        }else{
            this.setState({
                parameterDisplay: 'none',
                shapeDisplay:'block'
            })
            // document.getElementById('parameterView').style.display = 'none';
            // document.getElementById('parameter2View').style.display = 'none';
            // document.getElementById('shapeView').style.display = 'block';
            this.handleVolumeDataTop(20, 210, 'temp')
        }
    }


    handle_split_tendrils(params) {
        // console.log(params)
        this.setState({ split_tendrils: params })
    }

    handleClusteringChange(params) {
        this.setState({ clusteringParams: params })


    }

    handleInputFilters(params) {
        console.log(params)
        this.setState({ inputFilters: params }, () => {
            this.handleInputAndOuputFilters()
        })
    }

    handleOutputFilters(params) {
        this.setState({ outputFilters: params }, () => {
            this.handleInputAndOuputFilters()
        })

    }


    handleInputAndOuputFilters() {
        var filters_param = this.state.inputFilters
        var filter_params2 = this.state.outputFilters
        let data = dataRegistryjson

        if (filters_param) {
            if (filters_param['aircraft_engine'].length > 0 && data.length > 0) {
                data = data.filter(el => {
                    if(el['id'] !== 20){
                        var e = []
                        e.push(el['input']['aircraft-engine'])
                        var result = e.some(r => filters_param['aircraft_engine'].includes(r))
                    }
                    
                    return result

                })
            }
            if (filters_param['geometry'].length > 0 && data.length > 0) {
                data = data.filter(el => {
                    if(el['id'] !== 20){
                        var e = []
                        e.push(el['input']['geometry'])
                        var result = e.some(r => filters_param['geometry'].includes(r))
                    }
                   
                    return result

                })
            }
            if (filters_param['grid'].length > 0 && data.length > 0) {
                data = data.filter(el => {
                    if(el['id'] !== 20){
                        var e = []
                    e.push(el['input']['grid'])
                    var result = e.some(r => filters_param['grid'].includes(r))
                    }
                    
                    return result

                })
            }
            if (filters_param['scope'].length > 0 && data.length > 0) {
                data = data.filter(el => {
                    if(el['id'] !== 20){
                        var e = []
                    e.push(el['input']['scope'])
                    var result = e.some(r => filters_param['scope'].includes(r))
                    }
                    
                    return result

                })
            }
            if (filters_param['solution'].length > 0 && data.length > 0) {
                data = data.filter(el => {
                    if(el['id'] !== 20){
                        var e = []
                    e.push(el['input']['solution'])
                    var result = e.some(r => filters_param['solution'].includes(r))
                    }
                    
                    return result

                })
            }
            if (filters_param['turbulence'].length > 0 && data.length > 0) {

                data = data.filter(el => {
                    if(el['id'] !== 20){
                        var e = []
                    e.push(el['input']['turbulence'])
                    var result = e.some(r => filters_param['turbulence'].includes(r))
                    }
                    
                    return result

                })
            }
            if (filters_param['boundary-T-bypassInlet'].length > 0 && data.length > 0) {
                data = data.filter(el => {
                    if(el['id'] !== 20){
                        var aux = el['boundary-conditions']
                    var e = aux['T'][0]
                    var result = filters_param['boundary-T-bypassInlet'].includes(e)
                    }
                    
                    return result

                })
            }
            if (filters_param['boundary-T-engine'].length > 0 && data.length > 0) {
                data = data.filter(el => {
                    if(el['id'] !== 20){
                        var aux = el['boundary-conditions']
                    var e = aux['T'][1]
                    var result = filters_param['boundary-T-engine'].includes(e)
                    }
                    
                    return result

                })
            }
            if (filters_param['boundary-T-farfield'].length > 0 && data.length > 0) {
                data = data.filter(el => {
                    if(el['id'] !== 20){
                        var aux = el['boundary-conditions']
                    var e = aux['T'][2]
                    var result = filters_param['boundary-T-farfield'].includes(e)
                    }
                    
                    return result

                })
            }
            if (filters_param['boundary-T-inlet'].length > 0 && data.length > 0) {
                data = data.filter(el => {
                    if(el['id'] !== 20){
                        var aux = el['boundary-conditions']
                    var e = aux['T'][3]
                    var result = filters_param['boundary-T-inlet'].includes(e)
                    }
                    
                    return result

                })
            }
            if (filters_param['boundary-T-nozzle'].length > 0 && data.length > 0) {

                data = data.filter(el => {
                    if(el['id'] !== 20){
                        var aux = el['boundary-conditions']
                    var e = aux['T'][4]
                    var result = filters_param['boundary-T-nozzle'].includes(e)
                    }
                    
                    return result

                })
            }
            if (filters_param['boundary-T-outlet'].length > 0 && data.length > 0) {
                data = data.filter(el => {
                    if(el['id'] !== 20){
                        var aux = el['boundary-conditions']
                    var e = aux['T'][5]
                    var result = filters_param['boundary-T-outlet'].includes(e)
                    }
                    
                    return result

                })
            }
            if (filters_param['boundary-T-turbine'].length > 0 && data.length > 0) {
                data = data.filter(el => {
                    if(el['id'] !== 20){
                        var aux = el['boundary-conditions']
                    var e = aux['T'][6]
                    var result = filters_param['boundary-T-turbine'].includes(e)
                    }
                    
                    return result

                })
            }

            if (filters_param['boundary-U-bypassInlet'].length > 0 && data.length > 0) {
                data = data.filter(el => {
                    if(el['id'] !== 20){
                        var aux = el['boundary-conditions']
                    var e = aux['U'][0]
                    var result = filters_param['boundary-U-bypassInlet'].includes(e)
                    }
                    
                    return result

                })
            }
            if (filters_param['boundary-U-engine'].length > 0 && data.length > 0) {
                data = data.filter(el => {
                    if(el['id'] !== 20){
                        var aux = el['boundary-conditions']
                        var e = aux['U'][1]
                        var result = filters_param['boundary-U-engine'].includes(e)
                    }
                   
                    return result

                })
            }
            if (filters_param['boundary-U-farfield'].length > 0 && data.length > 0) {
                data = data.filter(el => {
                    if(el['id'] !== 20){
                        var aux = el['boundary-conditions']
                    var e = aux['U'][2]
                    var result = filters_param['boundary-U-farfield'].includes(e)
                    }
                    
                    return result

                })
            }
            if (filters_param['boundary-U-inlet'].length > 0 && data.length > 0) {
                data = data.filter(el => {
                    if(el['id'] !== 20){
                        var aux = el['boundary-conditions']
                    var e = aux['U'][3]
                    var result = filters_param['boundary-U-inlet'].includes(e)
                    }
                    
                    return result

                })
            }
            if (filters_param['boundary-U-nozzle'].length > 0 && data.length > 0) {
                data = data.filter(el => {
                    if(el['id'] !== 20){
                        var aux = el['boundary-conditions']
                    var e = aux['U'][4]
                    var result = filters_param['boundary-U-nozzle'].includes(e)
                    }
                    
                    return result

                })
            }
            if (filters_param['boundary-U-outlet'].length > 0 && data.length > 0) {
                data = data.filter(el => {
                    if(el['id'] !== 20){
                        var aux = el['boundary-conditions']
                        var e = aux['U'][5]
                        var result = filters_param['boundary-U-outlet'].includes(e)
                    }
                   
                    return result

                })
            }
            if (filters_param['boundary-U-turbine'].length > 0 && data.length > 0) {
                data = data.filter(el => {
                    if(el['id'] !== 20){
                        var aux = el['boundary-conditions']
                    var e = aux['U'][6]
                    var result = filters_param['boundary-U-turbine'].includes(e)
                    }
                    
                    return result

                })
            }
            if (filters_param['boundary-p-bypassInlet'].length > 0 && data.length > 0) {

                data = data.filter(el => {
                    if(el['id'] !== 20){
                        var aux = el['boundary-conditions']
                    var e = aux['p'][0]
                    var result = filters_param['boundary-p-bypassInlet'].includes(e)
                    }
                    
                    return result

                })
            }
            if (filters_param['boundary-p-engine'].length > 0 && data.length > 0) {
                data = data.filter(el => {
                    if(el['id'] !== 20){
                        var aux = el['boundary-conditions']
                    var e = aux['p'][1]
                    var result = filters_param['boundary-p-engine'].includes(e)
                    }
                    
                    return result

                })
            }
            if (filters_param['boundary-p-farfield'].length > 0 && data.length > 0) {
                data = data.filter(el => {
                    if(el['id'] !== 20){
                        var aux = el['boundary-conditions']
                    var e = aux['p'][2]
                    var result = filters_param['boundary-p-farfield'].includes(e)
                    }
                    
                    return result

                })
            }
            if (filters_param['boundary-p-inlet'].length > 0 && data.length > 0) {
                data = data.filter(el => {
                    if(el['id'] !== 20){
                        var aux = el['boundary-conditions']
                    var e = aux['p'][3]
                    var result = filters_param['boundary-p-inlet'].includes(e)
                    }
                    
                    return result

                })
            }
            if (filters_param['boundary-p-nozzle'].length > 0 && data.length > 0) {
                data = data.filter(el => {
                    if(el['id'] !== 20){
                        var aux = el['boundary-conditions']
                    var e = aux['p'][4]
                    var result = filters_param['boundary-p-nozzle'].includes(e)
                    }
                    
                    return result

                })
            }
            if (filters_param['boundary-p-outlet'].length > 0 && data.length > 0) {
                data = data.filter(el => {
                    if(el['id'] !== 20){
                        var aux = el['boundary-conditions']
                    var e = aux['p'][5]
                    var result = filters_param['boundary-p-outlet'].includes(e)
                    }
                    
                    return result

                })
            }
            if (filters_param['boundary-p-turbine'].length > 0 && data.length > 0) {
                data = data.filter(el => {
                    if(el['id'] !== 20){
                        var aux = el['boundary-conditions']
                    var e = aux['p'][6]
                    var result = filters_param['boundary-p-turbine'].includes(e)
                    }
                    
                    return result

                })
            }

            if (filters_param['boundary-k-bypassInlet'].length > 0 && data.length > 0) {
                data = data.filter(el => {
                    if(el['id'] !== 20){
                        var aux = el['boundary-conditions']
                    var e = aux['k'][0]
                    var result = filters_param['boundary-k-bypassInlet'].includes(e)
                    }
                    
                    return result

                })
            }
            if (filters_param['boundary-k-engine'].length > 0 && data.length > 0) {
                data = data.filter(el => {
                    if(el['id'] !== 20){
                        var aux = el['boundary-conditions']
                    var e = aux['k'][1]
                    var result = filters_param['boundary-k-engine'].includes(e)
                    }
                    
                    return result

                })
            }
            if (filters_param['boundary-k-farfield'].length > 0 && data.length > 0) {
                data = data.filter(el => {
                    if(el['id'] !== 20){
                        var aux = el['boundary-conditions']
                    var e = aux['k'][2]
                    var result = filters_param['boundary-k-farfield'].includes(e)
                    }
                    
                    return result

                })
            }
            if (filters_param['boundary-k-inlet'].length > 0 && data.length > 0) {
                data = data.filter(el => {
                    if(el['id'] !== 20){
                        var aux = el['boundary-conditions']
                    var e = aux['k'][3]
                    var result = filters_param['boundary-k-inlet'].includes(e)
                    }
                    
                    return result

                })
            }
            if (filters_param['boundary-k-nozzle'].length > 0 && data.length > 0) {
                data = data.filter(el => {
                    if(el['id'] !== 20){
                        var aux = el['boundary-conditions']
                    var e = aux['k'][4]
                    var result = filters_param['boundary-k-nozzle'].includes(e)
                    }
                    
                    return result

                })
            }
            if (filters_param['boundary-k-outlet'].length > 0 && data.length > 0) {
                data = data.filter(el => {
                    if(el['id'] !== 20){
                        var aux = el['boundary-conditions']
                    var e = aux['k'][5]
                    var result = filters_param['boundary-k-outlet'].includes(e)
                    }
                    
                    return result

                })
            }
            if (filters_param['boundary-k-turbine'].length > 0 && data.length > 0) {
                data = data.filter(el => {
                    if(el['id'] !== 20){
                        var aux = el['boundary-conditions']
                    var e = aux['k'][6]
                    var result = filters_param['boundary-k-turbine'].includes(e)
                    }
                    
                    return result

                })
            }


        }
        if (filter_params2) {
            // console.log(filter_params2)

            if (filter_params2['T_lag_avg']) {
                data = data.filter(el => {
                    if(el['id'] !== 20){
                        var e = []
                        e.push(el['output-parameters']['T_lag_avg'])
                        // console.log(filter_params2['T_lag_avg'] )
                        console.log(e)
                        // console.log(e.some(r => (r <= filter_params2['T_lag_avg'] )))
                        var result = e.some(r => r <= filter_params2['T_lag_avg'])
                    }
                    
                    return result

                })
            }
            if (filter_params2['T_eul_avg']) {
                data = data.filter(el => {
                    if(el['id'] !== 20){
                        var e = []
                    e.push(el['output-parameters']['T_eul_avg'])
                    var result = e.some(r => (r <= filter_params2['T_eul_avg']))
                    }
                    
                    return result

                })
            }


            // if (filter_params2['rho_lag_avg']) {
            //     data = data.filter(el => {
            //         if(el['id'] !== 20){
            //             var e = []
            //         e.push(el['output-parameters']['rho_lag_avg'])
            //         var result = e.some(r => (filter_params2['rho_lag_avg'] - 10) && (filter_params2['rho_lag_avg'] + 10))
            //         }
                    
            //         return result

            //     })
            // }
            // if (filter_params2['rho_eul_avg']) {
            //     data = data.filter(el => {
            //         if(el['id'] !== 20){
            //             var e = []
            //         e.push(el['output-parameters']['rho_eul_avg'])
            //         var result = e.some(r => (filter_params2['rho_eul_avg'] - 0.0001) && (filter_params2['rho_eul_avg'] + 0.0001))
            //         }
                    
            //         return result

            //     })
            // }

            if (filter_params2['d_lag_avg']) {
                data = data.filter(el => {
                    if(el['id'] !== 20){
                        var e = []
                    e.push(el['output-parameters']['d_lag_avg'])
                    var result = e.some(r => (r <= filter_params2['d_lag_avg']))
                    }
                    
                    return result

                })
            }
            if (filter_params2['p_eul_avg']) {
                data = data.filter(el => {
                    if(el['id'] !== 20){
                        var e = []
                        e.push(el['output-parameters']['p_eul_avg'])
                        var result = e.some(r => (r <= filter_params2['p_eul_avg']))
                    }
                   
                    return result

                })
            }


            // if (filter_params2['Ygas_lag_avg']) {
            //     data = data.filter(el => {
            //         if(el['id'] !== 20){
            //             var e = []
            //         e.push(el['output-parameters']['Ygas_lag_avg'])
            //         var result = e.some(r => (filter_params2['Ygas_lag_avg'] - 10) && (filter_params2['Ygas_lag_avg'] + 10))
            //         }
                    
            //         return result

            //     })
            // }
            if (filter_params2['k_eul_avg']) {
                data = data.filter(el => {
                    if(el['id'] !== 20){
                        var e = []
                        e.push(el['output-parameters']['k_eul_avg'])
                        var result = e.some(r => (r <= filter_params2['k_eul_avg']))
                    }
                   
                    return result

                })
            }




        }
        // console.log(data)
        this.setState({ filtered_data: data })

    }












    render() {
        if(this.state.volumeDataBottom){
            return (
                <Container fluid style={{ overflow: 'hidden' }}>
                    <Row xs={12}>
                        <Col xs={5} style={{ backgroundColor: '#31393f', height: '100vh', "padding": "0", }}>
                            <Row>
                                <Col>
                                    <Form>
                                    <Form.Group >
                                        <Form.Label id='space'>Toggle between: </Form.Label>
                                        <Form.Check
                                        inline
                                        label="Shape"
                                        name="toggle"
                                        type="radio"
                                        id={`inline-radio-1`}
                                        value="shapeView"
                                        className='radin'
                                        onChange={this.handleRadioViewChange}    
                                        // defaultChecked                                 
                                        />
                                        <Form.Check
                                        inline
                                        label="Parameter"
                                        name="toggle"
                                        type="radio"
                                        id={`inline-radio-2`}
                                        value="parameterView"
                                        onChange={this.handleRadioViewChange}
                                        defaultChecked
                                        />
                                    </Form.Group>
                                    </Form>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={4} style={{ backgroundColor: '#31393f', height: '100vh', display: `${this.state.parameterDisplay}` }} id='parameterView'>
                                    <QueryPanel inputFilters={this.handleInputFilters} outputFilters={this.handleOutputFilters} split_tendrils={this.handle_split_tendrils} />
                                </Col>
                                <Col xs={8} style={{ minWidth: "30%", backgroundColor: '#31393f', height: '100vh', overflow: 'hidden', display:`${this.state.parameterDisplay}` }} id='parameter2View'>
                                    <ParametersPlot 
                                        elements={this.state.filtered_data} 
                                        split_tendrils={this.state.split_tendrils} 
                                        key={this.state.parameterDisplay}
                                        shouldRender ={this.state.parameterDisplay}
                                        memberTop = {this.memberTop}
                                        memberBottom = {this.memberBottom}
                                    />
                                </Col>

                                <Col style={{ backgroundColor: '#31393f', height: '100vh', "padding": "0", display:`${this.state.shapeDisplay}` }} id='shapeView'>
                                    <ShapeContainerComponent 
                                        key={this.state.shapeDisplay}
                                        value={this.state.newData}
                                    />
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={7} style={{ backgroundColor: '#31393f', 'markerEndmargin': '0' }}>
                            <Row style={{ height: '70vh' }}>
                                <Col xs={6}>
                                    <ThreeDView
                                        key={this.state.shapeDisplay}
                                        shapeView={this.state.shapeDisplay}
                                        renderArea={'top'}
                                        data={this.state.volumeDataTop}
                                        member={this.memberTop}
                                        time={this.timeTop}
                                        handleVolumeChange={this.handleVolumeDataTop}
                                        handleFiltering = {this.handleFilteringTop}
                                    />                                
                                </Col>
                                <Col xs={6}>
                                    <ThreeDView 
                                        shapeView={this.state.shapeDisplay}
                                        renderArea={'bottom'} 
                                        data={this.state.volumeDataBottom}
                                        member={this.memberBottom}
                                        time={this.timeBottom}
                                        handleVolumeChange={this.handleVolumeDataBottom}
                                        handleFiltering={this.handleFilteringBottom}
                                    />
                                </Col>
                            </Row>
                            <Row style={{height: '30vh'}}>
                                {/* commented out the backend thing */}
                                {/* <Col xs={4}>
                                </Col>
                                <Col>
                                    <Clusters clusteringParams={this.state.clusteringParams} dataRegistry={this.state.filtered_data} clusterMembers={this.handleClusteringChange} all_members={this.state.all_members} />
                                </Col> */}
                                {/* adding evolution of contrails */}
                                <Col xs={6} id='evCon'>
                                    {/* {this.state.memberTop} */}
                                    <EvolutionContainer 
                                        memberID={this.state.memberTop}
                                    />
                                </Col>
                                <Col xs={6} >
                                    <EvolutionContainer 
                                        memberID={this.state.memberBottom}
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            )
        }else{
            return(
                <div>Volume data loading</div>
            )
        }
        
    }

}


export default ComponentsContainer;