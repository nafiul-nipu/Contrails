import React from 'react';
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
        this.timeTop =  0.06
        this.attributeTop =  'temp'
        this.volumeDataBottom = null
        this.memberBottom = 19
        this.timeBottom =  0.06
        this.attributeBottom = 'temp'


        this.handleClusteringChange = this.handleClusteringChange.bind(this)
        this.handleInputFilters = this.handleInputFilters.bind(this)
        this.handleOutputFilters = this.handleOutputFilters.bind(this)
        this.handleInputAndOuputFilters = this.handleInputAndOuputFilters.bind(this)
        this.handle_split_tendrils = this.handle_split_tendrils.bind(this)
        this.handleVolumeDataTop = this.handleVolumeDataTop.bind(this)
        this.handleVolumeDataBottom = this.handleVolumeDataBottom.bind(this)

    }

    componentDidMount() {
        console.log("component container component did mount")
        const self = this
        console.log(this.memberTop, this.timeTop, this.attributeTop)
        loader(this.memberTop, this.timeTop, this.attributeTop).then(function(){
            // console.log(getData())
            self.setState({volumeDataTop : getData()})

        })
        loader(this.memberBottom, this.timeBottom, this.attributeBottom).then(function(){
            self.setState({volumeDataBottom: getData()})
        })

    }

    handleVolumeDataTop(member, timestep, attribute){
        const self = this
        loader(member, timestep, attribute).then(function(){
            // console.log(getData())
            self.memberTop = member;
            self.timeTop = timestep;
            self.attributeTop = attribute;
            self.setState({volumeDataTop : getData()})

        })
    }

    handleVolumeDataBottom(member, timestep, attribute){
        const self = this
        loader(member, timestep, attribute).then(function(){
            self.memberBottom = member;
            self.timeBottom = timestep;
            self.attributeBottom = attribute;
            self.setState({volumeDataBottom: getData()})
        })
    }

    handle_split_tendrils(params) {
        this.setState({ split_tendrils: params })
    }

    handleClusteringChange(params) {
        this.setState({ clusteringParams: params })


    }

    handleInputFilters(params) {
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
                    var e = []
                    e.push(el['input']['aircraft-engine'])
                    var result = e.some(r => filters_param['aircraft_engine'].includes(r))
                    return result

                })
            }
            if (filters_param['geometry'].length > 0 && data.length > 0) {
                data = data.filter(el => {
                    var e = []
                    e.push(el['input']['geometry'])
                    var result = e.some(r => filters_param['geometry'].includes(r))
                    return result

                })
            }
            if (filters_param['grid'].length > 0 && data.length > 0) {
                data = data.filter(el => {
                    var e = []
                    e.push(el['input']['grid'])
                    var result = e.some(r => filters_param['grid'].includes(r))
                    return result

                })
            }
            if (filters_param['scope'].length > 0 && data.length > 0) {
                data = data.filter(el => {
                    var e = []
                    e.push(el['input']['scope'])
                    var result = e.some(r => filters_param['scope'].includes(r))
                    return result

                })
            }
            if (filters_param['solution'].length > 0 && data.length > 0) {
                data = data.filter(el => {
                    var e = []
                    e.push(el['input']['solution'])
                    var result = e.some(r => filters_param['solution'].includes(r))
                    return result

                })
            }
            if (filters_param['turbulence'].length > 0 && data.length > 0) {

                data = data.filter(el => {
                    var e = []
                    e.push(el['input']['turbulence'])
                    var result = e.some(r => filters_param['turbulence'].includes(r))
                    return result

                })
            }
            if (filters_param['boundary-T-bypassInlet'].length > 0 && data.length > 0) {
                data = data.filter(el => {
                    var aux = el['boundary-conditions']
                    var e = aux['T'][0]
                    var result = filters_param['boundary-T-bypassInlet'].includes(e)
                    return result

                })
            }
            if (filters_param['boundary-T-engine'].length > 0 && data.length > 0) {
                data = data.filter(el => {
                    var aux = el['boundary-conditions']
                    var e = aux['T'][1]
                    var result = filters_param['boundary-T-engine'].includes(e)
                    return result

                })
            }
            if (filters_param['boundary-T-farfield'].length > 0 && data.length > 0) {
                data = data.filter(el => {
                    var aux = el['boundary-conditions']
                    var e = aux['T'][2]
                    var result = filters_param['boundary-T-farfield'].includes(e)
                    return result

                })
            }
            if (filters_param['boundary-T-inlet'].length > 0 && data.length > 0) {
                data = data.filter(el => {
                    var aux = el['boundary-conditions']
                    var e = aux['T'][3]
                    var result = filters_param['boundary-T-inlet'].includes(e)
                    return result

                })
            }
            if (filters_param['boundary-T-nozzle'].length > 0 && data.length > 0) {

                data = data.filter(el => {
                    var aux = el['boundary-conditions']
                    var e = aux['T'][4]
                    var result = filters_param['boundary-T-nozzle'].includes(e)
                    return result

                })
            }
            if (filters_param['boundary-T-outlet'].length > 0 && data.length > 0) {
                data = data.filter(el => {
                    var aux = el['boundary-conditions']
                    var e = aux['T'][5]
                    var result = filters_param['boundary-T-outlet'].includes(e)
                    return result

                })
            }
            if (filters_param['boundary-T-turbine'].length > 0 && data.length > 0) {
                data = data.filter(el => {
                    var aux = el['boundary-conditions']
                    var e = aux['T'][6]
                    var result = filters_param['boundary-T-turbine'].includes(e)
                    return result

                })
            }

            if (filters_param['boundary-U-bypassInlet'].length > 0 && data.length > 0) {
                data = data.filter(el => {
                    var aux = el['boundary-conditions']
                    var e = aux['U'][0]
                    var result = filters_param['boundary-U-bypassInlet'].includes(e)
                    return result

                })
            }
            if (filters_param['boundary-U-engine'].length > 0 && data.length > 0) {
                data = data.filter(el => {
                    var aux = el['boundary-conditions']
                    var e = aux['U'][1]
                    var result = filters_param['boundary-U-engine'].includes(e)
                    return result

                })
            }
            if (filters_param['boundary-U-farfield'].length > 0 && data.length > 0) {
                data = data.filter(el => {
                    var aux = el['boundary-conditions']
                    var e = aux['U'][2]
                    var result = filters_param['boundary-U-farfield'].includes(e)
                    return result

                })
            }
            if (filters_param['boundary-U-inlet'].length > 0 && data.length > 0) {
                data = data.filter(el => {
                    var aux = el['boundary-conditions']
                    var e = aux['U'][3]
                    var result = filters_param['boundary-U-inlet'].includes(e)
                    return result

                })
            }
            if (filters_param['boundary-U-nozzle'].length > 0 && data.length > 0) {
                data = data.filter(el => {
                    var aux = el['boundary-conditions']
                    var e = aux['U'][4]
                    var result = filters_param['boundary-U-nozzle'].includes(e)
                    return result

                })
            }
            if (filters_param['boundary-U-outlet'].length > 0 && data.length > 0) {
                data = data.filter(el => {
                    var aux = el['boundary-conditions']
                    var e = aux['U'][5]
                    var result = filters_param['boundary-U-outlet'].includes(e)
                    return result

                })
            }
            if (filters_param['boundary-U-turbine'].length > 0 && data.length > 0) {
                data = data.filter(el => {
                    var aux = el['boundary-conditions']
                    var e = aux['U'][6]
                    var result = filters_param['boundary-U-turbine'].includes(e)
                    return result

                })
            }
            if (filters_param['boundary-p-bypassInlet'].length > 0 && data.length > 0) {

                data = data.filter(el => {
                    var aux = el['boundary-conditions']
                    var e = aux['p'][0]
                    var result = filters_param['boundary-p-bypassInlet'].includes(e)
                    return result

                })
            }
            if (filters_param['boundary-p-engine'].length > 0 && data.length > 0) {
                data = data.filter(el => {
                    var aux = el['boundary-conditions']
                    var e = aux['p'][1]
                    var result = filters_param['boundary-p-engine'].includes(e)
                    return result

                })
            }
            if (filters_param['boundary-p-farfield'].length > 0 && data.length > 0) {
                data = data.filter(el => {
                    var aux = el['boundary-conditions']
                    var e = aux['p'][2]
                    var result = filters_param['boundary-p-farfield'].includes(e)
                    return result

                })
            }
            if (filters_param['boundary-p-inlet'].length > 0 && data.length > 0) {
                data = data.filter(el => {
                    var aux = el['boundary-conditions']
                    var e = aux['p'][3]
                    var result = filters_param['boundary-p-inlet'].includes(e)
                    return result

                })
            }
            if (filters_param['boundary-p-nozzle'].length > 0 && data.length > 0) {
                data = data.filter(el => {
                    var aux = el['boundary-conditions']
                    var e = aux['p'][4]
                    var result = filters_param['boundary-p-nozzle'].includes(e)
                    return result

                })
            }
            if (filters_param['boundary-p-outlet'].length > 0 && data.length > 0) {
                data = data.filter(el => {
                    var aux = el['boundary-conditions']
                    var e = aux['p'][5]
                    var result = filters_param['boundary-p-outlet'].includes(e)
                    return result

                })
            }
            if (filters_param['boundary-p-turbine'].length > 0 && data.length > 0) {
                data = data.filter(el => {
                    var aux = el['boundary-conditions']
                    var e = aux['p'][6]
                    var result = filters_param['boundary-p-turbine'].includes(e)
                    return result

                })
            }

            if (filters_param['boundary-k-bypassInlet'].length > 0 && data.length > 0) {
                data = data.filter(el => {
                    var aux = el['boundary-conditions']
                    var e = aux['k'][0]
                    var result = filters_param['boundary-k-bypassInlet'].includes(e)
                    return result

                })
            }
            if (filters_param['boundary-k-engine'].length > 0 && data.length > 0) {
                data = data.filter(el => {
                    var aux = el['boundary-conditions']
                    var e = aux['k'][1]
                    var result = filters_param['boundary-k-engine'].includes(e)
                    return result

                })
            }
            if (filters_param['boundary-k-farfield'].length > 0 && data.length > 0) {
                data = data.filter(el => {
                    var aux = el['boundary-conditions']
                    var e = aux['k'][2]
                    var result = filters_param['boundary-k-farfield'].includes(e)
                    return result

                })
            }
            if (filters_param['boundary-k-inlet'].length > 0 && data.length > 0) {
                data = data.filter(el => {
                    var aux = el['boundary-conditions']
                    var e = aux['k'][3]
                    var result = filters_param['boundary-k-inlet'].includes(e)
                    return result

                })
            }
            if (filters_param['boundary-k-nozzle'].length > 0 && data.length > 0) {
                data = data.filter(el => {
                    var aux = el['boundary-conditions']
                    var e = aux['k'][4]
                    var result = filters_param['boundary-k-nozzle'].includes(e)
                    return result

                })
            }
            if (filters_param['boundary-k-outlet'].length > 0 && data.length > 0) {
                data = data.filter(el => {
                    var aux = el['boundary-conditions']
                    var e = aux['k'][5]
                    var result = filters_param['boundary-k-outlet'].includes(e)
                    return result

                })
            }
            if (filters_param['boundary-k-turbine'].length > 0 && data.length > 0) {
                data = data.filter(el => {
                    var aux = el['boundary-conditions']
                    var e = aux['k'][6]
                    var result = filters_param['boundary-k-turbine'].includes(e)
                    return result

                })
            }


        }
        if (filter_params2) {


            if (filter_params2['T_lag_avg']) {
                data = data.filter(el => {
                    var e = []
                    e.push(el['output-parameters']['T_lag_avg'])
                    var result = e.some(r => (filter_params2['T_lag_avg'] >= r - 10) && (filter_params2['T_lag_avg'] <= r + 10))
                    return result

                })
            }
            if (filter_params2['T_eul_avg']) {
                data = data.filter(el => {
                    var e = []
                    e.push(el['output-parameters']['T_eul_avg'])
                    var result = e.some(r => (filter_params2['T_eul_avg'] >= r - 10) && (filter_params2['T_eul_avg'] <= r + 10))
                    return result

                })
            }


            if (filter_params2['rho_lag_avg']) {
                data = data.filter(el => {
                    var e = []
                    e.push(el['output-parameters']['rho_lag_avg'])
                    var result = e.some(r => (filter_params2['rho_lag_avg'] >= r - 10) && (filter_params2['rho_lag_avg'] <= r + 10))
                    return result

                })
            }
            if (filter_params2['rho_eul_avg']) {
                data = data.filter(el => {
                    var e = []
                    e.push(el['output-parameters']['rho_eul_avg'])
                    var result = e.some(r => (filter_params2['rho_eul_avg'] >= r - 0.0001) && (filter_params2['rho_eul_avg'] <= r + 0.0001))
                    return result

                })
            }

            if (filter_params2['d_lag_avg']) {
                data = data.filter(el => {
                    var e = []
                    e.push(el['output-parameters']['d_lag_avg'])
                    var result = e.some(r => (filter_params2['d_lag_avg'] >= r - 0.00001) && (filter_params2['d_lag_avg'] <= r + 0.00001))
                    return result

                })
            }
            if (filter_params2['p_eul_avg']) {
                data = data.filter(el => {
                    var e = []
                    e.push(el['output-parameters']['p_eul_avg'])
                    var result = e.some(r => (filter_params2['p_eul_avg'] >= r - 800) && (filter_params2['p_eul_avg'] <= r + 800))
                    return result

                })
            }


            if (filter_params2['Ygas_lag_avg']) {
                data = data.filter(el => {
                    var e = []
                    e.push(el['output-parameters']['Ygas_lag_avg'])
                    var result = e.some(r => (filter_params2['Ygas_lag_avg'] >= r - 10) && (filter_params2['Ygas_lag_avg'] <= r + 10))
                    return result

                })
            }
            if (filter_params2['k_eul_avg']) {
                data = data.filter(el => {
                    var e = []
                    e.push(el['output-parameters']['k_eul_avg'])
                    var result = e.some(r => (filter_params2['k_eul_avg'] >= r - 10) && (filter_params2['k_eul_avg'] <= r + 10))
                    return result

                })
            }




        }
        this.setState({ filtered_data: data })

    }












    render() {
        if(this.state.volumeDataBottom){
            return (
                <Container fluid style={{ overflow: 'hidden' }}>
                    <Row xs={12}>
                        <Col style={{ backgroundColor: '#31393f', height: '100vh', "padding": "0", }}>
                            <QueryPanel inputFilters={this.handleInputFilters} outputFilters={this.handleOutputFilters} split_tendrils={this.handle_split_tendrils} />
                        </Col>
                        <Col style={{ minWidth: "30%", backgroundColor: '#31393f', height: '100vh', "padding": "0", overflow: 'hidden' }}>
                            <ParametersPlot elements={this.state.filtered_data} split_tendrils={this.state.split_tendrils} />
                        </Col>
                        <Col xs={7} style={{ backgroundColor: '#31393f', 'markerEndmargin': '0' }}>
                            <Row style={{ height: '75vh' }}>
                                <Col xs={6}>
                                    <ThreeDView
                                        renderArea={'top'}
                                        data={this.state.volumeDataTop}
                                        member={this.memberTop}
                                        time={this.timeTop}
                                        handleVolumeChange={this.handleVolumeDataTop}
                                    />                                
                                </Col>
                                <Col xs={6}>
                                    <ThreeDView 
                                        renderArea={'bottom'} 
                                        data={this.state.volumeDataBottom}
                                        member={this.memberBottom}
                                        time={this.timeTop}
                                        handleVolumeChange={this.handleVolumeDataBottom}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={4}>
                                {/* <ContrailsLinePlot members={this.state.filtered_data}/> */}
                                </Col>
                                <Col>
                                    <Clusters clusteringParams={this.state.clusteringParams} dataRegistry={this.state.filtered_data} clusterMembers={this.handleClusteringChange} all_members={this.state.all_members} />
                                </Col></Row>
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