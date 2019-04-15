import Column from './Column';
import { IDataRow, IColumnDesc } from './interfaces';
/**
 * factory for creating a description creating a rank column
 * @param label
 * @returns {{type: string, label: string}}
 */
export declare function createRankDesc(label?: string): {
    type: string;
    label: string;
};
/**
 * a rank column
 */
export default class RankColumn extends Column {
    constructor(id: string, desc: IColumnDesc);
    getLabel(row: IDataRow): string;
    getRaw(row: IDataRow): number;
    getValue(row: IDataRow): number | null;
    readonly frozen: boolean;
}
