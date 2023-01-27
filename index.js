import { Project } from "https://unpkg.com/leopard@^1/dist/index.esm.js";

import Stage from "./Stage/Stage.js";
import Cat from "./Cat/Cat.js";
import Apple from "./Apple/Apple.js";
import Maze from "./Maze/Maze.js";
import Path from "./Path/Path.js";
import Sprite1 from "./Sprite1/Sprite1.js";

const stage = new Stage({ costumeNumber: 1 });

const sprites = {
  Cat: new Cat({
    x: 226.1630173469459,
    y: 180,
    direction: 7.509782275993663e-181,
    costumeNumber: 3,
    size: 30,
    visible: false,
    layerOrder: 3
  }),
  Apple: new Apple({
    x: 139.5265562535694,
    y: 98.56130997715154,
    direction: 90,
    costumeNumber: 1,
    size: 60,
    visible: true,
    layerOrder: 5
  }),
  Maze: new Maze({
    x: 0,
    y: 0,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: true,
    layerOrder: 2
  }),
  Path: new Path({
    x: 139.5265562535694,
    y: 98.56130997715155,
    direction: 0,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 1
  }),
  Sprite1: new Sprite1({
    x: -240,
    y: 140,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: true,
    layerOrder: 4
  })
};

const project = new Project(stage, sprites, {
  frameRate: 30 // Set to 60 to make your project run faster
});
export default project;
