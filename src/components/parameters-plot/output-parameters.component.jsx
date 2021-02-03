import React from 'react';
import OutputParametersD3 from './output-parameters-d3.component';

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
        new OutputParametersD3(this.refs.chart1, 
            this.state.T_lagr = 1, 
            this.state.rho_lagr = 2, 
            this.state.Ygas_lagr = 3,
            this.state.k_eul = 3,
            this.state.rho_eul = 4,
            this.state.T_eul = 5,
            this.state.P_eul = 6

            )
       
   
    }

    render(){
        return(
            <div >
            <div ref="chart1"></div>


            </div>
        )
    }
}

export default OutputParameters;