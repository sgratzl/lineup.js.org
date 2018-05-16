import { IExceptionContext, ITableSection } from 'lineupengine';
import { IGroupData, IGroupItem } from '../model';
import { IRankingHeaderContextContainer } from './interfaces';
export declare enum EMode {
    ITEM = "item",
    BAND = "band",
}
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
    private _mode;
    constructor(header: HTMLElement, body: HTMLElement, id: string, ctx: IRankingHeaderContextContainer, options?: Partial<ISlopeGraphOptions>);
    init(): void;
    private initHeader(header);
    mode: EMode;
    hidden: boolean;
    hide(): void;
    show(): void;
    destroy(): void;
    rebuild(left: (IGroupItem | IGroupData)[], leftContext: IExceptionContext, right: (IGroupItem | IGroupData)[], rightContext: IExceptionContext): void;
    private computeSlopes(left, leftContext, lookup);
    private prepareRightSlopes(right, rightContext);
    private revalidate();
    highlight(dataIndex: number): boolean | undefined;
    private onScrolledVertically(scrollTop, clientHeight);
    private choose(leftVisibleFirst, leftVisibleLast, rightVisibleFirst, rightVisibleLast);
    private render(slopes);
    private matchLength(slopes, g);
    updateSelection(selectedDataIndices: Set<number>): void;
}
