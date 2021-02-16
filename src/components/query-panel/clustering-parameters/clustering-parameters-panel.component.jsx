import React from 'react';
import Form from 'react-bootstrap/Form'

import '../query-panel.styles.css';

class ClusteringParametersPanel extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        }
    this.handleFilterChange = this.handleFilterChange.bind(this)
    }

    handleFilterChange(param){
        var new_param = param.target.id.toString()
     
        // this.props.handleClusteringChange(new_param)
        this.props.onClusteringSelectChange(new_param)

    }
    
    componentDidMount(){
    }

    render(){
        return(
            // <div>Query panel and val is {this.state.currentVal}</div>
            <div className="mx-auto">
                <h6>Clustering Parameters</h6>
                <div style={{textAlign: 'left'}}>
                <div style={{"color":"#BEBEBE", marginTop: "5%"}}>Simulation Runs:</div>
                <Form style={{textAlign: 'left'}}>
                <Form.Check type="checkbox" label="solution" />
                </Form>
                <div style={{"color":"#BEBEBE", marginTop: "5%"}}>Lagrangian Attr:</div>
                <Form style={{textAlign: 'left'}}>
                <Form.Check type="checkbox" label="T" id="T_lag_avg" onChange= {this.handleFilterChange}/>
                <Form.Check type="checkbox" label="U"  id="U_lag_avg" />
                <Form.Check type="checkbox" label="rho"  id="rho_lag_avg" onChange= {this.handleFilterChange}/>
                <Form.Check type="checkbox" label="d"  id="d_lag_avg" onChange= {this.handleFilterChange}/>
                <Form.Check type="checkbox" label="Ygas"  id="Ygas_lag_avg" onChange= {this.handleFilterChange}/>
                </Form>
                </div>
            </div>

        )
    }
}

export default ClusteringParametersPanel;