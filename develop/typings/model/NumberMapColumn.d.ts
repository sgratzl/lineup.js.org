import { LazyBoxPlotData } from '../internal';
import Column from './Column';
import { IKeyValue } from './IArrayColumn';
import { IDataRow } from './interfaces';
import { EAdvancedSortMethod, IAdvancedBoxPlotColumn, INumberDesc, INumberFilter } from './INumberColumn';
import { default as MapColumn, IMapColumnDesc } from './MapColumn';
import { IMappingFunction } from './MappingFunction';
export interface INumberMapDesc extends INumberDesc {
    readonly sort?: EAdvancedSortMethod;
}
export declare type INumberMapColumnDesc = INumberMapDesc & IMapColumnDesc<number>;
export default class NumberMapColumn extends MapColumn<number> implements IAdvancedBoxPlotColumn {
    static readonly EVENT_MAPPING_CHANGED: string;
    private sort;
    private mapping;
    private original;
    private currentFilter;
    constructor(id: string, desc: Readonly<INumberMapColumnDesc>);
    compare(a: IDataRow, b: IDataRow): number;
    getBoxPlotData(row: IDataRow): LazyBoxPlotData | null;
    getRange(): [string, string];
    getRawBoxPlotData(row: IDataRow): LazyBoxPlotData | null;
    getNumber(row: IDataRow): number;
    getRawNumber(row: IDataRow): number;
    getValue(row: IDataRow): {
        key: string;
        value: number;
    }[];
    getRawValue(row: IDataRow): IKeyValue<number>[];
    getLabels(row: IDataRow): {
        key: string;
        value: string;
    }[];
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
