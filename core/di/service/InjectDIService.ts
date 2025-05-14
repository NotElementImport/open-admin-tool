import { ValidateTypeService } from "../../object/service/ValidateTypeService.js";
import { DependencyInjection } from "../domain/DependicyInjection.js";
import type { AnyToken, ProvideConfig } from "../interfaces.js";
import { ValidateDIService } from "./ValidateDIService.js";

export class InjectDIService {
  private singletoneContainer = new Map<AnyToken, object>()

  public constructor(
    private _di: DependencyInjection,
  ) { }

  public injectOrFail<T extends unknown>(token: AnyToken<T>) {
    if (!ValidateDIService.isValidToken(token) || (!this._di.container.has(token) && ValidateTypeService.isToken(token))) {
      throw new Error("Not valid token for Provide");
    }

    var config = this._di.container.get(token)
      ?? { implements: token, singleton: false } as ProvideConfig;

    const createInstance = (): T => ValidateTypeService.isConstructor(config.implements)
      ? new config.implements() as T
      : (config.implements as Function)();

    if (!config.singleton) {
      return createInstance();
    }

    var instance = this.singletoneContainer.get(token);

    if (!instance) {
      instance = createInstance() as object;
      this.singletoneContainer.set(token, instance as object);
    }

    return instance as T;
  }
}
