import { IExceptionContext, GridStyleManager, ACellTableSection, ITableSection, ICellRenderContext } from 'lineupengine';
import { IDataRow, IGroupData, IGroupItem } from '../model';
import Column from '../model/Column';
import Ranking from '../model/Ranking';
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
    flags: {
        disableFrozenColumns: boolean;
    };
}
export default class EngineRanking extends ACellTableSection<RenderColumn> implements ITableSection {
    readonly ranking: Ranking;
    private readonly ctx;
    static readonly EVENT_WIDTH_CHANGED: string;
    static readonly EVENT_UPDATE_DATA: string;
    static readonly EVENT_UPDATE_HIST: string;
    static readonly EVENT_HIGHLIGHT_CHANGED: string;
    private _context;
    private readonly renderCtx;
    private data;
    private readonly selection;
    private highlight;
    private readonly canvasPool;
    private readonly events;
    readonly on: any;
    private roptions;
    private readonly delayedUpdate;
    private readonly delayedUpdateAll;
    private readonly delayedUpdateColumnWidths;
    private readonly columns;
    private readonly canvasMouseHandler;
    private readonly highlightHandler;
    constructor(ranking: Ranking, header: HTMLElement, body: HTMLElement, tableId: string, style: GridStyleManager, ctx: IEngineRankingContext, roptions?: Partial<IEngineRankingOptions>);
    readonly id: string;
    protected onVisibilityChanged(visible: boolean): void;
    updateHeaders(): void;
    readonly currentData: (IGroupItem | IGroupData)[];
    readonly context: ICellRenderContext<RenderColumn>;
    protected createHeader(_document: Document, column: RenderColumn): HTMLElement;
    protected updateHeader(node: HTMLElement, column: RenderColumn): void;
    protected createCell(_document: Document, index: number, column: RenderColumn): HTMLElement;
    protected updateCell(node: HTMLElement, index: number, column: RenderColumn): void | HTMLElement;
    private selectCanvas();
    private rowFlags(row);
    private renderRow(canvas, index);
    protected updateCanvasCell(canvas: HTMLCanvasElement, index: number, column: RenderColumn, x: number): void;
    private reindex();
    updateAll(): void;
    updateBody(): void;
    updateHeaderOf(col: Column): false | RenderColumn;
    protected createRow(node: HTMLElement, rowIndex: number): void;
    protected updateRow(node: HTMLElement, rowIndex: number, forcedLod?: 'high' | 'low'): void;
    enableHighlightListening(enable: boolean): void;
    private updateHoveredRow(row, hover);
    protected forEachRow(callback: (row: HTMLElement, rowIndex: number) => void, inplace?: boolean): void;
    updateSelection(selectedDataIndices: {
        has(i: number): boolean;
    }): void;
    updateColumnWidths(): void;
    private updateHist(col);
    private updateColumn(index);
    destroy(): void;
    groupData(data: IDataRow[]): (IGroupItem | IGroupData)[];
    render(data: (IGroupItem | IGroupData)[], rowContext: IExceptionContext): void;
    setHighlight(dataIndex: number): boolean | undefined;
    findNearest(dataIndices: number[]): number;
    scrollIntoView(dataIndex: number): boolean;
    getHighlight(): number;
    private createCol(c, index);
    private static isCanvasRenderedRow(row);
    private static disableListener(c);
}
