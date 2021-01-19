import React from 'react';

class DropdownPanel extends React.Component {
    constructor(){
        super();
        this.state = {

        }
    
    }


    render(){
        return(
            <div>
                <button type="button">Previous</button>
                <select>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                </select>
                <button type="button">Next</button>

            </div>
        )
    }
}

export default DropdownPanel;