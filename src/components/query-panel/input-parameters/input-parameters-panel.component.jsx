import React from 'react';
import Form from 'react-bootstrap/Form'
import "./input-parameters.styles.css"

class InputParametersPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentVal: 0,
            value: [4, 5],
            paramType: 'lagrangian'
        }
        this.handleButton = this.handleButton.bind(this);
    }

    handleButton(param) {
        var new_param = param.target.id.toString()
        this.props.onInputSelectChange(new_param)
    }


    render() {
        return (
            <div className="mx-auto" >

                <h6 >Input Params</h6>
                <div style={{ textAlign: 'left', marginLeft: "5%" }}>
                    <div style={{ color: "grey", marginTop: "5%" }}>Aircraft Engine -Streams</div>
                    <Form  >
                        <Form.Check inline type="checkbox" id="aircraft-engine-one" label="one" onChange={this.handleButton} className="airplane-one" />
                        <svg className="bi bi-square color-svg" width="1em" height="1em" viewBox="0 0 10 10" fill="#b2182b" xmlns="http://www.w3.org/2000/svg">
                            <rect width="8" height="8" rx="1" />
                        </svg>
                        <Form.Check inline type="checkbox" id="aircraft-engine-two" label="two" onChange={this.handleButton} />
                        <svg className="bi bi-square color-svg" width="1em" height="1em" viewBox="0 0 10 10" fill="#d6604d" xmlns="http://www.w3.org/2000/svg">
                            <rect width="8" height="8" rx="1" />
                        </svg>
                    </Form>
                    {/* <div style={{ color: "grey", marginTop: "5%" }}>Geometry</div>
                    <Form  >
                        <Form.Check inline type="checkbox" id="geometry-short-cowl-nozzle" label="short-cowl-nozzle" onChange={this.handleButton} />
                        <svg className="bi bi-square color-svg" width="1em" height="1em" viewBox="0 0 10 10" fill="#1a9850" xmlns="http://www.w3.org/2000/svg">
                            <rect width="8" height="8" rx="1" />
                        </svg>

                    </Form> */}
                    {/* <div style={{ color: "grey", marginTop: "5%" }}>Scope</div>
                    <Form  >
                        <Form.Check inline type="checkbox" id="scope-nozzle" label="nozzle" onChange={this.handleButton} />
                        <svg className="bi bi-square color-svg" width="1em" height="1em" viewBox="0 0 10 10" fill="#542788" xmlns="http://www.w3.org/2000/svg">
                            <rect width="8" height="8" rx="1" />
                        </svg>
                        <Form.Check inline type="checkbox" id="scope-whole" label="whole" onChange={this.handleButton} />
                        <svg className="bi bi-square color-svg" width="1em" height="1em" viewBox="0 0 10 10" fill="#8073ac" xmlns="http://www.w3.org/2000/svg">
                            <rect width="8" height="8" rx="1" />
                        </svg>
                    </Form> */}

                    <div style={{ color: "grey", marginTop: "5%" }}>Grid</div>
                    <Form  >
                        <Form.Check inline type="checkbox" id="grid-coarse" label="coarse" onChange={this.handleButton} />
                        <svg className="bi bi-square color-svg" width="1em" height="1em" viewBox="0 0 10 10" fill="#92c5de" xmlns="http://www.w3.org/2000/svg">
                            <rect width="8" height="8" rx="1" />
                        </svg>
                    </Form>
                    <Form>
                        <Form.Check inline type="checkbox" id="grid-fine" label="fine" onChange={this.handleButton} />
                        <svg className="bi bi-square color-svg" width="1em" height="1em" viewBox="0 0 10 10" fill="#2166ac" xmlns="http://www.w3.org/2000/svg">
                            <rect width="8" height="8" rx="1" />
                        </svg>
                    </Form>
                    {/* <div style={{ color: "grey", marginTop: "5%" }}>Solution - coupled</div>
                    <Form  >
                        <Form.Check inline type="checkbox" id="solution-coupled" label="true" onChange={this.handleButton} />
                        <svg className="bi bi-square color-svg" width="1em" height="1em" viewBox="0 0 10 10" fill="#d3a27f" xmlns="http://www.w3.org/2000/svg">
                            <rect width="8" height="8" rx="1" />
                        </svg>
                        <Form.Check inline type="checkbox" id="solution-uncoupled" label="false" onChange={this.handleButton} />
                        <svg className="bi bi-square color-svg" width="1em" height="1em" viewBox="0 0 10 10" fill="#964b00" xmlns="http://www.w3.org/2000/svg">
                            <rect width="8" height="8" rx="1" />
                        </svg>
                    </Form> */}

                    <div style={{ color: "grey", marginTop: "5%" }}>Turbulence Model</div>
                    <Form  >
                        <Form.Check inline type="checkbox" id="turbulence-kOmegaSST" label="kOmegaSST" onChange={this.handleButton} />
                        <svg className="bi bi-square color-svg" width="1em" height="1em" viewBox="0 0 10 10" fill="#F1B900" xmlns="http://www.w3.org/2000/svg">
                            <rect width="8" height="8" rx="1" />
                        </svg>
                    </Form>

                    <div style={{ "color": "#BEBEBE", marginTop: "15px", marginLeft: "-4%" }}>Boundary Conditions</div>
                    {/* <div style={{ "color": "#BEBEBE", marginLeft: "-4%" }}>(T, U, p, k)</div> */}
                    <div style={{marginLeft:"15px"}}>
                        {/* <div><svg className="bi bi-square color-svg" width="1em" height="1em" viewBox="0 0 10 10" fill="#ffffb3" xmlns="http://www.w3.org/2000/svg">
                            <rect width="8" height="8" rx="1" />
                        </svg> <span style={{ color: "white" }}>totalTemperature</span></div> */}
                        {/* <div><svg className="bi bi-square color-svg" width="1em" height="1em" viewBox="0 0 10 10" fill="#bebada" xmlns="http://www.w3.org/2000/svg">
                            <rect width="8" height="8" rx="1" />
                        </svg> <span style={{ color: "white" }}>zeroGradient</span></div> */}
                        {/* <div><svg className="bi bi-square color-svg" width="1em" height="1em" viewBox="0 0 10 10" fill="#fb8072" xmlns="http://www.w3.org/2000/svg">
                            <rect width="8" height="8" rx="1" />
                        </svg> <span style={{ color: "white" }}>inletOutlet</span></div> */}
                        {/* <div><svg className="bi bi-square color-svg" width="1em" height="1em" viewBox="0 0 10 10" fill="#ffffb3" xmlns="http://www.w3.org/2000/svg">
                            <rect width="8" height="8" rx="1" />
                        </svg> <span style={{ color: "white" }}>noSlip</span></div> */}
                        {/* <div><svg className="bi bi-square color-svg" width="1em" height="1em" viewBox="0 0 10 10" fill="#b3de69" xmlns="http://www.w3.org/2000/svg">
                            <rect width="8" height="8" rx="1" />
                        </svg> <span style={{ color: "white" }}>totalPressure</span></div> */}
                        {/* <div><svg className="bi bi-square color-svg" width="1em" height="1em" viewBox="0 0 10 10" fill="#fccde5" xmlns="http://www.w3.org/2000/svg">
                            <rect width="8" height="8" rx="1" />
                        </svg> <span style={{ color: "white" }}>waveTransmissive</span></div> */}
                        {/* <div><svg className="bi bi-square color-svg" width="1em" height="1em" viewBox="0 0 10 10" fill="#fdb462" xmlns="http://www.w3.org/2000/svg">
                            <rect width="8" height="8" rx="1" />
                        </svg> <span style={{ color: "white" }}>freeStream</span></div> */}
                        {/* <div><svg className="bi bi-square color-svg" width="1em" height="1em" viewBox="0 0 10 10" fill="#d9d9d9" xmlns="http://www.w3.org/2000/svg">
                            <rect width="8" height="8" rx="1" />
                        </svg> <span style={{ color: "white" }}>freeStreamPressure</span></div> */}
                        {/* <div><svg className="bi bi-square color-svg" width="1em" height="1em" viewBox="0 0 10 10" fill="#bc80bd" xmlns="http://www.w3.org/2000/svg">
                            <rect width="8" height="8" rx="1" />
                        </svg> <span style={{ color: "white" }}>turbuIntenKineticEnInlet</span></div> */}
                        {/* <div><svg className="bi bi-square color-svg" width="1em" height="1em" viewBox="0 0 10 10" fill="#ccebc5" xmlns="http://www.w3.org/2000/svg">
                            <rect width="8" height="8" rx="1" />
                        </svg> <span style={{ color: "white" }}>kqRWallFunction</span></div> */}
                        {/* <div><svg className="bi bi-square color-svg" width="1em" height="1em" viewBox="0 0 10 10" fill="#ffffe5" xmlns="http://www.w3.org/2000/svg">
                            <rect width="8" height="8" rx="1" />
                        </svg> <span style={{ color: "white" }}>no data</span></div> */}
                        <div style={{marginLeft: "10%" }}><span style={{ color: "white" }}>no data</span><span style={{ color: "#31393F" }}>00</span>
                        <svg className="bi bi-square color-svg" width="1em" height="1em" viewBox="0 0 10 10" fill="#ffffe5" xmlns="http://www.w3.org/2000/svg">
                            <rect width="8" height="8" rx="1" x='0' y='0'/>
                        </svg> </div>
                        
                    </div>
                    {/* <div style={{ color: "#BEBEBE", marginTop: "3%" , marginLeft:"-2%"}}>T</div> */}
                    {/* <div style={{ color: "grey", marginTop: "2%" }}>bypassInlet</div>
                    <Form  >
                        <Form.Check inline type="checkbox" id="boundary-T-bypassInlet-totalTemperature" label="totalTemperature" onChange={this.handleButton} />
                        <svg className="bi bi-square color-svg" width="1em" height="1em" viewBox="0 0 10 10" fill="#ffffb3" xmlns="http://www.w3.org/2000/svg">
                            <rect width="8" height="8" rx="1" />
                        </svg>
                    </Form>
                    <div style={{ color: "grey", marginTop: "2%" }}>engine</div>
                    <Form  >
                        <Form.Check inline type="checkbox" id="boundary-T-engine-zeroGradient" label="zeroGradient" onChange={this.handleButton} />
                        <svg className="bi bi-square color-svg" width="1em" height="1em" viewBox="0 0 10 10" fill="#bebada" xmlns="http://www.w3.org/2000/svg">
                            <rect width="8" height="8" rx="1" />
                        </svg>
                    </Form>
                    <div style={{ color: "grey", marginTop: "2%" }}>farfield</div>
                    <Form  >
                        <Form.Check inline type="checkbox" id="boundary-T-farfield-zeroGradient" label="zeroGradient" onChange={this.handleButton} />
                        <svg className="bi bi-square color-svg" width="1em" height="1em" viewBox="0 0 10 10" fill="#bebada" xmlns="http://www.w3.org/2000/svg">
                            <rect width="8" height="8" rx="1" />
                        </svg>
                    </Form>
                    <div style={{ color: "grey", marginTop: "2%" }}>inlet</div>
                    <Form  >
                        <Form.Check inline type="checkbox" id="boundary-T-inlet-inletOutlet" label="inletOutlet" onChange={this.handleButton} />
                        <svg className="bi bi-square color-svg" width="1em" height="1em" viewBox="0 0 10 10" fill="#fb8072" xmlns="http://www.w3.org/2000/svg">
                            <rect width="8" height="8" rx="1" />
                        </svg>
                    </Form>
                    <div style={{ color: "grey", marginTop: "2%" }}>nozzle</div>
                    <Form  >
                        <Form.Check inline type="checkbox" id="boundary-T-nozzle-zeroGradient" label="zeroGradient" onChange={this.handleButton} />
                        <svg className="bi bi-square color-svg" width="1em" height="1em" viewBox="0 0 10 10" fill="#bebada" xmlns="http://www.w3.org/2000/svg">
                            <rect width="8" height="8" rx="1" />
                        </svg>
                    </Form>
                    <div style={{ color: "grey", marginTop: "2%" }}>outlet</div>
                    <Form  >
                        <Form.Check inline type="checkbox" id="boundary-T-outlet-zeroGradient" label="zeroGradient" onChange={this.handleButton} />
                        <svg className="bi bi-square color-svg" width="1em" height="1em" viewBox="0 0 10 10" fill="#bebada" xmlns="http://www.w3.org/2000/svg">
                            <rect width="8" height="8" rx="1" />
                        </svg>
                    </Form> */}
                    {/* <div style={{ color: "grey", marginTop: "2%" }}>turbine</div>
                    <Form  >
                        <Form.Check inline type="checkbox" id="boundary-T-turbine-totalTemperature" label="totalTemperature" onChange={this.handleButton} />
                        <svg className="bi bi-square color-svg" width="1em" height="1em" viewBox="0 0 10 10" fill="#ffffb3" xmlns="http://www.w3.org/2000/svg">
                            <rect width="8" height="8" rx="1" />
                        </svg>
                    </Form> */}

                    <div style={{ color: "#BEBEBE", marginTop: "3%", marginLeft: "-2%" }}>U</div>
                    {/* <div style={{ color: "grey", marginTop: "2%" }}>bypassInlet</div>
                    <Form  >
                        <Form.Check inline type="checkbox" id="boundary-U-bypassInlet-zeroGradient" label="zeroGradient" onChange={this.handleButton} />
                        <svg className="bi bi-square color-svg" width="1em" height="1em" viewBox="0 0 10 10" fill="#bebada" xmlns="http://www.w3.org/2000/svg">
                            <rect width="8" height="8" rx="1" />
                        </svg>
                    </Form>
                    <div style={{ color: "grey", marginTop: "2%" }}>engine</div>
                    <Form  >
                        <Form.Check inline type="checkbox" id="boundary-U-engine-noSlip" label="noSlip" onChange={this.handleButton} />
                        <svg className="bi bi-square color-svg" width="1em" height="1em" viewBox="0 0 10 10" fill="#ffffb3" xmlns="http://www.w3.org/2000/svg">
                            <rect width="8" height="8" rx="1" />
                        </svg>
                    </Form>
                    <div style={{ color: "grey", marginTop: "2%" }}>farfield</div>
                    <Form  >
                        <Form.Check inline type="checkbox" id="boundary-U-farfield-inletOutlet" label="inletOutlet" onChange={this.handleButton} />
                        <svg className="bi bi-square color-svg" width="1em" height="1em" viewBox="0 0 10 10" fill="#fb8072" xmlns="http://www.w3.org/2000/svg">
                            <rect width="8" height="8" rx="1" />
                        </svg>
                    </Form> */}
                    <div style={{ color: "grey", marginTop: "2%" }}>inlet</div>
                    <Form  >
                        <Form.Check inline type="checkbox" id="boundary-U-inlet-inletOutlet" label="inletOutlet" onChange={this.handleButton} />
                        <svg className="bi bi-square color-svg" width="1em" height="1em" viewBox="0 0 10 10" fill="#FF4E0D" xmlns="http://www.w3.org/2000/svg">
                            <rect width="8" height="8" rx="1" />
                        </svg>
                        <Form.Check inline type="checkbox" id="boundary-U-inlet-freestream" label="freestream" onChange={this.handleButton} />
                        <svg className="bi bi-square color-svg" width="1em" height="1em" viewBox="0 0 10 10" fill="#fdb462" xmlns="http://www.w3.org/2000/svg">
                            <rect width="8" height="8" rx="1" />
                        </svg>

                        {/* <div style={{marginLeft: "10%" }}><span style={{ color: "white" }}>no data</span><span style={{ color: "#31393F" }}>00</span>
                        <svg className="bi bi-square color-svg" width="1em" height="1em" viewBox="0 0 10 10" fill="#ffffe5" xmlns="http://www.w3.org/2000/svg">
                            <rect width="8" height="8" rx="1" x='0' y='0'/>
                        </svg> </div> */}
                    </Form>
                    
                    {/* <div style={{ color: "grey", marginTop: "2%" }}>nozzle</div>
                    <Form  >
                        <Form.Check inline type="checkbox" id="boundary-U-nozzle-noSlip" label="noSlip" onChange={this.handleButton} />
                        <svg className="bi bi-square color-svg" width="1em" height="1em" viewBox="0 0 10 10" fill="#80b1d3" xmlns="http://www.w3.org/2000/svg">
                            <rect width="8" height="8" rx="1" />
                        </svg>
                    </Form>
                    <div style={{ color: "grey", marginTop: "2%" }}>outlet</div>
                    <Form  >
                        <Form.Check inline type="checkbox" id="boundary-U-outlet-inletOutlet" label="inletOutlet" onChange={this.handleButton} />
                        <svg className="bi bi-square color-svg" width="1em" height="1em" viewBox="0 0 10 10" fill="#fb8072" xmlns="http://www.w3.org/2000/svg">
                            <rect width="8" height="8" rx="1" />
                        </svg>
                    </Form>
                    <div style={{ color: "grey", marginTop: "2%" }}>turbine</div>
                    <Form  >
                        <Form.Check inline type="checkbox" id="boundary-U-turbine-zeroGradient" label="zeroGradient" onChange={this.handleButton} />
                        <svg className="bi bi-square color-svg" width="1em" height="1em" viewBox="0 0 10 10" fill="#bebada" xmlns="http://www.w3.org/2000/svg">
                            <rect width="8" height="8" rx="1" />
                        </svg>
                    </Form> */}


                    <div style={{ color: "#BEBEBE", marginTop: "3%", marginLeft: "-2%" }}>p</div>
                    {/* <div style={{ color: "grey", marginTop: "2%" }}>bypassInlet</div>
                    <Form  >
                        <Form.Check inline type="checkbox" id="boundary-p-bypassInlet-totalPressure" label="totalPressure" onChange={this.handleButton} />
                        <svg className="bi bi-square color-svg" width="1em" height="1em" viewBox="0 0 10 10" fill="#b3de69" xmlns="http://www.w3.org/2000/svg">
                            <rect width="8" height="8" rx="1" />
                        </svg>
                    </Form>
                    <div style={{ color: "grey", marginTop: "2%" }}>engine</div>
                    <Form  >
                        <Form.Check inline type="checkbox" id="boundary-p-engine-zeroGradient" label="zeroGradient" onChange={this.handleButton} />
                        <svg className="bi bi-square color-svg" width="1em" height="1em" viewBox="0 0 10 10" fill="#bebada" xmlns="http://www.w3.org/2000/svg">
                            <rect width="8" height="8" rx="1" />
                        </svg>
                    </Form>
                    <div style={{ color: "grey", marginTop: "2%" }}>farfield</div>
                    <Form  >
                        <Form.Check inline type="checkbox" id="boundary-p-farfield-waveTransmissive" label="waveTransmissive" onChange={this.handleButton} />
                        <svg className="bi bi-square color-svg" width="1em" height="1em" viewBox="0 0 10 10" fill="#fccde5" xmlns="http://www.w3.org/2000/svg">
                            <rect width="8" height="8" rx="1" />
                        </svg>
                    </Form> */}
                    <div style={{ color: "grey", marginTop: "2%" }}>inlet</div>
                    <Form  >
                        <Form.Check inline type="checkbox" id="boundary-p-inlet-inletOutlet" label="inletOutlet" onChange={this.handleButton} />
                        <svg className="bi bi-square color-svg" width="1em" height="1em" viewBox="0 0 10 10" fill="#FF4E0D" xmlns="http://www.w3.org/2000/svg">
                            <rect width="8" height="8" rx="1" />
                        </svg>
                        <Form.Check inline type="checkbox" id="boundary-p-inlet-freestreamPressure" label="freestreamPressure" onChange={this.handleButton} />
                        <svg className="bi bi-square color-svg" width="1em" height="1em" viewBox="0 0 10 10" fill="#d9d9d9" xmlns="http://www.w3.org/2000/svg">
                            <rect width="8" height="8" rx="1" />
                        </svg>
                    </Form>
                    {/* <div style={{ color: "grey", marginTop: "2%" }}>nozzle</div>
                    <Form  >
                        <Form.Check inline type="checkbox" id="boundary-p-nozzle-zeroGradient" label="zeroGradient" onChange={this.handleButton} />
                        <svg className="bi bi-square color-svg" width="1em" height="1em" viewBox="0 0 10 10" fill="#bebada" xmlns="http://www.w3.org/2000/svg">
                            <rect width="8" height="8" rx="1" />
                        </svg>
                    </Form>
                    <div style={{ color: "grey", marginTop: "2%" }}>outlet</div>
                    <Form  >
                        <Form.Check inline type="checkbox" id="boundary-p-outlet-waveTransmissive" label="waveTransmissive" onChange={this.handleButton} />
                        <svg className="bi bi-square color-svg" width="1em" height="1em" viewBox="0 0 10 10" fill="#fccde5" xmlns="http://www.w3.org/2000/svg">
                            <rect width="8" height="8" rx="1" />
                        </svg>
                    </Form>
                    <div style={{ color: "grey", marginTop: "2%" }}>turbine</div>
                    <Form  >
                        <Form.Check inline type="checkbox" id="boundary-p-turbine-totalPressure" label="totalPressure" onChange={this.handleButton} />
                        <svg className="bi bi-square color-svg" width="1em" height="1em" viewBox="0 0 10 10" fill="#b3de69" xmlns="http://www.w3.org/2000/svg">
                            <rect width="8" height="8" rx="1" />
                        </svg>
                    </Form> */}


                    {/* <div style={{ color: "#BEBEBE", marginTop: "3%", marginLeft:"-2%" }}>k</div>
                    <Form  >
                        <Form.Check inline type="checkbox" id="boundary-k-bypassInlet-turbuIntenKineticEnInlet" label="turbIntenKineticEnInlet" onChange={this.handleButton} />
                        <svg className="bi bi-square color-svg" width="1em" height="1em" viewBox="0 0 10 10" fill="#bc80bd" xmlns="http://www.w3.org/2000/svg">
                            <rect width="8" height="8" rx="1" />
                        </svg>
                    </Form>
                    <div style={{ color: "grey", marginTop: "2%" }}>engine</div>
                    <Form  >
                        <Form.Check inline type="checkbox" id="boundary-k-engine-kqRWallFunction" label="kqRWallFunction" onChange={this.handleButton} />
                        <svg className="bi bi-square color-svg" width="1em" height="1em" viewBox="0 0 10 10" fill="#ccebc5" xmlns="http://www.w3.org/2000/svg">
                            <rect width="8" height="8" rx="1" />
                        </svg>
                    </Form>
                    <div style={{ color: "grey", marginTop: "2%" }}>farfield</div>
                    <Form  >
                        <Form.Check inline type="checkbox" id="boundary-k-farfield-inletOutlet" label="inletOutlet" onChange={this.handleButton} />
                        <svg className="bi bi-square color-svg" width="1em" height="1em" viewBox="0 0 10 10" fill="#fb8072" xmlns="http://www.w3.org/2000/svg">
                            <rect width="8" height="8" rx="1" />
                        </svg>
                    </Form>
                    <div style={{ color: "grey", marginTop: "2%" }}>inlet</div>
                    <Form  >
                        <Form.Check inline type="checkbox" id="boundary-k-inlet-inletOutlet" label="inletOutlet" onChange={this.handleButton} />
                        <svg className="bi bi-square color-svg" width="1em" height="1em" viewBox="0 0 10 10" fill="#fb8072" xmlns="http://www.w3.org/2000/svg">
                            <rect width="8" height="8" rx="1" />
                        </svg>
                    </Form>
                    <div style={{ color: "grey", marginTop: "2%" }}>nozzle</div>
                    <Form  >
                        <Form.Check inline type="checkbox" id="boundary-k-nozzle-kqRWallFunction" label="kqRWallFunction" onChange={this.handleButton} />
                        <svg className="bi bi-square color-svg" width="1em" height="1em" viewBox="0 0 10 10" fill="#ccebc5" xmlns="http://www.w3.org/2000/svg">
                            <rect width="8" height="8" rx="1" />
                        </svg>
                    </Form>
                    <div style={{ color: "grey", marginTop: "2%" }}>outlet</div>
                    <Form  >
                        <Form.Check inline type="checkbox" id="boundary-k-outlet-inletOutlet" label="inletOutlet" onChange={this.handleButton} />
                        <svg className="bi bi-square color-svg" width="1em" height="1em" viewBox="0 0 10 10" fill="#fb8072" xmlns="http://www.w3.org/2000/svg">
                            <rect width="8" height="8" rx="1" />
                        </svg>
                    </Form>
                    <div style={{ color: "grey", marginTop: "2%" }}>turbine</div>
                    <Form  >
                        <Form.Check inline type="checkbox" id="boundary-k-turbine-turbuIntenKineticEnInlet" label="turbIntenKineticEnInlet" onChange={this.handleButton} />
                        <svg className="bi bi-square color-svg" width="1em" height="1em" viewBox="0 0 10 10" fill="#bc80bd" xmlns="http://www.w3.org/2000/svg">
                            <rect width="8" height="8" rx="1" />
                        </svg>
                    </Form> */}

                </div>
            </div>

        )
    }
}

export default InputParametersPanel;