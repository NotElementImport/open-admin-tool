import { ValidateTypeService } from "../../object/service/ValidateTypeService.js";
import { Container } from "../dto/Container.js";
import type { AnyToken, ProvideConfig } from "../interfaces.js";
import { ValidateDIService } from "./ValidateDIService.js";

export class InjectDIService {
  public constructor(
    private _container: Container
  ) { }

  public injectOrFail<T extends unknown>(token: AnyToken<T>) {
    if (!ValidateDIService.isValidToken(token) || (!this._container.table.has(token) && ValidateTypeService.isToken(token))) {
      throw new Error("Not valid token for Provide");
    }

    var config = this._container.table.get(token)
      ?? { implements: token, singleton: false } as ProvideConfig;

    const createInstance = (): T => ValidateTypeService.isConstructor(config.implements)
      ? new config.implements() as T
      : (config.implements as Function)();

    if (!config.singleton) {
      return createInstance();
    }

    var instance = this._container.tableSingletons.get(token);

    if (!instance) {
      instance = createInstance() as object;
      this._container.tableSingletons.set(token, instance as object);
    }

    return instance as T;
  }
}
