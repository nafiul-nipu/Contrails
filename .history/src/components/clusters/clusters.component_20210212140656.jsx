import { data } from 'jquery';
import React from 'react';
import ClustersD3 from './clusters-d3.component';

const clusterData =  `https://raw.githubusercontent.com/CarlaFloricel/Contrails/master/src/data/test_cluster.csv`
class Clusters extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            dataRegistry: this.props.dataRegistry,
            clusteringParams: this.props.clusteringParams,

        }
  
    }
    
    handleChange(event) {
        this.setState({paramType: event.target.value});
      }


    async componentDidMount(){
        
        var send_data = [this.state.dataRegistry, this.state.clusteringParams, []]
        const data_for_child = await fetch('/backendscript', {method:"POST", mode: 'cors', cache:"no-cache", headers:{"content_type":"application/json"},body:JSON.stringify(send_data)}).then(res => res.json()).then(data => {
             return data.PCAdata
         })
        if(data_for_child){
           new ClustersD3(this.refs.chart_cluster,data_for_child)
            // new ClustersD3(this.refs.chart_cluster, null)
        }
        this.setState({clusteringParams: this.props.clusteringParams})
        this.setState({dataRegistry: data_for_child})
        
    }



    async componentDidUpdate(prevProps){
        var filters = []
        if(this.state.clusteringParams != this.props.clusteringParams){
            this.setState({clusteringParams:this.props.clusteringParams})
            var send_data = [this.props.dataRegistry,this.props.clusteringParams, []]
            
           
        }
        
        if(this.state.clusteringParams == this.props.clusteringParams){
            filters = this.props.dataRegistry
            var send_data = [this.state.dataRegistry,this.state.clusteringParams, this.props.dataRegistry]
        }
        
        const data_for_child = await fetch('/backendscript', {method:"POST", mode: 'cors', cache:"no-cache", headers:{"content_type":"application/json"},body:JSON.stringify(send_data)}).then(res => res.json()).then(data => {
            // /this.setState({dataRegistry: data_for_child})
                return data.PCAdata
                
            })
       
            // this.setState({dataRegistry: data_for_child})

        if(data_for_child){
        if(this.state.clusteringParams != this.props.clusteringParams){
            
            this.setState({dataRegistry:data_for_child})            
        }
        new ClustersD3(this.refs.chart_cluster, data_for_child, )
        }

          

    }


    render(){
        return(

            <div ref="chart_cluster"></div>
        )
    }
}

export default Clusters;