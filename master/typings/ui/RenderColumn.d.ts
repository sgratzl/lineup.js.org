import { IColumn } from 'lineupengine';
import Column from '../model/Column';
import { ICellRenderer, IGroupCellRenderer } from '../renderer';
import { ISummaryRenderer } from '../renderer/interfaces';
import { IRankingContext } from './interfaces';
import { ILineUpFlags } from '../interfaces';
export interface IRenderers {
    singleId: string;
    single: ICellRenderer;
    groupId: string;
    group: IGroupCellRenderer;
    summaryId: string;
    summary: ISummaryRenderer | null;
}
export default class RenderColumn implements IColumn {
    readonly c: Column;
    index: number;
    protected ctx: IRankingContext;
    private readonly flags;
    renderers: IRenderers | null;
    constructor(c: Column, index: number, ctx: IRankingContext, flags: ILineUpFlags);
    readonly width: number;
    readonly id: string;
    readonly frozen: boolean;
    createHeader(): HTMLElement;
    updateHeader(node: HTMLElement): void;
    createCell(index: number): HTMLElement;
    updateCell(node: HTMLElement, index: number): HTMLElement | void;
    renderCell(ctx: CanvasRenderingContext2D, index: number): void;
}
