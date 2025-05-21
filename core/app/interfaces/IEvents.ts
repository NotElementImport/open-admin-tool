export type IEvents<T extends object = Record<string, Function>> = T | Record<string, Function>;

export interface IDefaultEvents {
  "app.init": () => void;
  "app.destroy": () => void;
};
