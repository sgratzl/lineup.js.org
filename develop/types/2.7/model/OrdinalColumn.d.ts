import { IEventListener } from '../internal';
import Column, { dirty, dirtyCaches, dirtyHeader, dirtyValues, groupRendererChanged, labelChanged, metaDataChanged, rendererTypeChanged, summaryRendererChanged, visibilityChanged, widthChanged } from './Column';
import { ICategoricalColumn, ICategoricalDesc, ICategoricalFilter, ICategory, ICategoricalColorMappingFunction } from './ICategoricalColumn';
import { IDataRow, IValueColumnDesc, ITypeFactory } from './interfaces';
import { INumberColumn } from './INumberColumn';
import ValueColumn, { dataLoaded } from './ValueColumn';
export declare type IOrdinalColumnDesc = ICategoricalDesc & IValueColumnDesc<number>;
/**
 * emitted when the mapping property changes
 * @asMemberOf OrdinalColumn
 * @event
 */
export declare function mappingChanged_OC(previous: number[], current: number[]): void;
/**
 * emitted when the color mapping property changes
 * @asMemberOf OrdinalColumn
 * @event
 */
export declare function colorMappingChanged_OC(previous: ICategoricalColorMappingFunction, current: ICategoricalColorMappingFunction): void;
/**
 * emitted when the filter property changes
 * @asMemberOf OrdinalColumn
 * @event
 */
export declare function filterChanged_OC(previous: ICategoricalFilter | null, current: ICategoricalFilter | null): void;
/**
 * similar to a categorical column but the categories are mapped to numbers
 */
export default class OrdinalColumn extends ValueColumn<number> implements INumberColumn, ICategoricalColumn {
    static readonly EVENT_MAPPING_CHANGED: string;
    static readonly EVENT_FILTER_CHANGED: string;
    static readonly EVENT_COLOR_MAPPING_CHANGED: string;
    readonly categories: ICategory[];
    private colorMapping;
    private readonly lookup;
    private currentFilter;
    constructor(id: string, desc: Readonly<IOrdinalColumnDesc>);
    protected createEventList(): string[];
    on(type: typeof OrdinalColumn.EVENT_MAPPING_CHANGED, listener: typeof mappingChanged_OC | null): this;
    on(type: typeof OrdinalColumn.EVENT_COLOR_MAPPING_CHANGED, listener: typeof colorMappingChanged_OC | null): this;
    on(type: typeof OrdinalColumn.EVENT_FILTER_CHANGED, listener: typeof filterChanged_OC | null): this;
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
    getNumberFormat(): (n: number | {
        valueOf(): number;
    }) => string;
    readonly dataLength: number;
    readonly labels: string[];
    getValue(row: IDataRow): number | null;
    getCategory(row: IDataRow): Readonly<ICategory> | null;
    getCategories(row: IDataRow): (Readonly<ICategory> | null)[];
    iterCategory(row: IDataRow): (Readonly<ICategory> | null)[];
    iterNumber(row: IDataRow): number[];
    iterRawNumber(row: IDataRow): number[];
    getColor(row: IDataRow): any;
    getLabel(row: IDataRow): any;
    getLabels(row: IDataRow): any;
    getValues(row: IDataRow): any;
    getMap(row: IDataRow): any;
    getMapLabel(row: IDataRow): any;
    getSet(row: IDataRow): any;
    getNumber(row: IDataRow): number;
    getRawNumber(row: IDataRow): number;
    getExportValue(row: IDataRow, format: 'text' | 'json'): any;
    dump(toDescRef: (desc: any) => any): any;
    restore(dump: any, factory: ITypeFactory): void;
    getMapping(): number[];
    setMapping(mapping: number[]): void;
    getColorMapping(): ICategoricalColorMappingFunction;
    setColorMapping(mapping: ICategoricalColorMappingFunction): any;
    isFiltered(): boolean;
    filter(row: IDataRow): boolean;
    group(row: IDataRow): any;
    getFilter(): ICategoricalFilter | null;
    setFilter(filter: ICategoricalFilter | null): any;
    clearFilter(): any;
    toCompareValue(row: IDataRow): any;
    toCompareValueType(): any;
    getRenderer(): string;
}
