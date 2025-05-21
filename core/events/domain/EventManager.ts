import { EventList } from "../dto/EventList.js";
import { EventService } from "../service/EventService.js";
import type { IEventName, ISubscribe, IUnSubscribeHandle, IUnSubscribeResult } from "../interfaces/SubscribeInterfaces.js";

export class EventManager implements ISubscribe {
  protected eventList: EventList;
  protected eventService: EventService;

  public constructor() {
    this.eventService = new EventService(
      this.eventList = new EventList()
    );
  }

  public dispatch(event: IEventName): void {
    this.eventService.dispatch(event);
  }

  public getCount(event: IEventName): number {
    return this.eventService.getCount(event);
  }

  public on(event: IEventName, callback: Function): IUnSubscribeHandle {
    this.eventService.subscribe(event, callback);

    return () => this.off(event, callback);
  }

  public off(event: IEventName, callback: Function): IUnSubscribeResult {
    return this.eventService.unsubscribe(event, callback);
  }
};
