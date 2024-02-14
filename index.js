const app = new PIXI.Application({
  backgroundColor: 0xaaaaaa,
  resizeTo: window,
});
document.body.appendChild(app.view);

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

triangle1.beginFill(0x8d1414); // Fill color
triangle1.lineStyle(2, 0xffffff); // Line style

// Draw the triangles
triangle1.drawPolygon([0, 0, 0, b, a, b]);

triangle2.beginFill(0x8d1414); // Fill color
triangle2.lineStyle(2, 0xffffff);

triangle2.drawPolygon([0, a, b, a, b, 0]);

triangle3.beginFill(0x8d1414); // Fill color
triangle3.lineStyle(2, 0xffffff);

triangle3.drawPolygon([0, 0, a, b, a, 0]);

triangle4.beginFill(0x8d1414); // Fill color
triangle4.lineStyle(2, 0xffffff);
triangle4.drawPolygon([0, 0, 0, a, b, 0]);

// Draw the outersquare
const shapeContainer = new PIXI.Graphics();
shapeContainer.beginFill(0xa485b3);
shapeContainer.drawPolygon([0, 0, 0, a + b, a + b, a + b, a + b, 0]);
shapeContainer.lineStyle(2, 0xffffff);
shapeContainer.endFill();

shapeContainer.x = app.stage.width / 2 - squareLength / 2;
shapeContainer.y = app.stage.height / 2 + squareLength;

app.stage.addChild(shapeContainer);
shapeContainer.addChild(triangle1);
shapeContainer.addChild(triangle2);
shapeContainer.addChild(triangle3);
shapeContainer.addChild(triangle4);

function pythVisualizer(a, b, squareLength) {
  //position define in the square
  triangle1.y = a;
  triangle2.x = a;
  triangle2.y = b;
  triangle3.x = b;

  //button create
  const submitButton = new PIXI.Graphics();
  submitButton.beginFill(0x008000);
  submitButton.drawRect(0, 0, 400, 60); // Adjust size as needed
  submitButton.position.set(
    (app.renderer.width - 350) / 2,
    app.renderer.height - 900
  ); // Position at the bottom center
  submitButton.interactive = true;
  submitButton.buttonMode = true;

  // Text style for the button label
  const buttonTextStyle = new PIXI.TextStyle({
    fill: "white",
    fontSize: 20,
  });

  // Text for the button label
  const buttonText = new PIXI.Text(
    "\nপিথাগোরাসের প্রতিপাদন দেখুন\n",
    buttonTextStyle
  );
  buttonText.position.set(
    submitButton.width / 2 - buttonText.width / 2,
    submitButton.height / 2 - buttonText.height / 2
  );
  submitButton.addChild(buttonText);
  app.stage.addChild(submitButton);

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
  });

  ///button must be disabled after 1 click

  const controlPoint = new PIXI.Graphics();
  controlPoint.beginFill(0x0000ff); // Color of the control point
  controlPoint.drawCircle(0, -2, 10); // Adjust size as needed
  controlPoint.endFill();
  controlPoint.interactive = true;
  controlPoint.buttonMode = true;
  controlPoint.position.set(shapeContainer.width, shapeContainer.height); // Position at the bottom-right corner

  // Event listener to handle stretching behavior
  controlPoint.on("pointerdown", (event) => {
    const originalPosition = event.data.getLocalPosition(shapeContainer.parent);
    const originalSize = {
      width: shapeContainer.width,
      height: shapeContainer.height,
    }; // Get the initial size of the square

    const onPointerMove = (event) => {
      const newPosition = event.data.getLocalPosition(shapeContainer.parent); // Get the current position of the pointer

      // Calculate the difference in position to determine stretching
      const dx = newPosition.x - originalPosition.x;
      const dy = newPosition.y - originalPosition.y;
      const findMax = Math.max(dy, dx);

      // Update the size of the square based on the pointer movement
      shapeContainer.width = Math.max(originalSize.width + findMax, 100);
      shapeContainer.height = Math.max(originalSize.height + findMax, 100);
    };

    const onPointerUp = () => {
      app.renderer.plugins.interaction.off("pointermove", onPointerMove);
      app.renderer.plugins.interaction.off("pointerup", onPointerUp);
    };

    app.renderer.plugins.interaction.on("pointermove", onPointerMove);
    app.renderer.plugins.interaction.on("pointerup", onPointerUp);
  });

  // Add the control point to the shape container
  shapeContainer.addChild(controlPoint);

  
shapeContainer.addChild(controlPoint);


//check control point touch 
triangleBaseControler = false;
triangleHeightControler = false;

// add two control points for the triangle1 to change the a and b value 
const controlPoint1 = new PIXI.Graphics();
controlPoint1.beginFill(0x0000FF); // Color of the control point
controlPoint1.drawCircle(-15, -5, 10); // Adjust size as needed
controlPoint1.endFill();
controlPoint1.interactive = true;
controlPoint1.buttonMode = true;
controlPoint1.position.set(triangle1.width, triangle1.height); // Position at the bottom-right corner
triangle1.addChild(controlPoint1);

// Event listener to adjust only horizontal value


controlPoint1.on('pointerdown', (event) => {
  const originalPosition = event.data.getLocalPosition(triangle1.parent);
  const originalWidth = triangle1.width; // Get the initial width of the triangle

  const onPointerMove = (event) => {
      const newPosition = event.data.getLocalPosition(triangle1.parent); // Get the current position of the pointer
      const dx = newPosition.x - originalPosition.x; // Calculate the horizontal movement

      // Update the width of the triangle based on the horizontal movement
      triangle1.width = Math.max(originalWidth + dx, 100); // Ensure the width doesn't become negative
      b = triangle1.width;
      
      // dont cross the square length
      if(triangle1.width > squareLength){
        triangle1.width = squareLength;
      }
      //dont cross triangle2 
      if(triangle1.width> triangle2.x){
        triangle1.width = triangle2.x+20;
      }

  };

  const onPointerUp = () => {
      app.renderer.plugins.interaction.off('pointermove', onPointerMove);
      app.renderer.plugins.interaction.off('pointerup', onPointerUp);
  };

  app.renderer.plugins.interaction.on('pointermove', onPointerMove);
  app.renderer.plugins.interaction.on('pointerup', onPointerUp);
});


const controlPoint2 = new PIXI.Graphics();
controlPoint2.beginFill(0x0000FF); // Color of the control point
controlPoint2.drawCircle(-5, -15, 10); // Adjust size as needed
controlPoint2.endFill();
controlPoint2.interactive = true;
controlPoint2.buttonMode = true;
controlPoint2.position.set(0, 0); // Position at the bottom-right corner
triangle1.addChild(controlPoint2);
}


