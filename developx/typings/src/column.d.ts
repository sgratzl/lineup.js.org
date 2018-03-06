/// <reference types="react" />
import { IBuilderAdapterCategoricalColumnDescProps, IBuilderAdapterColumnDescProps, IBuilderAdapterDateColumnDescProps, IBuilderAdapterHierarchyColumnDescProps, IBuilderAdapterNumberColumnDescProps, IBuilderAdapterStringColumnDescProps, ICategoricalColumnDesc, IColumnDesc, IDateColumnDesc, IHierarchyColumnDesc, INumberColumnDesc, IStringColumnDesc } from 'lineupjs';
import * as React from 'react';
export declare type ILineUpColumnDescProps = IBuilderAdapterColumnDescProps;
export declare type ILineUpCategoricalColumnDescProps = IBuilderAdapterCategoricalColumnDescProps;
export declare type ILineUpDateColumnDescProps = IBuilderAdapterDateColumnDescProps;
export declare type ILineUpNumberColumnDescProps = IBuilderAdapterNumberColumnDescProps;
export declare type ILineUpHierarchyColumnDescProps = IBuilderAdapterHierarchyColumnDescProps;
export declare type ILineUpStringColumnDescProps = IBuilderAdapterStringColumnDescProps;
export declare class LineUpColumnDesc<P extends ILineUpColumnDescProps = ILineUpColumnDescProps> extends React.PureComponent<Readonly<P>, {}> {
    static build<P extends ILineUpColumnDescProps>(props: P, _data: any[]): IColumnDesc;
}
export declare class LineUpCategoricalColumnDesc extends LineUpColumnDesc<ILineUpCategoricalColumnDescProps> {
    static build(props: ILineUpCategoricalColumnDescProps, data: any[]): ICategoricalColumnDesc;
}
export declare class LineUpDateColumnDesc extends LineUpColumnDesc<ILineUpDateColumnDescProps> {
    static build(props: ILineUpDateColumnDescProps): IDateColumnDesc;
}
export declare class LineUpHierarchyColumnDesc extends LineUpColumnDesc<ILineUpHierarchyColumnDescProps> {
    static build(props: any): IHierarchyColumnDesc;
}
export declare class LineUpNumberColumnDesc extends LineUpColumnDesc<ILineUpNumberColumnDescProps> {
    static build(props: ILineUpNumberColumnDescProps, data: any[]): INumberColumnDesc;
}
export declare class LineUpStringColumnDesc extends LineUpColumnDesc<ILineUpStringColumnDescProps> {
    static build(props: ILineUpStringColumnDescProps): IStringColumnDesc;
}
