import { GridStyleManager } from 'lineupengine';
import { ITaggleOptions } from '../../config';
import { DataProvider } from '../../provider';
import { ALineUp } from '../ALineUp';
export default class Taggle extends ALineUp {
    static readonly EVENT_SELECTION_CHANGED = "selectionChanged";
    static readonly EVENT_DIALOG_OPENED = "dialogOpened";
    static readonly EVENT_DIALOG_CLOSED = "dialogClosed";
    static readonly EVENT_HIGHLIGHT_CHANGED = "highlightChanged";
    private readonly spaceFilling;
    private readonly renderer;
    private readonly panel;
    private readonly options;
    constructor(node: HTMLElement, data: DataProvider, options?: Partial<ITaggleOptions>);
    private updateLodRules;
    private setViolation;
    destroy(): void;
    update(): void;
    setHighlight(dataIndex: number, scrollIntoView?: boolean): boolean;
    getHighlight(): number;
    protected enableHighlightListening(enable: boolean): void;
    setDataProvider(data: DataProvider, dump?: any): void;
}
export declare function updateLodRules(style: GridStyleManager, overviewMode: boolean, options: Readonly<ITaggleOptions>): void;
//# sourceMappingURL=Taggle.d.ts.map