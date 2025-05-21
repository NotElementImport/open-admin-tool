import { suite, test } from "node:test";
import { strictEqual } from "node:assert";
import { EventManager } from "../../domain/EventManager.js";

test("Event Manager: Healthcheck", () => {
  strictEqual(new EventManager() instanceof EventManager, true);
});

const EVENT_TEST = "test";

test("Event Manager: Subscribe", () => {
  const eventManager = new EventManager();

  let isDone = false;
  eventManager.on(EVENT_TEST, () => {
    isDone = true;
  });

  strictEqual(eventManager.getCount(EVENT_TEST), 1);
  eventManager.dispatch(EVENT_TEST);
  strictEqual(isDone, true);
});

test("Event Manager: Unsubscribe Handle", () => {
  const eventManager = new EventManager();

  const unsub = eventManager.on(EVENT_TEST, () => { });
  strictEqual(eventManager.getCount(EVENT_TEST), 1);

  unsub();
  strictEqual(eventManager.getCount(EVENT_TEST), 0);
});

test("Event Manager: Unsubscribe By Callback", () => {
  function Test() { }

  const eventManager = new EventManager();

  eventManager.on(EVENT_TEST, Test);
  strictEqual(eventManager.getCount(EVENT_TEST), 1);

  eventManager.off(EVENT_TEST, Test);
  strictEqual(eventManager.getCount(EVENT_TEST), 0);
});
