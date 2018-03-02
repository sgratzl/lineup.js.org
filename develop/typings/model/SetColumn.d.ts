import Column from './Column';
import { IArrayColumn } from './IArrayColumn';
import { ICategoricalDesc, ICategoricalFilter, ICategory } from './ICategoricalColumn';
import { IDataRow } from './interfaces';
import ValueColumn, { IValueColumnDesc } from './ValueColumn';
export interface ISetDesc extends ICategoricalDesc {
    separator?: string;
}
export declare type ISetColumnDesc = ISetDesc & IValueColumnDesc<string[]>;
export default class SetColumn extends ValueColumn<string[]> implements IArrayColumn<boolean> {
    readonly categories: ICategory[];
    private readonly separator;
    private readonly lookup;
    private currentFilter;
    constructor(id: string, desc: Readonly<ISetColumnDesc>);
    readonly labels: string[];
    readonly dataLength: number;
    getValue(row: IDataRow): string[];
    getLabel(row: IDataRow): string;
    private normalize(v);
    getSet(row: IDataRow): Set<ICategory>;
    getCategories(row: IDataRow): ICategory[];
    isMissing(row: IDataRow): boolean;
    getValues(row: IDataRow): boolean[];
    getLabels(row: IDataRow): string[];
    getMap(row: IDataRow): {
        key: string;
        value: boolean;
    }[];
    getMapLabel(row: IDataRow): {
        key: string;
        value: string;
    }[];
    dump(toDescRef: (desc: any) => any): any;
    restore(dump: any, factory: (dump: any) => Column | null): void;
    isFiltered(): boolean;
    filter(row: IDataRow): boolean;
    getFilter(): any;
    setFilter(filter: ICategoricalFilter | null): any;
    compare(a: IDataRow, b: IDataRow): number;
}
