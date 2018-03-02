import { IArrayColumn } from './IArrayColumn';
import { IDataRow } from './interfaces';
import ValueColumn, { IValueColumnDesc } from './ValueColumn';
export interface IArrayDesc {
    dataLength?: number;
    labels?: string[];
}
export interface ISplicer {
    length: number | null;
    splice<T>(values: T[]): T[];
}
export interface IArrayColumnDesc<T> extends IArrayDesc, IValueColumnDesc<T[]> {
}
export default class ArrayColumn<T> extends ValueColumn<T[]> implements IArrayColumn<T> {
    static readonly EVENT_SPLICE_CHANGED: string;
    private readonly _dataLength;
    private splicer;
    private readonly originalLabels;
    constructor(id: string, desc: Readonly<IArrayColumnDesc<T>>);
    setSplicer(splicer: Readonly<ISplicer>): void;
    readonly labels: string[];
    getSplicer(): Readonly<ISplicer>;
    readonly dataLength: number | null;
    getValue(row: IDataRow): T[];
    getValues(row: IDataRow): T[];
    getLabels(row: IDataRow): string[];
    getLabel(row: IDataRow): string;
    getMap(row: IDataRow): {
        key: string;
        value: T;
    }[];
    getMapLabel(row: IDataRow): {
        key: string;
        value: string;
    }[];
    protected createEventList(): string[];
}
