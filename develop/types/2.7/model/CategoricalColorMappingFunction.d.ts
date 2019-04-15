import { ICategory, ICategoricalColorMappingFunction } from '.';
export declare const DEFAULT_CATEGORICAL_COLOR_FUNCTION: ICategoricalColorMappingFunction;
export declare class ReplacmentColorMappingFunction implements ICategoricalColorMappingFunction {
    readonly map: ReadonlyMap<string, string>;
    constructor(map: Map<ICategory | string, string>);
    apply(v: ICategory): string;
    dump(): any;
    clone(): ReplacmentColorMappingFunction;
    eq(other: ICategoricalColorMappingFunction): boolean;
    static restore(dump: any, categories: ICategory[]): ReplacmentColorMappingFunction;
}
