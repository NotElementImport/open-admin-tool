import { RouteList } from "../dto/RouteList.js";
import { FindRouteService } from "../service/FindRouteService.js";
import { RegisterRouteService } from "../service/RegisterRouteService.js";
import { RoutesToObjectService } from "../service/RoutesToObjectService.js";
import type { Route } from "./Route.js";

export class RouteManager {
  private routeList: RouteList;
  private registerRouteService: RegisterRouteService;
  private toObjectService: RoutesToObjectService;
  private findRouteService: FindRouteService;

  public constructor(baseName: string = "") {
    this.routeList = new RouteList();
    this.routeList.baseName = baseName;

    this.registerRouteService = new RegisterRouteService(this.routeList);
    this.toObjectService = new RoutesToObjectService(this.routeList);
    this.findRouteService = new FindRouteService(this.toObjectService);
  }

  public add(route: Route | typeof this): typeof this {
    if (route === this) {
      return this;
    }

    this.registerRouteService.registerOrFail(
      route
    );

    return this;
  }

  public has(route: Route | string): boolean {
    return this.findRouteService.findRoute(route);
  }

  public toObject(): Record<string, Route> {
    return this.toObjectService.toObject();
  }
}
