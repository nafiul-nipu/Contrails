import shapeAttributes from '../data-component/shapeAttributes.json' ;

let domains = {
    'temp': [shapeAttributes["210"].temp, shapeAttributes["210"].temp],
    'particles': [shapeAttributes["210"].particles, shapeAttributes["210"].particles],
    'mass': [shapeAttributes["210"].mass, shapeAttributes["210"].mass],
    'length': [shapeAttributes["210"].length, shapeAttributes["210"].length],
    'group': [shapeAttributes["210"].group, shapeAttributes["210"].group],
  }

  export const getKiviatDomain = () =>{
    for (const [key, value] of Object.entries(shapeAttributes)){
        // console.log(key, value)
        // time.push(key)
        for(const [valueKey, valueVal] of Object.entries(value)){
          // console.log(valueKey, valueVal, domains[valueKey][0])
          if(valueVal < domains[valueKey][0]){
            domains[valueKey][0] = valueVal
          }else if(valueVal > domains[valueKey][1]){
            domains[valueKey][1] = valueVal
          }
        }
      }

    return domains
  }