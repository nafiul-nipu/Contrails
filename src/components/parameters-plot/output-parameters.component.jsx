import React from 'react';
import OutputParametersD3 from './output-parameters-d3.component';
import statistics from '../data-component/statistics.json';
import dataRegistry from '../data-component/dataRegistry.json'
import Form from 'react-bootstrap/Form'
class OutputParameters extends React.Component {


    constructor(props) {
        super(props);
        this.chartin = React.createRef()
        this.state = {
            split_tendrils: false

        }
        this.handleButton = this.handleButton.bind(this)
    }

    componentDidMount() {
        this.setState({ chartoutput: new OutputParametersD3(this.chartin.current, this.props.outputelements, false) })
    }

    handleButton(event) {
        this.state.chartoutput.update(this.props.outputelements, !this.state.split_tendrils)
        this.setState({split_tendrils: !this.state.split_tendrils})
       
}

    componentWillReceiveProps(nextProps) {
        this.state.chartoutput.update(nextProps.outputelements, this.state.split_tendrils)

    }

    render() {
        return (
            <div>
                <Form style={{ textAlign: 'left', marginLeft: "10%" }}>
                    <Form.Check type="checkbox" checked={this.state.split_tendrils} id="split_tendrils" label="Split tendrils" onChange={this.handleButton} />
                </Form>
                <div ref={this.chartin}></div>

            </div>
        )
    }
}

export default OutputParameters;