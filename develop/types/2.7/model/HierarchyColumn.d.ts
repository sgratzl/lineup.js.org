import Column, { widthChanged, labelChanged, metaDataChanged, dirty, dirtyHeader, dirtyValues, dirtyCaches, rendererTypeChanged, groupRendererChanged, summaryRendererChanged, visibilityChanged } from './Column';
import { ICategoricalColumn, ICategory, ICategoricalColorMappingFunction } from './ICategoricalColumn';
import { IDataRow, IGroup, IValueColumnDesc, ITypeFactory } from './interfaces';
import ValueColumn, { dataLoaded } from './ValueColumn';
import { IEventListener } from '../internal';
export interface ICategoryNode extends ICategory {
    children: Readonly<ICategoryNode>[];
}
export interface IPartialCategoryNode extends Partial<ICategory> {
    children: IPartialCategoryNode[];
}
export interface IHierarchyDesc {
    hierarchy: IPartialCategoryNode;
    hierarchySeparator?: string;
}
export declare type IHierarchyColumnDesc = IHierarchyDesc & IValueColumnDesc<string>;
export interface ICategoryInternalNode extends ICategory {
    path: string;
    children: Readonly<ICategoryInternalNode>[];
}
export interface ICutOffNode {
    node: Readonly<ICategoryInternalNode>;
    maxDepth: number;
}
/**
 * emitted when the color mapping property changes
 * @asMemberOf HierarchyColumn
 * @event
 */
export declare function colorMappingChanged_HC(previous: ICategoricalColorMappingFunction, current: ICategoricalColorMappingFunction): void;
/**
 * emitted when the cut off property changes
 * @asMemberOf HierarchyColumn
 * @event
 */
export declare function cutOffChanged(previous: ICutOffNode, current: ICutOffNode): void;
/**
 * column for hierarchical categorical values
 */
export default class HierarchyColumn extends ValueColumn<string> implements ICategoricalColumn {
    static readonly EVENT_CUTOFF_CHANGED: string;
    static readonly EVENT_COLOR_MAPPING_CHANGED: string;
    private readonly hierarchySeparator;
    readonly hierarchy: Readonly<ICategoryInternalNode>;
    private currentNode;
    private currentMaxDepth;
    private currentLeaves;
    private readonly currentLeavesNameCache;
    private readonly currentLeavesPathCache;
    private colorMapping;
    constructor(id: string, desc: Readonly<IHierarchyColumnDesc>);
    private initHierarchy(root);
    readonly categories: Readonly<ICategoryInternalNode>[];
    protected createEventList(): string[];
    on(type: typeof HierarchyColumn.EVENT_CUTOFF_CHANGED, listener: typeof cutOffChanged | null): this;
    on(type: typeof HierarchyColumn.EVENT_COLOR_MAPPING_CHANGED, listener: typeof colorMappingChanged_HC | null): this;
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
    dump(toDescRef: (desc: any) => any): any;
    restore(dump: any, factory: ITypeFactory): void;
    getColorMapping(): ICategoricalColorMappingFunction;
    setColorMapping(mapping: ICategoricalColorMappingFunction): void;
    getCutOff(): ICutOffNode;
    setCutOff(value: ICutOffNode): void;
    getCategory(row: IDataRow): Readonly<ICategoryInternalNode> | null;
    readonly dataLength: number;
    readonly labels: string[];
    getValue(row: IDataRow): string | null;
    getCategories(row: IDataRow): (Readonly<ICategoryInternalNode> | null)[];
    iterCategory(row: IDataRow): (Readonly<ICategoryInternalNode> | null)[];
    getLabel(row: IDataRow): any;
    getColor(row: IDataRow): any;
    getLabels(row: IDataRow): any;
    getValues(row: IDataRow): any;
    getMap(row: IDataRow): any;
    getMapLabel(row: IDataRow): any;
    getSet(row: IDataRow): any;
    toCompareValue(row: IDataRow): any;
    toCompareValueType(): any;
    group(row: IDataRow): IGroup;
    private updateCaches();
}
export declare function resolveInnerNodes(node: ICategoryInternalNode): ICategoryInternalNode[];
export declare function isHierarchical(categories: (string | Partial<ICategory>)[]): boolean;
export declare function deriveHierarchy(categories: (Partial<ICategory> & {
    parent: string | null;
})[]): ICategoryNode;
