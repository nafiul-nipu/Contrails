import React from 'react';
import ClustersD3 from './clusters-d3.component';

const clusterData =  `https://raw.githubusercontent.com/CarlaFloricel/Contrails/master/src/data/test_cluster.csv`
class Clusters extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: this.props.dataRegistry,
            params: this.props.clusteringParams,

        }
  
    }
    
    handleChange(event) {
        this.setState({paramType: event.target.value});
      }


    async componentDidMount(){
        
        var send_data = [this.state.data, this.state.params]
        const data_for_child = await fetch('/backendscript', {method:"POST", mode: 'cors', cache:"no-cache", headers:{"content_type":"application/json"},body:JSON.stringify(send_data)}).then(res => res.json()).then(data => {
             return data.PCAdata
         })
        if(data_for_child){
           new ClustersD3(this.refs.chart_cluster,data_for_child)
            // new ClustersD3(this.refs.chart_cluster, null)
        }
        
        
    }



    async componentDidUpdate(prevProps){
        // console.log(prevProps.clusteringParams)
        if(this.props.clusteringParams !== prevProps.clusteringParams){
            var send_data = [this.props.dataRegistry, this.props.clusteringParams]
            const data_for_child = await fetch('/backendscript', {method:"POST", mode: 'cors', cache:"no-cache", headers:{"content_type":"application/json"},body:JSON.stringify(send_data)}).then(res => res.json()).then(data => {
                console.log(data.PCAdata)
                 return data.PCAdata
             })
          if(data_for_child)
               new ClustersD3(this.refs.chart_cluster, data_for_child)
      
    }
    
    }


    render(){
        return(

            <div ref="chart_cluster"></div>
        )
    }
}

export default Clusters;