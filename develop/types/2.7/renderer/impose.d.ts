import { Column, IDataRow } from '../model';
import { IImposer } from './interfaces';
export declare function colorOf(col: Column, row: IDataRow | null, imposer?: IImposer, valueHint?: number): string | null;
