import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form'

class OutputParametersPanel extends React.Component {
    constructor(){
        super();
        this.state = {
            currentVal: 0,
            value:[4,5],
            paramType: 'lagrangian'
        }
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(event) {
        this.setState({paramType: event.target.value});
      }


    componentDidMount(){
        //fetch('/backendscript', {method:"POST", mode: 'cors', cache:"no-cache", headers:{"content_type":"application/json"},body:JSON.stringify(this.state.value)}).then(res => res.json()).then(data => this.setState({currentVal:data.val}))
    }

    render(){
        return(
            // <div>Query panel and val is {this.state.currentVal}</div>
            <div >
            <h5>Output Parameters</h5>
            <Form style={{"padding": "10px"}} onChange = {this.handleChange}>
                <Form.Control as="select" >
                <option value ="lagrangian">Lagrangian</option>
                <option value = "eulerian">Eulerian</option>
                </Form.Control>
            </Form>
            {this.state.paramType == 'lagrangian' ?
                <Form style={{textAlign: 'left', marginLeft: "20px"}}>
                    <Form.Check type="checkbox" label="T" />
                    <Form.Check type="checkbox" label="rho" />
                    <Form.Check type="checkbox" label="d" />
                    <Form.Check type="checkbox" label="Ygas" />
                </Form>
                : 
                <Form style={{textAlign: 'left', marginLeft: "20px"}}>
                    <Form.Check type="checkbox" label="T" />
                    <Form.Check type="checkbox" label="rho" />
                    <Form.Check type="checkbox" label="p" />
                    <Form.Check type="checkbox" label="k" />
                </Form>
            }

        </div>

        )
    }
}

export default OutputParametersPanel;