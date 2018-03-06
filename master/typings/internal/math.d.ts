export interface INumberBin {
    x0: number;
    x1: number;
    length: number;
}
export interface IBoxPlotData {
    readonly min: number;
    readonly max: number;
    readonly median: number;
    readonly q1: number;
    readonly q3: number;
    readonly outlier?: number[];
}
export interface IAdvancedBoxPlotData extends IBoxPlotData {
    readonly mean: number;
}
export interface IStatistics extends IAdvancedBoxPlotData {
    readonly count: number;
    readonly maxBin: number;
    readonly hist: INumberBin[];
    readonly missing: number;
}
export interface ICategoricalBin {
    cat: string;
    y: number;
}
export interface ICategoricalStatistics {
    readonly maxBin: number;
    readonly hist: ICategoricalBin[];
    readonly missing: number;
}
