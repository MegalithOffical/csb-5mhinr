/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Path extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("up", "./Path/costumes/up.svg", {
        x: 14.899999999999977,
        y: 16.025000000000006
      }),
      new Costume("right", "./Path/costumes/right.svg", {
        x: 14.899999999999977,
        y: 16.025000000000034
      }),
      new Costume("down", "./Path/costumes/down.svg", {
        x: 14.899999999999977,
        y: 16.025000000000034
      }),
      new Costume("left", "./Path/costumes/left.svg", {
        x: 14.899999999999977,
        y: 15.899999999999977
      })
    ];

    this.sounds = [new Sound("pop", "./Path/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(
        Trigger.BROADCAST,
        { name: "reset path" },
        this.whenIReceiveResetPath
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "find path" },
        this.whenIReceiveFindPath
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "hide path" },
        this.whenIReceiveHidePath
      )
    ];
  }

  *whenGreenFlagClicked() {
    yield* this.findPath();
  }

  *tryMovingInAllDirections() {
    for (let i = 0; i < 4; i++) {
      this.size = 300;
      this.move(32);
      this.size = 100;
      if (!this.touching(Color.rgb(0, 0, 0))) {
        this.createClone();
      }
      this.move(-32);
      this.direction += 90;
      this.costumeNumber += 1;
    }
  }

  *startAsClone() {
    yield* this.tryMovingInAllDirections();
    while (true) {
      this.visible = true;
      yield;
    }
  }

  *whenIReceiveResetPath() {
    this.deleteThisClone();
  }

  *whenIReceiveFindPath() {
    yield* this.findPath();
  }

  *findPath() {
    this.visible = true;
    this.goto(this.sprites["Apple"].x, this.sprites["Apple"].y);
    this.direction = 0;
    this.costume = "up";
    this.moveBehind();
    yield* this.wait(0);
    if (!this.touching(Color.rgb(0, 0, 0))) {
      this.warp(this.tryMovingInAllDirections)();
    }
  }

  *whenIReceiveHidePath() {
    this.visible = false;
  }
}
