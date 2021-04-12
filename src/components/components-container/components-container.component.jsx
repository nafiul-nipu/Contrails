import React from 'react';
import dataRegistry from '../data-component/dataRegistry.json'
import QueryPanel from '../query-panel/query-panel.component';
import ParametersPlot from '../parameters-plot/parameters-plot.component';
import Clusters from '../clusters/clusters.component';
import VolumeRendering from '../threeD-plot/volume-rendering.componenet';


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
            filtered_data: dataRegistry,
            outputFilters: null

        }
        this.handleClusteringChange = this.handleClusteringChange.bind(this)
        this.handleInputFilters = this.handleInputFilters.bind(this)
        this.handleOutputFilters = this.handleOutputFilters.bind(this)
        this.handleInputAndOuputFilters = this.handleInputAndOuputFilters.bind(this)
    }

    componentDidMount() {

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
        var data = dataRegistry
    
        if(filters_param){

        
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
                var aux = el['input-parameters']['boundary-conditions']
                var e = aux['T']
                var result = e.some(r => filters_param['boundary_conditions_T'].includes(r))
                return result

            })
        }
        if (filters_param['boundary_conditions_P'].length > 0 && data.length > 0) {
            data = data.filter(el => {
                var aux = el['input-parameters']['boundary-conditions']
                var e = aux['p']
                var result = e.some(r => filters_param['boundary_conditions_P'].includes(r))
                return result

            })
        }
        if (filters_param['boundary_conditions_U'].length > 0 && data.length > 0) {
            data = data.filter(el => {
                var aux = el['input-parameters']['boundary-conditions']
                var e = aux['U']
                var result = e.some(r => filters_param['boundary_conditions_U'].includes(r))
                return result

            })
        }
        if (filters_param['boundary_conditions_rho'].length > 0 && data.length > 0) {
            data = data.filter(el => {
                var aux = el['input-parameters']['boundary-conditions']
                var e = aux['rho']
                var result = e.some(r => filters_param['boundary_conditions_rho'].includes(r))
                return result

            })
        }
        if (filters_param['boundary_conditions_k'].length > 0 && data.length > 0) {
            data = data.filter(el => {
                var aux = el['input-parameters']['boundary-conditions']
                var e = aux['k']
                var result = e.some(r => filters_param['boundary_conditions_k'].includes(r))
                return result

            })
        }
    }
    if(filter_params2){

   
        if (filter_params2['T_lag_avg']) {
            data = data.filter(el => {
                var e = []
                e.push(el['output-parameters']['T_lag_avg'])
                var result = e.some(r => (filter_params2['T_lag_avg'] >= r - 10) && (filter_params2['T_lag_avg'] <= r+ 10))
                return result

            })
        }
        if (filter_params2['T_eul_avg']) {
            data = data.filter(el => {
                var e = []
                e.push(el['output-parameters']['T_eul_avg'])
                var result = e.some(r => (filter_params2['T_eul_avg'] >= r - 10) && (filter_params2['T_eul_avg'] <= r+ 10))
                return result

            })
        }

   
        if (filter_params2['rho_lag_avg']) {
            data = data.filter(el => {
                var e = []
                e.push(el['output-parameters']['rho_lag_avg'])
                var result = e.some(r => (filter_params2['rho_lag_avg'] >= r - 10) && (filter_params2['rho_lag_avg'] <= r+10))
                return result

            })
        }
        if (filter_params2['rho_eul_avg']) {
            data = data.filter(el => {
                var e = []
                e.push(el['output-parameters']['rho_eul_avg'])
                var result = e.some(r => (filter_params2['rho_eul_avg'] >= r -0.0001 ) && (filter_params2['rho_eul_avg'] <= r+ 0.0001))
                return result

            })
        }
   
        if (filter_params2['d_lag_avg']) {
            data = data.filter(el => {
                var e = []
                e.push(el['output-parameters']['d_lag_avg'])
                var result = e.some(r => (filter_params2['d_lag_avg'] >= r - 0.00001) && (filter_params2['d_lag_avg'] <= r+ 0.00001))
                return result

            })
        }
        if (filter_params2['p_eul_avg']) {
            data = data.filter(el => {
                var e = []
                e.push(el['output-parameters']['p_eul_avg'])
                var result = e.some(r => (filter_params2['p_eul_avg'] >= r - 800) && (filter_params2['p_eul_avg'] <= r+ 800))
                return result

            })
        }

   
        if (filter_params2['Ygas_lag_avg']) {
            data = data.filter(el => {
                var e = []
                e.push(el['output-parameters']['Ygas_lag_avg'])
                var result = e.some(r => (filter_params2['Ygas_lag_avg'] >= r - 10) && (filter_params2['Ygas_lag_avg'] <= r+ 10))
                return result

            })
        }
        if (filter_params2['k_eul_avg']) {
            data = data.filter(el => {
                var e = []
                e.push(el['output-parameters']['k_eul_avg'])
                var result = e.some(r => (filter_params2['k_eul_avg'] >= r - 10) && (filter_params2['k_eul_avg'] <= r+ 10))
                return result

            })
        }




    }

        this.setState({ filtered_data: data })

    }












render() {
    return (
        <Container fluid style={{overflow:'hidden'}}>
            <Row xs={12}>
                <Col style={{ backgroundColor: '#31393f', height: '100vh', "padding": "0", }}>
                    <QueryPanel  inputFilters={this.handleInputFilters} outputFilters={this.handleOutputFilters} />
                </Col>
                <Col style={{ minWidth: "30%", backgroundColor: '#31393f', height: '100vh', "padding": "0", overflow: 'hidden' }}>
                    <ParametersPlot elements={this.state.filtered_data} />
                </Col>
                <Col xs={7} style={{ backgroundColor: '#31393f', 'markerEndmargin': '0'}}>
                    <Row  style={{height: '75vh' }}>
                        <Col xs={6}>
                            <VolumeRendering renderArea={'top'} />
                        </Col>
                        <Col xs={6}>
                            <VolumeRendering renderArea={'bottom'} />
                        </Col>
                    </Row>
                    <Clusters clusteringParams={this.state.clusteringParams} dataRegistry={this.state.filtered_data} clusterMembers={this.handleClusteringChange}/>                        
                </Col>
            </Row>
        </Container>
    )
}

}


export default ComponentsContainer;