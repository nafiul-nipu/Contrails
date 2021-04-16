import React from 'react';
import ContrailsLinePlotD3 from './contrails-d3.component';

class ContrailsLinePlot extends React.Component {

       
    constructor(props){
        super(props);
        this.chartContrails = React.createRef()
        this.state = {

        }
    
    }

    componentDidMount(){
        this.setState({chartContrails: new ContrailsLinePlotD3(this.chartContrails.current, this.props.members)}) 
    }


    // componentWillReceiveProps(nextProps){

    //     this.state.chartinput.update(nextProps.elements)

    // }




    render(){
        return(
            <div ref={this.chartContrails} >
            </div>
        )
    }
}

export default ContrailsLinePlot;