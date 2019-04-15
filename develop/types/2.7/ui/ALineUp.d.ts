import { ILineUpLike } from '../config';
import { AEventDispatcher, IEventListener } from '../internal';
import { Column } from '../model';
import { DataProvider, IDataProviderDump } from '../provider';
/**
 * emitted when the highlight changes
 * @asMemberOf ALineUp
 * @param dataIndex the highlghted data index or -1 for none
 * @event
 */
export declare function highlightChanged(dataIndex: number): void;
/**
 * emitted when the selection changes
 * @asMemberOf ALineUp
 * @param dataIndices the selected data indices
 * @event
 */
export declare function selectionChanged(dataIndices: number[]): void;
export declare abstract class ALineUp extends AEventDispatcher implements ILineUpLike {
    readonly node: HTMLElement;
    private _data;
    static readonly EVENT_SELECTION_CHANGED: string;
    static readonly EVENT_HIGHLIGHT_CHANGED: string;
    private highlightListeners;
    readonly isBrowserSupported: boolean;
    constructor(node: HTMLElement, _data: DataProvider, ignoreIncompatibleBrowser: boolean);
    protected createEventList(): string[];
    on(type: typeof ALineUp.EVENT_HIGHLIGHT_CHANGED, listener: typeof highlightChanged | null): this;
    on(type: typeof ALineUp.EVENT_SELECTION_CHANGED, listener: typeof selectionChanged | null): this;
    on(type: string | string[], listener: IEventListener | null): this;
    readonly data: DataProvider;
    destroy(): void;
    dump(): IDataProviderDump;
    restore(dump: IDataProviderDump): void;
    abstract update(): void;
    setDataProvider(data: DataProvider, dump?: IDataProviderDump): void;
    getSelection(): number[];
    setSelection(dataIndices: number[]): void;
    /**
     * sorts LineUp by he given column
     * @param column callback function finding the column to sort
     * @param ascending
     * @returns {boolean}
     */
    sortBy(column: string | ((col: Column) => boolean), ascending?: boolean): boolean;
    abstract setHighlight(dataIndex: number, scrollIntoView: boolean): boolean;
    abstract getHighlight(): number;
    protected listenersChanged(type: string, enabled: boolean): void;
    protected enableHighlightListening(_enable: boolean): void;
}
export default ALineUp;
