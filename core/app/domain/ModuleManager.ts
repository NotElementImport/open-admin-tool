import { ClassContainer } from "../../di/interfaces.js";
import type { App } from "./App.js";
import { LazyModule } from "./LazyModule.js";
import type { Module } from "./Module.js";

type Container<T, K extends any[]> = { new(app: App, ...args: K[]): T }

export class ModuleManager {
  private container = new Map<ClassContainer<Module>, object | any[]>();

  public constructor(protected app: App) { }

  public add<T extends Module, K extends any[]>(pkg: Container<T, K>, ...args: K) {
    this.container.set(pkg,
      pkg instanceof LazyModule
        ? [this.app, ...args]
        : new pkg(this.app, ...args)
    );

    return this;
  }

  public get<T>(pkg: ClassContainer<T>): T | null {
    var instance = this.container.get(pkg);

    if (Array.isArray(instance)) {
      instance = new pkg(this.app, ...instance)
      this.container.set(pkg, instance);
    }

    return (instance as T) ?? null;
  }
};
