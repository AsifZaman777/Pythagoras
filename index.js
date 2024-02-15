const app = new PIXI.Application({
  backgroundColor: 0xaaaaaa,
  resizeTo: window,
});
document.body.appendChild(app.view);
const position = {
  x: app.renderer.width / 2,
  y: app.renderer.height / 2,}
  ;
const labelContainer = new PIXI.Container();
app.stage.addChild(labelContainer);

const labelContainerbg = new PIXI.Graphics();
labelContainerbg.beginFill("red");
labelContainerbg.drawRect(0, 0, app.renderer.width, 100);
labelContainerbg.alpha = 0.7;
labelContainer.addChild(labelContainerbg);

const textStyle = new PIXI.TextStyle({
  fill: "white",
  fontSize: 40,
});

const text = new PIXI.Text("\nপিথাগোরাসের উপপাদ্য প্রমান\n", textStyle);
text.x = labelContainer.width / 2 - 250;
text.y = labelContainer.height / 2 - 60;
labelContainer.addChild(text);



// Define the sides (default)
let a = 200;
let b = 100;
let squareLength = a + b;

const triangle1 = new PIXI.Graphics();
const triangle2 = new PIXI.Graphics();
const triangle3 = new PIXI.Graphics();
const triangle4 = new PIXI.Graphics();
const shapeContainer = new PIXI.Graphics();


const controlPoint = new PIXI.Graphics();
controlPoint.beginFill(0x0000ff); // Color of the control point
controlPoint.drawCircle(0, -2, 10); // Adjust size as needed
controlPoint.endFill();
controlPoint.interactive = true;
controlPoint.buttonMode = true;

const controlPoint1 = new PIXI.Graphics();
controlPoint1.beginFill(0x0000ff); // Color of the control point
controlPoint1.drawCircle(0, -2, 10); // Adjust size as needed
controlPoint1.endFill();
controlPoint1.interactive = true;
controlPoint1.buttonMode = true;

const controlPoint2 = new PIXI.Graphics();
controlPoint2.beginFill(0x0000ff); // Color of the control point
controlPoint2.drawCircle(0, -2, 10); // Adjust size as needed
controlPoint2.endFill();
controlPoint2.interactive = true;
controlPoint2.buttonMode = true;

app.stage.addChild(shapeContainer);
shapeContainer.addChild(triangle1);
shapeContainer.addChild(triangle2);
shapeContainer.addChild(triangle3);
shapeContainer.addChild(triangle4);
shapeContainer.addChild(controlPoint);
shapeContainer.addChild(controlPoint1);
shapeContainer.addChild(controlPoint2);

//button create
const submitButton = new PIXI.Graphics();
submitButton.beginFill(0x008000);
submitButton.drawRect(0, 0, 400, 60); // Adjust size as needed
submitButton.position.set(
  (app.renderer.width - 350) / 2,
  app.renderer.height - 200
); // Position at the bottom center
submitButton.interactive = true;
submitButton.buttonMode = true;

//button create
const resetButton = new PIXI.Graphics();
resetButton.beginFill(0x008000);
resetButton.drawRect(0, 0, 400, 60); // Adjust size as needed
resetButton.position.set(
  (app.renderer.width - 350) / 2,
  app.renderer.height - 100
); // Position at the bottom center
resetButton.interactive = true;
resetButton.buttonMode = true;

// Add the control point to the shape container

// shapeContainer.addChild(controlPoint);

// Text style for the button label
const buttonTextStyle = new PIXI.TextStyle({
  fill: "white",
  fontSize: 20,
});

// Text for the button label
 //button must be disabled after 1 click
const buttonText = new PIXI.Text(
  "\nপিথাগোরাসের প্রতিপাদন দেখুন\n",
  buttonTextStyle
);
const rersetButtonText = new PIXI.Text(
  "\nপুনরায় দেখুন\n",
  buttonTextStyle
);
buttonText.position.set(
  submitButton.width / 2 - buttonText.width / 2,
  submitButton.height / 2 - buttonText.height / 2
);
rersetButtonText.position.set(
  resetButton.width / 2 - rersetButtonText.width / 2,
  resetButton.height / 2 - rersetButtonText.height / 2
);
submitButton.addChild(buttonText);
resetButton.addChild(rersetButtonText);
app.stage.addChild(resetButton);
app.stage.addChild(submitButton);


// rebuild the triangle and square
function drawElements(a,b,squareLength){

  // Remove the previous shapes
  // app.stage.removeChild(shapeContainer);
  // Trtangle style

triangle1.clear();
triangle2.clear();
triangle3.clear();
triangle4.clear();
shapeContainer.clear();


triangle1.beginFill(0x8d1414); // Fill color
triangle1.lineStyle(1, 0xffffff); // Line style
triangle2.beginFill(0x8d1414); // Fill color
triangle2.lineStyle(1, 0xffffff);
triangle3.beginFill(0x8d1414); // Fill color
triangle3.lineStyle(1, 0xffffff);
triangle4.beginFill(0x8d1414); // Fill color
triangle4.lineStyle(1, 0xffffff);
shapeContainer.beginFill(0xa485b3);
shapeContainer.lineStyle(2, 0xffffff);
// shapeContainer.endFill();


  // Draw the triangles
  triangle1.drawPolygon([0, 0, 0, b, a, b]);
  triangle2.drawPolygon([0, a, b, a, b, 0]);
  triangle3.drawPolygon([0, 0, a, b, a, 0]);
  triangle4.drawPolygon([0, 0, 0, a, b, 0]);

  // Draw the outersquare

  shapeContainer.drawPolygon([0, 0, 0, a + b, a + b, a + b, a + b, 0]);
  shapeContainer.x = position.x - squareLength/2 ;
  shapeContainer.y = position.y / 2  ;
  // console.log('scp: ', shapeContainer.y, app.stage.height / 2, squareLength/2);

   //position define in the square
  triangle1.y = a;
  triangle1.x = 0;
  triangle2.x = a;
  triangle2.y = b;
  triangle3.x = b;
  triangle3.y = 0;
  triangle4.y = 0;
  triangle4.x = 0;
  controlPoint.x = squareLength;
  controlPoint.y = squareLength;
  controlPoint1.x = a;
  controlPoint1.y = squareLength;
  controlPoint2.x = 0;
  controlPoint2.y = a;
}

// Event listener to handle stretching behavior
controlPoint.on("pointerdown", (event) => {
  
  const onPointerMove = (event) => {
    const newPosition = event.data.getLocalPosition(controlPoint.parent); // Get the current position of the pointer
    let newSquareLength = Math.min((Math.max(newPosition.x, newPosition.y,100)),600);
    a = (a*newSquareLength/(squareLength));
    b = newSquareLength - a;
    squareLength = newSquareLength;
    shapeContainer.clear();
    drawElements(a,b,squareLength);
  };

  const onPointerUp = () => {
    app.renderer.plugins.interaction.off("pointermove", onPointerMove);
    app.renderer.plugins.interaction.off("pointerup", onPointerUp);
  };

  app.renderer.plugins.interaction.on("pointermove", onPointerMove);
  app.renderer.plugins.interaction.on("pointerup", onPointerUp);
});

// Event listener to handle stretching behavior of triangle
controlPoint1.on("pointerdown", (event) => {
  
  const onPointerMove = (event) => {
    const newPosition = event.data.getLocalPosition(controlPoint1.parent); // Get the current position of the pointer
    a = Math.min((Math.max(newPosition.x,50)),squareLength-50);
    b = squareLength - a;
    shapeContainer.clear();
    drawElements(a,b,squareLength);
  };

  const onPointerUp = () => {
    app.renderer.plugins.interaction.off("pointermove", onPointerMove);
    app.renderer.plugins.interaction.off("pointerup", onPointerUp);
  };

  app.renderer.plugins.interaction.on("pointermove", onPointerMove);
  app.renderer.plugins.interaction.on("pointerup", onPointerUp);
});

// Event listener to handle stretching behavior of triangle 2
controlPoint2.on("pointerdown", (event) => {
  
  const onPointerMove = (event) => {
    const newPosition = event.data.getLocalPosition(controlPoint2.parent); // Get the current position of the pointer
    a = Math.min((Math.max(newPosition.y,50)),squareLength-50);
    b = squareLength - a;
    shapeContainer.clear();
    drawElements(a,b,squareLength);
  };

  const onPointerUp = () => {
    app.renderer.plugins.interaction.off("pointermove", onPointerMove);
    app.renderer.plugins.interaction.off("pointerup", onPointerUp);
  };

  app.renderer.plugins.interaction.on("pointermove", onPointerMove);
  app.renderer.plugins.interaction.on("pointerup", onPointerUp);
});

// Event listener for the submit button

submitButton.on("pointerdown", () => {
  let tick = 0;
  const tf = 30;

  // Ticker for animation
  const animationTicker = app.ticker.add(() => {
    tick += 0.1;

    // Perform animation
    if (tick < tf) {
      // Your animation logic goes here
      // For example, change the position of the triangles

      // Move triangle1 diagonally down-right
      triangle1.y = a - (tick * a) / tf;
      triangle1.x = (tick * b) / tf;
      controlPoint1.y = a - (tick * a) / tf;
      controlPoint1.x = (tick * b) / tf;
      controlPoint2.y = a - (tick * a) / tf;
      controlPoint2.x = (tick * b) / tf;
      triangle2.x = a - (tick * a) / tf;
      triangle4.y = (tick * b) / tf;
    }

    // Reset tick to avoid overflowing
    // tick = tick % 50;
  });
  //   const bsquare = new PIXI.Text("b^2", textStyle);
  //   bsquare.x = triangle1.width / 2-60 ;
  //   bsquare.y = triangle1.height / 2;
  //   triangle1.addChild(bsquare);
  controlPoint.interactive = false;
  controlPoint1.interactive = false;
  controlPoint2.interactive = false;
  submitButton.interactive = false;
});

// Event listener for the reset button
resetButton.on("pointerdown", () => {
  // Remove the previous shapes
  shapeContainer.clear();
  drawElements(a,b,squareLength);
  controlPoint.interactive = true;
  controlPoint1.interactive = true;
  controlPoint2.interactive = true;
  submitButton.interactive = true;
});

drawElements(a,b,squareLength);
