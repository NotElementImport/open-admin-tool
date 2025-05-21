import { EventManager } from "../../events/domain/EventManager.js";
import type { IEvents } from "../interfaces/IEvents.js";

export class EventSystemService<T extends IEvents<{}>> {
  private readonly events = new EventManager();

  public on<K extends keyof T>(event: K, callback: T[K]) {
    return this.events.on(event as string, callback as Function);
  }

  public off<K extends keyof T>(event: K, callback: T[K]) {
    return this.events.off(event as string, callback as Function);
  }

  public dispatch<K extends keyof T>(event: K) {
    return this.events.dispatch(event as string);
  }
};
