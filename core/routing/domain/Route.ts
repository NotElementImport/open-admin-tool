export class Route {
  public constructor(public readonly path: string) { }

  public clone(): typeof this {
    return new (this.constructor as any)(this.path);
  }
};
