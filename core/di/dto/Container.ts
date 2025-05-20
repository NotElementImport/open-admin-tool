import { AnyToken, ProvideConfig } from "../interfaces.js";

export class Container {
  public tableSingletons = new Map<AnyToken, object>();
  public table = new Map<AnyToken, ProvideConfig>();
};
