import { Container } from "../dto/Container.js";
import type { AnyContainer, AnyToken, IDependencyInjection } from "../interfaces.js";
import { InjectDIService } from "../service/InjectDIService.js";
import { ProvideDIService } from "../service/ProvideDIService.js";

export class DependencyInjection implements IDependencyInjection {
  private _provideService: ProvideDIService;
  private _injectService: InjectDIService;
  private _container: Container;

  public constructor() {
    this._container = new Container();
    this._provideService = new ProvideDIService(this._container);
    this._injectService = new InjectDIService(this._container);
  }

  /**
  * Dependency Injection
  *
  * Registers `Pattern Factory`, each instance is unique.
  * ```ts
  * // factory(*key, *container);
  * factory(FormData, FormData);
  * factory(FormData, () => new FormData());
  * ```
  */
  public factory<T>(token: AnyToken<T>, container: AnyContainer<T>): void {
    this._provideService.provideOrFail(token, {
      singleton: false,
      implements: container,
    });
  }

  /**
  * Dependency Injection
  *
  * Registers `Pattern Singleton`, each instance is same.
  * ```ts
  * // singleton(*key, *container);
  * singleton(Logger, Logger);
  * singleton(Logger, () => new Logger());
  * ```
  */
  public singleton<T>(token: AnyToken<T>, container: AnyContainer<T>): void {
    this._provideService.provideOrFail(token, {
      singleton: true,
      implements: container,
    });
  }

  /**
   * Dependency Injection
   * 
   * Inject
  */
  public inject<T>(token: AnyToken<T>): T {
    return this._injectService.injectOrFail(token);
  }
}
