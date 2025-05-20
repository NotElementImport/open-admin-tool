import type { App } from "../../app/domain/App.js";
import type { EventList } from "../dto/EventList.js";

export class EventSubscribeService {
  public constructor(
    private eventList: EventList
  ) { }

  public subscribe(event: string, callback: (...args: any) => void) {
    if (!this.eventList.events.has(event)) {
      this.eventList.events.set(event, new Set());
    }

    this.eventList.events.get(event)?.add(callback);
  }

  public unsubscribe(event: string, callback: (...args: any) => void) {
    if (!this.eventList.events.has(event)) {
      return false;
    }

    return this.eventList.events.get(event)?.delete(callback);
  }
};
