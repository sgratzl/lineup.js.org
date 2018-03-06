import Column, { IColumnDesc } from './Column';
import CompositeColumn from './CompositeColumn';
import { IDataRow, IGroupData } from './interfaces';
import { INumberColumn } from './NumberColumn';
export declare function createImpositionDesc(label?: string): {
    type: string;
    label: string;
};
export default class ImpositionCompositeColumn extends CompositeColumn implements INumberColumn {
    static readonly EVENT_MAPPING_CHANGED: string;
    constructor(id: string, desc: Readonly<IColumnDesc>);
    readonly label: string;
    private readonly wrapper;
    protected createEventList(): string[];
    getLabel(row: IDataRow): string;
    getColor(row: IDataRow): string | null;
    getValue(row: IDataRow): any;
    getNumber(row: IDataRow): number;
    getRawNumber(row: IDataRow): number;
    isMissing(row: IDataRow): boolean;
    compare(a: IDataRow, b: IDataRow): any;
    group(row: IDataRow): any;
    groupCompare(a: IGroupData, b: IGroupData): any;
    insert(col: Column, index: number): Column | null;
    protected insertImpl(col: Column, index: number): Column;
    protected removeImpl(child: Column, index: number): boolean;
}
