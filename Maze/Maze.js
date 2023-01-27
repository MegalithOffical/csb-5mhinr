/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Maze extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Maze/costumes/costume1.svg", {
        x: 241.82057,
        y: 182.194515
      }),
      new Costume(
        "20 by 20 orthogonal maze",
        "./Maze/costumes/20 by 20 orthogonal maze.png",
        { x: 322, y: 322 }
      ),
      new Costume(
        "Triangular delta maze with 20 cells side",
        "./Maze/costumes/Triangular delta maze with 20 cells side.png",
        { x: 362, y: 282 }
      ),
      new Costume("download (1)", "./Maze/costumes/download (1).svg", {
        x: 362.59876344233726,
        y: 358.45461929819294
      })
    ];

    this.sounds = [new Sound("pop", "./Maze/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked2)
    ];
  }

  *whenGreenFlagClicked() {
    this.goto(0, 0);
  }

  *whenGreenFlagClicked2() {
    this.restartTimer();
    this.stage.vars.counter += 0;
    while (true) {
      this.stage.vars.fps = 1 / (this.timer - this.stage.vars.counter);
      this.stage.vars.counter = this.timer;
      yield;
    }
  }
}
