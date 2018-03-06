/// <reference types="react" />
import { IBuilderAdapterImposeColumnProps, IBuilderAdapterNestedColumnProps, IBuilderAdapterRankingProps, IBuilderAdapterReduceColumnProps, IBuilderAdapterScriptColumnProps, IBuilderAdapterSupportColumnProps, IBuilderAdapterWeightedSumColumnProps, INestedBuilder, IReduceBuilder, IScriptedBuilder, IWeightedSumBuilder, LocalDataProvider, Ranking } from 'lineupjs';
import * as React from 'react';
export declare type ILineUpRankingProps = IBuilderAdapterRankingProps;
export declare abstract class ALineUpColumnBuilder<T> extends React.PureComponent<Readonly<T>, {}> {
}
export interface IReactChildren {
    children: React.ReactNode;
}
export default class LineUpRanking extends React.PureComponent<Readonly<ILineUpRankingProps>, {}> {
    static merge(props: ILineUpRankingProps & IReactChildren): ILineUpRankingProps;
    static build(props: ILineUpRankingProps, data: LocalDataProvider): Ranking;
}
export declare class LineUpColumn extends ALineUpColumnBuilder<{
    column: '*' | string;
}> {
    static readonly build: (props: {
        column: string;
    }) => string;
}
export declare type ILineUpImposeColumnProps = IBuilderAdapterImposeColumnProps;
export declare class LineUpImposeColumn extends ALineUpColumnBuilder<ILineUpImposeColumnProps> {
    static readonly build: (props: IBuilderAdapterImposeColumnProps) => any;
}
export declare type ILineUpNestedColumnProps = IBuilderAdapterNestedColumnProps;
export declare class LineUpNestedColumn extends ALineUpColumnBuilder<ILineUpNestedColumnProps> {
    static build(props: ILineUpNestedColumnProps & IReactChildren): INestedBuilder;
}
export declare class LineUpWeightedColumn extends ALineUpColumnBuilder<{
    column: string;
    weight: number;
}> {
    static build(props: {
        column: string;
    }): string;
    readonly weight: number;
}
export declare type ILineUpWeightedSumColumnProps = IBuilderAdapterWeightedSumColumnProps & IReactChildren;
export declare class LineUpWeightedSumColumn extends ALineUpColumnBuilder<ILineUpWeightedSumColumnProps> {
    static build(props: ILineUpWeightedSumColumnProps & IReactChildren): IWeightedSumBuilder;
}
export declare type ILineUpReduceColumnProps = IBuilderAdapterReduceColumnProps & {
    children: React.ReactNode;
};
export declare class LineUpReduceColumn extends ALineUpColumnBuilder<ILineUpReduceColumnProps> {
    static build(props: ILineUpReduceColumnProps & IReactChildren): IReduceBuilder;
}
export declare type ILineUpScriptColumnProps = IBuilderAdapterScriptColumnProps & {
    children: React.ReactNode;
};
export declare class LineUpScriptedColumn extends ALineUpColumnBuilder<ILineUpScriptColumnProps> {
    static build(props: ILineUpScriptColumnProps): IScriptedBuilder;
}
export declare type ILineUpSupportColumnProps = IBuilderAdapterSupportColumnProps;
export declare class LineUpSupportColumn extends ALineUpColumnBuilder<ILineUpSupportColumnProps> {
    static readonly build: (props: IBuilderAdapterSupportColumnProps) => string;
}
export declare class LineUpAllColumns extends ALineUpColumnBuilder<{}> {
    static readonly build: () => string;
}
