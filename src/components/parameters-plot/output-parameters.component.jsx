import React from 'react';
import OutputParametersD3 from './output-parameters-d3.component';
class OutputParameters extends React.Component {


    constructor(props) {
        super(props);
        this.chartin = React.createRef()
        this.state = {
        }
    }

    componentDidMount() {
        this.setState({ chartoutput: new OutputParametersD3(this.chartin.current, this.props.outputelements, this.props.split_tendrils) })
    }


    componentWillReceiveProps(nextProps) {
        this.state.chartoutput.update(nextProps.outputelements, !this.props.split_tendrils)

    }

    render() {
        return (
                <div ref={this.chartin}></div>

        )
    }
}

export default OutputParameters;