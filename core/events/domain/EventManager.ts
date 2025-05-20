import type { App } from "../../app/domain/App.js";
import { EventList } from "../dto/EventList.js";
import { EventSubscribeService } from "../service/EventSubscribeService.js";

export class EventManager {
  private eventList: EventList;
  private eventSubscribe: EventSubscribeService;

  public constructor(app: App) {
    this.eventList = new EventList();
    this.eventSubscribe = new EventSubscribeService(
      this.eventList
    );
  }

  public on(event: string, callback: (...args: any) => void) {
    this.eventSubscribe.subscribe(event, callback);
    return () => this.off(event, callback);
  }

  public off(event: string, callback: (...args: any) => void) {
    return this.eventSubscribe.unsubscribe(event, callback);
  }
};
