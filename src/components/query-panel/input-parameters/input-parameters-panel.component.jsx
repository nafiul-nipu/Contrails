import React from 'react';
import Form from 'react-bootstrap/Form'
import "./input-parameters.styles.css"

class InputParametersPanel extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            currentVal: 0,
            value:[4,5],
            paramType: 'lagrangian'
        }
        this.handleButton = this.handleButton.bind(this);
    }
    
    handleButton(param) {
        var new_param = param.target.id.toString()
        this.props.onInputSelectChange(new_param)
        // console.log(this.props.onInputSelectChange(new_param))
      }


    render(){
        return(
            <div className="mx-auto" >
            <h6 >Input Parameters</h6>
            <div style={{textAlign: 'left', marginLeft:"7%"}}>
            <div style={{color:"grey", marginTop:"5%"}}>Aircraft Engine -Streams</div>
            <Form  >
                <Form.Check inline  type="checkbox"  id="aircraft-engine-one" label="one" onChange={this.handleButton} className="airplane-one"/>
                <svg className="bi bi-square color-svg" width="1em" height="1em" viewBox="0 0 10 10" fill="#b2182b" xmlns="http://www.w3.org/2000/svg">
                    <rect width="8" height="8" rx="1" />
                </svg>
                <Form.Check inline  type="checkbox"  id="aircraft-engine-two" label="two" onChange={this.handleButton}/>
                <svg className="bi bi-square color-svg" width="1em" height="1em" viewBox="0 0 10 10" fill="#d6604d" xmlns="http://www.w3.org/2000/svg">
                    <rect width="8" height="8" rx="1" />
                </svg>
            </Form>
            <div style={{color:"grey", marginTop:"5%"}}>Geometry</div>
            <Form  >
                <Form.Check inline  type="checkbox" id="geometry-short" label="short-cowl-nozzle" onChange={this.handleButton}/>
                <svg className="bi bi-square color-svg" width="1em" height="1em" viewBox="0 0 10 10" fill="#1a9850" xmlns="http://www.w3.org/2000/svg">
                    <rect width="8" height="8" rx="1" />
                </svg>
                {/* <Form.Check inline  type="checkbox" id="geometry-cowl" label="cowl" onChange={this.handleButton}/>
                <svg className="bi bi-square color-svg" width="1em" height="1em" viewBox="0 0 10 10" fill="#66bd63" xmlns="http://www.w3.org/2000/svg">
                    <rect width="8" height="8" rx="1" />
                </svg>
                <Form.Check inline  type="checkbox" id="geometry-nozzle" label="nozzle" onChange={this.handleButton}/>
                <svg className="bi bi-square color-svg" width="1em" height="1em" viewBox="0 0 10 10" fill="#a6d96a" xmlns="http://www.w3.org/2000/svg">
                    <rect width="8" height="8" rx="1" />
                </svg> */}
            </Form>
            <div style={{color:"grey", marginTop:"5%"}}>Scope</div>
            <Form  >
                <Form.Check inline  type="checkbox" id="scope-nozzle" label="nozzle" onChange={this.handleButton}/>
                <svg className="bi bi-square color-svg" width="1em" height="1em" viewBox="0 0 10 10" fill="#542788" xmlns="http://www.w3.org/2000/svg">
                    <rect width="8" height="8" rx="1" />
                </svg>
                <Form.Check inline  type="checkbox" id="scope-whole" label="whole" onChange={this.handleButton}/>
                <svg className="bi bi-square color-svg" width="1em" height="1em" viewBox="0 0 10 10" fill="#8073ac" xmlns="http://www.w3.org/2000/svg">
                    <rect width="8" height="8" rx="1" />
                </svg>
            </Form>
            <div style={{color:"grey", marginTop:"5%"}}>Turbulence Model</div>
            <Form  >
                <Form.Check inline  type="checkbox" id="turbulence-kOmegaSST" label="kOmegaSST" onChange={this.handleButton}/>
                <svg className="bi bi-square color-svg" width="1em" height="1em" viewBox="0 0 10 10" fill="#F1B900" xmlns="http://www.w3.org/2000/svg">
                    <rect width="8" height="8" rx="1" />
                </svg>
                {/* <Form.Check inline  type="checkbox" id="turbulence-T2" label="T2" onChange={this.handleButton}/>
                <svg className="bi bi-square color-svg" width="1em" height="1em" viewBox="0 0 10 10" fill="#fee08b" xmlns="http://www.w3.org/2000/svg">
                    <rect width="8" height="8" rx="1" />
                </svg> */}
                </Form>
            {/* <div style={{color:"grey", marginTop:"5%"}}>Grid Resolution</div>
            <Form  >
                <Form.Check inline  type="checkbox" id="grid-coarse" label="coarse" onChange={this.handleButton}/>
                <svg className="bi bi-square color-svg" width="1em" height="1em" viewBox="0 0 10 10" fill="#92c5de" xmlns="http://www.w3.org/2000/svg">
                    <rect width="8" height="8" rx="1" />
                </svg>
                <Form.Check inline  type="checkbox" id="grid-medium" label="medium" onChange={this.handleButton}/>
                <svg className="bi bi-square color-svg" width="1em" height="1em" viewBox="0 0 10 10" fill="#4393c3" xmlns="http://www.w3.org/2000/svg">
                    <rect width="8" height="8" rx="1" />
                </svg>
                <Form.Check inline  type="checkbox" id="grid-fine" label="fine" onChange={this.handleButton}/>
                <svg className="bi bi-square color-svg" width="1em" height="1em" viewBox="0 0 10 10" fill="#2166ac" xmlns="http://www.w3.org/2000/svg">
                    <rect width="8" height="8" rx="1" />
                </svg>
            </Form> */}
            <div style={{color:"grey", marginTop:"5%"}}>Solution - coupled</div>
            <Form  >
                <Form.Check inline  type="checkbox" id="solution-coupled" label="true" onChange={this.handleButton}/>
                <Form.Check inline  type="checkbox" id="solution-uncoupled" label="false" onChange={this.handleButton}/>
            </Form>

            <div style={{"color":"#BEBEBE", marginTop: "10px"}}>Boundary Conditions</div>
            <div style={{color:"grey", marginTop:"5%"}}>T</div>
            <Form  >
                <Form.Check inline  type="checkbox" id="boundary-T-engine" label="engine" onChange={this.handleButton}/>
                <Form.Check inline  type="checkbox" id="boundary-T-farfield" label="farfield" onChange={this.handleButton}/>
                <Form.Check inline  type="checkbox" id="boundary-T-nozzle" label="nozzle" onChange={this.handleButton}/>
                <Form.Check inline  type="checkbox" id="boundary-T-outlet" label="outlet" onChange={this.handleButton}/>
                <Form.Check inline  type="checkbox" id="boundary-T-turbine" label="turbine" onChange={this.handleButton}/>
            </Form>
            <div style={{color:"grey", marginTop:"5%"}}>U</div>
            <Form  >
                <Form.Check inline  type="checkbox" id="boundary-U-inlet" label="inlet" onChange={this.handleButton}/>
                <Form.Check inline  type="checkbox" id="boundary-U-nozzle" label="nozzle" onChange={this.handleButton}/>
                <Form.Check inline  type="checkbox" id="boundary-U-outlet" label="outlet" onChange={this.handleButton}/>
            </Form>
            <div style={{color:"grey", marginTop:"5%"}}>P</div>
            <Form  >
                <Form.Check inline  type="checkbox" id="boundary-P-nozzle" label="nozzle" onChange={this.handleButton}/>
                <Form.Check inline  type="checkbox" id="boundary-P-outlet" label="outlet" onChange={this.handleButton}/>
            </Form>
            <div style={{color:"grey", marginTop:"5%"}}>k</div>
            <Form  >
                <Form.Check inline  type="checkbox" id="boundary-k-inlet" label="inlet" onChange={this.handleButton}/>
                <Form.Check inline  type="checkbox" id="boundary-k-nozzle" label="nozzle" onChange={this.handleButton}/>
            </Form>
            <div style={{color:"grey", marginTop:"5%"}}>rho</div>
            <Form  >
                <Form.Check inline  type="checkbox" id="boundary-rho-nozzle" label="nozzle" onChange={this.handleButton}/>
            </Form>

        
        </div>
        </div>

        )
    }
}

export default InputParametersPanel;