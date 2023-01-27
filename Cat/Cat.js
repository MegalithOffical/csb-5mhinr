/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Cat extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Cat/costumes/costume1.svg", { x: 48, y: 50 }),
      new Costume("costume2", "./Cat/costumes/costume2.svg", { x: 46, y: 53 }),
      new Costume("mask", "./Cat/costumes/mask.svg", {
        x: 23.88118300682484,
        y: 23.881183006824983
      })
    ];

    this.sounds = [new Sound("Meow", "./Cat/sounds/Meow.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(Trigger.CLONE_START, this.startAsClone2),
      new Trigger(
        Trigger.BROADCAST,
        { name: "reset path" },
        this.whenIReceiveResetPath
      )
    ];

    this.vars.nextDir = 0;
  }

  *getNextDirection() {
    this.costume = "mask";
    if (this.touching(Color.rgb(230, 246, 255))) {
      this.vars.nextDir = 0;
    } else {
      if (this.touching(Color.rgb(249, 228, 255))) {
        this.vars.nextDir = 90;
      } else {
        if (this.touching(Color.rgb(255, 228, 228))) {
          this.vars.nextDir = 180;
        } else {
          if (this.touching(Color.rgb(230, 255, 232))) {
            this.vars.nextDir = -90;
          } else {
            null;
          }
        }
      }
    }
  }

  *followPath() {
    while (true) {
      this.move(4);
      yield* this.getNextDirection();
      yield* this.turnTowardsWithSmoothing(this.vars.nextDir, 3);
      this.costume = "mask";
      yield;
    }
  }

  *whenGreenFlagClicked() {
    this.visible = false;
  }

  *turnTowardsWithSmoothing(direction, smooth) {
    this.direction -= direction;
    this.direction += direction - this.direction / smooth;
  }

  *startAsClone() {
    yield* this.wait(0);
    this.goto(this.mouse.x, this.mouse.y);
    this.visible = true;
    yield* this.getNextDirection();
    this.direction = this.vars.nextDir;
    while (
      !(
        this.touching("edge") ||
        this.touching(this.sprites["Apple"].andClones())
      )
    ) {
      yield;
    }
    for (let i = 0; i < 1; i++) {
      this.effects.ghost += 100;
      yield;
    }
    this.deleteThisClone();
  }

  *startAsClone2() {
    yield* this.wait(0);
    yield* this.followPath();
  }

  *whenIReceiveResetPath() {
    this.deleteThisClone();
  }
}
