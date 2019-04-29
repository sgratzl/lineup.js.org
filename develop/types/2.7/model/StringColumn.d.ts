import Column, { widthChanged, labelChanged, metaDataChanged, dirty, dirtyHeader, dirtyValues, rendererTypeChanged, groupRendererChanged, summaryRendererChanged, visibilityChanged, dirtyCaches } from './Column';
import { IDataRow, IGroup, ECompareValueType, IValueColumnDesc, ITypeFactory } from './interfaces';
import ValueColumn, { dataLoaded } from './ValueColumn';
import { IEventListener } from '../internal';
export declare enum EAlignment {
    left = "left",
    center = "center",
    right = "right",
}
export interface IStringDesc {
    /**
     * column alignment: left, center, right
     * @default left
     */
    alignment?: EAlignment;
    /**
     * escape html tags
     */
    escape?: boolean;
}
export declare type IStringColumnDesc = IStringDesc & IValueColumnDesc<string>;
/**
 * emitted when the filter property changes
 * @asMemberOf StringColumn
 * @event
 */
export declare function filterChanged_SC(previous: string | RegExp | null, current: string | RegExp | null): void;
/**
 * emitted when the grouping property changes
 * @asMemberOf StringColumn
 * @event
 */
export declare function groupingChanged_SC(previous: (RegExp | string)[][], current: (RegExp | string)[][]): void;
/**
 * a string column with optional alignment
 */
export default class StringColumn extends ValueColumn<string> {
    static readonly EVENT_FILTER_CHANGED: string;
    static readonly EVENT_GROUPING_CHANGED: string;
    static readonly FILTER_MISSING: string;
    private currentFilter;
    readonly alignment: EAlignment;
    readonly escape: boolean;
    private currentGroupCriteria;
    constructor(id: string, desc: Readonly<IStringColumnDesc>);
    protected createEventList(): string[];
    on(type: typeof StringColumn.EVENT_FILTER_CHANGED, listener: typeof filterChanged_SC | null): this;
    on(type: typeof ValueColumn.EVENT_DATA_LOADED, listener: typeof dataLoaded | null): this;
    on(type: typeof StringColumn.EVENT_GROUPING_CHANGED, listener: typeof groupingChanged_SC | null): this;
    on(type: typeof Column.EVENT_WIDTH_CHANGED, listener: typeof widthChanged | null): this;
    on(type: typeof Column.EVENT_LABEL_CHANGED, listener: typeof labelChanged | null): this;
    on(type: typeof Column.EVENT_METADATA_CHANGED, listener: typeof metaDataChanged | null): this;
    on(type: typeof Column.EVENT_DIRTY, listener: typeof dirty | null): this;
    on(type: typeof Column.EVENT_DIRTY_HEADER, listener: typeof dirtyHeader | null): this;
    on(type: typeof Column.EVENT_DIRTY_VALUES, listener: typeof dirtyValues | null): this;
    on(type: typeof Column.EVENT_DIRTY_CACHES, listener: typeof dirtyCaches | null): this;
    on(type: typeof Column.EVENT_RENDERER_TYPE_CHANGED, listener: typeof rendererTypeChanged | null): this;
    on(type: typeof Column.EVENT_GROUP_RENDERER_TYPE_CHANGED, listener: typeof groupRendererChanged | null): this;
    on(type: typeof Column.EVENT_SUMMARY_RENDERER_TYPE_CHANGED, listener: typeof summaryRendererChanged | null): this;
    on(type: typeof Column.EVENT_VISIBILITY_CHANGED, listener: typeof visibilityChanged | null): this;
    on(type: string | string[], listener: IEventListener | null): this;
    getValue(row: IDataRow): string | null;
    getLabel(row: IDataRow): string;
    dump(toDescRef: (desc: any) => any): any;
    restore(dump: any, factory: ITypeFactory): void;
    isFiltered(): boolean;
    filter(row: IDataRow): boolean;
    getFilter(): string | RegExp | null;
    setFilter(filter: string | RegExp | null): void;
    clearFilter(): boolean;
    getGroupCriteria(): (string | RegExp)[];
    setGroupCriteria(value: (string | RegExp)[]): void;
    group(row: IDataRow): IGroup;
    toCompareValue(row: IDataRow): string | null;
    toCompareValueType(): ECompareValueType;
}
