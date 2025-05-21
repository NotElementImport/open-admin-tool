import { ClassContainer } from "../../di/interfaces.js";
import { ModuleList } from "../dto/ModuleList.js";
import { IEvents, type IDefaultEvents } from "../interfaces/IEvents.js";
import { DependencyInjectionService } from "../services/DependencyInjectionService.js";
import { EventSystemService } from "../services/EventSystemService.js";
import { ModuleService } from "../services/ModuleService.js";
import { Module } from "./Module.js";

// Bootload Framework
export class App<Events extends object = {}> {
  private readonly moduleList: ModuleList;
  private readonly moduleService: ModuleService;

  public readonly DI = new DependencyInjectionService();
  public readonly events = new EventSystemService<IEvents<IDefaultEvents & Events>>();

  constructor() {
    this.moduleService = new ModuleService(
      this.moduleList = new ModuleList()
    );
  }

  public addModule(module: ClassContainer<Module>) {
    this.moduleService.add(module);

    return this;
  }

  public serverRun(): void {
    this.moduleService.execute(this);
  }

  public clientRun(element?: HTMLUnknownElement): void {
    this.serverRun();

    element = element ?? document.body;
  }
}
