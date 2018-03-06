import Column from './Column';
import { IDataRow } from './interfaces';
import StringColumn from './StringColumn';
export default class AnnotateColumn extends StringColumn {
    static readonly EVENT_VALUE_CHANGED: string;
    private readonly annotations;
    protected createEventList(): string[];
    getValue(row: IDataRow): any;
    dump(toDescRef: (desc: any) => any): any;
    restore(dump: any, factory: (dump: any) => Column | null): void;
    setValue(row: IDataRow, value: string): boolean;
}
