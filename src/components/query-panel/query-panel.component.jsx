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
            boundary_conditions_T_bypassInlet: [],
            boundary_conditions_T_engine: [],
            boundary_conditions_T_farfield: [],
            boundary_conditions_T_inlet: [],
            boundary_conditions_T_nozzle: [],
            boundary_conditions_T_outlet: [],
            boundary_conditions_T_turbine: [],
            boundary_conditions_U_bypassInlet: [],
            boundary_conditions_U_engine: [],
            boundary_conditions_U_farfield: [],
            boundary_conditions_U_inlet: [],
            boundary_conditions_U_nozzle: [],
            boundary_conditions_U_outlet: [],
            boundary_conditions_U_turbine: [],
            boundary_conditions_p_bypassInlet: [],
            boundary_conditions_p_engine: [],
            boundary_conditions_p_farfield: [],
            boundary_conditions_p_inlet: [],
            boundary_conditions_p_nozzle: [],
            boundary_conditions_p_outlet: [],
            boundary_conditions_p_turbine: [],
            boundary_conditions_k_bypassInlet: [],
            boundary_conditions_k_engine: [],
            boundary_conditions_k_farfield: [],
            boundary_conditions_k_inlet: [],
            boundary_conditions_k_nozzle: [],
            boundary_conditions_k_outlet: [],
            boundary_conditions_k_turbine: [],
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
        this.changeSplitTendrils =this.changeSplitTendrils.bind(this)

    }

    changeSplitTendrils(params){
        this.props.split_tendrils(params)
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
            else {
                new_el.push(el)
            }
            this.setState({ aircraft_engine: new_el })
        }
        if (param.includes('geometry')) {
            var el = param.replace('geometry-', "")
            var new_el = this.state.geometry
            if (this.state.geometry.includes(el)) {
                var index = this.state.geometry.indexOf(el)
                new_el.splice(index, 1)
            }
            else {
                new_el.push(el)
            }
            this.setState({ geometry: new_el })
        }
        if (param.includes('scope')) {
            var el = param.replace('scope-', "")
            var new_el = this.state.scope
            if (this.state.scope.includes(el)) {
                var index = this.state.scope.indexOf(el)
                new_el.splice(index, 1)
            }
            else {
                new_el.push(el)
            }
            this.setState({ scope: new_el })
        }
        if (param.includes('grid')) {
            var el = param.replace('grid-', "")
            var new_el = this.state.grid
            if (this.state.grid.includes(el)) {
                var index = this.state.grid.indexOf(el)
                new_el.splice(index, 1)
            }
            else {
                new_el.push(el)
            }
            this.setState({ grid: new_el })
        }
        if (param.includes('solution')) {
            var el = param.replace('solution-', "")
            var new_el = this.state.solution
            if (this.state.solution.includes(el)) {
                var index = this.state.solution.indexOf(el)
                new_el.splice(index, 1)
            }
            else {
                new_el.push(el)
            }
            this.setState({ solution: new_el })
        }
        if (param.includes('turbulence')) {
            var el = param.replace('turbulence-', "")
            var new_el = this.state.turbulence
            if (this.state.turbulence.includes(el)) {
                var index = this.state.turbulence.indexOf(el)
                new_el.splice(index, 1)
            }
            else {
                new_el.push(el)
            }
            // console.log(new_el)
            this.setState({ turbulence: new_el })
        }
        if (param.includes('boundary')) {
            if (param.includes('boundary-T')) {
                if (param.includes('boundary-T-bypassInlet')) {
                    var el = param.replace('boundary-T-bypassInlet-', "")
                    var new_el = this.state.boundary_conditions_T_bypassInlet
                    if (this.state.boundary_conditions_T_bypassInlet.includes(el)) {
                        var index = this.state.boundary_conditions_T_bypassInlet.indexOf(el)
                        new_el.splice(index, 1)
                    }
                    else {
                        new_el.push(el)
                    }
                    this.setState({ boundary_conditions_T_bypassInlet: new_el })
                }
                if (param.includes('boundary-T-engine')) {
                    var el = param.replace('boundary-T-engine-', "")
                    var new_el = this.state.boundary_conditions_T_engine
                    if (this.state.boundary_conditions_T_engine.includes(el)) {
                        var index = this.state.boundary_conditions_T_engine.indexOf(el)
                        new_el.splice(index, 1)
                    }
                    else {
                        new_el.push(el)
                    }
                    this.setState({ boundary_conditions_T_engine: new_el })
                }
                if (param.includes('boundary-T-farfield')) {
                    var el = param.replace('boundary-T-farfield-', "")
                    var new_el = this.state.boundary_conditions_T_farfield
                    if (this.state.boundary_conditions_T_farfield.includes(el)) {
                        var index = this.state.boundary_conditions_T_farfield.indexOf(el)
                        new_el.splice(index, 1)
                    }
                    else {
                        new_el.push(el)
                    }
                    this.setState({ boundary_conditions_T_farfield: new_el })
                }
                if (param.includes('boundary-T-inlet')) {
                    var el = param.replace('boundary-T-inlet-', "")
                    var new_el = this.state.boundary_conditions_T_inlet
                    if (this.state.boundary_conditions_T_inlet.includes(el)) {
                        var index = this.state.boundary_conditions_T_inlet.indexOf(el)
                        new_el.splice(index, 1)
                    }
                    else {
                        new_el.push(el)
                    }
                    this.setState({ boundary_conditions_T_inlet: new_el })
                }
                if (param.includes('boundary-T-nozzle')) {
                    var el = param.replace('boundary-T-nozzle-', "")
                    var new_el = this.state.boundary_conditions_T_nozzle
                    if (this.state.boundary_conditions_T_nozzle.includes(el)) {
                        var index = this.state.boundary_conditions_T_nozzle.indexOf(el)
                        new_el.splice(index, 1)
                    }
                    else {
                        new_el.push(el)
                    }
                    this.setState({ boundary_conditions_T_nozzle: new_el })
                }
                if (param.includes('boundary-T-outlet')) {
                    var el = param.replace('boundary-T-outlet-', "")
                    var new_el = this.state.boundary_conditions_T_outlet
                    if (this.state.boundary_conditions_T_outlet.includes(el)) {
                        var index = this.state.boundary_conditions_T_outlet.indexOf(el)
                        new_el.splice(index, 1)
                    }
                    else {
                        new_el.push(el)
                    }
                    this.setState({ boundary_conditions_T_outlet: new_el })
                }
                if (param.includes('boundary-T-turbine')) {
                    var el = param.replace('boundary-T-turbine-', "")
                    var new_el = this.state.boundary_conditions_T_turbine
                    if (this.state.boundary_conditions_T_turbine.includes(el)) {
                        var index = this.state.boundary_conditions_T_turbine.indexOf(el)
                        new_el.splice(index, 1)
                    }
                    else {
                        new_el.push(el)
                    }
                    this.setState({ boundary_conditions_T_turbine: new_el })
                }
            }
            if (param.includes('boundary-U')) {
                if (param.includes('boundary-U-bypassInlet')) {
                    var el = param.replace('boundary-U-bypassInlet-', "")
                    var new_el = this.state.boundary_conditions_U_bypassInlet
                    if (this.state.boundary_conditions_U_bypassInlet.includes(el)) {
                        var index = this.state.boundary_conditions_U_bypassInlet.indexOf(el)
                        new_el.splice(index, 1)
                    }
                    else {
                        new_el.push(el)
                    }
                    this.setState({ boundary_conditions_U_bypassInlet: new_el })
                }
                if (param.includes('boundary-U-engine')) {
                    var el = param.replace('boundary-U-engine-', "")
                    var new_el = this.state.boundary_conditions_U_engine
                    if (this.state.boundary_conditions_U_engine.includes(el)) {
                        var index = this.state.boundary_conditions_U_engine.indexOf(el)
                        new_el.splice(index, 1)
                    }
                    else {
                        new_el.push(el)
                    }
                    this.setState({ boundary_conditions_U_engine: new_el })
                }
                if (param.includes('boundary-U-farfield')) {
                    var el = param.replace('boundary-U-farfield-', "")
                    var new_el = this.state.boundary_conditions_U_farfield
                    if (this.state.boundary_conditions_U_farfield.includes(el)) {
                        var index = this.state.boundary_conditions_U_farfield.indexOf(el)
                        new_el.splice(index, 1)
                    }
                    else {
                        new_el.push(el)
                    }
                    this.setState({ boundary_conditions_U_farfield: new_el })
                }
                if (param.includes('boundary-U-inlet')) {
                    var el = param.replace('boundary-U-inlet-', "")
                    var new_el = this.state.boundary_conditions_U_inlet
                    if (this.state.boundary_conditions_U_inlet.includes(el)) {
                        var index = this.state.boundary_conditions_U_inlet.indexOf(el)
                        new_el.splice(index, 1)
                    }
                    else {
                        new_el.push(el)
                    }
                    this.setState({ boundary_conditions_U_inlet: new_el })
                }
                if (param.includes('boundary-U-nozzle')) {
                    var el = param.replace('boundary-U-nozzle-', "")
                    var new_el = this.state.boundary_conditions_U_nozzle
                    if (this.state.boundary_conditions_U_nozzle.includes(el)) {
                        var index = this.state.boundary_conditions_U_nozzle.indexOf(el)
                        new_el.splice(index, 1)
                    }
                    else {
                        new_el.push(el)
                    }
                    this.setState({ boundary_conditions_U_nozzle: new_el })
                }
                if (param.includes('boundary-U-outlet')) {
                    var el = param.replace('boundary-U-outlet-', "")
                    var new_el = this.state.boundary_conditions_U_outlet
                    if (this.state.boundary_conditions_U_outlet.includes(el)) {
                        var index = this.state.boundary_conditions_U_outlet.indexOf(el)
                        new_el.splice(index, 1)
                    }
                    else {
                        new_el.push(el)
                    }
                    this.setState({ boundary_conditions_U_outlet: new_el })
                }
                if (param.includes('boundary-U-turbine')) {
                    var el = param.replace('boundary-U-turbine-', "")
                    var new_el = this.state.boundary_conditions_U_turbine
                    if (this.state.boundary_conditions_U_turbine.includes(el)) {
                        var index = this.state.boundary_conditions_U_turbine.indexOf(el)
                        new_el.splice(index, 1)
                    }
                    else {
                        new_el.push(el)
                    }
                    this.setState({ boundary_conditions_U_turbine: new_el })
                }
            }
            if (param.includes('boundary-p')) {
                if (param.includes('boundary-p-bypassInlet')) {
                    var el = param.replace('boundary-p-bypassInlet-', "")
                    var new_el = this.state.boundary_conditions_p_bypassInlet
                    if (this.state.boundary_conditions_p_bypassInlet.includes(el)) {
                        var index = this.state.boundary_conditions_p_bypassInlet.indexOf(el)
                        new_el.splice(index, 1)
                    }
                    else {
                        new_el.push(el)
                    }
                    this.setState({ boundary_conditions_p_bypassInlet: new_el })
                }
                if (param.includes('boundary-p-engine')) {
                    var el = param.replace('boundary-p-engine-', "")
                    var new_el = this.state.boundary_conditions_p_engine
                    if (this.state.boundary_conditions_p_engine.includes(el)) {
                        var index = this.state.boundary_conditions_p_engine.indexOf(el)
                        new_el.splice(index, 1)
                    }
                    else {
                        new_el.push(el)
                    }
                    this.setState({ boundary_conditions_p_engine: new_el })
                }
                if (param.includes('boundary-p-farfield')) {
                    var el = param.replace('boundary-p-farfield-', "")
                    var new_el = this.state.boundary_conditions_p_farfield
                    if (this.state.boundary_conditions_p_farfield.includes(el)) {
                        var index = this.state.boundary_conditions_p_farfield.indexOf(el)
                        new_el.splice(index, 1)
                    }
                    else {
                        new_el.push(el)
                    }
                    this.setState({ boundary_conditions_p_farfield: new_el })
                }
                if (param.includes('boundary-p-inlet')) {
                    var el = param.replace('boundary-p-inlet-', "")
                    var new_el = this.state.boundary_conditions_p_inlet
                    if (this.state.boundary_conditions_p_inlet.includes(el)) {
                        var index = this.state.boundary_conditions_p_inlet.indexOf(el)
                        new_el.splice(index, 1)
                    }
                    else {
                        new_el.push(el)
                    }
                    this.setState({ boundary_conditions_p_inlet: new_el })
                }
                if (param.includes('boundary-p-nozzle')) {
                    var el = param.replace('boundary-p-nozzle-', "")
                    var new_el = this.state.boundary_conditions_p_nozzle
                    if (this.state.boundary_conditions_p_nozzle.includes(el)) {
                        var index = this.state.boundary_conditions_p_nozzle.indexOf(el)
                        new_el.splice(index, 1)
                    }
                    else {
                        new_el.push(el)
                    }
                    this.setState({ boundary_conditions_p_nozzle: new_el })
                }
                if (param.includes('boundary-p-outlet')) {
                    var el = param.replace('boundary-p-outlet-', "")
                    var new_el = this.state.boundary_conditions_p_outlet
                    if (this.state.boundary_conditions_p_outlet.includes(el)) {
                        var index = this.state.boundary_conditions_p_outlet.indexOf(el)
                        new_el.splice(index, 1)
                    }
                    else {
                        new_el.push(el)
                    }
                    this.setState({ boundary_conditions_p_outlet: new_el })
                }
                if (param.includes('boundary-p-turbine')) {
                    var el = param.replace('boundary-p-turbine-', "")
                    var new_el = this.state.boundary_conditions_p_turbine
                    if (this.state.boundary_conditions_p_turbine.includes(el)) {
                        var index = this.state.boundary_conditions_p_turbine.indexOf(el)
                        new_el.splice(index, 1)
                    }
                    else {
                        new_el.push(el)
                    }
                    this.setState({ boundary_conditions_p_turbine: new_el })
                }
            }
            if (param.includes('boundary-k')) {
                if (param.includes('boundary-k-bypassInlet')) {
                    var el = param.replace('boundary-k-bypassInlet-', "")
                    var new_el = this.state.boundary_conditions_k_bypassInlet
                    if (this.state.boundary_conditions_k_bypassInlet.includes(el)) {
                        var index = this.state.boundary_conditions_k_bypassInlet.indexOf(el)
                        new_el.splice(index, 1)
                    }
                    else {
                        new_el.push(el)
                    }
                    this.setState({ boundary_conditions_k_bypassInlet: new_el })
                }
                if (param.includes('boundary-k-engine')) {
                    var el = param.replace('boundary-k-engine-', "")
                    var new_el = this.state.boundary_conditions_k_engine
                    if (this.state.boundary_conditions_k_engine.includes(el)) {
                        var index = this.state.boundary_conditions_k_engine.indexOf(el)
                        new_el.splice(index, 1)
                    }
                    else {
                        new_el.push(el)
                    }
                    this.setState({ boundary_conditions_k_engine: new_el })
                }
                if (param.includes('boundary-k-farfield')) {
                    var el = param.replace('boundary-k-farfield-', "")
                    var new_el = this.state.boundary_conditions_k_farfield
                    if (this.state.boundary_conditions_k_farfield.includes(el)) {
                        var index = this.state.boundary_conditions_k_farfield.indexOf(el)
                        new_el.splice(index, 1)
                    }
                    else {
                        new_el.push(el)
                    }
                    this.setState({ boundary_conditions_k_farfield: new_el })
                }
                if (param.includes('boundary-k-inlet')) {
                    var el = param.replace('boundary-k-inlet-', "")
                    var new_el = this.state.boundary_conditions_k_inlet
                    if (this.state.boundary_conditions_k_inlet.includes(el)) {
                        var index = this.state.boundary_conditions_k_inlet.indexOf(el)
                        new_el.splice(index, 1)
                    }
                    else {
                        new_el.push(el)
                    }
                    this.setState({ boundary_conditions_k_inlet: new_el })
                }
                if (param.includes('boundary-k-nozzle')) {
                    var el = param.replace('boundary-k-nozzle-', "")
                    var new_el = this.state.boundary_conditions_k_nozzle
                    if (this.state.boundary_conditions_k_nozzle.includes(el)) {
                        var index = this.state.boundary_conditions_k_nozzle.indexOf(el)
                        new_el.splice(index, 1)
                    }
                    else {
                        new_el.push(el)
                    }
                    this.setState({ boundary_conditions_k_nozzle: new_el })
                }
                if (param.includes('boundary-k-outlet')) {
                    var el = param.replace('boundary-k-outlet-', "")
                    var new_el = this.state.boundary_conditions_k_outlet
                    if (this.state.boundary_conditions_k_outlet.includes(el)) {
                        var index = this.state.boundary_conditions_k_outlet.indexOf(el)
                        new_el.splice(index, 1)
                    }
                    else {
                        new_el.push(el)
                    }
                    this.setState({ boundary_conditions_k_outlet: new_el })
                }
                if (param.includes('boundary-k-turbine')) {
                    var el = param.replace('boundary-k-turbine-', "")
                    var new_el = this.state.boundary_conditions_k_turbine
                    if (this.state.boundary_conditions_k_turbine.includes(el)) {
                        var index = this.state.boundary_conditions_k_turbine.indexOf(el)
                        new_el.splice(index, 1)
                    }
                    else {
                        new_el.push(el)
                    }
                    this.setState({ boundary_conditions_k_turbine: new_el })
                }
            }
            

        }
        this.props.inputFilters({
            'aircraft_engine': this.state.aircraft_engine,
            'geometry': this.state.geometry, 'scope': this.state.scope, 'grid': this.state.grid,
            'solution': this.state.solution, 'turbulence': this.state.turbulence,
            'boundary-T-farfield': this.state.boundary_conditions_T_farfield,
            'boundary-T-engine': this.state.boundary_conditions_T_engine,
            'boundary-T-inlet': this.state.boundary_conditions_T_inlet,
            'boundary-T-nozzle': this.state.boundary_conditions_T_nozzle,
            'boundary-T-outlet': this.state.boundary_conditions_T_outlet,
            'boundary-T-turbine': this.state.boundary_conditions_T_turbine,
            'boundary-T-bypassInlet': this.state.boundary_conditions_T_bypassInlet,
            'boundary-U-farfield': this.state.boundary_conditions_U_farfield,
            'boundary-U-engine': this.state.boundary_conditions_U_engine,
            'boundary-U-inlet': this.state.boundary_conditions_U_inlet,
            'boundary-U-nozzle': this.state.boundary_conditions_U_nozzle,
            'boundary-U-outlet': this.state.boundary_conditions_U_outlet,
            'boundary-U-turbine': this.state.boundary_conditions_U_turbine,
            'boundary-U-bypassInlet': this.state.boundary_conditions_U_bypassInlet,
            'boundary-p-farfield': this.state.boundary_conditions_p_farfield,
            'boundary-p-engine': this.state.boundary_conditions_p_engine,
            'boundary-p-inlet': this.state.boundary_conditions_p_inlet,
            'boundary-p-nozzle': this.state.boundary_conditions_p_nozzle,
            'boundary-p-outlet': this.state.boundary_conditions_p_outlet,
            'boundary-p-turbine': this.state.boundary_conditions_p_turbine,
            'boundary-p-bypassInlet': this.state.boundary_conditions_p_bypassInlet,
            'boundary-k-farfield': this.state.boundary_conditions_k_farfield,
            'boundary-k-engine': this.state.boundary_conditions_k_engine,
            'boundary-k-inlet': this.state.boundary_conditions_k_inlet,
            'boundary-k-nozzle': this.state.boundary_conditions_k_nozzle,
            'boundary-k-outlet': this.state.boundary_conditions_k_outlet,
            'boundary-k-turbine': this.state.boundary_conditions_k_turbine,
            'boundary-k-bypassInlet': this.state.boundary_conditions_k_bypassInlet,

        })

    }

    handleOutputChange(param) {
        var el = param[0]
        var val = param[1]
        if (!param[1] || isNaN(param[1])) {
            if (el == "T_lag_avg")
                this.setState({ T_lag_avg: null }, () => { this.changeOutputFilters() })
            if (el == "T_eul_avg")
                this.setState({ T_eul_avg: null }, () => { this.changeOutputFilters() })
            if (el == "d_lag_avg")
                this.setState({ d_lag_avg: null }, () => { this.changeOutputFilters() })
            if (el == "k_eul_avg")
                this.setState({ k_eul_avg: null }, () => { this.changeOutputFilters() })
            if (el == "rho_eul_avg")
                this.setState({ rho_eul_avg: null }, () => { this.changeOutputFilters() })
            if (el == "rho_lag_avg")
                this.setState({ rho_lag_avg: null }, () => { this.changeOutputFilters() })
            if (el == "p_eul_avg")
                this.setState({ p_eul_avg: null }, () => { this.changeOutputFilters() })
            if (el == "Ygas_lag_avg")
                this.setState({ Ygas_lag_avg: null }, () => { this.changeOutputFilters() })
        }
        else {
            if (el == "T_lag_avg")
                this.setState({ T_lag_avg: val }, () => { this.changeOutputFilters() })
            if (el == "T_eul_avg")
                this.setState({ T_eul_avg: val }, () => { this.changeOutputFilters() })
            if (el == "d_lag_avg")
                this.setState({ d_lag_avg: val }, () => { this.changeOutputFilters() })
            if (el == "d_eul_avg")
                this.setState({ k_eul_avg: val }, () => { this.changeOutputFilters() })
            if (el == "rho_eul_avg")
                this.setState({ rho_eul_avg: val }, () => { this.changeOutputFilters() })
            if (el == "rho_lag_avg")
                this.setState({ rho_lag_avg: val }, () => { this.changeOutputFilters() })
            if (el == "p_eul_avg")
                this.setState({ p_eul_avg: val }, () => { this.changeOutputFilters() })
            if (el == "Ygas_lag_avg")
                this.setState({ Ygas_lag_avg: val }, () => { this.changeOutputFilters() })
        }



    }

    changeOutputFilters() {
        this.props.outputFilters({
            'T_lag_avg': this.state.T_lag_avg, 'T_eul_avg': this.state.T_eul_avg,
            'rho_lag_avg': this.state.rho_lag_avg, 'rho_eul_avg': this.state.rho_eul_avg,
            'd_lag_avg': this.state.d_lag_avg, 'Ygas_lag_avg': this.state.Ygas_lag_avg,
            'p_eul_avg': this.state.p_eul_avg, 'k_eul_avg': this.state.k_eul_avg
        })

    }

    render() {
        return (
            // <div>Query panel and val is {this.state.currentVal}</div>
            <Container style={{}}>
                <Row style={{ "height": '23vh', 'borderStyle': 'solid', 'borderWidth': '.5px', 'borderColor': '#05ecec', overflowY: "auto" }} >
                    <OutputParametersPanel onOutputSelectChange={this.handleOutputChange} onSplitTendrilsChange={this.changeSplitTendrils} />
                </Row>
                <Row style={{ "height": '69vh', 'borderStyle': 'solid', 'borderWidth': '.5px', 'borderColor': '#05ecec', overflowY: "auto" }} className="input-parameters-container">
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