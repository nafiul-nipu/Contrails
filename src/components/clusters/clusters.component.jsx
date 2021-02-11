import React from 'react';
import ClustersD3 from './clusters-d3.component';
import dataRegistry from '../data-component/dataRegistry.json'
const clusterData =  `https://raw.githubusercontent.com/CarlaFloricel/Contrails/master/src/data/test_cluster.csv`
class Clusters extends React.Component {
    constructor(){
        super();
        this.state = {
            currentVal: 1,
            data: []
        }
  
    }
    
    handleChange(event) {
        this.setState({paramType: event.target.value});
      }


    async componentDidMount(){

        const data_for_child = await fetch('/backendscript', {method:"POST", mode: 'cors', cache:"no-cache", headers:{"content_type":"application/json"},body:JSON.stringify(dataRegistry)}).then(res => res.json()).then(data => {
             return data.PCAdata
         })
        if(data_for_child){
            new ClustersD3(this.refs.chart_cluster, data_for_child)
        }
        
        
    }



    render(){
        return(

            <div ref="chart_cluster">{console.log(this.data)}</div>
        )
    }
}

export default Clusters;