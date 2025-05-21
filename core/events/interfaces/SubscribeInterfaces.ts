export type IEventName = string;
export type IUnSubscribeResult = boolean;
export type IUnSubscribeHandle = () => IUnSubscribeResult;

export interface ISubscible {
  on(event: IEventName, callback: Function): IUnSubscribeHandle;
}

export interface IUnSubscrible {
  off(event: IEventName, callback: Function): IUnSubscribeResult;
}

export interface IEventDispatch {
  dispatch(event: IEventName): void;
}

export interface ISubscribe extends ISubscible, IUnSubscrible, IEventDispatch {
  getCount(event: IEventName): number;
}
