import { Container } from "../dto/Container.js";
import type { AnyToken, ProvideConfig } from "../interfaces.js";
import { ValidateDIService } from "./ValidateDIService.js";

export class ProvideDIService {
  public constructor(
    private _container: Container,
  ) { }

  public provideOrFail(token: AnyToken, config: ProvideConfig) {
    if (!ValidateDIService.isValidToken(token)) {
      throw new Error("Not valid token for Provide");
    }

    this._container.table.set(token, config);
  }
}
