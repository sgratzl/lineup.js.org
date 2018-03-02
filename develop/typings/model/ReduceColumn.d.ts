import Column from './Column';
import CompositeNumberColumn, { ICompositeNumberColumnDesc } from './CompositeNumberColumn';
import { IDataRow } from './interfaces';
import { EAdvancedSortMethod } from './INumberColumn';
export declare function createReduceDesc(label?: string): {
    type: string;
    label: string;
};
export interface IReduceDesc {
    readonly reduce?: EAdvancedSortMethod;
}
export declare type IReduceColumnDesc = IReduceDesc & ICompositeNumberColumnDesc;
export default class ReduceColumn extends CompositeNumberColumn {
    static readonly EVENT_REDUCE_CHANGED: string;
    private reduce;
    constructor(id: string, desc: Readonly<IReduceColumnDesc>);
    readonly label: string;
    getColor(row: IDataRow): string | null;
    protected compute(row: IDataRow): number;
    protected createEventList(): string[];
    getReduce(): EAdvancedSortMethod;
    setReduce(reduce: EAdvancedSortMethod): void;
    dump(toDescRef: (desc: any) => any): any;
    restore(dump: any, factory: (dump: any) => Column | null): void;
    readonly canJustAddNumbers: boolean;
}
