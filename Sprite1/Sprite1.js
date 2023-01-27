/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Sprite1 extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Sprite1/costumes/costume1.svg", { x: 2, y: 3 })
    ];

    this.sounds = [new Sound("pop", "./Sprite1/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.KEY_PRESSED, { key: "w" }, this.whenKeyWPressed),
      new Trigger(Trigger.KEY_PRESSED, { key: "q" }, this.whenKeyQPressed),
      new Trigger(Trigger.KEY_PRESSED, { key: "e" }, this.whenKeyEPressed)
    ];
  }

  *whenGreenFlagClicked() {
    this.clearPen();
    this.penSize = 10;
    this.penDown = false;
    this.penColor = Color.rgb(0, 0, 0);
    while (true) {
      this.goto(this.mouse.x, this.mouse.y);
      yield;
    }
  }

  *whenKeyWPressed() {
    this.penDown = true;
  }

  *whenKeyQPressed() {
    this.clearPen();
  }

  *whenKeyEPressed() {
    this.penDown = false;
  }
}
