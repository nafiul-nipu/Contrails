import React from 'react';
import OutputParametersD3 from './output-parameters-d3.component';
import statistics from '../data-component/statistics.json';
import dataRegistry from '../data-component/dataRegistry.json'

class OutputParameters extends React.Component {

       
    constructor(props){
        super(props);
        this.chartin = React.createRef()
        this.state = {

        }
    
    }

    componentDidMount(){
        this.setState({chartoutput: new OutputParametersD3(this.chartin.current, this.props.outputelements)}) 
    }

    // shouldComponentUpdate(){
    //     return false
    // }

    componentWillReceiveProps(nextProps){
        this.state.chartoutput.update(nextProps.outputelements)

    }

    render(){
        return(
            <div >
            <div ref={this.chartin}></div>


            </div>
        )
    }
}

export default OutputParameters;