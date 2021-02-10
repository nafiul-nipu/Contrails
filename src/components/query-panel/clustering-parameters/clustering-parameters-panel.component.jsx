import React from 'react';
import Form from 'react-bootstrap/Form'

import '../query-panel.styles.css';

class ClusteringParametersPanel extends React.Component {
    constructor(){
        super();
        this.state = {
            currentVal: 0,
            value:[4,5]
        }
    
    }
    
    componentDidMount(){
        //fetch('/backendscript', {method:"POST", mode: 'cors', cache:"no-cache", headers:{"content_type":"application/json"},body:JSON.stringify(this.state.value)}).then(res => res.json()).then(data => this.setState({currentVal:data.val}))
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
                <Form.Check type="checkbox" label="T" id="cluster-T"/>
                <Form.Check type="checkbox" label="U"  id="cluster-U"/>
                <Form.Check type="checkbox" label="rho"  id="cluster-rho"/>
                <Form.Check type="checkbox" label="d"  id="cluster-d"/>
                <Form.Check type="checkbox" label="Ygas"  id="cluster-Ygas"/>
                </Form>
                </div>
            </div>

        )
    }
}

export default ClusteringParametersPanel;