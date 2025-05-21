import type { EventList } from "../dto/EventList.js";
import type { IEventName } from "../interfaces/SubscribeInterfaces.js";

export class EventService {
  public constructor(
    private eventList: EventList
  ) { }

  public subscribe(event: IEventName, callback: Function): void {
    if (!this.eventList.events.has(event)) {
      this.eventList.events.set(event, new Set());
    }

    this.eventList.events.get(event)?.add(callback);
  }

  public unsubscribe(event: IEventName, callback: Function): boolean {
    return this.eventList.events.get(event)?.delete(callback) ?? false;
  }

  public getCount(event: IEventName): number {
    return this.eventList.events.get(event)?.size ?? 0;
  }

  public dispatch(event: IEventName): void {
    if (!this.eventList.events.has(event)) {
      return void 0;
    }

    const handles = this.eventList.events.get(event)?.values() ?? [];

    for (const handle of handles) {
      handle();
    }
  }
};
