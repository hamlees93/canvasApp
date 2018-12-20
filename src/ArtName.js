import React, {Component} from "react";

class ArtName extends Component {
    onInputChange = (event) => {
        const { onArtNameChange } = this.props;
        onArtNameChange(event.target.value);
    };

    render() {
        return(
            <div>
                <div>
                    <label htmlFor="title">Name artwork:</label>
                </div>
                <div>
                    <input 
                        type="text" 
                        onChange={this.onInputChange} 
                    />
                </div>
            </div>
            
        );
    };
};

export default ArtName;