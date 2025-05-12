import type { ProvideConfig, AnyContainer, AnyToken, ClassContainer, IDependencyInjection, Token } from "../interfaces.js";

const isConstructor = <T extends ClassContainer>(item: any): item is T => {
  if (typeof item !== "function") {
    return false;
  }
  return item.name === "";
};

const tokenTag = Symbol();

export class DependencyInjection implements IDependencyInjection {
  public static isValidToken<T extends AnyToken>(item: T): item is T {
    if (typeof item !== "function" && typeof item !== "symbol") {
      return false;
    }

    // @ts-ignore
    if (typeof item === "symbol" && item.tag && item.tag === tokenTag) {
      return true;
    }

    if (typeof item === "function" && item.name !== "") {
      return true;
    }

    return false;
  }

  public static createToken<T>(): Token<T> {
    const token = Symbol();
    // @ts-ignore  
    token.tag = tokenTag;
    return token as T;
  }


  private _containers = new Map<AnyToken, ProvideConfig>();
  public get container() { return this._containers; }

  private _singletons = new Map<AnyToken, unknown>();

  private provide<T>(token: AnyToken<T>, config: ProvideConfig<T>): void {
    if (!DependencyInjection.isValidToken(token)) {
      throw new Error("Not valid token for Provide");
    }

    this._containers.set(token, config);
  }

  private fake<T>(token: AnyContainer<T>): ProvideConfig<T> {
    return {
      singleton: false,
      implements: token,
    }
  }

  public factory<T>(token: AnyToken<T>, container: AnyContainer<T>): void {
    this.provide(token, {
      singleton: false,
      implements: container,
    });
  }

  public singleton<T>(token: AnyToken<T>, container: AnyContainer<T>): void {
    this.provide(token, {
      singleton: true,
      implements: container,
    });
  }

  public inject<T>(token: AnyToken<T>): T {
    if (!this._containers.has(token) && typeof token === "symbol") {
      throw new Error("Token is interface, implementation not found");
    }

    const container = this._containers.get(token)
      ?? this.fake(token as AnyContainer<T>);

    const createInstance = (): T => isConstructor(container.implements)
      ? new container.implements() as T
      : container.implements() as T;

    if (!container.singleton) {
      return createInstance();
    }

    var instance = this._singletons.get(token);

    if (!instance) {
      instance = createInstance();
      this._singletons.set(token, instance);
    }

    return instance as T;
  }
}
