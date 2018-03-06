import Column, { IColumnDesc, IDataRow } from '../model';
import { IOrderedGroup } from '../model/Group';
import Ranking from '../model/Ranking';
import ACommonDataProvider from './ACommonDataProvider';
import { IDataProviderOptions, IStatsBuilder } from './ADataProvider';
export interface IServerData {
    sort(ranking: Ranking): Promise<number[]>;
    view(indices: number[]): Promise<any[]>;
    mappingSample(column: any): Promise<number[]>;
    search(search: string | RegExp, column: any): Promise<number[]>;
    stats(indices: number[]): IStatsBuilder;
}
export interface IRemoteDataProviderOptions {
    maxCacheSize: number;
}
export default class RemoteDataProvider extends ACommonDataProvider {
    private server;
    private readonly options;
    private readonly cache;
    constructor(server: IServerData, columns?: IColumnDesc[], options?: Partial<IRemoteDataProviderOptions & IDataProviderOptions>);
    getTotalNumberOfRows(): number;
    sortImpl(ranking: Ranking): Promise<IOrderedGroup[]>;
    private loadFromServer(indices);
    view(indices: number[]): Promise<any[]>;
    private computeMissing(orders);
    private loadInCache(missing);
    fetch(orders: number[][]): Promise<IDataRow>[][];
    mappingSample(col: Column): Promise<number[]>;
    searchAndJump(search: string | RegExp, col: Column): void;
    stats(indices: number[]): IStatsBuilder;
}
