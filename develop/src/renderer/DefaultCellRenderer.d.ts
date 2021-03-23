import { Column } from '../model';
import { ERenderMode, ICellRendererFactory, IGroupCellRenderer, ISummaryRenderer, ICellRenderer } from './interfaces';
/**
 * default renderer instance rendering the value as a text
 */
export declare class DefaultCellRenderer implements ICellRendererFactory {
    title: string;
    groupTitle: string;
    summaryTitle: string;
    canRender(_col: Column, _mode: ERenderMode): boolean;
    create(col: Column): ICellRenderer;
    createGroup(_col: Column): IGroupCellRenderer;
    createSummary(): ISummaryRenderer;
}
//# sourceMappingURL=DefaultCellRenderer.d.ts.map