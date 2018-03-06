import { IDataRow } from './interfaces';
import ValueColumn, { IValueColumnDesc } from './ValueColumn';
export interface IDateDesc {
    dateFormat?: string;
    dateParse?: string;
}
export declare type IDateColumnDesc = IValueColumnDesc<Date> & IDateDesc;
export default class DateColumn extends ValueColumn<Date> {
    private readonly format;
    private readonly parse;
    constructor(id: string, desc: Readonly<IDateColumnDesc>);
    getValue(row: IDataRow): Date | null;
    getLabel(row: IDataRow): string;
    compare(a: IDataRow, b: IDataRow): number;
}
