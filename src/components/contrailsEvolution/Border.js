import './EvolutionContainer.css';
export const Border = ({xScale, innerHeight, heightOffset, name}) => {
    return(
      <g className='border'>
        {xScale.domain().map(value => (
          <rect 
            key={`border${value}`}
            className={`evolutionRect${name}`}
            id={`border${name}${value}`}
            x={xScale(value)}
            width={xScale.bandwidth() - 4}
            height={innerHeight - heightOffset}
            fill={value == 0.1 ? "#cccecf" : "#818385"}
          />
        ))}
      </g>
    );
  };

  // ()=>{
  //   if(value === 0.1){
  //     console.log("here")
  //     return "#cccecf"
  //   }else{
  //     console.log(":there")
  //     return '#818385';
  //   }
  // }