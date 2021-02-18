import React from 'react';
import InputParametersD3 from './input-parameters-d3.component';

class InputParameters extends React.Component {

       
    constructor(props){
        super(props);
        
        this.state = {
        }
    
    }

    componentDidMount(){
        console.log(this.props.elements)
        this.setState({chart: new InputParametersD3(this.refs.chartinput, this.props.elements)}) 
    }

    // shouldComponentUpdate(){
    //     return false
    // }

    componentWillReceiveProps(nextProps){
        console.log(nextProps.elements)
        this.state.chart.update(nextProps.elements)

    }




    render(){
        return(
            <div >
            <div ref="chartinput"></div>

            </div>
        )
    }
}

export default InputParameters;