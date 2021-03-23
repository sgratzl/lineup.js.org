import { Column, INumbersColumn } from '../model';
import { IRenderContext, ICellRendererFactory, IImposer, ICellRenderer, IGroupCellRenderer, ISummaryRenderer } from './interfaces';
export default class HeatmapCellRenderer implements ICellRendererFactory {
    readonly title: string;
    canRender(col: Column): boolean;
    private createContext;
    create(col: INumbersColumn, context: IRenderContext, _hist: any, imposer?: IImposer): ICellRenderer;
    createGroup(col: INumbersColumn, context: IRenderContext, imposer?: IImposer): IGroupCellRenderer;
    createSummary(col: INumbersColumn): ISummaryRenderer;
}
//# sourceMappingURL=HeatmapCellRenderer.d.ts.map