import { ClassContainer } from "../../di/interfaces.js";
import type { App } from "../domain/App.js";
import type { Module } from "../domain/Module.js";
import type { ModuleList } from "../dto/ModuleList.js";

export class ModuleService {
  private classModules = new Set<ClassContainer<Module>>();

  public constructor(
    private moduleList: ModuleList
  ) { }

  public add(module: ClassContainer<Module>): void {
    this.classModules.add(module);
  }

  public execute(app: App) {
    for (const moduleClass of this.classModules.values()) {
      const instance = app.DI.inject(moduleClass);
      instance.onInit(app);
      this.moduleList.list.add(instance);
    }
  }
};
