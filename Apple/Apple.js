/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Apple extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("apple", "./Apple/costumes/apple.svg", {
        x: 41.49999999999994,
        y: 44.00000000000003
      })
    ];

    this.sounds = [new Sound("Chomp", "./Apple/sounds/Chomp.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked)
    ];
  }

  *whenGreenFlagClicked() {
    /* TODO: Implement sensing_setdragmode */ null;
    while (true) {
      while (!this.mouse.down) {
        yield;
      }
      this.broadcast("reset path");
      this.broadcast("find path");
      yield;
    }
  }
}
