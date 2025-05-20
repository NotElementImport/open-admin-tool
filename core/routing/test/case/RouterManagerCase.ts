import { test } from "node:test";
import { strictEqual } from "node:assert";
import { RouteManager } from "../../domain/RouteManager.js";
import { Route } from "../../domain/Route.js";

test("Route Manager: Healthcheck", () => {
  strictEqual(new RouteManager() instanceof RouteManager, true);
});

const testRoute = new Route("/test");

test("Route Manager: Add Route", () => {
  const routeManager = new RouteManager();

  routeManager.add(testRoute);

  strictEqual(routeManager.has("/test"), true);
  strictEqual(routeManager.has(testRoute), true);
});

test("Route Manager: Child Manager", () => {
  const routeManager = new RouteManager("/journals");
  routeManager.add(testRoute);
  const jTest = new RouteManager("/j_test");
  jTest.add(testRoute);
  routeManager.add(jTest);

  strictEqual(routeManager.has("/journals/j_test/test"), true);
  strictEqual(routeManager.has("/journals/test"), true);
});
