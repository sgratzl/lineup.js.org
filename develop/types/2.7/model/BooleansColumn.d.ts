import ArrayColumn, { IArrayColumnDesc } from './ArrayColumn';
import { ISetColumn, ICategoricalColorMappingFunction } from './ICategoricalColumn';
import { IDataRow, ECompareValueType } from './interfaces';
import ValueColumn, { dataLoaded } from './ValueColumn';
import Column, { labelChanged, metaDataChanged, dirty, dirtyHeader, dirtyValues, rendererTypeChanged, groupRendererChanged, summaryRendererChanged, visibilityChanged, widthChanged, dirtyCaches } from './Column';
import { IEventListener } from '../internal';
export declare type IBooleansColumnDesc = IArrayColumnDesc<boolean>;
/**
 * emitted when the color mapping property changes
 * @asMemberOf BooleansColumn
 * @event
 */
export declare function colorMappingChanged_BCS(previous: ICategoricalColorMappingFunction, current: ICategoricalColorMappingFunction): void;
export default class BooleansColumn extends ArrayColumn<boolean> implements ISetColumn {
    static readonly EVENT_COLOR_MAPPING_CHANGED: string;
    private colorMapping;
    constructor(id: string, desc: Readonly<IBooleansColumnDesc>);
    readonly categories: {
        name: string;
        label: string;
        color: string;
        value: number;
    }[];
    getSet(row: IDataRow): Set<{
        name: string;
        label: string;
        color: string;
        value: number;
    }>;
    toCompareValue(row: IDataRow): number;
    toCompareValueType(): ECompareValueType;
    getCategories(row: IDataRow): ({
        name: string;
        label: string;
        color: string;
        value: number;
    } | null)[];
    iterCategory(row: IDataRow): ({
        name: string;
        label: string;
        color: string;
        value: number;
    } | null)[];
    getColors(row: IDataRow): string[];
    protected createEventList(): string[];
    on(type: typeof BooleansColumn.EVENT_COLOR_MAPPING_CHANGED, listener: typeof colorMappingChanged_BCS | null): this;
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
    getColorMapping(): ICategoricalColorMappingFunction;
    setColorMapping(mapping: ICategoricalColorMappingFunction): any;
    dump(toDescRef: (desc: any) => any): any;
    restore(dump: any, factory: (dump: any) => Column | null): void;
}
