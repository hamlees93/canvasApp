import React, {Component} from "react";

class ColourSelector extends Component {
    onInputChange = (event) => {
        const { onColourSelectorChange } = this.props;
        onColourSelectorChange(event.target.value);
    };

    render() {
        const { hex } = this.props;

        return(
            <input 
                type="color" 
                value={ hex } 
                onChange={this.onInputChange} 
            />
        );
    };
};

///// Best way to set default prop values inside our components /////
ColourSelector.defaultProps = {
    hex: "#0000FF"
};

export default ColourSelector;