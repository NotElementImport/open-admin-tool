import { test } from "node:test";
import { strictEqual } from "node:assert";
import { App } from "../../domain/App.js";

test("App: Healthcheck", () => {
  strictEqual(new App() instanceof App, true);
});
