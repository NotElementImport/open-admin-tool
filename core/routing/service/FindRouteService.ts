import type { Route } from "../domain/Route.js";
import type { RoutesToObjectService } from "./RoutesToObjectService.js";

export class FindRouteService {
  public constructor(
    private routeToObject: RoutesToObjectService
  ) { }

  public findRoute(route: string | Route) {
    const routes = this.routeToObject.toObject()

    for (const [url, routeItem] of Object.entries(routes)) {
      if (typeof route === "string" && route === url) {
        return true;
      }
      else if (route === routeItem) {
        return true;
      }
    }

    return false;
  }
}
