import * as d3 from 'd3'
export const NodeDiagram = ({nodes,name}) => {

  return nodes.map(node=>(
  <circle className="circleCon"
    key={node.id}
    cx={node.x}
    cy={node.y}
    r={node.r}
    onMouseEnter={() => {
      // console.log('hovered')
      d3.selectAll(`.${name}${node.id}`)
        .style('stroke-opacity', 1)
        .style('stroke', '#FF6F61')


    }}
    onMouseOut={() => {
      // console.log("hover Out")
      d3.selectAll('#pathCon')
        .style('stroke-opacity', 0.5)
        .style('stroke', 'black')
    }}
  />
))
}
