import React, {Component} from "react";

class LineWidth extends Component {
    onInputChange = (event) => {
        const { onLineWidthChange } = this.props;
        onLineWidthChange(event.target.value);
    };

    render() {
        const { LineWidth } = this.props;

        return(
            <input 
                type="number" 
                value={ LineWidth } 
                min="1"
                onChange={this.onInputChange} 
            />
        );
    };
};

export default LineWidth;