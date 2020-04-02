import React from "react";
import logo from "../logo.png";
import deadlogo from "../deadlogo.png";
class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }
  componentDidUpdate() {
    const canvas = this.canvasRef.current;
    const context = canvas.getContext("2d");

    context.clearRect(0, 0, canvas.width, canvas.height);

    let img = new Image();
    img.src = logo;

    let square = Math.sqrt(this.props.maxFish);
    let fishSize = canvas.width / square;
    for (let j = 0; j < this.props.numFish + this.props.deadFish; j++) {
      let x = (j % square) * fishSize;
      let y = (square - 1 - Math.floor(j / square)) * fishSize;

      j < this.props.numFish ? (img.src = logo) : (img.src = deadlogo);

      context.drawImage(img, x, y, fishSize, fishSize);
    }
  }

  render() {
    return (
      <canvas
        className="canvas"
        width="500"
        height="500"
        ref={this.canvasRef}
      />
    );
  }
}

export default Canvas;
