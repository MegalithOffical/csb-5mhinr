/* eslint-disable require-yield, eqeqeq */

import {
  Stage as StageBase,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Stage extends StageBase {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("backdrop1", "./Stage/costumes/backdrop1.svg", {
        x: 240,
        y: 180
      })
    ];

    this.sounds = [new Sound("pop", "./Stage/sounds/pop.wav")];

    this.triggers = [
      new Trigger(
        Trigger.KEY_PRESSED,
        { key: "space" },
        this.whenKeySpacePressed
      ),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.KEY_PRESSED, { key: "1" }, this.whenKey1Pressed),
      new Trigger(Trigger.KEY_PRESSED, { key: "2" }, this.whenKey2Pressed)
    ];

    this.vars.hidepath = 0;
    this.vars.fps = 31.249999999850786;
    this.vars.counter = 1511.862;

    this.watchers.fps = new Watcher({
      label: "FPS",
      style: "large",
      visible: true,
      value: () => this.vars.fps,
      x: 254,
      y: 168
    });
  }

  *whenKeySpacePressed() {
    this.sprites["Cat"].createClone();
  }

  *whenGreenFlagClicked() {
    this.vars.hidepath = 0;
    while (true) {
      while (!(this.vars.hidepath == 1)) {
        this.broadcast("hide path");
        yield;
      }
      yield;
    }
  }

  *whenKey1Pressed() {
    this.vars.hidepath = 0;
  }

  *whenKey2Pressed() {
    this.vars.hidepath = 1;
  }
}
