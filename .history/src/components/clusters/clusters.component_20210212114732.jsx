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
            this.setState({chart: new ClustersD3(this.refs.chart_cluster,data_for_child)}) 
            // new ClustersD3(this.refs.chart_cluster, null)
        }
        
        
    }

    // shouldComponentUpdate(){
    //     return false
    // }

    // async componentWillReceiveProps(nextProps){
    //     // if(this.state.clusteringParams !== nextProps.clusteringParams){
    //     //     console.log("clustering")
    //     //     // this.setState({parama: this.props.clusteringParams})
    //     //     // var send_data = [this.state.data, this.props.clusteringParams]
    //     //     // const data_for_child = await fetch('/backendscript', {method:"POST", mode: 'cors', cache:"no-cache", headers:{"content_type":"application/json"},body:JSON.stringify(send_data)}).then(res => res.json()).then(data => {
    //     //     //      return data.PCAdata
    //     //     //  })
    //     //     // if(data_for_child){
    //     //     //     this.setState({chart: new ClustersD3(this.refs.chart_cluster,data_for_child)}) 
    //     //     // }
    //     // }
    //     // if(this.state.data.length !== nextProps.dataRegistry.length){
    //     //     console.log(this.state.data)
    //     //     console.log(nextProps.dataRegistry)
    //     //     // this.state.chart.update(nextProps.dataRegistry)
    //     //     console.log("input")
    //     //     // this.setState({dataRegistry: nextProps.dataRegistry})
    //     // }
        



    // }

    async componentDidUpdate(prevProps){
        console.log(prevProps.clusteringParams)
        if(this.props.clusteringParams !== prevProps.clusteringParams){

        // console.log(prevProps.clusteringParams)
        // console.log(this.props.clusteringParams)
            var send_data = [this.props.dataRegistry, this.props.clusteringParams]
            const data_for_child = await fetch('/backendscript', {method:"POST", mode: 'cors', cache:"no-cache", headers:{"content_type":"application/json"},body:JSON.stringify(send_data)}).then(res => res.json()).then(data => {
                console.log(data.PCAdata)
                 return data.PCAdata
             })
          if(data_for_child)
                this.setState({chart: new ClustersD3(this.refs.chart_cluster, data_for_child)
                })
        
        // else{
        //     this.chart.update(this.props.dataRegistry)
        // }
        this.setState({clusteringParams: this.props.clusteringParams})
    }
    
    }


    render(){
        return(

            <div ref="chart_cluster"></div>
        )
    }
}

export default Clusters;