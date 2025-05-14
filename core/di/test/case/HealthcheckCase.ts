import { test } from "node:test";
import { notEqual } from "node:assert";
import { DependencyInjection } from "../../domain/DependicyInjection.js";

class TestDI { }

test("DI: Healthcheck", () => {
  const di = new DependencyInjection();

  di.singleton(TestDI, TestDI);

  notEqual(di.inject(TestDI), null);
});
