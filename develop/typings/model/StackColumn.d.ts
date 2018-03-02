import Column, { IFlatColumn } from './Column';
import { IMultiLevelColumn } from './CompositeColumn';
import CompositeNumberColumn, { ICompositeNumberDesc } from './CompositeNumberColumn';
import { IDataRow } from './interfaces';
export declare function createStackDesc(label?: string): {
    type: string;
    label: string;
};
export default class StackColumn extends CompositeNumberColumn implements IMultiLevelColumn {
    static readonly EVENT_COLLAPSE_CHANGED: string;
    static readonly EVENT_WEIGHTS_CHANGED: string;
    static readonly COLLAPSED_RENDERER: string;
    static readonly EVENT_MULTI_LEVEL_CHANGED: string;
    private readonly adaptChange;
    private collapsed;
    constructor(id: string, desc: ICompositeNumberDesc);
    readonly label: string;
    protected createEventList(): string[];
    setCollapsed(value: boolean): void;
    getCollapsed(): boolean;
    readonly canJustAddNumbers: boolean;
    flatten(r: IFlatColumn[], offset: number, levelsToGo?: number, padding?: number): number;
    dump(toDescRef: (desc: any) => any): any;
    restore(dump: any, factory: (dump: any) => Column | null): void;
    insert(col: Column, index: number, weight?: number): Column | null;
    push(col: Column, weight?: number): Column | null;
    insertAfter(col: Column, ref: Column, weight?: number): Column | null;
    private adaptWidthChange(col, oldValue, newValue);
    getWeights(): number[];
    setWeights(weights: number[]): void;
    removeImpl(child: Column, index: number): boolean;
    setWidth(value: number): void;
    protected compute(row: IDataRow): number;
    getRenderer(): string;
    isMissing(row: IDataRow): boolean;
}
