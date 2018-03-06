import { IGroupData, IGroupItem } from './model';
import Ranking from './model/Ranking';
import { IDataProvider } from './provider';
import { ICellRendererFactory } from './renderer';
import { IToolbarAction } from './ui';
export declare const DENSE_HISTOGRAM = 19;
export declare const MIN_LABEL_WIDTH = 30;
export declare const HOVER_DELAY_SHOW_DETAIL = 500;
export interface IDynamicHeight {
    defaultHeight: number;
    height(item: IGroupItem | IGroupData): number;
    padding(item: IGroupItem | IGroupData | null): number;
}
export interface ILineUpOptions {
    summaryHeader: boolean;
    animated: boolean;
    expandLineOnHover: boolean;
    sidePanel: boolean;
    sidePanelCollapsed: boolean;
    defaultSlopeGraphMode: 'item' | 'band';
    labelRotation: number;
    rowHeight: number;
    rowPadding: number;
    groupHeight: number;
    groupPadding: number;
    levelOfDetail: (rowIndex: number) => 'high' | 'low';
    dynamicHeight: (data: (IGroupItem | IGroupData)[], ranking: Ranking) => IDynamicHeight | null;
    customRowUpdate: (row: HTMLElement, rowIndex: number) => void;
    toolbar: {
        [key: string]: IToolbarAction;
    };
    renderers: {
        [type: string]: ICellRendererFactory;
    };
}
export interface ITaggleOptions extends ILineUpOptions {
    overviewMode: boolean;
}
export interface ILineUpLike {
    readonly node: HTMLElement;
    readonly data: IDataProvider;
    dump(): any;
    destroy(): void;
}
