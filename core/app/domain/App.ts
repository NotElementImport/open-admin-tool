import { DependencyInjectionService } from "../services/DependencyInjectionService.js";

// Bootload Framework
export class App {
  public readonly DI = new DependencyInjectionService();

  constructor() { }

  public mount(element?: HTMLUnknownElement): void {
    element = element ?? document.body;
  }
}
