import { IBoxPlotData } from '../internal';
import Column, { IColumnDesc } from './Column';
import CompositeColumn from './CompositeColumn';
import { IDataRow, IGroupData } from './interfaces';
import { ESortMethod, IBoxPlotColumn, INumberFilter } from './INumberColumn';
import { IMappingFunction } from './MappingFunction';
export declare function createImpositionBoxPlotDesc(label?: string): {
    type: string;
    label: string;
};
export default class ImpositionBoxPlotColumn extends CompositeColumn implements IBoxPlotColumn {
    static readonly EVENT_MAPPING_CHANGED: string;
    constructor(id: string, desc: Readonly<IColumnDesc>);
    readonly label: string;
    private readonly wrapper;
    getLabel(row: IDataRow): string;
    getColor(row: IDataRow): string | null;
    protected createEventList(): string[];
    getValue(row: IDataRow): any;
    getNumber(row: IDataRow): number;
    getRawNumber(row: IDataRow): number;
    getBoxPlotData(row: IDataRow): IBoxPlotData | null;
    getRawBoxPlotData(row: IDataRow): IBoxPlotData | null;
    getMapping(): IMappingFunction;
    getOriginalMapping(): IMappingFunction;
    getSortMethod(): string;
    setSortMethod(value: ESortMethod): void;
    isMissing(row: IDataRow): boolean;
    setMapping(mapping: IMappingFunction): void;
    getFilter(): INumberFilter;
    setFilter(value?: INumberFilter): void;
    getRange(): [string, string];
    compare(a: IDataRow, b: IDataRow): any;
    group(row: IDataRow): any;
    groupCompare(a: IGroupData, b: IGroupData): any;
    insert(col: Column, index: number): Column | null;
    protected insertImpl(col: Column, index: number): Column;
    protected removeImpl(child: Column, index: number): boolean;
}
