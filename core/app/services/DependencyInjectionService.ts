import { DependencyInjection } from "../../di/domain/DependicyInjection";
import { AnyContainer, AnyToken } from "../../di/interfaces";

export class DependencyInjectionService {
  private readonly _di = new DependencyInjection();

  public addSingleton<T extends unknown>(token: AnyToken<T>, container?: AnyContainer<T>) {

  }

  public addFactory<T extends unknown>(token: AnyToken<T>, container?: AnyContainer<T>) {

  }
};
