import { ValidateTypeService } from "../../object/service/ValidateTypeService.js";
import type { AnyToken } from "../interfaces.js";

export class ValidateDIService {
  public static isValidToken(token: AnyToken) {
    return ValidateTypeService.isToken(token) || ValidateTypeService.isConstructor(token);
  }
}
