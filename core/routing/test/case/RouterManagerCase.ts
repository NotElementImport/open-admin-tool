import { test } from "node:test";
import { strictEqual } from "node:assert";
import { RouteManager } from "../../domain/RouteManager.js";
import { Route } from "../../domain/Route.js";

test("Route Manager: Healthcheck", () => {
  strictEqual(new RouteManager() instanceof RouteManager, true);
});

const rootRoute = new Route("/test");

test("Route Manager: Method -> Add", () => {
  const manager = new RouteManager();

  manager.add(rootRoute);

  strictEqual(manager.count, 1);
});

test("Route Manager: Method -> Entries", () => {
  const manager = new RouteManager();

  const temp1 = new Route("/test1");
  const temp2 = new Route("/test2");

  manager.add(rootRoute)
    .add(temp1)
    .add(temp2);

  const except = [rootRoute, temp1, temp2];

  let i = 0;
  for (const [index, value] of manager.entries()) {
    strictEqual(value, except[index]);
    i += 1;
  }

  strictEqual(i, manager.count);

  test("RouteManager: Method -> Foreach", () => {
    i = 0;
    manager.forEach((value, index) => {
      strictEqual(value, except[index]);
      i += 1;
    });
    strictEqual(i, manager.count);
  });
});

test("Route Manager: Method -> Find", () => {
  const manager = new RouteManager();

  manager.add(rootRoute);

  strictEqual(manager.find(v => v === rootRoute), rootRoute);
});

test("Route Manager: Method -> Find By Path", () => {
  const manager = new RouteManager();

  manager.add(rootRoute);

  strictEqual(manager.findByPath("/test"), rootRoute);
});

test("Route Manager: Method -> Some", () => {
  const manager = new RouteManager();

  manager.add(rootRoute);

  strictEqual(manager.some(v => v.path === "/test"), true);
});

test("Route Manager: Method -> Has", () => {
  const manager = new RouteManager();

  manager.add(rootRoute);

  strictEqual(manager.has(rootRoute), true);
  strictEqual(manager.has("/test"), true);
});

test("Route Manager: Method -> Remove", () => {
  const manager = new RouteManager();

  manager.add(rootRoute);

  strictEqual(manager.has(rootRoute), true);

  manager.remove(rootRoute);

  strictEqual(manager.has(rootRoute), false);
});

test("Route Manager: Method -> Map", () => {
  const manager = new RouteManager();

  manager.add(rootRoute);

  const newManager = manager.map((v) => new Route("/prefix" + v.path));

  strictEqual(newManager.has("/prefix/test"), true);
});
