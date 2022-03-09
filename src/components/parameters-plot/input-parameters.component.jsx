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
        // console.log("inside input view component did mount")
        // console.log(this.props.shouldRender)
        if(this.props.shouldRender === "block"){
            this.setState({chartinput: new InputParametersD3(this.chart.current, this.props.elements, true, this.props.memberTop, this.props.memberBottom)}) 

        }
        
    }

    shouldComponentUpdate(nextProps){
        // console.log("should update input view")
        // console.log(this.state)
        // console.log(nextProps)
        // console.log(this.state.hasOwnProperty('chartinput'))
        if(this.state.hasOwnProperty('chartinput')){
            this.state.chartinput.update(nextProps.elements, nextProps.memberTop, nextProps.memberBottom)
        }

        return true
    }
    
    //  UNSAFE_componentWillReceiveProps(nextProps){
    //      console.log('will receive called')

    //     this.state.chartinput.update(nextProps.elements)

    // }




    render(){
        return(
            <div ref={this.chart} >
            {/* <div ref={this.chart}></div> */}

            </div>
        )
    }
}

export default InputParameters;