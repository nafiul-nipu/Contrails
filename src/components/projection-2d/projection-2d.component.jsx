import React from 'react';
import ProjeProjection2DD3 from './projection-2d-d3.component';

class Projection2D extends React.Component {
    componentDidMount(){
        new ProjeProjection2DD3(this.refs.chart)
    }

    render(){
        return(
            <div ref="chart"></div>
        )
    }
}

export default Projection2D;