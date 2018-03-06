import Column, { IColumnDesc, IFlatColumn } from './Column';
import CompositeColumn, { IMultiLevelColumn } from './CompositeColumn';
import { IDataRow } from './interfaces';
export default class MultiLevelCompositeColumn extends CompositeColumn implements IMultiLevelColumn {
    static readonly EVENT_COLLAPSE_CHANGED: string;
    static readonly EVENT_MULTI_LEVEL_CHANGED: string;
    private readonly adaptChange;
    private collapsed;
    constructor(id: string, desc: Readonly<IColumnDesc>);
    protected createEventList(): string[];
    setCollapsed(value: boolean): void;
    getCollapsed(): boolean;
    dump(toDescRef: (desc: any) => any): any;
    restore(dump: any, factory: (dump: any) => Column | null): void;
    flatten(r: IFlatColumn[], offset: number, levelsToGo?: number, padding?: number): any;
    insert(col: Column, index: number): Column | null;
    private adaptWidthChange(oldValue, newValue);
    removeImpl(child: Column, index: number): boolean;
    setWidth(value: number): void;
    getRenderer(): string;
    isMissing(row: IDataRow): boolean;
}
