import { IColumnCategory, IColumnDesc } from '../../model';
import { IRankingHeaderContext } from '../interfaces';
import { ISearchBoxOptions } from './SearchBox';
export interface IColumnWrapper {
    desc: IColumnDesc;
    category: IColumnCategory;
    id: string;
    text: string;
}
export interface ISidePanelOptions extends Partial<ISearchBoxOptions<IColumnWrapper>> {
    additionalDescs: IColumnDesc[];
    chooser: boolean;
    hierarchy: boolean;
    collapseable: boolean | 'collapsed';
}
export default class SidePanel {
    private ctx;
    private readonly options;
    readonly node: HTMLElement;
    private readonly search;
    private chooser;
    private readonly descs;
    private data;
    private readonly rankings;
    constructor(ctx: IRankingHeaderContext, document: Document, options?: Partial<ISidePanelOptions>);
    private init();
    private initChooser();
    private readonly active;
    private changeDataStorage(old, data);
    private createEntry(ranking, index);
    collapsed: boolean;
    private makeActive(index);
    private updateRanking();
    update(ctx: IRankingHeaderContext): void;
    private updateStats();
    destroy(): void;
    private static groupByType(entries);
    private updateChooser();
}
