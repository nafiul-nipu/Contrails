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
        // console.log('inside output view component did mount')
        // console.log(this.props.memberTop, this.props.memberBottom)
        this.setState({ chartoutput: new OutputParametersD3(this.chartin.current, this.props.outputelements, this.props.split_tendrils, this.props.memberTop, this.props.memberBottom) })
    }

    shouldComponentUpdate(nextProps){
        // console.log("should update output view")
        // console.log(this.state)
        console.log(nextProps)
        // console.log(this.state.hasOwnProperty('output'))
        if(this.state.hasOwnProperty('chartoutput')){
            this.state.chartoutput.update(nextProps.outputelements, !this.props.split_tendrils, nextProps.memberTop, nextProps.memberBottom)
        }

        return true
    }

    // componentWillReceiveProps(nextProps) {
    //     this.state.chartoutput.update(nextProps.outputelements, !this.props.split_tendrils)

    // }

    render() {
        return (
                <div ref={this.chartin}></div>

        )
    }
}

export default OutputParameters;