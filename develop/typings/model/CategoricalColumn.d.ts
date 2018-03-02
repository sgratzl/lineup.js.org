import Column from './Column';
import { ICategoricalColumn, ICategoricalColumnDesc, ICategoricalFilter, ICategory } from './ICategoricalColumn';
import { IDataRow, IGroup } from './interfaces';
import ValueColumn from './ValueColumn';
export default class CategoricalColumn extends ValueColumn<string> implements ICategoricalColumn {
    readonly categories: ICategory[];
    private readonly missingCategory;
    private readonly lookup;
    private currentFilter;
    constructor(id: string, desc: Readonly<ICategoricalColumnDesc>);
    getValue(row: IDataRow): string | null;
    getCategory(row: IDataRow): ICategory | null;
    readonly dataLength: number;
    readonly labels: string[];
    getLabel(row: IDataRow): string;
    getValues(row: IDataRow): boolean[];
    getLabels(row: IDataRow): string[];
    getMap(row: IDataRow): {
        key: string;
        value: boolean;
    }[];
    getMapLabel(row: IDataRow): {
        key: string;
        value: string;
    }[];
    getSet(row: IDataRow): Set<ICategory>;
    isMissing(row: IDataRow): boolean;
    dump(toDescRef: (desc: any) => any): any;
    restore(dump: any, factory: (dump: any) => Column | null): void;
    isFiltered(): boolean;
    filter(row: IDataRow): boolean;
    getFilter(): ICategoricalFilter | null;
    setFilter(filter: ICategoricalFilter | null): void;
    compare(a: IDataRow, b: IDataRow): number;
    group(row: IDataRow): IGroup;
    getGroupRenderer(): string;
}
