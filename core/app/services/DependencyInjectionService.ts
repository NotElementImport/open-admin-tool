import { DependencyInjection } from "../../di/domain/DependicyInjection";
import { AnyContainer, AnyToken } from "../../di/interfaces";

export class DependencyInjectionService {
  private readonly _di = new DependencyInjection();

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
