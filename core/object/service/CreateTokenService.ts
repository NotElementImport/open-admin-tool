import { objectConfig } from "../config.js";

export class CreateTokenService {
  public static createToken<T extends unknown>(): T {
    const sym = Symbol();
    return sym as T;
  }
};
