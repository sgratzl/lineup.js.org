import { IBuilderAdapter, IChangeDetecter } from '.';
export declare class Adapter {
    private readonly adapter;
    private data;
    private instance;
    private prevRankings;
    private prevColumns;
    private prevHighlight;
    private readonly onSelectionChanged;
    private readonly onHighlightChanged;
    constructor(adapter: IBuilderAdapter);
    private readonly props;
    componentDidMount(): void;
    private resolveColumnDescs(data);
    private resolveRankings();
    private buildColumns(data, ctx);
    private buildRankings(data, rankings);
    private buildProvider();
    private updateLineUp(changeDetector, providerChanged);
    private updateProvider(changeDetector);
    componentDidUpdate(changeDetector: IChangeDetecter): void;
    componentWillUnmount(): void;
}
