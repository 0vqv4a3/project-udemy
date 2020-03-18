// destructuring object that received from matter.js library
const {
  Engine,
  World,
  Render,
  Runner,
  Bodies,
  MouseConstraint,
  Mouse
} = Matter;

const width = 800;
const height = 600;

const engine = Engine.create();
const { world } = engine;
const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    wireframes: false, // make the shapes solid
    width,
    height
  }
});

Render.run(render);
Runner.run(Runner.create(), engine);

// add MouseConstrain for mouse event like drag, drop , click and collission shape
World.add(
  world,
  MouseConstraint.create(engine, {
    mouse: Mouse.create(render.canvas)
  })
);

// Walls
const walls = [
  // canvas height 600 and width 800
  //top
  Bodies.rectangle(400, 0, 800, 40, {
    isStatic: true
  }),
  //bottom
  Bodies.rectangle(400, 600, 800, 40, {
    isStatic: true
  }),
  // left
  Bodies.rectangle(0, 300, 40, 600, {
    isStatic: true
  }),
  // right
  Bodies.rectangle(800, 300, 40, 600, {
    isStatic: true
  })
];

// add walls to world
World.add(world, walls);

//random shapes
for (let i = 0; i < 50; i++) {
  // const random = Math.random();
  if (Math.random() > 0.5) {
    World.add(
      world,
      Bodies.rectangle(Math.random() * width, Math.random() * height, 50, 50)
    );
  } else {
    World.add(
      world,
      Bodies.circle(Math.random() * width, Math.random() * height, 35, {
        fillStyle: "salmon"
      })
    );
  }
}
