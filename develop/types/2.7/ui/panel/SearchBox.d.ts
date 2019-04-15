import { AEventDispatcher } from '../../internal';
export interface IItem {
    id: string;
    text: string;
}
export interface IGroupSearchItem<T extends IItem> {
    text: string;
    children: (T | IGroupSearchItem<T>)[];
}
export interface ISearchBoxOptions<T extends IItem> {
    doc: Document;
    formatItem(item: T | IGroupSearchItem<T>, node: HTMLElement): string;
    placeholder: string;
}
/**
 * @asMemberOf SearchBox
 * @event
 */
export declare function select(item: any): void;
export default class SearchBox<T extends IItem> extends AEventDispatcher {
    static readonly EVENT_SELECT: string;
    private readonly options;
    readonly node: HTMLElement;
    private search;
    private body;
    private readonly itemTemplate;
    private readonly groupTemplate;
    private values;
    constructor(options?: Partial<ISearchBoxOptions<T>>);
    data: (T | IGroupSearchItem<T>)[];
    private buildDialog(node, values);
    private handleKey(evt);
    private select(item);
    focus(): void;
    private highlighted;
    private highlightNext();
    private highlightPrevious();
    private blur();
    private filter();
    private filterResults(node, text);
    protected createEventList(): string[];
    on(type: typeof SearchBox.EVENT_SELECT, listener: typeof select | null): this;
}
