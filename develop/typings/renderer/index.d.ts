import Column from '../model/Column';
import { ERenderMode, ICellRendererFactory } from './interfaces';
export { default as IRenderContext, IImposer, IGroupCellRenderer, ICellRenderer, ICellRendererFactory } from './interfaces';
export declare const renderers: {
    [key: string]: ICellRendererFactory;
};
export declare function chooseRenderer(col: Column, renderers: {
    [key: string]: ICellRendererFactory;
}): ICellRendererFactory;
export declare function chooseGroupRenderer(col: Column, renderers: {
    [key: string]: ICellRendererFactory;
}): ICellRendererFactory;
export declare function chooseSummaryRenderer(col: Column, renderers: {
    [key: string]: ICellRendererFactory;
}): ICellRendererFactory;
export declare function possibleRenderer(col: Column, renderers: {
    [key: string]: ICellRendererFactory;
}, mode?: ERenderMode): {
    type: string;
    label: string;
}[];
export declare function possibleGroupRenderer(col: Column, renderers: {
    [key: string]: ICellRendererFactory;
}): {
    type: string;
    label: string;
}[];
export declare function possibleSummaryRenderer(col: Column, renderers: {
    [key: string]: ICellRendererFactory;
}): {
    type: string;
    label: string;
}[];
