// destructuring object that received from matter.js library
const {
  Engine,
  World,
  Render,
  Runner,
  Bodies
} = Matter;

// var for cells in Maze generation
const cells = 3;

// width and height for canvas
const width = 600;
const height = 600;

const engine = Engine.create();
const {
  world
} = engine;
const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    wireframes: true, // make the shapes solid if false
    width,
    height
  }
});

Render.run(render);
Runner.run(Runner.create(), engine);

// Walls
const walls = [
  // the first two value is for center point of the shape
  //top
  Bodies.rectangle((width / 2), 0, width, 40, {
    isStatic: true
  }),
  //bottom
  Bodies.rectangle(width / 2, height, width, 40, {
    isStatic: true
  }),
  // left
  Bodies.rectangle(0, height / 2, 40, height, {
    isStatic: true
  }),
  // right
  Bodies.rectangle(width, height / 2, 40, height, {
    isStatic: true
  })
];

// add walls to world
World.add(world, walls);


// Maze generation
// Array(n) make an array with n elements in it
const grid = Array(cells)
  .fill(null)
  .map(() => Array(cells).fill(false));

// make verticals and horizontal array for the grid line;
const verticals = Array(cells)
  .fill(null).map(() => Array(cells - 1).fill(false));

const horizontals = Array(cells - 1)
  .fill(null).map(() => Array(cells).fill(false));