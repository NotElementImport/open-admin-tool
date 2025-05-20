import type { Route } from "../domain/Route.js";
import type { RouteList } from "../dto/RouteList.js";

export class RoutesToObjectService {
  public constructor(
    private routeList: RouteList
  ) { }

  public toObject() {
    const baseName = this.routeList.baseName;
    var response: Record<string, Route> = {};

    for (const route of this.routeList.routes.values()) {
      response[baseName ? `${baseName}${route.path}` : route.path] = route;
    }

    for (const routeManager of this.routeList.managers.values()) {
      for (const [key, value] of Object.entries(routeManager.toObject())) {
        response[baseName ? `${baseName}${key}` : key] = value;
      }
    }

    return response;
  }
}
