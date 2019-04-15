import { IColumn, IAbortAblePromise, IAsyncUpdate } from 'lineupengine';
import { Column } from '../model';
import { ICellRenderer, IGroupCellRenderer } from '../renderer';
import { ISummaryRenderer, IRenderCallback } from '../renderer';
import { IRankingContext } from './interfaces';
import { ILineUpFlags } from '../config';
export interface IRenderers {
    singleId: string;
    single: ICellRenderer;
    groupId: string;
    group: IGroupCellRenderer;
    summaryId: string;
    summary: ISummaryRenderer | null;
    singleTemplate: HTMLElement | null;
    groupTemplate: HTMLElement | null;
    summaryTemplate: HTMLElement | null;
}
export default class RenderColumn implements IColumn {
    readonly c: Column;
    index: number;
    protected ctx: IRankingContext;
    protected readonly flags: ILineUpFlags;
    renderers: IRenderers | null;
    constructor(c: Column, index: number, ctx: IRankingContext, flags: ILineUpFlags);
    readonly width: number;
    readonly id: string;
    readonly frozen: boolean;
    private singleRenderer();
    private groupRenderer();
    private summaryRenderer();
    createHeader(): HTMLElement | IAsyncUpdate<HTMLElement>;
    updateHeader(node: HTMLElement): HTMLElement | IAsyncUpdate<HTMLElement>;
    createCell(index: number): HTMLElement | IAsyncUpdate<HTMLElement>;
    updateCell(node: HTMLElement, index: number): HTMLElement | IAsyncUpdate<HTMLElement>;
    renderCell(ctx: CanvasRenderingContext2D, index: number): boolean | IAbortAblePromise<IRenderCallback>;
}
