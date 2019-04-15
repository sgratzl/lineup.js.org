import { IndicesArray, IDataRow, IGroup, ECompareValueType, IValueColumnDesc } from './interfaces';
import Column, { widthChanged, labelChanged, metaDataChanged, dirty, dirtyHeader, dirtyValues, rendererTypeChanged, groupRendererChanged, summaryRendererChanged, visibilityChanged, dirtyCaches } from './Column';
import ValueColumn, { dataLoaded } from './ValueColumn';
import { IEventListener } from '../internal';
/**
 * factory for creating a description creating a rank column
 * @param label
 * @returns {{type: string, label: string}}
 */
export declare function createSelectionDesc(label?: string): {
    type: string;
    label: string;
    fixed: boolean;
};
export interface ISelectionColumnDesc extends IValueColumnDesc<boolean> {
    /**
     * setter for selecting/deselecting the given row
     */
    setter(index: number, value: boolean): void;
    /**
     * setter for selecting/deselecting the given row
     */
    setterAll(indices: IndicesArray, value: boolean): void;
}
/**
 * emitted when rows are selected
 * @asMemberOf SelectionColumn
 * @param dataIndex the (de)seleced row
 * @param value true if selected else false
 * @param dataIndices in case of multiple rows are selected
 * @event
 */
export declare function select_SC(dataIndex: number, value: boolean, dataIndices?: IndicesArray): void;
/**
 * a checkbox column for selections
 */
export default class SelectionColumn extends ValueColumn<boolean> {
    private static SELECTED_GROUP;
    private static NOT_SELECTED_GROUP;
    static readonly EVENT_SELECT: string;
    constructor(id: string, desc: Readonly<ISelectionColumnDesc>);
    readonly frozen: boolean;
    protected createEventList(): string[];
    on(type: typeof SelectionColumn.EVENT_SELECT, listener: typeof select_SC | null): this;
    on(type: typeof ValueColumn.EVENT_DATA_LOADED, listener: typeof dataLoaded | null): this;
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
    setValue(row: IDataRow, value: boolean): boolean;
    setValues(rows: IndicesArray, value: boolean): true | undefined;
    private setImpl(row, value);
    toggleValue(row: IDataRow): boolean;
    toCompareValue(row: IDataRow): 1 | 0;
    toCompareValueType(): ECompareValueType;
    group(row: IDataRow): IGroup;
}
