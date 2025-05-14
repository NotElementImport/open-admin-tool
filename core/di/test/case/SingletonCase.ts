import { test } from "node:test";
import { fail } from "node:assert";
import { DependencyInjection } from "../../domain/DependicyInjection.js";
import { CreateTokenService } from "../../../object/service/CreateTokenService.js";

class SingletonDI { }

test("DI: Singleton -> Class", () => {
  const di = new DependencyInjection();
  di.singleton(SingletonDI, SingletonDI);

  if (di.inject(SingletonDI) !== di.inject(SingletonDI)) {
    fail("Instances not same");
  }
});

test("DI: Singleton -> Builder", () => {
  const di = new DependencyInjection();
  di.singleton(SingletonDI, () => new SingletonDI());

  if (di.inject(SingletonDI) !== di.inject(SingletonDI)) {
    fail("Instances not same");
  }
});

test("DI: Singleton -> Interface", () => {
  const token = CreateTokenService.createToken();

  const di = new DependencyInjection();
  di.singleton(token, SingletonDI);

  if (di.inject(token) !== di.inject(token)) {
    fail("Instances not same");
  }
});
