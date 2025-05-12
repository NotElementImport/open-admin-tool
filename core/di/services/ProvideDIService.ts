import { DependencyInjection } from "../domain/DependicyInjection";
import { AnyToken, ProvideConfig } from "../interfaces";
import { ValidateDIService } from "./ValidateDIService";

export class ProvideDIService {
  public constructor(
    private _di: DependencyInjection,
    private _validateService: ValidateDIService
  ) { }

  public provideOrFail(token: AnyToken, config: ProvideConfig) {
    if (!this._validateService.isValidToken(token)) {
      throw new Error("Not valid token for Provide");
    }

    this._di.container.set(token, config);
  }
}
