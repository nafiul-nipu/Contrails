import React from 'react';
import Col from 'react-bootstrap/Col';

class VolumeRenderingView extends React.Component {
    constructor() {
        super();
        this.state = {

        }

    }

    componentDidMount() {

    }



    render() {
        return (
            <Col xs={12} style={{height:'55vh', backgroundColor:'#31393F'}} className={`threeContainer${this.props.renderArea}`}>

            </Col>                                    


        )
    }

}


export default VolumeRenderingView;