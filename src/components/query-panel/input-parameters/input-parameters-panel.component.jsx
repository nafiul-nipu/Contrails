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
            <div className="mx-auto" >
            <h6 >Input Parameters</h6>
            <div style={{textAlign: 'left', marginLeft:"10%"}}>
            <div style={{color:"grey", marginTop:"5%"}}>Aircraft Engine -Steams</div>
            <Form  >
                <Form.Check inline  type="checkbox"  id="aircraft-engine-one" label="one" onChange={this.handleButton}/>
                <Form.Check inline  type="checkbox"  id="aircraft-engine-two" label="two" onChange={this.handleButton}/>
            </Form>
            <div style={{color:"grey", marginTop:"5%"}}>Geometry</div>
            <Form  >
                <Form.Check inline  type="checkbox" id="geometry-short" label="short" onChange={this.handleButton}/>
                <Form.Check inline  type="checkbox" id="geometry-cowl" label="cowl" onChange={this.handleButton}/>
                <Form.Check inline  type="checkbox" id="geometry-nozzle" label="nozzle" onChange={this.handleButton}/>
            </Form>
            <div style={{color:"grey", marginTop:"5%"}}>Scope</div>
            <Form  >
                <Form.Check inline  type="checkbox" id="scope-nozzle" label="nozzle" onChange={this.handleButton}/>
                <Form.Check inline  type="checkbox" id="scope-whole" label="whole" onChange={this.handleButton}/>
            </Form>
            <div style={{color:"grey", marginTop:"5%"}}>Grid Resolution</div>
            <Form  >
                <Form.Check inline  type="checkbox" id="grid-coarse" label="coarse" onChange={this.handleButton}/>
                <Form.Check inline  type="checkbox" id="grid-medium" label="medium" onChange={this.handleButton}/>
                <Form.Check inline  type="checkbox" id="grid-fine" label="fine" onChange={this.handleButton}/>
            </Form>
            <div style={{color:"grey", marginTop:"5%"}}>Solution -coupled</div>
            <Form  >
                <Form.Check inline  type="checkbox" id="solution-coupled" label="true" onChange={this.handleButton}/>
                <Form.Check inline  type="checkbox" id="solution-uncoupled" label="false" onChange={this.handleButton}/>
            </Form>
            <div style={{color:"grey", marginTop:"5%"}}>Turbulence Model</div>
                <Form.Check inline  type="checkbox" id="turbulence-t1" label="T1" onChange={this.handleButton}/>
                <Form.Check inline  type="checkbox" id="turbulence-t2" label="T2" onChange={this.handleButton}/>
            <div style={{"color":"#BEBEBE", marginTop: "10px"}}>Boundary Conditions</div>
            <div style={{color:"grey", marginTop:"5%"}}>T</div>
            <Form  >
                <Form.Check inline  type="checkbox" id="T_lag" label="engine" onChange={this.handleButton}/>
                <Form.Check inline  type="checkbox" id="T_lag" label="farfield" onChange={this.handleButton}/>
                <Form.Check inline  type="checkbox" id="T_lag" label="inlet" onChange={this.handleButton}/>
                <Form.Check inline  type="checkbox" id="T_lag" label="nozzle" onChange={this.handleButton}/>
                <Form.Check inline  type="checkbox" id="T_lag" label="outlet" onChange={this.handleButton}/>
                <Form.Check inline  type="checkbox" id="T_lag" label="turbine" onChange={this.handleButton}/>
            </Form>
            <div style={{color:"grey", marginTop:"5%"}}>U</div>
            <Form  >
                <Form.Check inline  type="checkbox" id="T_lag" label="inlet" onChange={this.handleButton}/>
                <Form.Check inline  type="checkbox" id="T_lag" label="nozzle" onChange={this.handleButton}/>
                <Form.Check inline  type="checkbox" id="T_lag" label="outlet" onChange={this.handleButton}/>
            </Form>
            <div style={{color:"grey", marginTop:"5%"}}>P</div>
            <Form  >
                <Form.Check inline  type="checkbox" id="T_lag" label="nozzle" onChange={this.handleButton}/>
                <Form.Check inline  type="checkbox" id="T_lag" label="outlet" onChange={this.handleButton}/>
            </Form>
            <div style={{color:"grey", marginTop:"5%"}}>k</div>
            <Form  >
                <Form.Check inline  type="checkbox" id="T_lag" label="inlet" onChange={this.handleButton}/>
                <Form.Check inline  type="checkbox" id="T_lag" label="nozzle" onChange={this.handleButton}/>
            </Form>
            <div style={{color:"grey", marginTop:"5%"}}>rho</div>
            <Form  >
                <Form.Check inline  type="checkbox" id="T_lag" label="nozzle" onChange={this.handleButton}/>
            </Form>


        
        
        </div>
        </div>

        )
    }
}

export default InputParametersPanel;