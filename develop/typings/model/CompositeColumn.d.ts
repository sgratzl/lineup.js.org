import Column, { IColumnParent, IFlatColumn } from './Column';
import { IDataRow } from './interfaces';
export declare function isMultiLevelColumn(col: Column): col is IMultiLevelColumn;
export default class CompositeColumn extends Column implements IColumnParent {
    protected readonly _children: Column[];
    assignNewId(idGenerator: () => string): void;
    readonly children: Column[];
    readonly length: number;
    flatten(r: IFlatColumn[], offset: number, levelsToGo?: number, padding?: number): number;
    dump(toDescRef: (desc: any) => any): any;
    restore(dump: any, factory: (dump: any) => Column | null): void;
    insert(col: Column, index: number): Column | null;
    move(col: Column, index: number): Column | null;
    protected insertImpl(col: Column, index: number): Column;
    protected moveImpl(col: Column, index: number, oldIndex: number): Column;
    push(col: Column): Column | null;
    at(index: number): Column;
    indexOf(col: Column): number;
    insertAfter(col: Column, ref: Column): Column | null;
    moveAfter(col: Column, ref: Column): Column | null;
    remove(child: Column): boolean;
    protected removeImpl(child: Column, index: number): boolean;
    getColor(_row: IDataRow): string | null;
    isFiltered(): boolean;
    filter(row: IDataRow): boolean;
    isLoaded(): boolean;
    readonly canJustAddNumbers: boolean;
}
export interface IMultiLevelColumn extends CompositeColumn {
    getCollapsed(): boolean;
    setCollapsed(value: boolean): void;
}
