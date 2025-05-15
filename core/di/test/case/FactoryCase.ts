import { describe, test } from "node:test";
import { strictEqual } from "node:assert";
import { DependencyInjection } from "../../domain/DependicyInjection.js";
import { CreateTokenService } from "../../../object/service/CreateTokenService.js";

class FactoryDI { }

describe("DI Must can create Factory, factory instances must be uniq", () => {
  test("DI: Factory -> Class", () => {
    const di = new DependencyInjection();
    di.factory(FactoryDI, FactoryDI);

    strictEqual(di.inject(FactoryDI) instanceof FactoryDI, true);
  });

  test("DI: Factory -> Builder", () => {
    const di = new DependencyInjection();
    di.factory(FactoryDI, () => new FactoryDI());

    strictEqual(di.inject(FactoryDI) instanceof FactoryDI, true);
  });

  test("DI: Factory -> Interface", () => {
    const token = CreateTokenService.createToken();

    const di = new DependencyInjection();
    di.factory(token, FactoryDI);

    strictEqual(di.inject(token) instanceof FactoryDI, true);
  });
});
