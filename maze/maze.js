// destructuring object that received from matter.js library
const {
  Engine,
  World,
  Render,
  Runner,
  Bodies,
  Body, // Body is added for manipulating shape like its velocity for movement and coordinate, its matter.js library obj
  Events // its added for collision for detecting a win
} = Matter;

// var for cells in Maze generation
const cellsHorizontal = 30; // numbers of column
const cellsVertical = 30; // numbers of rows

// width and height for canvas
const width = window.innerWidth;
const height = window.innerHeight;

// unitLeng is the length of one side of cells either it's vertical or horizontal line
const unitLengthX = width / cellsHorizontal;
const unitLengthY = height / cellsVertical;

const engine = Engine.create();
engine.world.gravity.y = 0; // disabling gravity
const { world } = engine;
const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    wireframes: false, // make the shapes solid if false
    width,
    height
  }
});

Render.run(render);
Runner.run(Runner.create(), engine);

// Walls (frame)
const outBoundsWalls = [
  // the first two value is for center point of the shape
  //top
  Bodies.rectangle(width / 2, 0, width, 2, {
    isStatic: true
  }),
  //bottom
  Bodies.rectangle(width / 2, height, width, 2, {
    isStatic: true
  }),
  // left
  Bodies.rectangle(0, height / 2, 2, height, {
    isStatic: true
  }),
  // right
  Bodies.rectangle(width, height / 2, 2, height, {
    isStatic: true
  })
];

// add walls to world
World.add(world, outBoundsWalls);

// Maze generation

// .. shuffle an array of coordinate
const shuffle = arr => {
  let counter = arr.length;

  while (counter > 0) {
    const index = Math.floor(Math.random() * counter);

    counter--;

    const temp = arr[counter];
    arr[counter] = arr[index];
    arr[index] = temp;
  }

  return arr;
};

// Array(n) make an array with n elements in it
// make grid, and set all it's initial value to false for cells that have not been visited
const grid = Array(cellsVertical)
  .fill(null)
  .map(() => Array(cellsHorizontal).fill(false));

// make verticals and horizontal array for the grid line;
const verticals = Array(cellsVertical)
  .fill(null)
  .map(() => Array(cellsVertical).fill(false));

const horizontals = Array(cellsVertical - 1)
  .fill(null)
  .map(() => Array(cellsHorizontal).fill(false));

// build starting point use row and column as x and y axis of the maze in grid
const startRow = Math.floor(Math.random() * cellsVertical);
const startColumn = Math.floor(Math.random() * cellsHorizontal);

const mazeAlgorithm = (row, column) => {
  // If i have visited the cell at [row, column], then return
  if (grid[row][column]) {
    return;
  }

  // Mark this cells as being visited
  grid[row][column] = true;

  // assembly randomly-ordered list of neighbor
  const neighbors = shuffle([
    [row - 1, column, "up"],
    [row, column + 1, "right"],
    [row + 1, column, "down"],
    [row, column - 1, "left"]
  ]);

  // For each of neighbors...
  for (let neighbor of neighbors) {
    const [nextRow, nextColumn, direction] = neighbor;

    // See if that neighbor is out of bounds
    if (
      nextRow < 0 ||
      nextRow >= cellsVertical ||
      nextColumn < 0 ||
      nextColumn >= cellsHorizontal
    ) {
      continue;
    }

    // If we have visited that neighbor, continue to next neighbor
    if (grid[nextRow][nextColumn]) {
      continue;
    }
    // Remove a wall either verticals or horizontals
    if (direction === "right") {
      verticals[row][column] = true;
    } else if (direction === "left") {
      verticals[row][column - 1] = true;
    } else if (direction === "up") {
      horizontals[row - 1][column] = true;
    } else if (direction === "down") {
      horizontals[row][column] = true;
    }
    // Visit the next cell
    mazeAlgorithm(nextRow, nextColumn);
  }
};

mazeAlgorithm(startRow, startColumn);

// Rendering the maze with matter.js based on result from mazeAlgorithm()
// horizontals line
horizontals.forEach((row, rowIndex) => {
  row.forEach((open, columnIndex) => {
    // open is the value inside horizontals row array it's value either true or false
    if (open) {
      return;
    }
    const wall = Bodies.rectangle(
      columnIndex * unitLengthX + unitLengthX / 2,
      rowIndex * unitLengthY + unitLengthY,
      unitLengthX,
      3,
      {
        label: "wall",
        isStatic: true,
        render: {
          fillStyle: "salmon"
        }
      }
    );

    World.add(world, wall);
  });
});

//Verticals lines
verticals.forEach((row, rowIndex) => {
  row.forEach((open, columnIndex) => {
    // open is column value and it's a boolean
    if (open) {
      return;
    }
    const wall = Bodies.rectangle(
      columnIndex * unitLengthX + unitLengthX,
      rowIndex * unitLengthY + unitLengthY / 2,
      4,
      unitLengthY,
      {
        label: "wall", // add label to find it easier specially for making static set to false after player win
        isStatic: true,
        render: {
          fillStyle: "salmon"
        }
      }
    );

    World.add(world, wall);
  });
});

// GOAL..

const goal = Bodies.rectangle(
  width - unitLengthX / 2,
  height - unitLengthY / 2,
  unitLengthX * 0.8,
  unitLengthY * 0.8,
  {
    label: "goal", // mark wih label so the label property of the shape is different from other with same shape.
    isStatic: true,
    render: {
      fillStyle: "green"
    }
  }
);

World.add(world, goal);

// Ball..
const ballRadius = Math.min(unitLengthX, unitLengthY) / 4;
const ball = Bodies.circle(unitLengthX / 2, unitLengthY / 2, ballRadius, {
  label: "ball",
  render: {
    fillStyle: "red"
  }
});
World.add(world, ball);

// ball Movement
document.addEventListener("keydown", event => {
  // destructuring coordinate velocity from matter.js library
  const { x, y } = ball.velocity;

  if (event.key === "w") {
    Body.setVelocity(ball, { x, y: y - 5 });
  } else if (event.key === "s") {
    Body.setVelocity(ball, { x, y: y + 5 });
  } else if (event.key === "d") {
    Body.setVelocity(ball, { x: x + 5, y });
  } else if (event.key === "a") {
    Body.setVelocity(ball, { x: x - 5, y });
  }
});

// Detecting a Win by event collisionStart from matter.js /// sideNote matter.js library just own one object for all its events and it's get reused so after and event occurs and the callback function getcalled, all of different property in event object got wipeOut;

Events.on(engine, "collisionStart", event => {
  event.pairs.forEach(collision => {
    const labels = ["ball", "goal"];

    if (
      labels.includes(collision.bodyA.label) &&
      labels.includes(collision.bodyB.label)
    ) {
      document.querySelector(".winner").classList.remove("hidden");
      world.gravity.y = 1;
      // iterate through the maze rectangle and set its static to false so it will fall apart when player win
      world.bodies.forEach(body => {
        if (body.label === "wall") {
          Body.setStatic(body, false);
        }
      });
    }
  });
});

document.querySelector("#btn-continue").addEventListener("click", () => {
  return mazeAlgorithm(startRow, startColumn);
});
