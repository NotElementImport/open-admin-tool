export type Token<T = unknown> = T;
export type ClassToken<T = unknown> = { new(...args: any[]): T };
export type AnyToken<T = unknown> = Token<T> | ClassToken<T>;

export type ClassContainer<T = unknown> = { new(...args: any[]): T };
export type FactoryContainer<T = unknown> = () => T;
export type AnyContainer<T = unknown> = ClassContainer<T> | FactoryContainer<T>;

export interface IProvideSingleton {
  singleton<T>(token: AnyToken<T>, container: AnyContainer<T>): void;
};

export interface IProvideFactory {
  factory<T>(token: AnyToken<T>, container: AnyContainer<T>): void;
};

export interface IInject {
  inject<T>(token: AnyToken<T>): T;
};

export interface IDependencyInjection extends IProvideFactory, IProvideSingleton, IInject { };

export interface ProvideConfig<T = unknown> {
  singleton: boolean,
  implements: AnyContainer<T>,
};
