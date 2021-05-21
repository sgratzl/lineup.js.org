import { Column, INumberColumn } from '../model';
import { ERenderMode, ICellRendererFactory, IImposer, IRenderContext, ICellRenderer, IGroupCellRenderer, ISummaryRenderer } from './interfaces';
export default class DotCellRenderer implements ICellRendererFactory {
    readonly title: string;
    readonly groupTitle: string;
    canRender(col: Column, mode: ERenderMode): boolean;
    private static getCanvasRenderer;
    private static getDOMRenderer;
    create(col: INumberColumn, context: IRenderContext, imposer?: IImposer): ICellRenderer;
    createGroup(col: INumberColumn, context: IRenderContext, imposer?: IImposer): IGroupCellRenderer;
    createSummary(): ISummaryRenderer;
}
//# sourceMappingURL=DotCellRenderer.d.ts.map