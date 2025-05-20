import type { App } from "./App.js";

export abstract class Module {
  public constructor() { }

  public onInit(app: App) { }
}
