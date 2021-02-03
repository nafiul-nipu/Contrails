import React from 'react';
import Form from 'react-bootstrap/Form'

class InputParametersPanel extends React.Component {
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
            <div style={{padding:"10px"}}>
            <h5 >Input Parameters</h5>
            <Form style={{"padding": "2px"}} onChange = {this.handleChange}>
                <Form.Control as="select"  className="form-control-sm">
                <option value ="lagrangian">Aircraft Engine</option>
                </Form.Control>
            </Form>
            <Form style={{"padding": "2px"}} onChange = {this.handleChange}>
                <Form.Control as="select"  className="form-control-sm">
                <option value ="lagrangian">Scope</option>
                </Form.Control>
            </Form>
            <Form style={{"padding": "2px"}} onChange = {this.handleChange}>
                <Form.Control as="select"  className="form-control-sm">
                <option value ="lagrangian">Geometry</option>
                </Form.Control>
            </Form>
            <Form style={{"padding": "2px"}} onChange = {this.handleChange}>
                <Form.Control as="select"  className="form-control-sm">
                <option value ="lagrangian">Soltion</option>
                </Form.Control>
            </Form>
            <Form style={{"padding": "2px"}} onChange = {this.handleChange}>
                <Form.Control as="select"  className="form-control-sm">
                <option value ="lagrangian">Turbine model</option>
                </Form.Control>
            </Form>
            <h6> Boundary Conditions</h6>
            <Form style={{"padding": "2px"}} onChange = {this.handleChange}>
                <Form.Control as="select"  className="form-control-sm">
                <option value ="lagrangian">T</option>
                </Form.Control>
            </Form>
            <Form style={{"padding": "2px"}} onChange = {this.handleChange}>
                <Form.Control as="select"  className="form-control-sm">
                <option value ="lagrangian">U</option>
                </Form.Control>
            </Form>
            <Form style={{"padding": "2px"}} onChange = {this.handleChange}>
                <Form.Control as="select"  className="form-control-sm">
                <option value ="lagrangian">p</option>
                </Form.Control>
            </Form>
            <Form style={{"padding": "2px"}} onChange = {this.handleChange}>
                <Form.Control as="select"  className="form-control-sm">
                <option value ="lagrangian">k</option>
                </Form.Control>
            </Form>
            <Form style={{"padding": "2px"}} onChange = {this.handleChange}>
                <Form.Control as="select"  className="form-control-sm">
                <option value ="lagrangian">rho</option>
                </Form.Control>
            </Form>
        </div>

        )
    }
}

export default InputParametersPanel;