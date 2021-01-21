import * as d3 from 'd3'

import data from '../../data/058.csv'

 const particleData = () => {
    const test = []
    const url = 'https://raw.githubusercontent.com/nafiul-nipu/High-Performance-Contrails-Visualization/master/data/058.csv'
    d3.csv(url, d => {
        test.push({
            x: parseFloat(d['Points0']),
            y: parseFloat(d['Points1']),
            z: parseFloat(d['Points2'])
        });
    }).then(function(){
        console.log(test)
        return test;
    })

    return "hello"

}

export default particleData