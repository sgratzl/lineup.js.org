import { IDataRow, IBoxPlotColumn } from '.';
export declare function toCompareBoxPlotValue(col: IBoxPlotColumn, row: IDataRow): number;
export declare function getBoxPlotNumber(col: IBoxPlotColumn, row: IDataRow, mode: 'raw' | 'normalized'): number;
