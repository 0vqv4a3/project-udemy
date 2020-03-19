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

// unitLeng is the length of one side of cells either it's vertical or horizontal line
const unitLength = width / cells;

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

// Walls (frame)
const outBoundsWalls = [
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
World.add(world, outBoundsWalls);



// Maze generation

// .. shuffle an array of coordinate
const shuffle = (arr) => {
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
const grid = Array(cells)
  .fill(null)
  .map(() => Array(cells).fill(false));

// make verticals and horizontal array for the grid line;
const verticals = Array(cells)
  .fill(null).map(() => Array(cells - 1).fill(false));

const horizontals = Array(cells - 1)
  .fill(null).map(() => Array(cells).fill(false));



// build starting point use row and column as x and y axis of the maze in grid
const startRow = Math.floor(Math.random() * cells);
const startColumn = Math.floor(Math.random() * cells);


const mazeAlgorithm = (row, column) => {
  // If i have visited the cell at [row, column], then return
  if (grid[row][column]) {
    return;
  }

  // Mark this cells as being visited
  grid[row][column] = true;

  // assembly randomly-ordered list of neighbor
  const neighbors = shuffle([
    [(row - 1), column, 'up'],
    [row, (column + 1), 'right'],
    [(row + 1), column, 'down'],
    [row, (column - 1), 'left'],
  ]);


  // For each of neighbors...
  for (let neighbor of neighbors) {
    const [nextRow, nextColumn, direction] = neighbor;

    // See if that neighbor is out of bounds
    if (
      nextRow < 0 ||
      nextRow >= cells ||
      nextColumn < 0 ||
      nextColumn >= cells) {
      continue;
    }

    // If we have visited that neighbor, continue to next neighbor
    if (grid[nextRow][nextColumn]) {
      continue;
    }
    // Remove a wall either verticals or horizontals
    if (direction === 'right') {
      verticals[row][column] = true;
    } else if (direction === 'left') {
      verticals[row][column - 1] = true;
    } else if (direction === 'up') {
      horizontals[row - 1][column] = true;
    } else if (direction === 'down') {
      horizontals[row][column] = true;
    }
    // Visit the next cell
    mazeAlgorithm(nextRow, nextColumn);
  }

}

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
      columnIndex * unitLength + (unitLength / 2),
      rowIndex * unitLength + unitLength, unitLength, 3, {
        isStatic: true
      }
    );

    World.add(world, wall);
  })
});

//Verticals lines
verticals.forEach((row, rowIndex) => {
  row.forEach((open, columnIndex) => {
    // open is column value and it's a boolean
    if (open) {
      return;
    }
    const wall = Bodies.rectangle(
      columnIndex * unitLength + unitLength,
      rowIndex * unitLength + (unitLength / 2),
      4, unitLength, {
        isStatic: true
      });

    World.add(world, wall);
  });

});