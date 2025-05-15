import { Route } from "./Route.js";

export class RouteManager {
  private routes = new Set<Route>();

  public get count() {
    return this.routes.size;
  }

  public add(route: Route) {
    this.routes.add(route);
    return this;
  }

  public remove(route: Route) {
    this.routes.delete(route);
    return this;
  }

  public has(route: Route): boolean {
    return this.routes.has(route);
  }

  public map(callback: (v: Route, i: number) => Route) {
    const instance: RouteManager = new (this.constructor as any)();

    let i = 0;
    for (const [_, value] of this.routes.entries()) {
      instance.add(
        callback(value, i)
      );
      i += 1;
    }

    return this;
  }
}
