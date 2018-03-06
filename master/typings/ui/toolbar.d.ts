import Column from '../model/Column';
import ADialog, { IDialogContext } from '../ui/dialogs/ADialog';
import { IRankingHeaderContext } from './interfaces';
export interface IUIOptions {
    shortcut: boolean;
    order: number;
}
export interface IOnClickHandler {
    (col: Column, evt: {
        stopPropagation: () => void;
        currentTarget: Element;
        [key: string]: any;
    }, ctx: IRankingHeaderContext, level: number): any;
}
export interface IToolbarAction {
    title: string;
    onClick: IOnClickHandler;
    options: Partial<IUIOptions>;
}
export interface IDialogClass {
    new (col: any, dialog: IDialogContext, ...args: any[]): ADialog;
}
export declare const toolbarActions: {
    [key: string]: IToolbarAction;
};
export default function getToolbar(col: Column, ctx: IRankingHeaderContext): IToolbarAction[];
