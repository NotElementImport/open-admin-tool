import { test } from "node:test";
import { strictEqual } from "node:assert";
import { CreateTokenService } from "../../service/CreateTokenService.js";

test("Object: Create token Service -> createToken", () => {
  strictEqual(typeof CreateTokenService.createToken(), "symbol");
});
