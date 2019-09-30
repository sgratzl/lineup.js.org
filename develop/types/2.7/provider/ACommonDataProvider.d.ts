import { IColumnDesc, Ranking } from '../model';
import ADataProvider from './ADataProvider';
import { IDataProviderDump, IDataProviderOptions } from './interfaces';
/**
 * common base implementation of a DataProvider with a fixed list of column descriptions
 */
declare abstract class ACommonDataProvider extends ADataProvider {
    private columns;
    private rankingIndex;
    constructor(columns?: IColumnDesc[], options?: Partial<IDataProviderOptions>);
    cloneRanking(existing?: Ranking): Ranking;
    /**
     * adds another column description to this data provider
     * @param column
     */
    pushDesc(column: IColumnDesc): void;
    clearColumns(): void;
    getColumns(): IColumnDesc[];
    findDesc(ref: string): IColumnDesc;
    /**
     * identify by the tuple type@columnname
     * @param desc
     * @returns {string}
     */
    toDescRef: (desc: any) => any;
    fromDescRef: (descRef: any) => any;
    restore(dump: IDataProviderDump): void;
    nextRankingId(): string;
}
export default ACommonDataProvider;
