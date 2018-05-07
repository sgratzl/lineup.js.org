import ArrayColumn, { IArrayColumnDesc, IArrayDesc } from './ArrayColumn';
import Column from './Column';
import { IDataRow } from './interfaces';
import { EAdvancedSortMethod, INumberFilter, INumbersColumn } from './INumberColumn';
import { IMapAbleDesc, IMappingFunction } from './MappingFunction';
import { IAdvancedBoxPlotData } from '../internal/math';
export interface INumbersDesc extends IArrayDesc, IMapAbleDesc {
    readonly sort?: EAdvancedSortMethod;
}
export declare type INumbersColumnDesc = INumbersDesc & IArrayColumnDesc<number>;
export default class NumbersColumn extends ArrayColumn<number> implements INumbersColumn {
    static readonly EVENT_MAPPING_CHANGED: string;
    static readonly CENTER: number;
    private sort;
    private mapping;
    private original;
    private currentFilter;
    constructor(id: string, desc: Readonly<INumbersColumnDesc>);
    compare(a: IDataRow, b: IDataRow): number;
    getRawNumbers(row: IDataRow): number[];
    getBoxPlotData(row: IDataRow): IAdvancedBoxPlotData | null;
    getRange(): [string, string];
    getRawBoxPlotData(row: IDataRow): IAdvancedBoxPlotData | null;
    getNumbers(row: IDataRow): number[];
    getNumber(row: IDataRow): number;
    getRawNumber(row: IDataRow): number;
    getValue(row: IDataRow): number[];
    getRawValue(row: IDataRow): number[];
    getLabels(row: IDataRow): string[];
    getSortMethod(): EAdvancedSortMethod;
    setSortMethod(sort: EAdvancedSortMethod): void;
    dump(toDescRef: (desc: any) => any): any;
    restore(dump: any, factory: (dump: any) => Column | null): void;
    protected createEventList(): string[];
    getOriginalMapping(): IMappingFunction;
    getMapping(): IMappingFunction;
    setMapping(mapping: IMappingFunction): void;
    isFiltered(): any;
    getFilter(): INumberFilter;
    setFilter(value?: INumberFilter): void;
    filter(row: IDataRow): any;
}
