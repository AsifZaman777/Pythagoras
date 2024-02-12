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
    fill: 'white',
    fontSize: 40,
});

const text = new PIXI.Text('পিথাগোরাসের উপপাদ্য প্রমান', textStyle);
text.x = labelContainer.width / 2 - 250;
text.y = labelContainer.height / 2 - 20;
labelContainer.addChild(text);

// Define the sides
let a = 200;
let b = 100;
let squareLength = a + b;

const triangle1 = new PIXI.Graphics();
const triangle2 = new PIXI.Graphics();
const triangle3 = new PIXI.Graphics();
const triangle4 = new PIXI.Graphics();

triangle1.beginFill(0xFF0000); // Fill color
triangle1.lineStyle(2, 0xFFFFFF); // Line style

// Draw the triangles
triangle1.drawPolygon([
    0, 0,
    0, b,
    a, b
]);


triangle2.beginFill(0xFF0000); // Fill color
triangle2.lineStyle(2, 0xFFFFFF);

triangle2.drawPolygon([
    0, a,
    b, a,
    b, 0
]);

triangle3.beginFill(0xFF0000); // Fill color
triangle3.lineStyle(2, 0xFFFFFF);

triangle3.drawPolygon([
    0, 0,
    a, b,
    a, 0
]);

triangle4.beginFill(0xFF0000); // Fill color
triangle4.lineStyle(2, 0xFFFFFF);
triangle4.drawPolygon([
    0, 0,
    0, a,
    b, 0
]);


// Draw the square
const shapeContainer = new PIXI.Graphics();
shapeContainer.beginFill(0xFFF000);
shapeContainer.drawPolygon([
    0, 0,
    0, a + b,
    a + b, a + b,
    a + b, 0
]);
shapeContainer.endFill();

shapeContainer.x = app.stage.width / 2 - squareLength / 2;
shapeContainer.y = app.stage.height / 2 + squareLength;

app.stage.addChild(shapeContainer);
shapeContainer.addChild(triangle1);
shapeContainer.addChild(triangle2);
shapeContainer.addChild(triangle3);
shapeContainer.addChild(triangle4);

//position define in the square
triangle1.y=a;
triangle2.x=a;
triangle2.y=b;
triangle3.x=b;

