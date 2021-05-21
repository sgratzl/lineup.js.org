import { LinkColumn, Column } from '../model';
import { IRenderContext, ERenderMode, ICellRendererFactory, ISummaryRenderer, IGroupCellRenderer, ICellRenderer } from './interfaces';
export default class LinkCellRenderer implements ICellRendererFactory {
    readonly title: string;
    canRender(col: Column, mode: ERenderMode): boolean;
    create(col: LinkColumn): ICellRenderer;
    private static exampleText;
    createGroup(col: LinkColumn, context: IRenderContext): IGroupCellRenderer;
    createSummary(): ISummaryRenderer;
}
//# sourceMappingURL=LinkCellRenderer.d.ts.map