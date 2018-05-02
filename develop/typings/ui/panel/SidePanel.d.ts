import { IColumnDesc } from '../../model/Column';
import { IRankingHeaderContext } from '../interfaces';
import { ISearchBoxOptions } from './SearchBox';
import SidePanelEntry from './SidePanelEntry';
export interface ISidePanelOptions extends Partial<ISearchBoxOptions<SidePanelEntry>> {
    additionalDescs: IColumnDesc[];
    chooser: boolean;
    collapseable: boolean | 'collapsed';
}
export default class SidePanel {
    private ctx;
    private readonly options;
    readonly node: HTMLElement;
    private readonly search;
    private readonly descs;
    private data;
    constructor(ctx: IRankingHeaderContext, document: Document, options?: Partial<ISidePanelOptions>);
    private init();
    private initChooser();
    private changeDataStorage(old, data);
    collapsed: boolean;
    update(ctx: IRankingHeaderContext): void;
    private updateStats();
    destroy(): void;
    private columnOrder();
    private prepareListData();
    private getDescLike(desc);
    private updateList();
    private static groupByType(entries);
    private updateChooser();
}
