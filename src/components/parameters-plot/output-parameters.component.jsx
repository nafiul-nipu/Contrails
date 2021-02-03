import React from 'react';
import OutputParametersD3 from './output-parameters-d3.component';
import statistics from '../data-component/statistics.json';


class OutputParameters extends React.Component {

       
    constructor(){
        super();
        
        this.state = {
            T_lagr : null,
            rho_lagr : null,
            Ygas_lagr : null,
            k_eul : null,
            rho_eul : null,
            T_eul : null,
            P_eul : null
        }
    
    }

    componentDidMount(){

        new OutputParametersD3(this.refs.chartoutput,statistics)
       
   
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