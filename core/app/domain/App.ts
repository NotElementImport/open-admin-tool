import { DependencyInjection } from "../../di/domain/DependicyInjection";
import { AnyContainer, AnyToken } from "../../di/interfaces";

// Bootload Framework
export class App {
  private readonly _DI = new DependencyInjection();

  constructor() { }

  public addSingleton<T = unknown>(token: AnyToken<T>, container?: AnyContainer<T>) {
    this._DI.singleton(token, container ?? token as AnyContainer<T>);
    return this;
  }

  public addFactory<T = unknown>(token: AnyToken<T>, container?: AnyContainer<T>) {
    this._DI.factory(token, container ?? token as AnyContainer<T>);
    return this;
  }

  public mount(element?: HTMLUnknownElement): void {
    element = element ?? document.body;
  }
}

const app = new App();
