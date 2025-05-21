import { suite } from "node:test";

// Object
suite("Module (Object)", async () => {
  await import("./object/test/tests.js");
});
// Dependicy Injection
suite("Module (Dependicy Injection)", async () => {
  await import("./di/test/tests.js");
});
// Routing
suite("Module (Routing)", async () => {
  await import("./routing/test/tests.js");
});
// Event System
suite("Module (Event System)", async () => {
  await import("./events/test/tests.js");
});
// App
suite("Module (App)", async () => {
  await import("./app/test/tests.js");
});
