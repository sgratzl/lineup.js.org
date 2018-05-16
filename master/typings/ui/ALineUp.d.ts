import { ILineUpLike } from '../interfaces';
import AEventDispatcher from '../internal/AEventDispatcher';
import Column from '../model/Column';
import DataProvider from '../provider/ADataProvider';
export declare abstract class ALineUp extends AEventDispatcher implements ILineUpLike {
    readonly node: HTMLElement;
    data: DataProvider;
    static readonly EVENT_SELECTION_CHANGED: string;
    static readonly EVENT_HIGHLIGHT_CHANGED: string;
    private highlightListeners;
    constructor(node: HTMLElement, data: DataProvider);
    protected createEventList(): string[];
    destroy(): void;
    dump(): any;
    abstract update(): void;
    setDataProvider(data: DataProvider, dump?: any): void;
    getSelection(): number[];
    setSelection(dataIndices: number[]): void;
    sortBy(column: string | ((col: Column) => boolean), ascending?: boolean): boolean;
    abstract setHighlight(dataIndex: number, scrollIntoView: boolean): boolean;
    abstract getHighlight(): number;
    protected listenersChanged(type: string, enabled: boolean): void;
    protected enableHighlightListening(_enable: boolean): void;
}
export default ALineUp;
