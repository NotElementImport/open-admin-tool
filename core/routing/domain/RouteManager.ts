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

  public remove(route: Route | string) {
    var routeInstance: Route = this.findByPath(route) ?? route as Route;
    this.routes.delete(routeInstance);
    return this;
  }

  public has(route: Route | string): boolean {
    var routeInstance: Route = this.findByPath(route) ?? route as Route;
    return this.routes.has(routeInstance);
  }

  public *entries() {
    let i = 0;
    for (const [_, value] of this.routes.entries()) {
      yield [i, value] as [number, Route];
      i += 1;
    }
  }

  public forEach(callback: (v: Route, i: number) => void) {
    for (const [index, value] of this.entries()) {
      callback(value, index);
    }

    return this;
  }

  public find(callback: (v: Route, i: number) => boolean): Route | null {
    for (const [index, value] of this.entries()) {
      if (callback(value, index)) {
        return value;
      }
    }

    return null;
  }

  public findByPath(path: string | Route): Route | null {
    if (typeof path !== "string") {
      return null;
    }

    return this.find((route) => route.path === path);
  }

  public some(callback: (v: Route, i: number) => boolean) {
    return !!this.find(callback);
  }

  public map(callback: (v: Route, i: number) => Route): typeof this {
    const instance = new (this.constructor as any)();

    this.forEach((value, index) => {
      instance.add(
        callback(value, index)
      );
    });

    return instance;
  }
}
