import { test } from "node:test";
import { strictEqual } from "node:assert";
import { Route } from "../../domain/Route.js";

test("Route: Healthcheck", () => {
  strictEqual(new Route("") instanceof Route, true);
});

test("Route: Cloning", () => {
  const originalRoute = new Route("/test");
  const clone = originalRoute.clone();

  strictEqual(clone instanceof Route, true);
  strictEqual(originalRoute !== clone, true);
  strictEqual(originalRoute.path === clone.path, true);
});
