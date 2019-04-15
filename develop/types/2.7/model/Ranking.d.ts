import { IEventListener, AEventDispatcher } from '../internal';
import Column, { dirty, dirtyCaches, dirtyHeader, dirtyValues, labelChanged, visibilityChanged, widthChanged } from './Column';
import { IRankingDump, IndicesArray, IOrderedGroup, IDataRow, IColumnParent, IFlatColumn, ISortCriteria } from './interfaces';
export declare enum EDirtyReason {
    UNKNOWN = "unknown",
    FILTER_CHANGED = "filter",
    SORT_CRITERIA_CHANGED = "sort_changed",
    SORT_CRITERIA_DIRTY = "sort_dirty",
    GROUP_CRITERIA_CHANGED = "group_changed",
    GROUP_CRITERIA_DIRTY = "group_dirty",
    GROUP_SORT_CRITERIA_CHANGED = "group_sort_changed",
    GROUP_SORT_CRITERIA_DIRTY = "group_sort_dirty",
}
/**
 * emitted when a column has been added
 * @asMemberOf Ranking
 * @event
 */
export declare function addColumn(col: Column, index: number): void;
/**
 * emitted when a column has been moved within this composite columm
 * @asMemberOf Ranking
 * @event
 */
export declare function moveColumn(col: Column, index: number, oldIndex: number): void;
/**
 * emitted when a column has been removed
 * @asMemberOf Ranking
 * @event
 */
export declare function removeColumn(col: Column, index: number): void;
/**
 * emitted when the sort criteria propery changes
 * @asMemberOf Ranking
 * @event
 */
export declare function sortCriteriaChanged(previous: ISortCriteria[], current: ISortCriteria[]): void;
/**
 * emitted when the sort criteria propery changes
 * @asMemberOf Ranking
 * @event
 */
export declare function groupCriteriaChanged(previous: Column[], current: Column[]): void;
/**
 * emitted when the sort criteria propery changes
 * @asMemberOf Ranking
 * @event
 */
export declare function groupSortCriteriaChanged(previous: ISortCriteria[], current: ISortCriteria[]): void;
/**
 * emitted when the sort criteria propery changes
 * @asMemberOf Ranking
 * @event
 */
export declare function dirtyOrder(reason?: EDirtyReason[]): void;
/**
 * @asMemberOf Ranking
 * @event
 */
export declare function orderChanged(previous: number[], current: number[], previousGroups: IOrderedGroup[], currentGroups: IOrderedGroup[], dirtyReason: EDirtyReason[]): void;
/**
 * @asMemberOf Ranking
 * @event
 */
export declare function groupsChanged(previous: number[], current: number[], previousGroups: IOrderedGroup[], currentGroups: IOrderedGroup[]): void;
/**
 * emitted when the filter property changes
 * @asMemberOf NumberColumn
 * @event
 */
export declare function filterChanged(previous: any | null, current: any | null): void;
/**
 * a ranking
 */
export default class Ranking extends AEventDispatcher implements IColumnParent {
    id: string;
    static readonly EVENT_WIDTH_CHANGED: string;
    static readonly EVENT_FILTER_CHANGED: string;
    static readonly EVENT_LABEL_CHANGED: string;
    static readonly EVENT_ADD_COLUMN: string;
    static readonly EVENT_MOVE_COLUMN: string;
    static readonly EVENT_REMOVE_COLUMN: string;
    static readonly EVENT_DIRTY: string;
    static readonly EVENT_DIRTY_HEADER: string;
    static readonly EVENT_DIRTY_VALUES: string;
    static readonly EVENT_DIRTY_CACHES: string;
    static readonly EVENT_COLUMN_VISIBILITY_CHANGED: string;
    static readonly EVENT_SORT_CRITERIA_CHANGED: string;
    static readonly EVENT_GROUP_CRITERIA_CHANGED: string;
    static readonly EVENT_GROUP_SORT_CRITERIA_CHANGED: string;
    static readonly EVENT_DIRTY_ORDER: string;
    static readonly EVENT_ORDER_CHANGED: string;
    static readonly EVENT_GROUPS_CHANGED: string;
    private static readonly FORWARD_COLUMN_EVENTS;
    private static readonly COLUMN_GROUP_SORT_DIRTY;
    private static readonly COLUMN_SORT_DIRTY;
    private static readonly COLUMN_GROUP_DIRTY;
    private label;
    private readonly sortCriteria;
    private readonly groupColumns;
    private readonly groupSortCriteria;
    /**
     * columns of this ranking
     * @type {Array}
     * @private
     */
    private readonly columns;
    readonly dirtyOrder: (reason?: EDirtyReason[] | undefined) => void;
    private readonly dirtyOrderSortDirty;
    private readonly dirtyOrderGroupDirty;
    private readonly dirtyOrderGroupSortDirty;
    private readonly dirtyOrderFiltering;
    /**
     * the current ordering as an sorted array of indices
     * @type {Array}
     */
    private groups;
    private order;
    private index2pos;
    constructor(id: string);
    protected createEventList(): string[];
    on(type: typeof Ranking.EVENT_WIDTH_CHANGED, listener: typeof widthChanged | null): this;
    on(type: typeof Ranking.EVENT_FILTER_CHANGED, listener: typeof filterChanged | null): this;
    on(type: typeof Ranking.EVENT_LABEL_CHANGED, listener: typeof labelChanged | null): this;
    on(type: typeof Ranking.EVENT_ADD_COLUMN, listener: typeof addColumn | null): this;
    on(type: typeof Ranking.EVENT_MOVE_COLUMN, listener: typeof moveColumn | null): this;
    on(type: typeof Ranking.EVENT_REMOVE_COLUMN, listener: typeof removeColumn | null): this;
    on(type: typeof Ranking.EVENT_DIRTY, listener: typeof dirty | null): this;
    on(type: typeof Ranking.EVENT_DIRTY_HEADER, listener: typeof dirtyHeader | null): this;
    on(type: typeof Ranking.EVENT_DIRTY_VALUES, listener: typeof dirtyValues | null): this;
    on(type: typeof Ranking.EVENT_DIRTY_CACHES, listener: typeof dirtyCaches | null): this;
    on(type: typeof Ranking.EVENT_COLUMN_VISIBILITY_CHANGED, listener: typeof visibilityChanged | null): this;
    on(type: typeof Ranking.EVENT_SORT_CRITERIA_CHANGED, listener: typeof sortCriteriaChanged | null): this;
    on(type: typeof Ranking.EVENT_GROUP_CRITERIA_CHANGED, listener: typeof groupCriteriaChanged | null): this;
    on(type: typeof Ranking.EVENT_GROUP_SORT_CRITERIA_CHANGED, listener: typeof groupSortCriteriaChanged | null): this;
    on(type: typeof Ranking.EVENT_DIRTY_ORDER, listener: typeof dirtyOrder | null): this;
    on(type: typeof Ranking.EVENT_ORDER_CHANGED, listener: typeof orderChanged | null): this;
    on(type: typeof Ranking.EVENT_GROUPS_CHANGED, listener: typeof groupsChanged | null): this;
    on(type: string | string[], listener: IEventListener | null): this;
    assignNewId(idGenerator: () => string): void;
    getLabel(): string;
    setLabel(value: string): void;
    setGroups(groups: IOrderedGroup[], index2pos: IndicesArray, dirtyReason: EDirtyReason[]): void;
    getRank(dataIndex: number): number;
    getOrder(): IndicesArray;
    getOrderLength(): number;
    getGroups(): IOrderedGroup[];
    dump(toDescRef: (desc: any) => any): IRankingDump;
    restore(dump: IRankingDump, factory: (dump: any) => Column | null): void;
    flatten(r: IFlatColumn[], offset: number, levelsToGo?: number, padding?: number): number;
    getPrimarySortCriteria(): ISortCriteria | null;
    getSortCriteria(): ISortCriteria[];
    getGroupSortCriteria(): ISortCriteria[];
    toggleSorting(col: Column): boolean;
    private toggleSortingLogic(col, sortCriteria);
    toggleGrouping(col: Column): boolean;
    getGroupCriteria(): Column[];
    /**
     * replaces, moves, or remove the given column in the sorting hierarchy
     * @param col {Column}
     * @param priority {number} when priority < 0 remove the column only else replace at the given priority
     */
    sortBy(col: Column, ascending?: boolean, priority?: number): boolean;
    /**
     * replaces, moves, or remove the given column in the group sorting hierarchy
     * @param col {Column}
     * @param priority {number} when priority < 0 remove the column only else replace at the given priority
     */
    groupSortBy(col: Column, ascending?: boolean, priority?: number): boolean;
    private hierarchyLogic<T>(entries, index, entry, priority);
    /**
     * replaces, moves, or remove the given column in the grouping hierarchy
     * @param col {Column}
     * @param priority {number} when priority < 0 remove the column only else replace at the given priority
     */
    groupBy(col: Column, priority?: number): boolean;
    setSortCriteria(value: ISortCriteria | ISortCriteria[]): boolean;
    setGroupCriteria(column: Column[] | Column): boolean;
    toggleGroupSorting(col: Column): boolean;
    setGroupSortCriteria(value: ISortCriteria | ISortCriteria[]): boolean;
    private triggerGroupResort(bak);
    private triggerResort(bak);
    readonly children: Column[];
    readonly length: number;
    insert(col: Column, index?: number): Column;
    move(col: Column, index?: number): Column | null;
    moveAfter(col: Column, reference: Column): Column | null;
    readonly fqpath: string;
    findByPath(fqpath: string): Column;
    indexOf(col: Column): number;
    at(index: number): Column;
    insertAfter(col: Column, ref: Column): Column | null;
    push(col: Column): Column;
    remove(col: Column): boolean;
    clear(): void;
    readonly flatColumns: Column[];
    find(idOrFilter: string | ((col: Column) => boolean)): Column | null;
    isFiltered(): boolean;
    filter(row: IDataRow): boolean;
    clearFilters(): boolean;
    findMyRanker(): this;
    readonly fqid: string;
    /**
     * marks the header, values, or both as dirty such that the values are reevaluated
     * @param type specify in more detail what is dirty, by default whole column
     */
    markDirty(type?: 'header' | 'values' | 'all'): void;
}
