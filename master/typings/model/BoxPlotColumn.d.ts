/// <reference types="d3-format" />
import { IBoxPlotData } from '../internal';
import Column from './Column';
import { IDataRow } from './interfaces';
import { ESortMethod, IBoxPlotColumn, INumberFilter } from './INumberColumn';
import { IMapAbleDesc, IMappingFunction } from './MappingFunction';
import ValueColumn, { IValueColumnDesc } from './ValueColumn';
export interface IBoxPlotDesc extends IMapAbleDesc {
    sort?: ESortMethod;
}
export declare type IBoxPlotColumnDesc = IBoxPlotDesc & IValueColumnDesc<IBoxPlotData>;
export default class BoxPlotColumn extends ValueColumn<IBoxPlotData> implements IBoxPlotColumn {
    static readonly EVENT_MAPPING_CHANGED: string;
    static readonly DEFAULT_FORMATTER: (n: number | {
        valueOf(): number;
    }) => string;
    private sort;
    private mapping;
    private original;
    private currentFilter;
    constructor(id: string, desc: Readonly<IBoxPlotColumnDesc>);
    compare(a: IDataRow, b: IDataRow): number;
    getBoxPlotData(row: IDataRow): IBoxPlotData | null;
    getRange(): [string, string];
    getRawBoxPlotData(row: IDataRow): IBoxPlotData | null;
    getRawValue(row: IDataRow): IBoxPlotData | null;
    getValue(row: IDataRow): {
        min: number;
        max: number;
        median: number;
        q1: number;
        q3: number;
    } | null;
    getNumber(row: IDataRow): number;
    getRawNumber(row: IDataRow): number;
    getLabel(row: IDataRow): string;
    getSortMethod(): ESortMethod;
    setSortMethod(sort: ESortMethod): void;
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
