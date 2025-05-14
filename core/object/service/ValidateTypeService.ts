import { objectConfig } from "../config.js";

export class ValidateTypeService {
  public static isConstructor(value: unknown): value is { new(): any } {
    if (!value || typeof value !== "function") {
      return false;
    }
    return value.name !== "";
  }

  public static isToken<T>(value: unknown): value is T {
    if (!value || typeof value !== "symbol") {
      return false;
    }
    return true;
  }
}
