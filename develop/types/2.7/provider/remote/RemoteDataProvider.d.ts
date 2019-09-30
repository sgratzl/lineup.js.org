import Column, { IColumnDesc, IDataRow, IndicesArray, INumberColumn, Ranking, EDirtyReason, IOrderedGroup, UIntTypedArray } from '../../model';
import ACommonDataProvider from '../ACommonDataProvider';
import { IDataProviderOptions } from '../interfaces';
import { IServerData, IRemoteDataProviderOptions } from './interfaces';
import { IRenderTasks } from '../../renderer';
/**
 * a remote implementation of the data provider
 */
export default class RemoteDataProvider extends ACommonDataProvider {
    private server;
    private readonly ooptions;
    private readonly sortAborter;
    private readonly currentSort;
    private readonly cache;
    private readonly tasks;
    constructor(server: IServerData, columns?: IColumnDesc[], options?: Partial<IRemoteDataProviderOptions & IDataProviderOptions>);
    getTotalNumberOfRows(): number;
    getTaskExecutor(): IRenderTasks;
    cloneRanking(existing?: Ranking): Ranking;
    private trackRanking(ranking, existing?);
    cleanUpRanking(ranking: Ranking): void;
    sort(ranking: Ranking, dirtyReason: EDirtyReason[]): Promise<{
        groups: IOrderedGroup[];
        index2pos: UIntTypedArray;
    }>;
    view(indices: IndicesArray): Promise<any[]>;
    viewRows(indices: IndicesArray): Promise<IDataRow[]>;
    private load(indices);
    getRow(index: number): IDataRow | Promise<IDataRow>;
    private guessRowsToLoad(index);
    mappingSample(col: INumberColumn): Promise<number[]>;
    searchAndJump(search: string | RegExp, col: Column): void;
}
