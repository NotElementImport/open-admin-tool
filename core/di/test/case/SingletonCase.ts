import { test } from "node:test";
import { fail, strictEqual } from "node:assert";
import { DependencyInjection } from "../../domain/DependicyInjection.js";
import { CreateTokenService } from "../../../object/service/CreateTokenService.js";

class SingletonDI { }

test("DI: Singleton -> Class", () => {
  const di = new DependencyInjection();
  di.singleton(SingletonDI, SingletonDI);

  strictEqual(di.inject(SingletonDI) === di.inject(SingletonDI), true);
});

test("DI: Singleton -> Builder", () => {
  const di = new DependencyInjection();
  di.singleton(SingletonDI, () => new SingletonDI());

  strictEqual(di.inject(SingletonDI) === di.inject(SingletonDI), true);
});

test("DI: Singleton -> Interface", () => {
  const token = CreateTokenService.createToken();

  const di = new DependencyInjection();
  di.singleton(token, SingletonDI);

  strictEqual(di.inject(token) === di.inject(token), true);
});
