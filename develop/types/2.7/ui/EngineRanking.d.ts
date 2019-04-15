import { ACellTableSection, GridStyleManager, ICellRenderContext, IExceptionContext, ITableSection, IAsyncUpdate } from 'lineupengine';
import { ILineUpFlags } from '../config';
import { IEventHandler, IEventListener } from '../internal';
import { Column, IGroupData, IGroupItem, IOrderedGroup, Ranking } from '../model';
import { IImposer, IRenderContext } from '../renderer';
import { IRankingHeaderContextContainer } from './interfaces';
import RenderColumn, { IRenderers } from './RenderColumn';
export interface IEngineRankingContext extends IRankingHeaderContextContainer, IRenderContext {
    createRenderer(c: Column, imposer?: IImposer): IRenderers;
}
export interface IEngineRankingOptions {
    animation: boolean;
    levelOfDetail: (rowIndex: number) => 'high' | 'low';
    customRowUpdate: (row: HTMLElement, rowIndex: number) => void;
    flags: ILineUpFlags;
}
/**
 * emitted when the width of the ranking changed
 * @asMemberOf EngineRanking
 * @event
 */
export declare function widthChanged(): void;
/**
 * emitted when the data of the ranking needs to be updated
 * @asMemberOf EngineRanking
 * @event
 */
export declare function updateData(): void;
/**
 * emitted when the table has be recreated
 * @asMemberOf EngineRanking
 * @event
 */
export declare function recreate(): void;
/**
 * emitted when the highlight changes
 * @asMemberOf EngineRanking
 * @param dataIndex the highlghted data index or -1 for none
 * @event
 */
export declare function highlightChanged(dataIndex: number): void;
export default class EngineRanking extends ACellTableSection<RenderColumn> implements ITableSection, IEventHandler {
    readonly ranking: Ranking;
    private readonly ctx;
    static readonly EVENT_WIDTH_CHANGED: string;
    static readonly EVENT_UPDATE_DATA: string;
    static readonly EVENT_RECREATE: string;
    static readonly EVENT_HIGHLIGHT_CHANGED: string;
    private _context;
    private readonly loadingCanvas;
    private readonly renderCtx;
    private data;
    private readonly selection;
    private highlight;
    private readonly canvasPool;
    private oldLeft;
    private readonly events;
    private roptions;
    private readonly delayedUpdate;
    private readonly delayedUpdateAll;
    private readonly delayedUpdateColumnWidths;
    private readonly columns;
    private readonly canvasMouseHandler;
    private readonly highlightHandler;
    constructor(ranking: Ranking, header: HTMLElement, body: HTMLElement, tableId: string, style: GridStyleManager, ctx: IEngineRankingContext, roptions?: Partial<IEngineRankingOptions>);
    on(type: typeof EngineRanking.EVENT_WIDTH_CHANGED, listener: typeof widthChanged | null): this;
    on(type: typeof EngineRanking.EVENT_UPDATE_DATA, listener: typeof updateData | null): this;
    on(type: typeof EngineRanking.EVENT_RECREATE, listener: typeof recreate | null): this;
    on(type: typeof EngineRanking.EVENT_HIGHLIGHT_CHANGED, listener: typeof highlightChanged | null): this;
    on(type: string | string[], listener: IEventListener | null): this;
    readonly id: string;
    protected onVisibilityChanged(visible: boolean): void;
    updateHeaders(): void;
    readonly currentData: (IGroupItem | Readonly<IOrderedGroup>)[];
    readonly context: ICellRenderContext<RenderColumn>;
    protected createHeader(_document: Document, column: RenderColumn): HTMLElement | IAsyncUpdate<HTMLElement>;
    protected updateHeader(node: HTMLElement, column: RenderColumn): HTMLElement | IAsyncUpdate<HTMLElement>;
    protected createCell(_document: Document, index: number, column: RenderColumn): HTMLElement | IAsyncUpdate<HTMLElement>;
    private createCellHandled(col, index);
    protected updateCell(node: HTMLElement, index: number, column: RenderColumn): HTMLElement | IAsyncUpdate<HTMLElement>;
    private selectCanvas();
    private rowFlags(row);
    private visibleRenderedWidth();
    private pushLazyRedraw(canvas, x, column, render);
    private renderRow(canvas, node, index, width?);
    protected updateCanvasCell(canvas: HTMLCanvasElement, node: HTMLElement, index: number, column: RenderColumn, x: number): void;
    private reindex();
    updateAll(): void;
    updateBody(): void;
    updateHeaderOf(col: Column): false | RenderColumn;
    protected createRow(node: HTMLElement, rowIndex: number): void;
    protected updateRow(node: HTMLElement, rowIndex: number, hoverLod?: 'high' | 'low'): void;
    private updateCanvasBody();
    private toRowMeta(rowIndex);
    protected updateShifts(top: number, left: number): void;
    private recycleCanvas(canvas);
    enableHighlightListening(enable: boolean): void;
    private updateHoveredRow(row, hover);
    protected forEachRow(callback: (row: HTMLElement, rowIndex: number) => void, inplace?: boolean): void;
    updateSelection(selectedDataIndices: {
        has(i: number): boolean;
    }): void;
    updateColumnWidths(): void;
    private updateColumn(index);
    private updateCellImpl(column, before, rowIndex);
    private initCellClasses(node, id);
    destroy(): void;
    groupData(): (IGroupItem | IGroupData)[];
    render(data: (IGroupItem | IGroupData)[], rowContext: IExceptionContext): void;
    setHighlight(dataIndex: number): boolean | undefined;
    findNearest(dataIndices: number[]): number;
    scrollIntoView(dataIndex: number): boolean;
    getHighlight(): number;
    private createCol(c, index);
    private static isCanvasRenderedRow(row);
    private static disableListener(c);
}
