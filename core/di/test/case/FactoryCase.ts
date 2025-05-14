import { test } from "node:test";
import { fail } from "node:assert";
import { DependencyInjection } from "../../domain/DependicyInjection.js";
import { CreateTokenService } from "../../../object/service/CreateTokenService.js";

class FactoryDI { }

test("DI: Factory -> Class", () => {
  const di = new DependencyInjection();
  di.factory(FactoryDI, FactoryDI);

  if (!(di.inject(FactoryDI) instanceof FactoryDI)) {
    fail("Instance not same class");
  }
});

test("DI: Factory -> Builder", () => {
  const di = new DependencyInjection();
  di.factory(FactoryDI, () => new FactoryDI());

  if (!(di.inject(FactoryDI) instanceof FactoryDI)) {
    fail("Instance not same class");
  }
});

test("DI: Factory -> Interface", () => {
  const token = CreateTokenService.createToken();

  const di = new DependencyInjection();
  di.factory(token, FactoryDI);

  if (!(di.inject(token) instanceof FactoryDI)) {
    fail("Instance not same class");
  }
});
