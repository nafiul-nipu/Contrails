import './EvolutionContainer.css';
import { useEffect, useState } from 'react';
import { scaleBand, scaleLinear, select} from 'd3';
// import {useData} from  './components/useData'
import { Evolution } from './Evolution';

import cluster from "../data-component/evolutionData/contrails1-cluster.json";
import network from"../data-component/evolutionData/contrails1-network.json"

import cluster2 from '../data-component/evolutionData/contrails2-cluster.json';
import network2 from '../data-component/evolutionData/contrails2-network.json'

import cluster3 from "../data-component/evolutionData/contrails3-cluster.json";
import network3 from"../data-component/evolutionData/contrails3-network.json"


let width = 450;
let height = 220;
const margin = {top:15, right:20, bottom:30, left:20};
let name = null;
export const EvolutionContainer = ({memberID}) => {
  // const {clusterData, nodeLink} = useData(cluster, network); 
  // const {clusterData2, nodeLink2} = useData(2)

if(select('#evCon').node() !== null){
     width = select('#evCon').node().clientWidth;
     height = select('#evCon').node().parentNode.clientHeight;

}
// console.log(width, height)

// console.log(select('#evCon').node())
// console.log(select('#evCon').node())
  const [clusterData, setClusterData] = useState(null)
  const [nodeLink, setnNodeLink] = useState(null)

  useEffect(() =>{
    // load data
    setClusterData(cluster)
    setnNodeLink(network)
  }, [cluster, network]);

  const [clusterData2, setClusterData2] = useState(null)
  const [nodeLink2, setnNodeLink2] = useState(null)

  useEffect(() =>{
    // load data
    setClusterData2(cluster2)
    setnNodeLink2(network2)
  }, [cluster2, network2]);


  const [clusterData3, setClusterData3] = useState(null)
  const [nodeLink3, setnNodeLink3] = useState(null)

  useEffect(() =>{
    // load data
    setClusterData3(cluster3)
    setnNodeLink3(network3)
  }, [cluster3, network3]);
  

  // console.log(clusterData)
  if(!clusterData){
    return <div>Loading .... </div>
  }

  // console.log(nodeLink)
  const clusterKey = Object.keys(clusterData)

  // console.log(clusterKey)
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const xScale = scaleBand()
                    .domain(clusterKey)
                    .range([0, innerWidth])
                    .paddingInner(0.1)

  const circleYScale = scaleLinear()
                        .range([margin.top, innerHeight])


  const circleRadius = scaleLinear()
                        .range([5, 10])
  

  if(memberID === 17){
    return (
            <Evolution
                width = {width}
                height = {height}
                margin = {margin}
                xScale = {xScale}
                innerHeight = {innerHeight}
                clusterKey = {clusterKey}
                clusterData = {clusterData}
                nodeLink = {nodeLink}
                circleYScale = {circleYScale}
                circleRadius = {circleRadius}
                name='c1'
            />
        )
  }else if(memberID === 18){
      return(
        <Evolution
            width = {width}
            height = {height}
            margin = {margin}
            xScale = {xScale}
            innerHeight = {innerHeight}
            clusterKey = {clusterKey}
            clusterData = {clusterData2}
            nodeLink = {nodeLink2}
            circleYScale = {circleYScale}
            circleRadius = {circleRadius}
            name='c2'
        />
      )
  }else if(memberID == 19){
      return(
        <Evolution
            width = {width}
            height = {height}
            margin = {margin}
            xScale = {xScale}
            innerHeight = {innerHeight}
            clusterKey = {clusterKey}
            clusterData = {clusterData3}
            nodeLink = {nodeLink3}
            circleYScale = {circleYScale}
            circleRadius = {circleRadius}
            name='c3'
        /> 
      )
  }else{
      return(<div style={{color:'white'}}>Select between 17-19</div>)
  }
}
