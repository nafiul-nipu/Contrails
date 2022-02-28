import * as d3 from 'd3'

import dataRegistry from '../data-component/dataRegistry.json'

import attributeRange from '../data-component/attributeRange.json'

let data = []
let rawData = []
let create8bit = d3.scaleLinear()
                    .range([0,255])
const loader = (folder, file, filter) =>{
    return new Promise((resolve, reject) => {
        if(!folder || !file || !filter){
            reject(new Error("Field Missing"))
        }
        let url = `https://raw.githubusercontent.com/nafiul-nipu/Contrails/master/src/data/volume_data/${folder}/${file}.csv`;
        let dataBuffer = []
        let positions = []
        console.log(url)
        d3.csv(url, data => {
                    
            // console.log(url)
            positions.push((parseFloat(data[filter])));

        }).then(function() {
            rawData = positions
            create8bit.domain([d3.min(rawData), d3.max(rawData)])
            // dataBuffer = new Uint8Array(positions)
            rawData.forEach(element => {
                dataBuffer.push(create8bit(element))
            })
            data = new Uint8Array(dataBuffer)
            resolve()
        })


    });
}

const getData = () => {
    return data
}

const getRawData = () => {
    return rawData
}

const getMin = () => {
    var min = Infinity; 
    rawData.forEach(function(data){
        if(data < min && data != 0 ){
            min = data; 
        }
    })
    return min
}

const getMax = () => {
    return d3.max(rawData)
}

const getRangeData = (member, time, filter) =>{
    return attributeRange[member][filter][time]
}

const dataLoader = (folder, file) =>{
    // console.log(folder, file)
    const self = this;
    // console.log(this.state)
    let list = dataRegistry[folder-1].timeSteps
    
    // let url_checker = []
    let promises = []
    for(let i = 0; i< list.length; i++){
        let url_checker = `https://raw.githubusercontent.com/nafiul-nipu/Contrails/master/src/data/${folder}/${list[i]}.csv`
        promises.push(d3.csv(url_checker))

    }
    // console.log('promises')
    // console.log(promises)
    Promise.all(promises).then(function(files){
        // console.log(self.state)
        // let url = `https://raw.githubusercontent.com/nafiul-nipu/Contrails/master/src/data/${folder}/${file}.csv`
        let data = []
        let all_data = {}
        let all_tempDomain = {}
        let all_xDomain = {}
        let all_yDomain = {}

        let three_positions = {};
        let colors = {}
        let tempColor = ["#fff5f0","#67000d"]
        let tempscaling = d3.scaleLinear(/*d3.schemeReds[9]*/)
                        .range(tempColor);

        let tempDomain = {}
        let xDomain = {}
        let yDomain = {}
        // console.log(file, index)
        // let particle_limit = 0;

        files.forEach(function (value, i) {
            // console.log('%d: %s', i, value);
            all_data[i] = []
            all_tempDomain[i] = {}
            all_xDomain[i] = {}
            all_yDomain[i] = {}
            value.forEach(d => {
                    all_data[i].push({
                        x: parseFloat(d['Points:0']),
                        y: parseFloat(d['Points:1']),
                        z: parseFloat(d['Points:2']),
                        temp: parseFloat(d['T'])
                    });
                
                
            })
        });

        self.setState({
            density : all_data,

        })
        console.log("data")
                    
    })     
            

}

export {getData, loader, getMin, getMax, getRawData, getRangeData}

