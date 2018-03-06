import { IDataRow, IGroup } from './interfaces';
import ValueColumn, { IValueColumnDesc } from './ValueColumn';
export declare function createSelectionDesc(label?: string): {
    type: string;
    label: string;
    fixed: boolean;
};
export interface ISelectionColumnDesc extends IValueColumnDesc<boolean> {
    setter(row: IDataRow, value: boolean): void;
    setterAll(rows: IDataRow[], value: boolean): void;
}
export default class SelectionColumn extends ValueColumn<boolean> {
    private static SELECTED_GROUP;
    private static NOT_SELECTED_GROUP;
    static readonly EVENT_SELECT: string;
    constructor(id: string, desc: Readonly<ISelectionColumnDesc>);
    readonly frozen: boolean;
    protected createEventList(): string[];
    setValue(row: IDataRow, value: boolean): boolean;
    setValues(rows: IDataRow[], value: boolean): true | undefined;
    private setImpl(row, value);
    toggleValue(row: IDataRow): boolean;
    compare(a: IDataRow, b: IDataRow): 0 | 1 | -1;
    group(row: IDataRow): IGroup;
}
