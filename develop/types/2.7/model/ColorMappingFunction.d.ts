import { IInterpolateColorMappingFunction, IColorMappingFunction, ISolidColorMappingFunction, IQuantizedColorMappingFunction, ICustomColorMappingFunction } from '.';
export declare class InterpolatingColorFunction implements IInterpolateColorMappingFunction {
    readonly name: string;
    readonly type: 'sequential' | 'divergent';
    readonly apply: (v: number) => string;
    constructor(name: string, type: 'sequential' | 'divergent', apply: (v: number) => string);
    dump(): string;
    clone(): this;
    eq(other: IColorMappingFunction): boolean;
}
export declare class SolidColorFunction implements ISolidColorMappingFunction {
    readonly color: string;
    constructor(color: string);
    readonly type: 'solid';
    apply(): string;
    dump(): string;
    clone(): this;
    eq(other: IColorMappingFunction): boolean;
}
export declare class QuantizedColorFunction implements IQuantizedColorMappingFunction {
    readonly base: IColorMappingFunction;
    readonly steps: number;
    constructor(base: IColorMappingFunction, steps: number);
    readonly type: 'quantized';
    apply(v: number): string;
    dump(): {
        base: any;
        steps: number;
    };
    clone(): QuantizedColorFunction;
    eq(other: IColorMappingFunction): boolean;
}
export declare class CustomColorMappingFunction implements ICustomColorMappingFunction {
    readonly entries: {
        value: number;
        color: string;
    }[];
    private readonly scale;
    constructor(entries: {
        value: number;
        color: string;
    }[]);
    readonly type: 'custom';
    apply(v: number): string;
    dump(): {
        value: number;
        color: string;
    }[];
    clone(): CustomColorMappingFunction;
    eq(other: IColorMappingFunction): boolean;
}
export declare const DEFAULT_COLOR_FUNCTION: SolidColorFunction;
