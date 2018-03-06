import Column from './Column';
import { IColumnDesc, IDataRow } from './interfaces';
import Ranking from './Ranking';
export interface IValueColumnDesc<T> extends IColumnDesc {
    lazyLoaded?: boolean;
    accessor?(row: IDataRow, id: string, desc: any, ranking: Ranking | null): T;
}
export default class ValueColumn<T> extends Column {
    static readonly RENDERER_LOADING: string;
    private readonly accessor;
    private loaded;
    constructor(id: string, desc: Readonly<IValueColumnDesc<T>>);
    getLabel(row: IDataRow): string;
    getRaw(row: IDataRow): T | null;
    getValue(row: IDataRow): T | null;
    isLoaded(): boolean;
    setLoaded(loaded: boolean): void;
    getRenderer(): string;
    dump(toDescRef: (desc: any) => any): any;
    restore(dump: any, factory: (dump: any) => Column | null): void;
}
