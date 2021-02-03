import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import InputParametersPanel from './input-parameters/input-parameters-panel.component';
import OutputParametersPanel from './output-parameters/output-parameters-panel.component';
import ClusteringParametersPanel from './clustering-parameters/clustering-parameters-panel.component';

import './query-panel.styles.css';

class QueryPanel extends React.Component {
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
            <Container style={{}}>
                <Row style={{"height": '25vh', 'borderStyle':'solid', 'borderWidth': '.5px', 'borderColor':'#d5ff80'}}>
                    <OutputParametersPanel/>
                </Row>
                <Row  style={{"height": '50vh','borderStyle':'solid', 'borderWidth': '.5px', 'borderColor':'#d5ff80',}}>
                    <InputParametersPanel/>
                </Row>
                <Row  style={{"height": '25vh', 'borderStyle':'solid', 'borderWidth': '.5px', 'borderColor':'#d5ff80'}}>
                    <ClusteringParametersPanel/>
                </Row>
            </Container>

        )
    }
}

export default QueryPanel;