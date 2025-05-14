import { test } from "node:test";
import { ValidateTypeService } from "../../service/ValidateTypeService.js";
import { strictEqual } from "node:assert";
import { CreateTokenService } from "../../service/CreateTokenService.js";

test("Object: Validate Service -> isConstructor", () => {
  class Test { }

  strictEqual(
    ValidateTypeService.isConstructor(Test), true
  );
});

test("Object: Validate Service -> isToken", () => {
  strictEqual(
    ValidateTypeService.isToken(
      CreateTokenService.createToken()
    ),
    true
  );
});
