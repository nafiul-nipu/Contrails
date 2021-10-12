import React from 'react';
import ClustersD3 from './clusters-d3.component';
import ClusteringParametersPanel from '../query-panel/clustering-parameters/clustering-parameters-panel.component';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import {post} from 'axios'

const clusterData = `https://raw.githubusercontent.com/CarlaFloricel/Contrails/master/src/data/test_cluster.csv`
class Clusters extends React.Component {
    constructor(props) {
        super(props);
        this.chart_cluster = React.createRef()
        this.state = {
            clusterFilters: [],
            T_lag_cluster: false,
            rho_lag_cluster: false,
            d_lag_cluster: false,
            dataRegistry: this.props.dataRegistry,
            all_data:null,
            clusteringParams: this.props.clusteringParams,
            

        }
        this.handleClusteringChange = this.handleClusteringChange.bind(this)
    }

    handleChange(event) {
        this.setState({ paramType: event.target.value });
    }


    async componentDidMount() {

        var send_data = [this.state.dataRegistry, this.state.clusteringParams]
        console.log(send_data)

        post(
            '/backendscript',
            {send_data}
          ).then((response) => {
            console.log("connection created")
            console.log(response.data)
              setPrediction(response.data)
          }).catch((error) => {
            console.log(error)
          });

        const data_for_child = await fetch('/backendscript', { method: "POST", mode: 'cors', cache: "no-cache", headers: { "content_type": "application/json" }, body: JSON.stringify(send_data) }).then(res => res.json()).then(data => {
            return data.PCAdata
        })
        if (data_for_child) {
            // console.log("I am rendering")
            new ClustersD3(this.chart_cluster.current, [], data_for_child)
            
        }
        this.setState({ clusteringParams: this.props.clusteringParams })
        this.setState({ dataRegistry: this.props.dataRegistry })
        this.setState({all_data:data_for_child})

    }



    async componentDidUpdate(prevProps) {
        if (this.state.clusteringParams != this.props.clusteringParams) {
            this.setState({ clusteringParams: this.props.clusteringParams })
        }
        if (this.state.clusteringParams == this.props.clusteringParams)
            var send_data = [this.state.all_data, this.props.clusteringParams]
            console.log(send_data)
        const data_for_child = await fetch('/backendscript', { method: "POST", mode: 'cors', cache: "no-cache", headers: { "content_type": "application/json" }, body: JSON.stringify(send_data) }).then(res => res.json()).then(data => {

            return data.PCAdata
        })
        if (data_for_child) {
            const ids = this.props.dataRegistry.map(d => d['id'])
            // console.log("I am also here")
            new ClustersD3(this.chart_cluster.current, ids, data_for_child)
            // this.setState({all_data: data_for_child})
        }
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


    render() {
        return (

            <Row style={{height:'25vh'}}>
                <Col xs={9} ref={this.chart_cluster}></Col>
                <Col>
                <ClusteringParametersPanel  onClusteringSelectChange={this.handleClusteringChange} />                 
                </Col>
            </Row>
            

        )
    }
}

export default Clusters;