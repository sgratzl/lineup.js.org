import { IMappingFunction } from '.';
/**
 * interface of a d3 scale
 */
export interface IScale {
    (v: number): number;
    invert(r: number): number;
    domain(): number[];
    domain(domain: number[]): this;
    range(): number[];
    range(range: number[]): this;
}
/**
 * a mapping function based on a d3 scale (linear, sqrt, log)
 */
export declare class ScaleMappingFunction implements IMappingFunction {
    private type;
    private s;
    constructor(domain?: number[], type?: string, range?: number[]);
    domain: number[];
    range: number[];
    getRange(format: (v: number) => string): [string, string];
    apply(v: number): number;
    invert(r: number): number;
    readonly scaleType: string;
    dump(): any;
    eq(other: IMappingFunction): boolean;
    restore(dump: any): void;
    clone(): ScaleMappingFunction;
}
/**
 * a mapping function based on a custom user function using 'value' as the current value
 */
export declare class ScriptMappingFunction implements IMappingFunction {
    domain: number[];
    private _code;
    private f;
    constructor(domain?: number[], _code?: string);
    code: string;
    getRange(): [string, string];
    apply(v: number): number;
    dump(): any;
    eq(other: IMappingFunction): boolean;
    restore(dump: any): void;
    clone(): ScriptMappingFunction;
}
