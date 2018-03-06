import Column from './Column';
import { IDataRow } from './interfaces';
import ValueColumn, { IValueColumnDesc } from './ValueColumn';
export declare enum EAlignment {
    left = "left",
    center = "center",
    right = "right",
}
export interface IStringDesc {
    alignment?: EAlignment;
    escape?: boolean;
    pattern?: string;
    patternTemplates?: string[];
}
export declare type IStringColumnDesc = IStringDesc & IValueColumnDesc<string>;
export default class StringColumn extends ValueColumn<string> {
    static readonly EVENT_PATTERN_CHANGED: string;
    static readonly FILTER_MISSING: string;
    private currentFilter;
    readonly alignment: EAlignment;
    readonly escape: boolean;
    private pattern;
    private patternFunction;
    readonly patternTemplates: string[];
    constructor(id: string, desc: Readonly<IStringColumnDesc>);
    setPattern(pattern: string): void;
    getPattern(): string;
    protected createEventList(): string[];
    getValue(row: IDataRow): any;
    getLabel(row: IDataRow): any;
    dump(toDescRef: (desc: any) => any): any;
    restore(dump: any, factory: (dump: any) => Column | null): void;
    isFiltered(): boolean;
    filter(row: IDataRow): boolean;
    getFilter(): string | RegExp | null;
    setFilter(filter: string | RegExp | null): void;
    compare(a: IDataRow, b: IDataRow): any;
}
