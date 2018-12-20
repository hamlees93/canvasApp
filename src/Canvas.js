import React, {Component} from "react";
import ColourSelector from "./ColourSelector";
import LineWidth from "./LineWidth";
import ArtName from "./ArtName";

class Canvas extends Component {
    state = {
        hex:"#0000FF", 
        lineWidth:3,
        artName:"Welcome to your drawing board",
        width: 400, 
        height: 400,
        coords: null
    };

    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        this.context = null;
    };

    componentDidUpdate() {
        this.setContext();
    };

    setContext() {
        this.context = this.canvasRef.current.getContext("2d");
        //Changes the colour based on the colour picker
        this.context.strokeStyle = this.state.hex;
        this.context.lineJoin = "round";
        this.context.lineWidth = this.state.lineWidth;
        // this.context.artName = this.state.artName;
    };

    onColourSelectorChange = (hex) => {
        this.setState({ hex });
    };

    onLineWidthChange = (lineWidth) => {
        this.setState({ lineWidth });
    };

    clearCanvas = () => {
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    };

    onArtNameChange = (artName) => {
        this.setState({ artName });
    };

    ///// Keeping track of the coords lets us know where we will be drawing ////
    onCanvasMouseDown = (event) => {
        const x = event.nativeEvent.offsetX;
        const y = event.nativeEvent.offsetY;
        this.setState({ coords: [x,y] });
    };

    //// null tells us that we are no longer drawing ////
    onCanvasMouseUp = (event) => {
        this.setState({ coords: null });
    };

    //// Keeps track of exactly where my mouse is, how big the canvas is, and if there are coords being tracked (Have I started drawing yet) /////
    onCanvasMouseMove = (event) => {
        const x = event.nativeEvent.offsetX;
        const y = event.nativeEvent.offsetY;
        const { coords, height, width } = this.state;

        //Checking to ensure we are still within the canvas //
        if (x > 0 && y > 0 && x < width && y < height) {
            // If the mouse has been clicked and is held down//
            if (coords) {
                this.context.beginPath();
                this.context.moveTo(coords[0], coords[1]);
                this.context.lineTo(x,y);
                this.context.closePath();
                this.context.stroke();
                this.setState({ coords: [x,y] });
            }
        } else {
            this.setState({ coords: null });
        };
    };

    render() {
        const { hex, lineWidth, artName, width, height } = this.state;
        localStorage.setItem('painting', this.state);

        return (
            <div>
                <div>
                    <ArtName artName={artName} onArtNameChange={this.onArtNameChange} />
                    <h1>{this.state.artName}</h1>
                </div>
                <div>
                    <div>
                        <label>Select colour </label>
                        <ColourSelector 
                            hex={hex} 
                            onColourSelectorChange={this.onColourSelectorChange} 
                        />
                    </div>
                    <div>
                        <label>Change line width </label>
                        <LineWidth 
                            lineWidth={lineWidth} 
                            onLineWidthChange={this.onLineWidthChange} 
                        />
                    </div>
                    <div>
                        <button onClick={this.clearCanvas}>Clear Canvas</button>
                    </div>
                </div>
                <canvas 
                    ref={this.canvasRef}
                    width={width}
                    height={height}
                    style={{ border:"6px solid black" }}
                    onMouseMove={this.onCanvasMouseMove}
                    onMouseDown={this.onCanvasMouseDown}
                    onMouseUp={this.onCanvasMouseUp}
                />
            </div>
        );
    };
};

export default Canvas;