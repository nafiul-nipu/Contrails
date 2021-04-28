import React from 'react';
import InputParametersD3 from './input-parameters-d3.component';

class InputParameters extends React.Component {

       
    constructor(props){
        super(props);
        this.chart = React.createRef()
        this.state = {

        }
    
    }

    componentDidMount(){
        this.setState({chartinput: new InputParametersD3(this.chart.current, this.props.elements, true)}) 
    }

    // shouldComponentUpdate(){
    //     return false
    // }

    componentWillReceiveProps(nextProps){

        this.state.chartinput.update(nextProps.elements)

    }




    render(){
        return(
            <div ref={this.chart} >
            {/* <div ref={this.chart}></div> */}

            </div>
        )
    }
}

export default InputParameters;