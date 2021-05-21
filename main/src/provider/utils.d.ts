import { Ranking, IColumnDesc } from '../model';
import type { IDeriveOptions, IExportOptions } from './interfaces';
export declare function deriveColumnDescriptions(data: any[], options?: Partial<IDeriveOptions>): IColumnDesc[];
/**
 * assigns colors to columns if they are numbers and not yet defined
 * @param columns
 * @returns {IColumnDesc[]}
 */
export declare function deriveColors(columns: IColumnDesc[]): IColumnDesc[];
/**
 * utility to export a ranking to a table with the given separator
 * @param ranking
 * @param data
 * @param options
 * @returns {Promise<string>}
 */
export declare function exportRanking(ranking: Ranking, data: any[], options?: Partial<IExportOptions>): string;
//# sourceMappingURL=utils.d.ts.map