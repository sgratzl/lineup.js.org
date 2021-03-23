import { ICategoricalDesc, ICategory, ICategoricalLikeColumn, ICategoricalColorMappingFunction } from './ICategoricalColumn';
import { IDataRow, ITypeFactory } from './interfaces';
import MapColumn, { IMapColumnDesc } from './MapColumn';
import ValueColumn, { dataLoaded } from './ValueColumn';
import Column, { labelChanged, metaDataChanged, dirty, dirtyHeader, dirtyValues, rendererTypeChanged, groupRendererChanged, summaryRendererChanged, visibilityChanged, widthChanged, dirtyCaches } from './Column';
import { IEventListener } from '../internal';
export declare type ICategoricalMapColumnDesc = ICategoricalDesc & IMapColumnDesc<string | null>;
/**
 * emitted when the color mapping property changes
 * @asMemberOf CategoricalMapColumn
 * @event
 */
export declare function colorMappingChanged_CMC(previous: ICategoricalColorMappingFunction, current: ICategoricalColorMappingFunction): void;
export default class CategoricalMapColumn extends MapColumn<string | null> implements ICategoricalLikeColumn {
    static readonly EVENT_COLOR_MAPPING_CHANGED = "colorMappingChanged";
    readonly categories: ICategory[];
    private readonly lookup;
    private colorMapping;
    constructor(id: string, desc: Readonly<ICategoricalMapColumnDesc>);
    protected createEventList(): string[];
    on(type: typeof CategoricalMapColumn.EVENT_COLOR_MAPPING_CHANGED, listener: typeof colorMappingChanged_CMC | null): this;
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
    private parseValue;
    getCategoryMap(row: IDataRow): {
        key: string;
        value: Readonly<ICategory>;
    }[];
    getCategories(row: IDataRow): Readonly<ICategory>[];
    getColors(row: IDataRow): {
        key: string;
        value: string;
    }[];
    getValue(row: IDataRow): {
        key: string;
        value: string;
    }[];
    getLabels(row: IDataRow): {
        key: string;
        value: string;
    }[];
    getColorMapping(): ICategoricalColorMappingFunction;
    setColorMapping(mapping: ICategoricalColorMappingFunction): void;
    dump(toDescRef: (desc: any) => any): any;
    restore(dump: any, factory: ITypeFactory): void;
    iterCategory(row: IDataRow): Readonly<ICategory>[];
}
//# sourceMappingURL=CategoricalMapColumn.d.ts.map