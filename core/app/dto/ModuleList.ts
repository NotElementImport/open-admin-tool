import { Module } from "../domain/Module.js";

export class ModuleList {
  public readonly list = new Set<Module>();
}
