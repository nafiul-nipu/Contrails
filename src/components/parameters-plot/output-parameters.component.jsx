import React from 'react';
import OutputParametersD3 from './output-parameters-d3.component';
import statistics from '../data-component/statistics.json';
import dataRegistry from '../data-component/dataRegistry.json'

class OutputParameters extends React.Component {

       
    constructor(props){
        super(props);
        
        this.state = {

        }
    
    }

    componentDidMount(){
        this.setState({chart: new OutputParametersD3(this.refs.chartoutput,statistics, this.props.elements)}) 

    }

    shouldComponentUpdate(){
        return false
    }

    componentWillReceiveProps(nextProps){
        this.state.chart.update(nextProps.elements)

    }

    render(){
        return(
            <div >
            <div ref="chartoutput"></div>


            </div>
        )
    }
}

export default OutputParameters;