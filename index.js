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

}

pythVisualizer(a,b,squareLength);

//control points in the triangle1 
const b_pointControlPanel = new PIXI.Graphics();
b_pointControlPanel.beginFill(0x0000ff); // Color of the control point
b_pointControlPanel.drawCircle(0, 0, 10); // Adjust size as needed
b_pointControlPanel.endFill();
b_pointControlPanel.interactive = true;
b_pointControlPanel.buttonMode = true;
b_pointControlPanel.position.set(0,0 ); // Position at the bottom-right corner

const a_pointControlPanel = new PIXI.Graphics();
a_pointControlPanel.beginFill(0x000000); // Color of the control point
a_pointControlPanel.drawCircle(0, 0, 10); // Adjust size as needed
a_pointControlPanel.endFill();
a_pointControlPanel.interactive = true;
a_pointControlPanel.buttonMode = true;
a_pointControlPanel.position.set(triangle1.width,triangle1.height ); // Position at the bottom-right corner

// add the control points in the triangle1 
triangle1.addChild(a_pointControlPanel);
triangle1.addChild(b_pointControlPanel);











