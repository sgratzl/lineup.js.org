import { IDynamicHeight, ITaggleOptions } from '../interfaces';
import { IGroupData, IGroupItem } from '../model';
import Ranking from '../model/Ranking';
import { ICellRendererFactory } from '../renderer';
import { IToolbarAction } from '../ui';
export default class LineUpBuilder {
    protected readonly options: Partial<ITaggleOptions>;
    animated(enable: boolean): this;
    sidePanel(enable: boolean, collapsed?: boolean): this;
    defaultSlopeGraphMode(mode: 'item' | 'band'): this;
    summaryHeader(enable: boolean): this;
    expandLineOnHover(enable: boolean): this;
    overviewMode(): this;
    registerRenderer(id: string, factory: ICellRendererFactory): this;
    registerToolbarAction(id: string, action: IToolbarAction): this;
    rowHeight(rowHeight: number, rowPadding: number): this;
    groupRowHeight(groupHeight: number, groupPadding: number): this;
    dynamicHeight(callback: (data: (IGroupItem | IGroupData)[], ranking: Ranking) => (IDynamicHeight | null)): this;
}
