import { DependencyInjection } from "../../di/domain/DependicyInjection.js";
import type { AnyContainer, AnyToken } from "../../di/interfaces.js";
import { CreateTokenService } from "../../object/service/CreateTokenService.js";

export class DependencyInjectionService {
  private readonly _di = new DependencyInjection();

  public toToken<T extends object>() {
    return CreateTokenService.createToken<T>();
  }

  public addSingleton<T extends unknown>(token: AnyToken<T>, container?: AnyContainer<T>) {
    this._di.singleton(token, container ?? (token as AnyContainer));
  }

  public addFactory<T extends unknown>(token: AnyToken<T>, container?: AnyContainer<T>) {
    this._di.factory(token, container ?? (token as AnyContainer));
  }

  public inject<T extends unknown>(token: AnyToken<T>): T {
    return this._di.inject(token);
  }
};
