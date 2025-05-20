import type { Route } from "../domain/Route.js";
import type { RouteManager } from "../domain/RouteManager.js";

export class RouteList {
  public baseName: string = "";
  public routes = new Set<Route>();
  public managers = new Set<RouteManager>();
};
