import React from 'react';
import InputParametersD3 from './input-parameters-d3.component';

class InputParameters extends React.Component {

       
    constructor(){
        super();
        
        this.state = {
            categParam1 : null,
            categParam2 : null,
            categParam3 : null,
            categParam4 : null,
            categParam5 : null,
            categParam6 : null,
            quantParam1 : null,
            quantParam2 : null,
            quantParam3 : null,
            quantParam4 : null,
        }
    
    }

    componentDidMount(){
        new InputParametersD3(this.refs.chart1, 
            this.state.categParam1 = 1, 
            this.state.categParam2 = 2, 
            this.state.categParam3 = 3,
            this.state.categParam3 = 3,
            this.state.categParam4 = 4,
            this.state.categParam5 = 5,
            this.state.categParam6 = 6,
            this.state.quantParam1 = 10,
            this.state.quantParam2 = 20,
            this.state.quantParam3 = 30,
            this.state.quantParam4 = 40
            )
        new InputParametersD3(this.refs.chart2, 
                this.state.categParam1 = 1, 
                this.state.categParam2 = 2, 
                this.state.categParam3 = 3,
                this.state.categParam3 = 3,
                this.state.categParam4 = 4,
                this.state.categParam5 = 5,
                this.state.categParam6 = 6,
                this.state.quantParam1 = 10,
                this.state.quantParam2 = 20,
                this.state.quantParam3 = 30,
                this.state.quantParam4 = 40
                )
        new InputParametersD3(this.refs.chart3, 
                    this.state.categParam1 = 1, 
                    this.state.categParam2 = 2, 
                    this.state.categParam3 = 3,
                    this.state.categParam3 = 3,
                    this.state.categParam4 = 4,
                    this.state.categParam5 = 5,
                    this.state.categParam6 = 6,
                    this.state.quantParam1 = 10,
                    this.state.quantParam2 = 20,
                    this.state.quantParam3 = 30,
                    this.state.quantParam4 = 40
                    )
            new InputParametersD3(this.refs.chart4, 
                this.state.categParam1 = 1, 
                this.state.categParam2 = 2, 
                this.state.categParam3 = 3,
                this.state.categParam3 = 3,
                this.state.categParam4 = 4,
                this.state.categParam5 = 5,
                this.state.categParam6 = 6,
                this.state.quantParam1 = 10,
                this.state.quantParam2 = 20,
                this.state.quantParam3 = 30,
                this.state.quantParam4 = 40
                )
            new InputParametersD3(this.refs.chart5, 
                    this.state.categParam1 = 1, 
                    this.state.categParam2 = 2, 
                    this.state.categParam3 = 3,
                    this.state.categParam3 = 3,
                    this.state.categParam4 = 4,
                    this.state.categParam5 = 5,
                    this.state.categParam6 = 6,
                    this.state.quantParam1 = 10,
                    this.state.quantParam2 = 20,
                    this.state.quantParam3 = 30,
                    this.state.quantParam4 = 40
                    )
            new InputParametersD3(this.refs.chart6, 
                        this.state.categParam1 = 1, 
                        this.state.categParam2 = 2, 
                        this.state.categParam3 = 3,
                        this.state.categParam3 = 3,
                        this.state.categParam4 = 4,
                        this.state.categParam5 = 5,
                        this.state.categParam6 = 6,
                        this.state.quantParam1 = 10,
                        this.state.quantParam2 = 20,
                        this.state.quantParam3 = 30,
                        this.state.quantParam4 = 40
                        )
            new InputParametersD3(this.refs.chart7, 
                this.state.categParam1 = 1, 
                this.state.categParam2 = 2, 
                this.state.categParam3 = 3,
                this.state.categParam3 = 3,
                this.state.categParam4 = 4,
                this.state.categParam5 = 5,
                this.state.categParam6 = 6,
                this.state.quantParam1 = 10,
                this.state.quantParam2 = 20,
                this.state.quantParam3 = 30,
                this.state.quantParam4 = 40
                )
            new InputParametersD3(this.refs.chart8, 
                    this.state.categParam1 = 1, 
                    this.state.categParam2 = 2, 
                    this.state.categParam3 = 3,
                    this.state.categParam3 = 3,
                    this.state.categParam4 = 4,
                    this.state.categParam5 = 5,
                    this.state.categParam6 = 6,
                    this.state.quantParam1 = 10,
                    this.state.quantParam2 = 20,
                    this.state.quantParam3 = 30,
                    this.state.quantParam4 = 40
                    )
            new InputParametersD3(this.refs.chart9, 
                        this.state.categParam1 = 1, 
                        this.state.categParam2 = 2, 
                        this.state.categParam3 = 3,
                        this.state.categParam3 = 3,
                        this.state.categParam4 = 4,
                        this.state.categParam5 = 5,
                        this.state.categParam6 = 6,
                        this.state.quantParam1 = 10,
                        this.state.quantParam2 = 20,
                        this.state.quantParam3 = 30,
                        this.state.quantParam4 = 40
                        )
    }

    render(){
        return(
            <div >
            <div ref="chart1"></div>
            <div ref="chart2"></div>
            <div ref="chart3"></div>
            <div ref="chart4"></div>
            <div ref="chart5"></div>
            <div ref="chart6"></div>
            <div ref="chart7"></div>
            <div ref="chart8"></div>
            <div ref="chart9"></div>

            </div>
        )
    }
}

export default InputParameters;