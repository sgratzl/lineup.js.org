/// <reference types="react" />
import { IBuilderAdapterProps, ITaggleOptions, LineUp as LineUpImpl, LocalDataProvider, Taggle } from 'lineupjs';
import * as React from 'react';
export declare type ILineUpProps = IBuilderAdapterProps & {
    style?: React.CSSProperties;
    className?: string;
};
export default class LineUp extends React.PureComponent<Readonly<ILineUpProps>, {}> {
    private node;
    private readonly adapter;
    protected createInstance(node: HTMLElement, data: LocalDataProvider, options: Partial<ITaggleOptions>): LineUpImpl | Taggle;
    componentDidMount(): void;
    componentDidUpdate(prevProps: Readonly<ILineUpProps>): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
