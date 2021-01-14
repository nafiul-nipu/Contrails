import React from 'react';


class QueryPanel extends React.Component {
    constructor(){
        super();
        this.state = {
            currentVal: 0,
            value:[4,5]
        }
    
    }
    
    componentDidMount(){
        fetch('/backendscript', {method:"POST", mode: 'cors', cache:"no-cache", headers:{"content_type":"application/json"},body:JSON.stringify(this.state.value)}).then(res => res.json()).then(data => this.setState({currentVal:data.val}))
    }

    render(){
        return(
            <div>Query panel and val is {this.state.currentVal}</div>
        )
    }
}

export default QueryPanel;