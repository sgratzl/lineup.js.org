import { ActionColumn, Column } from '../model';
import { IRenderContext, ERenderMode, ICellRendererFactory, ICellRenderer, IGroupCellRenderer, ISummaryRenderer } from './interfaces';
export default class ActionRenderer implements ICellRendererFactory {
    readonly title = "Default";
    canRender(col: Column, mode: ERenderMode): boolean;
    create(col: ActionColumn): ICellRenderer;
    createGroup(col: ActionColumn, context: IRenderContext): IGroupCellRenderer;
    createSummary(): ISummaryRenderer;
}
//# sourceMappingURL=ActionRenderer.d.ts.map