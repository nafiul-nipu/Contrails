import React from 'react';
import ClustersD3 from './clusters-d3.component';
import clusterData from '../../data/test_cluster.csv';
class Clusters extends React.Component {
    componentDidMount(){
        const data = clusterData
        const domainData = [1,2,3,4,5,6]
        const xDomain = [1,2,3,4,5,6]
        const yDomain = [1,2,3,4,5,6]

        new ClustersD3(this.refs.chart_cluster, data, domainData, xDomain, yDomain)
    }

    render(){
        return(
            <div ref="chart_cluster"></div>
        )
    }
}

export default Clusters;