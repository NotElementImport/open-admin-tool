import { DependencyInjection } from "../domain/DependicyInjection.js";
import type { AnyToken, ProvideConfig } from "../interfaces.js";
import { ValidateDIService } from "./ValidateDIService.js";

export class ProvideDIService {
  public constructor(
    private _di: DependencyInjection,
  ) { }

  public provideOrFail(token: AnyToken, config: ProvideConfig) {
    if (!ValidateDIService.isValidToken(token)) {
      throw new Error("Not valid token for Provide");
    }

    this._di.container.set(token, config);
  }
}
