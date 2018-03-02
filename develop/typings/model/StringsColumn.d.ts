import ArrayColumn, { IArrayColumnDesc } from './ArrayColumn';
import Column from './Column';
import { IDataRow } from './interfaces';
import { EAlignment, IStringDesc } from './StringColumn';
export declare type IStringsColumnDesc = IStringDesc & IArrayColumnDesc<string>;
export default class StringsColumn extends ArrayColumn<string> {
    readonly alignment: EAlignment;
    readonly escape: boolean;
    private pattern;
    private patternFunction;
    readonly patternTemplates: string[];
    constructor(id: string, desc: Readonly<IStringsColumnDesc>);
    setPattern(pattern: string): void;
    getPattern(): string;
    protected createEventList(): string[];
    getValues(row: IDataRow): any[];
    dump(toDescRef: (desc: any) => any): any;
    restore(dump: any, factory: (dump: any) => Column | null): void;
}
