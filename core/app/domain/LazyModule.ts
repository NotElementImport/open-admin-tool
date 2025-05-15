import type { App } from "./App.js";
import { Module } from "./Module.js";

export class LazyModule extends Module {
  public constructor(
    app: App
  ) {
    super(app);
  }
}
