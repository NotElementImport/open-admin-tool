import { test } from "node:test";
import { strictEqual } from "node:assert";
import { App } from "../../domain/App.js";
import { Module } from "../../domain/Module.js";

class TestModule extends Module {
  public constructor(
    private onEventCall: Function
  ) { super(); }

  public onInit(app: App<any>): void {
    app.events.on("test", () => {
      this.onEventCall();
    });
  }
}

test("Module: Healthcheck", () => {
  const app = new App<any>();
  let isDone = false;

  app.DI.addSingleton(TestModule, () => new TestModule(() => isDone = true));
  app.addModule(TestModule).serverRun();
  app.events.dispatch("test");

  strictEqual(isDone, true);
});
