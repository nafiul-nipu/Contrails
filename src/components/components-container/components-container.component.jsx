import React from 'react';
import dataRegistry from '../data-component/dataRegistry.json'
import QueryPanel from '../query-panel/query-panel.component';
import ParametersPlot from '../parameters-plot/parameters-plot.component';
import Clusters from '../clusters/clusters.component';
import ProjectionContainer from '../projection-container/projection-container.component';


import './components-container.styles.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class ComponentsContainer extends React.Component {
    constructor() {
        super();
        this.state = {
            clusteringParams: [],
            inputFilters: [],
            filtered_data: dataRegistry

        }
        this.handleClusteringChange = this.handleClusteringChange.bind(this)
        this.handleInputFilters = this.handleInputFilters.bind(this)
    }

    componentDidMount() {

    }

    handleClusteringChange(params) {
        this.setState({ clusteringParams: params })


    }

    handleInputFilters(params) {
        this.setState({ inputFilters: params }, () => {

            var filters_param = this.state.inputFilters
            var data = dataRegistry
            if (filters_param['aircraft_engine'].length > 0) {
                data = data.filter(el => {
                    var e = []
                    e.push(el['input-parameters']['aircraft-engine'])
                    var result = e.some(r => filters_param['aircraft_engine'].includes(r))
                    return result

                })
            }
            if (filters_param['geometry'].length > 0 && data.length > 0) {
                data = data.filter(el => {
                    var e = []
                    e.push(el['input-parameters']['geometry'])
                    var result = e.some(r => filters_param['geometry'].includes(r))
                    return result

                })
            }
            if (filters_param['grid'].length > 0 && data.length > 0) {
                data = data.filter(el => {
                    var e = []
                    e.push(el['input-parameters']['grid'])
                    var result = e.some(r => filters_param['grid'].includes(r))
                    return result

                })
            }
            if (filters_param['scope'].length > 0 && data.length > 0) {
                data = data.filter(el => {
                    var e = []
                    e.push(el['input-parameters']['scope'])
                    var result = e.some(r => filters_param['scope'].includes(r))
                    return result

                })
            }
            if (filters_param['solution'].length > 0 && data.length > 0) {
                data = data.filter(el => {
                    var e = []
                    e.push(el['input-parameters']['solution'])
                    var result = e.some(r => filters_param['solution'].includes(r))
                    return result

                })
            }
            if (filters_param['turbulence'].length > 0 && data.length > 0) {
                data = data.filter(el => {
                    var e = []
                    e.push(el['input-parameters']['turbulence'])
                    var result = e.some(r => filters_param['turbulence'].includes(r))
                    return result

                })
            }
            if (filters_param['boundary_conditions_T'].length > 0 && data.length > 0) {
                data = data.filter(el => {
                    var e = []
                    e.push(el['input-parameters']['boundary-conditions']['T'])
                    var result = e.some(r => filters_param['boundary_conditions_T'].includes(r))
                    return result

                })
            }
            if (filters_param['boundary_conditions_P'].length > 0 && data.length > 0) {
                data = data.filter(el => {
                    var e = []
                    e.push(el['input-parameters']['boundary-conditions']['p'])
                    var result = e.some(r => filters_param['boundary_conditions_P'].includes(r))
                    return result

                })
            }
            if (filters_param['boundary_conditions_U'].length > 0 && data.length > 0) {
                data = data.filter(el => {
                    var e = []
                    e.push(el['input-parameters']['boundary-conditions']['U'])
                    var result = e.some(r => filters_param['boundary_conditions_U'].includes(r))
                    return result

                })
            }
            if (filters_param['boundary_conditions_rho'].length > 0 && data.length > 0) {
                data = data.filter(el => {
                    var e = []
                    e.push(el['input-parameters']['boundary-conditions']['rho'])
                    var result = e.some(r => filters_param['boundary_conditions_rho'].includes(r))
                    return result

                })
            }
            if (filters_param['boundary_conditions_k'].length > 0 && data.length > 0) {
                data = data.filter(el => {
                    var e = []
                    e.push(el['input-parameters']['boundary-conditions']['k'])
                    var result = e.some(r => filters_param['boundary_conditions_k'].includes(r))
                    return result

                })
            }

            this.setState({ filtered_data: data })
        })
    }

    render() {
        return (
            <Container fluid >
                <Row xs={12}>
                    <Col style={{ backgroundColor: '#31393f', height: '100vh', "padding": "0", }}>
                        <QueryPanel clusterMembers={this.handleClusteringChange} inputFilters={this.handleInputFilters} />
                    </Col>
                    <Col xs={7} style={{ backgroundColor: '#31393f', 'borderStyle': 'solid', 'borderWidth': '.5px', borderColor: "#05ecec" }}>
                        <ProjectionContainer renderArea={'top'} />
                        <ProjectionContainer renderArea={'bottom'} />
                        <Col xs={12} style={{ height: '45vh' }}>
                            <Row style={{ width: "50%", height: "100%" }}>
                                <Clusters clusteringParams={this.state.clusteringParams} dataRegistry={this.state.filtered_data} />
                            </Row>
                        </Col>
                    </Col>
                    <Col style={{ minWidth: "30%", backgroundColor: '#31393f', height: '100vh', "padding": "0", 'borderStyle': 'solid', 'borderWidth': '.5px', borderColor: "#05ecec", overflowY: 'scroll', overflowX: 'hidden' }}>
                        <ParametersPlot elements={this.state.filtered_data} />
                    </Col>
                </Row>
            </Container>
        )
    }

}


export default ComponentsContainer;