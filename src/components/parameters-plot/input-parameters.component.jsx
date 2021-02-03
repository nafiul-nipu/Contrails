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
            1, 
            2, 
            3,
            3,
            4,
            5,
            6,
            10,
            20,
            30,
            40
            )
        new InputParametersD3(this.refs.chart2, 
            1, 
            2, 
            3,
            3,
            4,
            5,
            6,
            10,
            20,
            30,
            40
                )
        new InputParametersD3(this.refs.chart3, 
            1, 
            2, 
            3,
            3,
            4,
            5,
            6,
            10,
            20,
            30,
            40
                    )
            new InputParametersD3(this.refs.chart4, 
                1, 
                2, 
                3,
                3,
                4,
                5,
                6,
                10,
                20,
                30,
                40
                )
            new InputParametersD3(this.refs.chart5, 
                1, 
                2, 
                3,
                3,
                4,
                5,
                6,
                10,
                20,
                30,
                40
                    )
            new InputParametersD3(this.refs.chart6, 
                1, 
                2, 
                3,
                3,
                4,
                5,
                6,
                10,
                20,
                30,
                40
                        )
            new InputParametersD3(this.refs.chart7, 
                1, 
                2, 
                3,
                3,
                4,
                5,
                6,
                10,
                20,
                30,
                40
                )
            new InputParametersD3(this.refs.chart8, 
                    1, 
                    2, 
                    3,
                    3,
                    4,
                    5,
                    6,
                    10,
                    20,
                    30,
                    40
                    )
            new InputParametersD3(this.refs.chart9, 
                        1, 
                        2, 
                        3,
                        3,
                        4,
                        5,
                        6,
                        10,
                        20,
                        30,
                        40
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