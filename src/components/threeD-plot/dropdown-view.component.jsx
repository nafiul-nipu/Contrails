import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class DropdownView extends React.Component {
    constructor() {
        super();
        this.state = {

        }

    }

    componentDidMount() {

    }



    render() {
        return (
            <Col xs={12} style={{height:'20vh', backgroundColor:'#31393F'}} id={`${this.props.area}`} >
                             
            </Col>

        )
    }

}


export default DropdownView;