import { default as ArrayColumn, IArrayColumnDesc } from './ArrayColumn';
import Column from './Column';
import { IDateDesc } from './DateColumn';
import { IDataRow } from './interfaces';
export declare enum EDateSort {
    min = "min",
    max = "max",
    median = "median",
}
export interface IDatesDesc extends IDateDesc {
    sort?: EDateSort;
}
export declare type IDatesColumnDesc = IDatesDesc & IArrayColumnDesc<Date>;
export default class DatesColumn extends ArrayColumn<Date | null> {
    private readonly format;
    private readonly parse;
    private sort;
    constructor(id: string, desc: Readonly<IDatesColumnDesc>);
    getValue(row: IDataRow): (Date | null)[];
    getLabels(row: IDataRow): string[];
    getSortMethod(): EDateSort;
    setSortMethod(sort: EDateSort): void;
    dump(toDescRef: (desc: any) => any): any;
    restore(dump: any, factory: (dump: any) => Column | null): void;
    compare(a: IDataRow, b: IDataRow): number;
}
