import { IImposeColumnBuilder, INestedBuilder, IReduceBuilder, IScriptedBuilder, IWeightedSumBuilder } from '../';
import { Ranking } from '../../model';
import { LocalDataProvider } from '../../provider';
export interface IBuilderAdapterRankingProps {
    sortBy?: (string | {
        column: string;
        asc: 'asc' | 'desc' | boolean;
    }) | ((string | {
        column: string;
        asc: 'asc' | 'desc' | boolean;
    })[]);
    groupBy?: string[] | string;
    columns?: (string | IImposeColumnBuilder | INestedBuilder | IWeightedSumBuilder | IReduceBuilder | IScriptedBuilder)[];
}
export declare function buildRanking(props: IBuilderAdapterRankingProps, data: LocalDataProvider): Ranking;
export declare function buildGeneric(props: {
    column: '*' | string;
}): string;
export interface IBuilderAdapterImposeColumnProps {
    label?: string;
    column: string;
    categoricalColumn: string;
}
export declare function buildImposeRanking(props: IBuilderAdapterImposeColumnProps): any;
export interface IBuilderAdapterNestedColumnProps {
    label?: string;
}
export declare function buildNestedRanking(props: IBuilderAdapterNestedColumnProps, children: string[]): INestedBuilder;
export interface IBuilderAdapterWeightedSumColumnProps {
    label?: string;
}
export declare function buildWeightedSumRanking(props: IBuilderAdapterWeightedSumColumnProps, children: {
    column: string;
    weight: number;
}[]): IWeightedSumBuilder;
export interface IBuilderAdapterReduceColumnProps {
    type: 'min' | 'max' | 'mean' | 'median';
    label?: string;
}
export declare function buildReduceRanking(props: IBuilderAdapterReduceColumnProps, children: string[]): IReduceBuilder;
export interface IBuilderAdapterScriptColumnProps {
    code: string;
    label?: string;
}
export declare function buildScriptRanking(props: IBuilderAdapterScriptColumnProps, children: string[]): IScriptedBuilder;
export interface IBuilderAdapterSupportColumnProps {
    type: 'rank' | 'selection' | 'group' | 'aggregate' | '*';
}
export declare function buildSupportRanking(props: IBuilderAdapterSupportColumnProps): string;
export declare function buildAllColumnsRanking(): string;
