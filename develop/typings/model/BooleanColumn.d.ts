import Column from './Column';
import { ICategoricalColumn, ICategory } from './ICategoricalColumn';
import { IDataRow } from './interfaces';
import ValueColumn, { IValueColumnDesc } from './ValueColumn';
export interface IBooleanDesc {
    trueMarker?: string;
    falseMarker?: string;
}
export declare type IBooleanColumnDesc = IValueColumnDesc<boolean> & IBooleanDesc;
export default class BooleanColumn extends ValueColumn<boolean> implements ICategoricalColumn {
    static readonly GROUP_TRUE: {
        name: string;
        color: string;
    };
    static readonly GROUP_FALSE: {
        name: string;
        color: string;
    };
    private currentFilter;
    readonly categories: ICategory[];
    constructor(id: string, desc: Readonly<IBooleanColumnDesc>);
    readonly dataLength: number;
    readonly labels: string[];
    getValue(row: IDataRow): boolean;
    isMissing(): boolean;
    getCategory(row: IDataRow): ICategory;
    getLabel(row: IDataRow): any;
    getLabels(row: IDataRow): any;
    getValues(row: IDataRow): any;
    getMap(row: IDataRow): any;
    getMapLabel(row: IDataRow): any;
    getSet(row: IDataRow): Set<ICategory>;
    dump(toDescRef: (desc: any) => any): any;
    restore(dump: any, factory: (dump: any) => Column | null): void;
    isFiltered(): boolean;
    filter(row: IDataRow): boolean;
    getFilter(): boolean | null;
    setFilter(filter: boolean | null): void;
    compare(a: IDataRow, b: IDataRow): 0 | 1 | -1;
    group(row: IDataRow): {
        name: string;
        color: string;
    };
}
