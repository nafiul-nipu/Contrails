import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form'
import { faLevelUpAlt } from '@fortawesome/free-solid-svg-icons';

class OutputParametersPanel extends React.Component {
    constructor() {
        super();
        this.state = {
            currentVal: 0,
            value: [4, 5],
            paramType: 'lagrangian',
            T_lag: false,
            rho_lag: false,
            d_lag: false,
            Ygas_lag: false,
            T_eul: false,
            rho_eul: false,
            p_eul: false,
            k_eul: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleButton = this.handleButton.bind(this);
    }

    handleChange(event) {
        this.setState({ paramType: event.target.value });
        if (event.target.value === 'lagrangian') {
            this.setState({ T_eul: false, rho_eul: false, p_eul: false, k_eul: false })
        }
        else {
            this.setState({ T_lag: false, rho_lag: false, d_lag: false, Ygas_lag: false, })
        }
    }

    handleButton(event) {
        // console.log(this.state.($(`${event.target.id}`)))
        // this.state.{$(`${event.target.id}` : ! this.state.}
        var el = event.target.id.toString()
        
        if(el === "T_lag"){
            this.setState({T_lag: !this.state.T_lag})
        }
        if(el === "T_eul"){
            this.setState({T_eul: !this.state.T_eul})
        }
        if(el === "rho_eul"){
            this.setState({rho_eul: !this.state.rho_eul})
        }
        if(el === "rho_lag"){
            this.setState({rho_lag: !this.state.rho_lag})
        }
        if(el === "Ygas_lag"){
            this.setState({Ygas_lag: !this.state.Ygas_lag})
        }
        if(el === "d_lag"){
            this.setState({d_lag: !this.state.d_lag})
        }
        if(el === "p_eul"){
            this.setState({p_eul: !this.state.p_eul})
        }
        if(el === "k_eul"){
            console.log(!this.state.k_eul)
            this.setState({k_eul: !this.state.k_eul})
        }

        //console.log(this.state.Ygas_lag)
    }

    componentDidMount() {
        //fetch('/backendscript', {method:"POST", mode: 'cors', cache:"no-cache", headers:{"content_type":"application/json"},body:JSON.stringify(this.state.value)}).then(res => res.json()).then(data => this.setState({currentVal:data.val}))
    }

    render() {
        return (
            <div className="mx-auto">

                <Container>
                    <h6>Output Parameters</h6>
                    <Form onChange={this.handleChange}>
                        <Form.Control as="select" className="form-control-sm" style={{backgroundColor: 'grey', color: 'white'}}>
                            <option value="lagrangian">Lagrangian</option>
                            <option value="eulerian">Eulerian</option>
                        </Form.Control>
                    </Form>
                    <Row>
                        <Col xs={5}>
                            {this.state.paramType == 'lagrangian' ?
                                <Form style={{ textAlign: 'left', marginLeft: "10%" }}>
                                    <Form.Check type="checkbox" checked= {this.state.T_lag} id="T_lag" label="T" onChange={this.handleButton}/>
                                    <Form.Check type="checkbox" checked= {this.state.rho_lag} id="rho_lag" onChange={this.handleButton} label="rho" />
                                    <Form.Check type="checkbox" checked= {this.state.d_lag} id="d_lag" onChange={this.handleButton} label="d" />
                                    <Form.Check type="checkbox" checked= {this.state.Ygas_lag} id="Ygas_lag" onChange={this.handleButton} label="Ygas" />
                                </Form>
                                :
                                <Form style={{ textAlign: 'left', marginLeft: "10%" }}>
                                    <Form.Check type="checkbox" checked = {this.state.T_eul} label="T" id="T_eul" onChange={this.handleButton} />
                                    <Form.Check type="checkbox" cheched = {this.state.rho_eul} label="rho" id="rho_eul" onChange={this.handleButton} />
                                    <Form.Check type="checkbox" checkec={this.state.p_eul} label="p" id="p_eul" onChange={this.handleButton} />
                                    <Form.Check type="checkbox" checked ={this.state.k_eul} label="k" id="k_eul" onChange={this.handleButton} />
                                </Form>

                            }
                        </Col>
                        <Col xs={7}>
                        {this.state.paramType == 'lagrangian' ?
                        <div>
                            
                            <Form style={{ "padding": "2px" }} onChange={this.handleOutputFilterChange} className = {this.state.T_lag == true ? 'show': 'hidden'} >
                                <Form.Control as="select" className="form-control-sm interior-form" style={{backgroundColor: '#636363', color: 'white'}}>
                                    <option value="lagrangian">T_avg</option>
                                    <option value="">100</option>
                                    <option value="">200</option>
                                    <option value="">300</option>
                                    <option value="">400</option>
                                </Form.Control>
                            </Form> 

                            <Form style={{ "padding": "2px" }} onChange={this.handleOutputFilterChange} className = {this.state.rho_lag == true ? 'show': 'hidden'}>
                                <Form.Control as="select" className="form-control-sm interior-form" style={{backgroundColor: '#636363', color: 'white'}}>
                                    <option value="lagrangian">rho_avg</option>
                                    <option value="">100</option>
                                    <option value="">200</option>
                                    <option value="">300</option>
                                    <option value="">400</option>
                                </Form.Control>
                            </Form>
                            <Form style={{ "padding": "2px" }} onChange={this.handleOutputFilterChange} className = {this.state.d_lag == true ? 'show': 'hidden'}>
                                <Form.Control as="select" className="form-control-sm interior-form" style={{backgroundColor: '#636363', color: 'white'}}>
                                    <option value="lagrangian">d_avg</option>
                                    <option value="">100</option>
                                    <option value="">200</option>
                                    <option value="">300</option>
                                    <option value="">400</option>
                                </Form.Control>
                            </Form>

                            <Form style={{ "padding": "2px" }} onChange={this.handleOutputFilterChange} className = {this.state.Ygas_lag == true ? 'show': 'hidden'}>
                                <Form.Control as="select" className="form-control-sm interior-form" style={{backgroundColor: '#636363', color: 'white'}}>
                                    <option value="lagrangian">Ygas_avg</option>
                                    <option value="">100</option>
                                    <option value="">200</option>
                                    <option value="">300</option>
                                    <option value="">400</option>
                                </Form.Control>
                            </Form>
                            </div> :
                            <div>
                                <Form style={{ "padding": "2px" }} onChange={this.handleOutputFilterChange} className = {this.state.T_eul == true ? 'show': 'hidden'}>
                                <Form.Control as="select" className="form-control-sm interior-form" style={{backgroundColor: '#636363', color: 'white'}}>
                                    <option value="lagrangian">T_avg</option>
                                    <option value="">100</option>
                                    <option value="">200</option>
                                    <option value="">300</option>
                                    <option value="">400</option>
                                </Form.Control>
                            </Form>

                            <Form style={{ "padding": "2px" }} onChange={this.handleOutputFilterChange} className = {this.state.rho_eul == true ? 'show': 'hidden'}>
                                <Form.Control as="select" className="form-control-sm interior-form" style={{backgroundColor: '#636363', color: 'white'}}>
                                    <option value="lagrangian">rho_avg</option>
                                    <option value="">100</option>
                                    <option value="">200</option>
                                    <option value="">300</option>
                                    <option value="">400</option>
                                </Form.Control>
                            </Form>
                            <Form style={{ "padding": "2px" }} onChange={this.handleOutputFilterChange} className = {this.state.p_eul == true ? 'show': 'hidden'}>
                                <Form.Control as="select" className="form-control-sm interior-form" style={{backgroundColor: '#636363', color: 'white'}}>
                                    <option value="lagrangian">p_avg</option>
                                    <option value="">100</option>
                                    <option value="">200</option>
                                    <option value="">300</option>
                                    <option value="">400</option>
                                </Form.Control>
                            </Form>

                            <Form style={{ "padding": "2px" }} onChange={this.handleOutputFilterChange} className = {this.state.k_eul == true ? 'show': 'hidden'}>
                                <Form.Control as="select" className="form-control-sm interior-form" style={{backgroundColor: '#636363', color: 'white'}}>
                                    <option value="lagrangian">k_avg</option>
                                    <option value="">100</option>
                                    <option value="">200</option>
                                    <option value="">300</option>
                                    <option value="">400</option>
                                </Form.Control>
                            </Form>
                            </div>
                        }
                        </Col>
                    </Row>
                </Container>

            </div>

        )
    }
}

export default OutputParametersPanel;