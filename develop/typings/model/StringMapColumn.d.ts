import Column from './Column';
import { IDataRow } from './interfaces';
import MapColumn, { IMapColumnDesc } from './MapColumn';
import { EAlignment, IStringDesc } from './StringColumn';
export declare type IStringMapColumnDesc = IStringDesc & IMapColumnDesc<string>;
export default class StringMapColumn extends MapColumn<string> {
    readonly alignment: EAlignment;
    readonly escape: boolean;
    private pattern;
    private patternFunction;
    readonly patternTemplates: string[];
    constructor(id: string, desc: Readonly<IStringMapColumnDesc>);
    setPattern(pattern: string): void;
    getPattern(): string;
    protected createEventList(): string[];
    getValue(row: IDataRow): {
        key: string;
        value: any;
    }[];
    private replacePattern(s, key, row);
    dump(toDescRef: (desc: any) => any): any;
    restore(dump: any, factory: (dump: any) => Column | null): void;
}
