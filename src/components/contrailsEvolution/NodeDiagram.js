import * as d3 from 'd3'
import { Tooltip, Overlay, OverlayTrigger } from 'react-bootstrap'
import { useState, useRef } from 'react';


export const NodeDiagram = ({nodes,name}) => {
  // const [show, setShow] = useState(false);
  // const target = useRef(null);

  return nodes.map(node=>{
    // const [show, setShow] = useState(false);
    // const target = useRef(null);
    return(
    <>   
      <OverlayTrigger
        key={node.id}
        placement={'left'}
        overlay={
          <Tooltip id={`tooltip-left`}>
            <p>{`ID : ${node.id}`} <br/>
                {`Total Particles : ${node.particles}`} <br/>
                {`Total Mass: ${node.mass}`} <br/>
                {`Avg. Temp: ${node.temp}`} <br/>
                {`Total Length: ${node.length}`}
              </p>
          </Tooltip>
        }
      > 
      <circle className="circleCon"
        // ref={target}
        key={node.id}
        cx={node.x}
        cy={node.y}
        r={node.r}
        onMouseEnter={() => {
          console.log('hovered')
          // setShow(true)
          d3.selectAll(`.${name}${node.id}`)
            .style('stroke-opacity', 1)
            .style('stroke', '#FF6F61')


        }}
        onMouseLeave={() => {
          console.log("hover Out")
          // setShow(false)
          d3.selectAll('#pathCon')
            .style('stroke-opacity', 0.5)
            .style('stroke', 'black')
        }}
      />

      </OverlayTrigger>
    </>
 
)})
}
