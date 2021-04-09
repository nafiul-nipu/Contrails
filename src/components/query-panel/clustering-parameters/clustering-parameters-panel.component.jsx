import React from 'react';
import Form from 'react-bootstrap/Form'

import '../query-panel.styles.css';
import Col from 'react-bootstrap/Col'

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
            <Col  style={{ borderStyle: "solid", borderWidth: "0.5px", borderColor: "rgb(5, 236, 236)", marginLeft:"200px"}}>
                <h6 style={{marginTop:"0", marginBottom:"0"}}>Clustering Parameters</h6>
                <div >
                    <div style={{"color":"#BEBEBE"}}>Simulation Runs:</div>
                    <Form style={{textAlign: 'left', marginLeft:"37%"}}>
                    <Form.Check type="checkbox" label="solution" />
                    </Form>
                    <div style={{"color":"#BEBEBE"}}>Lagrangian Attr:</div>
                    <Form style={{textAlign: 'left', marginLeft:"37%"}}>
                    <Form.Check type="checkbox" label="T" id="T_lag_avg" onChange= {this.handleFilterChange}/>
                    <Form.Check type="checkbox" label="U"  id="U_lag_avg" />
                    <Form.Check type="checkbox" label="rho"  id="rho_lag_avg" onChange= {this.handleFilterChange}/>
                    <Form.Check type="checkbox" label="d"  id="d_lag_avg" onChange= {this.handleFilterChange}/>
                    <Form.Check type="checkbox" label="Ygas"  id="Ygas_lag_avg" onChange= {this.handleFilterChange}/>
                    </Form>
                </div>
            </Col>

        )
    }
}

export default ClusteringParametersPanel;