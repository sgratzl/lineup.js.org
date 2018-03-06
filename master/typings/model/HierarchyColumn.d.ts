import { ICategoricalColumn, ICategory } from './ICategoricalColumn';
import { IDataRow, IGroup } from './interfaces';
import ValueColumn, { IValueColumnDesc } from './ValueColumn';
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
export default class HierarchyColumn extends ValueColumn<string> implements ICategoricalColumn {
    static readonly EVENT_CUTOFF_CHANGED: string;
    private readonly hierarchySeparator;
    readonly hierarchy: Readonly<ICategoryInternalNode>;
    private currentNode;
    private currentMaxDepth;
    private currentLeaves;
    private readonly currentLeavesNameCache;
    private readonly currentLeavesPathCache;
    constructor(id: string, desc: Readonly<IHierarchyColumnDesc>);
    private initHierarchy(root);
    readonly categories: Readonly<ICategoryInternalNode>[];
    protected createEventList(): string[];
    getCutOff(): ICutOffNode;
    setCutOff(value: ICutOffNode): void;
    getCategory(row: IDataRow): Readonly<ICategoryInternalNode> | null;
    readonly dataLength: number;
    readonly labels: string[];
    getValue(row: IDataRow): string | null;
    getLabel(row: IDataRow): any;
    getLabels(row: IDataRow): any;
    getValues(row: IDataRow): any;
    getMap(row: IDataRow): any;
    getMapLabel(row: IDataRow): any;
    getSet(row: IDataRow): any;
    compare(a: IDataRow, b: IDataRow): any;
    group(row: IDataRow): IGroup;
    private updateCaches();
}
export declare function resolveInnerNodes(node: ICategoryInternalNode): ICategoryInternalNode[];
export declare function isHierarchical(categories: (string | Partial<ICategory>)[]): boolean;
export declare function deriveHierarchy(categories: (Partial<ICategory> & {
    parent: string | null;
})[]): ICategoryNode;
