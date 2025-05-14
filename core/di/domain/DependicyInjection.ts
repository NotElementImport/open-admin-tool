import type { ProvideConfig, AnyContainer, AnyToken, IDependencyInjection } from "../interfaces.js";
import { InjectDIService } from "../service/InjectDIService.js";
import { ProvideDIService } from "../service/ProvideDIService.js";

export class DependencyInjection implements IDependencyInjection {
  private _provideService: ProvideDIService;
  private _injectService: InjectDIService;

  public readonly container = new Map<AnyToken, ProvideConfig>();

  public constructor() {
    this._provideService = new ProvideDIService(this);
    this._injectService = new InjectDIService(this);
  }

  public factory<T>(token: AnyToken<T>, container: AnyContainer<T>): void {
    this._provideService.provideOrFail(token, {
      singleton: false,
      implements: container,
    });
  }

  public singleton<T>(token: AnyToken<T>, container: AnyContainer<T>): void {
    this._provideService.provideOrFail(token, {
      singleton: true,
      implements: container,
    });
  }

  public inject<T>(token: AnyToken<T>): T {
    return this._injectService.injectOrFail(token);
  }
}
