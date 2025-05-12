import type { AnyToken } from "../interfaces";

export class ValidateDIService {
  public isValidToken(item: unknown): item is AnyToken {
    if (typeof item !== "function" && typeof item !== "symbol") {
      return false;
    }

    // @ts-ignore
    if (typeof item === "symbol" && item.tag && item.tag === tokenTag) {
      return true;
    }

    if (typeof item === "function" && item.name !== "") {
      return true;
    }

    return false;
  }
};
