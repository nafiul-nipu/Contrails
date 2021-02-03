import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
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
            <div >
                <h5>Clustering Parameters</h5>
                <div style={{"color":"#BEBEBE", "margin-top": "10px"}}>Simulation Runs:</div>
                <Form style={{textAlign: 'left', 'margin-left': "20px"}}>
                <Form.Check type="checkbox" label="solution" />
                </Form>
                <div style={{"color":"#BEBEBE", "margin-top": "10px"}}>Lagrangian Attr:</div>
                <Form style={{textAlign: 'left', 'margin-left': "20px"}}>
                <Form.Check type="checkbox" label="T" />
                <Form.Check type="checkbox" label="U" />
                <Form.Check type="checkbox" label="rho" />
                <Form.Check type="checkbox" label="d" />
                <Form.Check type="checkbox" label="Ygas" />
                </Form>
            </div>

        )
    }
}

export default ClusteringParametersPanel;