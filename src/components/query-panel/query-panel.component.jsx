import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import InputParametersPanel from './input-parameters/input-parameters-panel.component';
import OutputParametersPanel from './output-parameters/output-parameters-panel.component';
import ClusteringParametersPanel from './clustering-parameters/clustering-parameters-panel.component';

import './query-panel.styles.css';

class QueryPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clusterFilters: [],
            T_lag_cluster: false,
            rho_lag_cluster: false,
            d_lag_cluster: false,
            // Ygas_lag_cluster: false,
            aircraft_engine: [],
            geometry: [],
            scope: [],
            grid: [],
            solution: [],
            turbulence: [],
            boundary_conditions_T: [],
            boundary_conditions_U: [],
            boundary_conditions_P: [],
            boundary_conditions_k: [],
            boundary_conditions_rho: [],
            T_lag_avg: null,
            T_eul_avg: null,
            rho_lag_avg: null,
            rho_eul_avg: null,
            d_lag_avg: null,
            Ygas_lag_avg: null,
            k_eul_avg: null,
            p_eul_avg: null
        }

        this.handleClusteringChange = this.handleClusteringChange.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleOutputChange = this.handleOutputChange.bind(this)
        this.changeOutputFilters = this.changeOutputFilters.bind(this)

    }


    handleClusteringChange(params) {
        if (params == 'T_lag_avg') {
            this.setState({ T_lag_cluster: !this.state.T_lag_cluster }, () => {
                var clusteringList = this.state.clusterFilters
                if (this.state.T_lag_cluster == true) {
                    clusteringList.push('T_lag_avg')
                }
                else {
                    var index = clusteringList.indexOf('T_lag_avg')
                    clusteringList.splice(index, 1)
                }
                this.setState({ clusterFilters: clusteringList })
            })
        }
        if (params == 'rho_lag_avg') {
            this.setState({ rho_lag_cluster: !this.state.rho_lag_cluster }, () => {
                var clusteringList = this.state.clusterFilters
                if (this.state.rho_lag_cluster == true) {
                    clusteringList.push('rho_lag_avg')
                }
                else {
                    var index = clusteringList.indexOf('rho_lag_avg')
                    clusteringList.splice(index, 1)
                }
                this.setState({ clusterFilters: clusteringList })
            })
        }
        if (params == 'd_lag_avg') {
            this.setState({ d_lag_cluster: !this.state.d_lag_cluster }, () => {
                var clusteringList = this.state.clusterFilters
                if (this.state.d_lag_cluster == true) {
                    clusteringList.push('d_lag_avg')
                }
                else {
                    var index = clusteringList.indexOf('d_lag_avg')
                    clusteringList.splice(index, 1)
                }
                this.setState({ clusterFilters: clusteringList })
            })
        }
        // if (params == 'Ygas_lag_avg') {
        //     this.setState({ Ygas_lag_cluster: !this.state.Ygas_lag_cluster }, () => {
        //         var clusteringList = this.state.clusterFilters
        //         if (this.state.Ygas_lag_cluster == true) {
        //             clusteringList.push('Ygas_lag_avg')
        //         }
        //         else {
        //             var index = clusteringList.indexOf('Ygas_lag_avg')
        //             clusteringList.splice(index, 1)
        //         }
        //         this.setState({ clusterFilters: clusteringList })
        //     })
        // }

        this.props.clusterMembers(this.state.clusterFilters)
    }


    handleInputChange(param) {

        if (param.includes('aircraft-engine')) {
           var el = param.replace('aircraft-engine-', "")
           var new_el = this.state.aircraft_engine
           if (this.state.aircraft_engine.includes(el)) {
               var index = this.state.aircraft_engine.indexOf(el)
               new_el.splice(index, 1)
           }
           else{
            new_el.push(el)
           }
           this.setState({aircraft_engine: new_el})
        }
        if (param.includes('geometry')) {
            var el = param.replace('geometry-', "")
            var new_el = this.state.geometry
            if (this.state.geometry.includes(el)) {
                var index = this.state.geometry.indexOf(el)
                new_el.splice(index, 1)
            }
            else{
             new_el.push(el)
            }
            this.setState({geometry: new_el})
        }
        if (param.includes('scope')) {
            var el = param.replace('scope-', "")
            var new_el = this.state.scope
            if (this.state.scope.includes(el)) {
                var index = this.state.scope.indexOf(el)
                new_el.splice(index, 1)
            }
            else{
             new_el.push(el)
            }
            this.setState({scope: new_el})
        }
        if (param.includes('grid')) {
            var el = param.replace('grid-', "")
            var new_el = this.state.grid
            if (this.state.grid.includes(el)) {
                var index = this.state.grid.indexOf(el)
                new_el.splice(index, 1)
            }
            else{
             new_el.push(el)
            }
            this.setState({grid: new_el})
        }
        if (param.includes('solution')) {
            var el = param.replace('solution-', "")
            var new_el = this.state.solution
            if (this.state.solution.includes(el)) {
                var index = this.state.solution.indexOf(el)
                new_el.splice(index, 1)
            }
            else{
             new_el.push(el)
            }
            this.setState({solution: new_el})
        }
        if (param.includes('turbulence')) {
            var el = param.replace('turbulence-', "")
            var new_el = this.state.turbulence
            if (this.state.turbulence.includes(el)) {
                var index = this.state.turbulence.indexOf(el)
                new_el.splice(index, 1)
            }
            else{
             new_el.push(el)
            }
            this.setState({turbulence: new_el})
        }
        if (param.includes('boundary')) {
            if(param.includes('T')){
                var el = param.replace('boundary-T-', "")
                var new_el = this.state.boundary_conditions_T
                if (this.state.boundary_conditions_T.includes(el)) {
                    var index = this.state.boundary_conditions_T.indexOf(el)
                    new_el.splice(index, 1)
                }
                else{
                 new_el.push(el)
                }
                this.setState({boundary_conditions_T: new_el})
            }
            if(param.includes('-P-')){
                
                var el = param.replace('boundary-P-', "")
                var new_el = this.state.boundary_conditions_P
                if (this.state.boundary_conditions_P.includes(el)) {
                    var index = this.state.boundary_conditions_P.indexOf(el)
                    new_el.splice(index, 1)
                }
                else{
                 new_el.push(el)
                }
                this.setState({boundary_conditions_P: new_el})
            }
            if(param.includes('-k-')){
                var el = param.replace('boundary-k-', "")
                var new_el = this.state.boundary_conditions_k
                if (this.state.boundary_conditions_k.includes(el)) {
                    var index = this.state.boundary_conditions_k.indexOf(el)
                    new_el.splice(index, 1)
                }
                else{
                 new_el.push(el)
                }
                this.setState({boundary_conditions_k: new_el})
            }
            if(param.includes('U')){
                var el = param.replace('boundary-U-', "")
                var new_el = this.state.boundary_conditions_U
                if (this.state.boundary_conditions_U.includes(el)) {
                    var index = this.state.boundary_conditions_U.indexOf(el)
                    new_el.splice(index, 1)
                }
                else{
                 new_el.push(el)
                }
                this.setState({boundary_conditions_U: new_el})
            }
            if(param.includes('rho')){
                var el = param.replace('boundary-rho-', "")
                var new_el = this.state.boundary_conditions_rho
                if (this.state.boundary_conditions_rho.includes(el)) {
                    var index = this.state.boundary_conditions_rho.indexOf(el)
                    new_el.splice(index, 1)
                }
                else{
                 new_el.push(el)
                }
                this.setState({boundary_conditions_rho: new_el})
            }
            
        }
        this.props.inputFilters({'aircraft_engine':this.state.aircraft_engine,
             'geometry': this.state.geometry, 'scope': this.state.scope, 'grid': this.state.grid, 
             'solution': this.state.solution, 'turbulence': this.state.turbulence,
             'boundary_conditions_T': this.state.boundary_conditions_T, 'boundary_conditions_U':this.state.boundary_conditions_U,
             'boundary_conditions_P': this.state.boundary_conditions_P,
             'boundary_conditions_k': this.state.boundary_conditions_k, 
             'boundary_conditions_rho':this.state.boundary_conditions_rho})
  
    }

    handleOutputChange(param){
       var  el = param[0]
       var val = param[1]
        if(!param[1] || isNaN(param[1])){
            if(el == "T_lag_avg")
                this.setState({T_lag_avg: null}, () => {this.changeOutputFilters()})
            if(el == "T_eul_avg")
                this.setState({T_eul_avg: null}, () => {this.changeOutputFilters()})
            if(el == "d_lag_avg")
                this.setState({d_lag_avg: null}, () => {this.changeOutputFilters()})
            if(el == "k_eul_avg")
                this.setState({k_eul_avg: null}, () => {this.changeOutputFilters()})
            if(el == "rho_eul_avg")
                this.setState({rho_eul_avg: null}, () => {this.changeOutputFilters()})
            if(el == "rho_lag_avg")
                this.setState({rho_lag_avg: null}, () => {this.changeOutputFilters()})
            if(el == "p_eul_avg")
                this.setState({p_eul_avg: null}, () => {this.changeOutputFilters()})
            if(el == "Ygas_lag_avg")
                this.setState({Ygas_lag_avg: null}, () => {this.changeOutputFilters()}) 
        }
        else{
            if (el == "T_lag_avg")
                this.setState({ T_lag_avg: val }, () => {this.changeOutputFilters()})
            if (el == "T_eul_avg")
                this.setState({ T_eul_avg:val }, () => {this.changeOutputFilters()})
            if (el == "d_lag_avg")
                this.setState({ d_lag_avg: val }, () => {this.changeOutputFilters()})
            if (el == "d_eul_avg")
                this.setState({ k_eul_avg: val}, () => {this.changeOutputFilters()})
            if (el == "rho_eul_avg")
                this.setState({ rho_eul_avg: val}, () => {this.changeOutputFilters()})
            if (el == "rho_lag_avg")
                this.setState({ rho_lag_avg: val}, () => {this.changeOutputFilters()})
            if (el == "p_eul_avg")
                this.setState({ p_eul_avg: val}, () => {this.changeOutputFilters()})
            if (el == "Ygas_lag_avg")
                this.setState({ Ygas_lag_avg: val}, () => {this.changeOutputFilters()}) 
        }

        
        
    }

    changeOutputFilters(){
        this.props.outputFilters({'T_lag_avg': this.state.T_lag_avg, 'T_eul_avg': this.state.T_eul_avg,
        'rho_lag_avg': this.state.rho_lag_avg, 'rho_eul_avg': this.state.rho_eul_avg,
        'd_lag_avg': this.state.d_lag_avg, 'Ygas_lag_avg': this.state.Ygas_lag_avg,
        'p_eul_avg': this.state.p_eul_avg, 'k_eul_avg': this.state.k_eul_avg})

    }

    render() {
        return (
            // <div>Query panel and val is {this.state.currentVal}</div>
            <Container style={{}}>
                <Row style={{ "height": '20vh', 'borderStyle': 'solid', 'borderWidth': '.5px', 'borderColor': '#05ecec', overflowY: "auto" }} >
                    <OutputParametersPanel onOutputSelectChange ={this.handleOutputChange}/>
                </Row>
                <Row style={{ "height": '80vh', 'borderStyle': 'solid', 'borderWidth': '.5px', 'borderColor': '#05ecec', overflowY: "auto"  }} className="input-parameters-container">
                    <InputParametersPanel onInputSelectChange={this.handleInputChange} />
                </Row>
                {/* <Row style={{ "height": '25vh', 'borderStyle': 'solid', 'borderWidth': '.5px', 'borderColor': '#05ecec', overflowY: "auto" }}>
                    <ClusteringParametersPanel onClusteringSelectChange={this.handleClusteringChange} />
                </Row> */}
            </Container>

        )
    }
}

export default QueryPanel;