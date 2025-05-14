import { test } from "node:test";
import { strictEqual } from "node:assert";
import { App } from "../../domain/App.js";

class DITest { }

test("App: Dependicy Injection -> Factory", () => {
  const app = new App();

  app.DI.addFactory(DITest);

  strictEqual(app.DI.inject(DITest) instanceof DITest, true);
});

test("App: Dependicy Injection -> Singleton", () => {
  const app = new App();

  app.DI.addSingleton(DITest);

  strictEqual(app.DI.inject(DITest) === app.DI.inject(DITest), true);
});
