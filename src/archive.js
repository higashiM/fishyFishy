import React from "react";

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }
  componentDidUpdate() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = "./mario.png";
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
    };

    const img = new Image(100, 100);
    img.src = "../logo.svg";

    const canvas = this.canvasRef.current;
    const context = canvas.getContext("2d");
    //context.clearRect(0, 0, canvas.width, canvas.height);

    context.drawImage(img, 100, 100);

    //canvas.attr({ height: canvas.height(), width: canvas.width() });
    let numDots = this.props.numDots;

    // We need a reference to the canvas width to calculate dot sizes and positions.
    let canvasWidth = 300;

    // We're setting the margin between dots (and the edge of the container), and
    // then we'll set the size of the dots automatically.
    var dotMargin = 25 / numDots;

    // We'll set the number of dots dynamically, too, so we can adjust and see how
    // it changes.

    // Let's figure out the radius of each dot.
    var dotDiameter = (canvasWidth - numDots * dotMargin) / numDots;
    var dotRadius = dotDiameter * 0.5;

    // Using the number of dots specified, find the center of each dot, and then
    // draw it.
    for (var i = 0; i < numDots; i++) {
      var x = i * (dotDiameter + dotMargin) + dotMargin + dotRadius;
      var y = dotMargin + dotRadius;
      /*    let a = 25;
      let b = 50;
      let c = 75;
      let d = 100; */
      //drawDot(x, y, dotRadius);
      //drawTriangle(x, y, a, b, c, d);

      context.drawImage(img, x, y);
    }

    // This is just as we had done before, but making values dynamic.
    function drawDot(x, y, radius) {
      context.beginPath();
      context.arc(x, y, radius, 0, 2 * Math.PI, false);
      context.fillStyle = "#F03C69";
      context.fill();
    }

    function drawTriangle(x, y, a, b, c, d) {
      context.beginPath();

      context.moveTo(x, y);
      context.lineTo(d, c);
      context.lineTo(d, a);
      context.fillStyle = "#F03C69";
      context.fill();
    }
  }
  render() {
    return <canvas width="300" height="300" ref={this.canvasRef} />;
  }
}
export default Canvas;
