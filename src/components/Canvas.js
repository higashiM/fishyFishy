import React from "react";
import logo from "../logo.png";

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

    for (let j = 0; j < this.props.numFish; j++) {
      let x = (j % square) * fishSize;
      let y = Math.floor(j / square) * fishSize;

      context.drawImage(img, x, y, fishSize, fishSize);
    }

    /* img.onload = () => {
      console.log("loaded");
      context.drawImage(img, 0, 0);
    }; */
    /* 
    context.beginPath();
    context.arc(10, 10, 5, 0, 2 * Math.PI, false);
    context.fillStyle = "#F03C69";
    context.fill(); */
  }

  render() {
    return <canvas width="500" height="500" ref={this.canvasRef} />;
  }
}

export default Canvas;
