import { ICustomAbortSignal } from './interfaces';
export declare class CustomAbortSignal implements ICustomAbortSignal {
    onabort: (() => void) | undefined;
    aborted: boolean;
    abort(): void;
}
export declare class MultiAbortSignal extends CustomAbortSignal {
    private readonly ref;
    private count;
    constructor(ref: any[]);
    abort(): void;
}
