import { IBin } from '../internal';
export interface IHistogramLike<T> {
    readonly maxBin: number;
    readonly hist: ReadonlyArray<IBin<T>>;
}
export interface IFilterContext<T> {
    percent(v: T): number;
    unpercent(p: number): T;
    format(v: T): string;
    setFilter(filterMissing: boolean, min: T, max: T): void;
    edit(value: T, attachment: HTMLElement, type: 'min' | 'max'): Promise<T>;
    domain: [T, T];
}
export declare function filteredHistTemplate<T>(c: IFilterContext<T>, f: IFilterInfo<T>): string;
export declare function initFilter<T>(node: HTMLElement, context: IFilterContext<T>): (missing: number, f: IFilterInfo<T>) => void;
