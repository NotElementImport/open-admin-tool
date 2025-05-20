import { Route } from "../domain/Route.js";
import { RouteManager } from "../domain/RouteManager.js";
import type { RouteList } from "../dto/RouteList.js";

export class RegisterRouteService {
  public constructor(
    private routeList: RouteList
  ) { }

  public registerOrFail(item: Route | RouteManager) {
    let isSupport = item && (item instanceof Route || item instanceof RouteManager);

    if (!isSupport) {
      throw new Error("Item is not Route or RouteManager");
    }

    if (item instanceof Route) {
      this.routeList.routes.add(item);
    }
    else if (item instanceof RouteManager) {
      this.routeList.managers.add(item);
    }
  }
};
