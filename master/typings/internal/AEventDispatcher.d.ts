export interface IEventContext {
    readonly source: AEventDispatcher;
    readonly origin: AEventDispatcher;
    readonly type: string;
    readonly primaryType: string;
    readonly args: any[];
}
export interface IEventHandler {
    on(type: string): (...args: any[]) => void;
    on(type: string | string[], listener: ((...args: any[]) => any) | null): IEventHandler;
    on(type: string | string[], listener?: ((...args: any[]) => any) | null): any;
}
export default class AEventDispatcher implements IEventHandler {
    private listeners;
    private forwarder;
    constructor();
    on(type: string): (...args: any[]) => void;
    on(type: string | string[], listener: ((...args: any[]) => any) | null): AEventDispatcher;
    protected createEventList(): string[];
    protected fire(type: string | string[], ...args: any[]): void;
    private fireImpl(type, primaryType, origin, ...args);
    protected forward(from: IEventHandler, ...types: string[]): void;
    protected unforward(from: IEventHandler, ...types: string[]): void;
}
