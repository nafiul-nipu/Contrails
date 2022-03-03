import { AxisBottom } from './AxisBottom';
import { Border } from './Border';
import { ContrailsEvolution } from './ContrailsEvolution';

export const Evolution = ({
    width,
    height,
    margin,
    xScale,
    innerHeight,
    clusterKey,
    clusterData,
    nodeLink,
    sortdata,
    circleYScale,
    circleRadius,
    name
}) => {


    return(
        <svg width={width} height={height}>
            <g transform={`translate(${margin.left}, ${margin.top})`}>
            <AxisBottom 
                xScale={xScale}
                innerHeight={innerHeight}
                />
    
            <Border 
                xScale = {xScale}
                heightOffset = {margin.top}
                innerHeight={innerHeight}
            />
    
            <ContrailsEvolution 
                clusterKey={clusterKey}
                clusterData={clusterData}
                nodeLink={nodeLink}
                sortdata={sortdata}
                xScale={xScale}
                circleYScale={circleYScale}
                circleRadius={circleRadius}
                offset={margin.top}
                name={name}
            />
    
            </g>
        </svg>
    )
}