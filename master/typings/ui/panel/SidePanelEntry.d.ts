import { default as Column, IColumnDesc } from '../../model/Column';
import { IRankingHeaderContext } from '../interfaces';
export default class SidePanelEntry {
    readonly desc: IColumnDesc;
    readonly category: {
        label: string;
        order: number;
        name: string;
    };
    used: number;
    private vis;
    constructor(desc: IColumnDesc, category: {
        label: string;
        order: number;
        name: string;
    });
    readonly text: string;
    readonly id: string;
    destroyVis(): void;
    readonly visColumn: Column | null;
    updateVis(ctx: IRankingHeaderContext): HTMLElement | null;
    createVis(column: Column, ctx: IRankingHeaderContext, document: Document): HTMLElement;
}
