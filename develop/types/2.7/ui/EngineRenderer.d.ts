import { GridStyleManager } from 'lineupengine';
import { ILineUpOptions } from '../config';
import { AEventDispatcher, IEventListener } from '../internal';
import { DataProvider } from '../provider';
import { IRenderContext } from '../renderer';
import EngineRanking, { IEngineRankingContext } from './EngineRanking';
import { IRankingHeaderContext, IRankingHeaderContextContainer } from './interfaces';
/**
 * emitted when the highlight changes
 * @asMemberOf EngineRenderer
 * @param dataIndex the highlghted data index or -1 for none
 * @event
 */
export declare function highlightChanged(dataIndex: number): void;
export default class EngineRenderer extends AEventDispatcher {
    protected data: DataProvider;
    static readonly EVENT_HIGHLIGHT_CHANGED: string;
    protected readonly options: Readonly<ILineUpOptions>;
    readonly node: HTMLElement;
    private readonly table;
    private readonly rankings;
    private readonly slopeGraphs;
    readonly ctx: IRankingHeaderContextContainer & IRenderContext & IEngineRankingContext;
    private readonly updateAbles;
    private zoomFactor;
    readonly idPrefix: string;
    private enabledHighlightListening;
    constructor(data: DataProvider, parent: HTMLElement, options: Readonly<ILineUpOptions>);
    readonly style: GridStyleManager;
    zoomOut(): void;
    zoomIn(): void;
    private updateZoomFactor();
    pushUpdateAble(updateAble: (ctx: IRankingHeaderContext) => void): void;
    protected createEventList(): string[];
    on(type: typeof EngineRenderer.EVENT_HIGHLIGHT_CHANGED, listener: typeof highlightChanged | null): this;
    on(type: string | string[], listener: IEventListener | null): this;
    setDataProvider(data: DataProvider): void;
    private takeDownProvider();
    private initProvider(data);
    private updateSelection(dataIndices);
    private updateHist(ranking?, col?);
    private addRanking(ranking);
    private updateRotatedHeaderState();
    private removeRanking(ranking);
    update(rankings?: EngineRanking[]): void;
    private updateUpdateAbles();
    private updateSlopeGraphs(rankings?);
    setHighlight(dataIndex: number, scrollIntoView: boolean): boolean;
    setHighlightToNearest(dataIndices: number[], scrollIntoView: boolean): boolean;
    getHighlight(): number;
    enableHighlightListening(enable: boolean): void;
    destroy(): void;
}
