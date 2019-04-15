import { IExceptionContext, ITableSection } from 'lineupengine';
import { IGroupData, IGroupItem, Ranking } from '../model';
import { IRankingHeaderContextContainer, EMode } from './interfaces';
export interface ISlopeGraphOptions {
    mode: EMode;
}
export default class SlopeGraph implements ITableSection {
    readonly header: HTMLElement;
    readonly body: HTMLElement;
    readonly id: string;
    private readonly ctx;
    readonly node: SVGSVGElement;
    private leftSlopes;
    private rightSlopes;
    private readonly pool;
    private scrollListener;
    readonly width: number;
    readonly height: number;
    private current;
    private chosen;
    private chosenSelectionOnly;
    private _mode;
    constructor(header: HTMLElement, body: HTMLElement, id: string, ctx: IRankingHeaderContextContainer, options?: Partial<ISlopeGraphOptions>);
    init(): void;
    private initHeader(header);
    mode: EMode;
    hidden: boolean;
    hide(): void;
    show(): void;
    destroy(): void;
    rebuild(leftRanking: Ranking, left: (IGroupItem | IGroupData)[], leftContext: IExceptionContext, rightRanking: Ranking, right: (IGroupItem | IGroupData)[], rightContext: IExceptionContext): void;
    private computeSlopes(left, leftContext, lookup);
    private prepareRightSlopes(right, rightContext);
    private revalidate();
    highlight(dataIndex: number): boolean | undefined;
    private onScrolledVertically(scrollTop, clientHeight);
    private choose(leftVisibleFirst, leftVisibleLast, rightVisibleFirst, rightVisibleLast);
    private chooseSelection(leftVisibleFirst, leftVisibleLast, alreadyVisible);
    private updatePath(p, g, s, width, selection);
    private render(visible, selectionSlopes);
    private addPath(g);
    private matchLength(slopes, g);
    updateSelection(selectedDataIndices: Set<number>): void;
}
