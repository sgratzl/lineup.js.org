import { ILookUpArray } from '../internal';
import { ICompareValue, Column, Ranking, IDataRow } from '../model';
export declare class CompareLookup {
    private readonly criteria;
    private readonly data;
    constructor(rawLength: number, isSorting: boolean, ranking: Ranking, valueCaches?: (col: Column) => (undefined | ((i: number) => any)));
    readonly sortOrders: {
        asc: boolean;
        lookup: ILookUpArray;
    }[];
    readonly transferAbles: ArrayBuffer[];
    push(row: IDataRow): void;
    pushValues(dataIndex: number, vs: ICompareValue[]): void;
    free(): void;
}
